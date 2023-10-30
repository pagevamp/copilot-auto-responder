import { PrismaClient } from "@prisma/client";
import {
  SettingRequest,
  SettingResponse,
  SettingResponseSchema,
} from "@/types/setting";
import { getCurrentUser } from "@/utils/common";
import DBClient from '@/lib/db';

export class SettingService {
  private prismaClient: PrismaClient = DBClient.getInstance();

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
          // @ts-ignore
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
        // @ts-ignore
        workingHours: requestData.workingHours,
        message: requestData.message,
      },
    });
  }
}
