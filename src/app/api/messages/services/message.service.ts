import { SettingService } from '@/app/api/settings/services/setting.service';
import { isWithinWorkingHours } from '@/utils/common';
import { PrismaClient, SettingType } from '@prisma/client';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { SettingResponse } from '@/types/setting';
import { Message, SendMessageRequestSchema } from '@/types/message';
import DBClient from '@/lib/db';
import { z } from 'zod';

export class MessageService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async handleSendMessageWebhook(message: Message, { apiToken }: { apiToken: string }) {
    const settingService = new SettingService();
    const copilotClient = new CopilotAPI(apiToken);
    const currentUser = await copilotClient.me();
    const setting = await settingService.findByUserId(currentUser.id);
    if (setting?.type === SettingType.DISABLED) {
      return;
    }

    try {
      const client = await copilotClient.getClient(message.senderId);

      const clientMessageCount = await this.prismaClient.message.count({
        where: {
          channelId: message.channelId,
          clientId: client.id,
          createdAt: {
            gte: this.subtractHours(new Date(), 1),
          },
        },
      });

      if (clientMessageCount > 0) {
        return;
      }

      if (setting?.type === SettingType.ENABLED) {
        await this.sendMessage(copilotClient, setting, message);

        return;
      }

      if (!setting?.timezone || !setting?.workingHours) {
        return;
      }

      if (!isWithinWorkingHours(setting.timezone, setting.workingHours)) {
        await this.sendMessage(copilotClient, setting, message);
      }
    } catch (e: unknown) {
      console.error(e);

      return;
    }
  }

  subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);

    return date;
  }

  async sendMessage(copilotClient: CopilotAPI, setting: SettingResponse, message: Message): Promise<void> {
    const messageData = SendMessageRequestSchema.parse({
      text: setting.message,
      senderId: setting.senderId,
      channelId: message.channelId,
    });

    await Promise.all([
      copilotClient.sendMessage(messageData),
      this.prismaClient.message.create({
        data: {
          message: z.string().parse(setting.message),
          clientId: message.senderId,
          channelId: messageData.channelId,
          senderId: setting.senderId,
        },
      }),
    ]);
  }
}
