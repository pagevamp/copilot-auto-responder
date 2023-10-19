import { PrismaClient } from "@prisma/client";
import {
  SettingRequest,
  SettingResponse,
  SettingResponseSchema,
} from "@/types/setting";
import { getCurrentUser } from "@/utils/common";

export class SettingService {
  private prismaClient: PrismaClient = new PrismaClient();

  async findByUserId(createdById: string): Promise<SettingResponse | null> {
    const setting = await this.prismaClient.setting.findFirst({
      where: {
        createdById: createdById,
      },
    });

    if (!setting) {
      return null;
    }

    return SettingResponseSchema.parse(setting);
  }

  async save(requestData: SettingRequest): Promise<void> {
    const currentUser = await getCurrentUser();

    const settingByUser = await this.prismaClient.setting.findFirst({
      where: {
        createdById: currentUser.id,
      },
    });

    if (!settingByUser) {
      await this.prismaClient.setting.create({
        data: {
          type: requestData.type,
          timezone: requestData.timezone,
          workingHours: requestData.workingHours,
          message: requestData.message,
          createdById: currentUser.id,
        },
      });

      return;
    }

    await this.prismaClient.setting.update({
      where: {
        id: settingByUser.id,
      },
      data: {
        type: requestData.type,
        timezone: requestData.timezone,
        workingHours: requestData.workingHours,
        message: requestData.message,
      },
    });
  }
}
