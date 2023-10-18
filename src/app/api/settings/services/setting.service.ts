import { PrismaClient } from '@prisma/client';
import { SettingRequest, SettingResponse, SettingResponseSchema } from '@/types/setting';
import { getCurrentUser } from '@/utils/common';

export class SettingService {
  private prismaClient: PrismaClient = new PrismaClient();

  async findByUserId(createdById: string): Promise<SettingResponse | null> {
    const setting = await this.prismaClient.setting.findFirst({
      where: {
        createdById,
      },
    });

    if (!setting) {
      return null;
    }

    return SettingResponseSchema.parse(setting);
  }

  async save(requestData: SettingRequest): Promise<void> {
    const currentUser = await getCurrentUser();

    await this.prismaClient.setting.upsert({
      where: {
        createdById: currentUser.id,
      },
      update: {
        type: requestData.type,
        workingHours: requestData.workingHours,
        message: requestData.message
      },
      create: {
        type: requestData.type,
        workingHours: requestData.workingHours,
        message: requestData.message,
        createdById: currentUser.id
      }
    });
  }
}
