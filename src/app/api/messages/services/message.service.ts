import { SettingService } from '@/app/api/settings/services/setting.service';
import { getCurrentUser, isWithinWorkingHours } from '@/utils/common';
import { PrismaClient, SettingType } from '@prisma/client';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import appConfig from '@/config/app';
import { SettingResponse } from '@/types/setting';
import { Message, SendMessageRequestSchema } from '@/types/message';
import DBClient from '@/lib/db';

export class MessageService {
  private copilotClient = new CopilotAPI(appConfig.copilotApiKey);
  private prismaClient: PrismaClient = DBClient.getInstance();

  async handleSendMessageWebhook(message: Message) {
    const settingService = new SettingService();
    const currentUser = await getCurrentUser();
    const setting = await settingService.findByUserId(currentUser.id);
    if (setting?.type === SettingType.DISABLED) {
      return;
    }

    const copilotClient = new CopilotAPI(appConfig.copilotApiKey);
    const client = await copilotClient.getClient(message.senderId);

    if ('code' in client && client.code === 'parameter_invalid') {
      return;
    }

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
      await this.sendMessage(setting, message);

      return;
    }

    if (!setting?.timezone || !setting?.workingHours) {
      return;
    }

    if (!isWithinWorkingHours(setting.timezone, setting.workingHours)) {
      await this.sendMessage(setting, message);
    }
  }

  subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);

    return date;
  }

  async sendMessage(setting: SettingResponse, message: Message): Promise<void> {
    const messageData = SendMessageRequestSchema.parse({
      text: setting.message,
      senderId: setting.createdById,
      channelId: message.channelId,
    });

    await Promise.all([
      this.copilotClient.sendMessage(messageData),
      this.prismaClient.message.create({
        data: {
          message: setting.message || '',
          clientId: message.senderId,
          channelId: messageData.channelId,
          senderId: setting.createdById,
        },
      }),
    ]);
  }
}
