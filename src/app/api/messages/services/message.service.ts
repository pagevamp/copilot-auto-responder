import { SettingService } from '@/app/api/settings/services/setting.service';
import { getCurrentUser, isWithinWorkingHours } from '@/utils/common';
import { SettingType } from '@prisma/client';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import appConfig from '@/config/app';
import { SettingResponse } from '@/types/setting';
import { Message, SendMessageRequestSchema } from '@/types/message';

export class MessageService {
  private copilotClient = new CopilotAPI(appConfig.copilotApiKey);

  async handleSendMessageWebhook(message: Message) {
    const settingService = new SettingService();
    const currentUser = await getCurrentUser();
    const setting = await settingService.findByUserId(currentUser.id);
    if (setting?.type === SettingType.DISABLED) {
      return;
    }

    if (setting?.type === SettingType.ENABLED) {
      await this.sendMessage(setting);
    }

    const copilotClient = new CopilotAPI(appConfig.copilotApiKey);
    const client = await copilotClient.getClient(message.senderId);

    if ('code' in client && client.code === 'parameter_invalid') {
      return;
    }

    if (!setting?.timezone || !setting?.workingHours) {
      return;
    }

    if (isWithinWorkingHours(setting.timezone, setting.workingHours)) {
      await this.sendMessage(setting);
    }
  }

  async sendMessage(setting: SettingResponse): Promise<void> {
    const message = SendMessageRequestSchema.parse({
      text: setting.message,
      senderId: setting.createdById,
      channelId: ''
    });

    await this.copilotClient.sendMessage(message);
  }
}
