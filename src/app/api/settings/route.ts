import { SettingType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { SettingRequestSchema } from '@/types/setting';
import { errorHandler, getCurrentUser } from '@/utils/common';
import { SettingService } from '@/app/api/settings/services/setting.service';

export async function GET(request: NextRequest) {
  const settingService = new SettingService();
  const currentUser = await getCurrentUser();
  const setting = await settingService.findBySenderId(currentUser.id);

  return NextResponse.json(setting ? { data: setting } : { data: null });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const setting = SettingRequestSchema.safeParse(data);

  if (!setting.success) {
    return NextResponse.json(setting.error.issues);
  }

  if (setting.data.type === SettingType.WITHIN_WORKING_HOURS) {
    if (!setting.data.workingHours) {
      return errorHandler('Working hours must be provided', 422);
    }

    if (!setting.data.message) {
      return errorHandler('Message must be provided', 422);
    }
  }

  const settingService = new SettingService();
  await settingService.save(setting.data);

  return NextResponse.json({});
}
