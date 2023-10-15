import { PrismaClient, SettingType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { SettingRequestSchema, SettingResponseSchema } from '@/types/setting';
import { errorHandler, ErrorResponse, getCurrentUser } from '@/utils/common';

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const currentUser = await getCurrentUser();

    const setting = await prisma.setting.findFirst({
      where: {
        senderId: currentUser.id,
      },
    });

    return NextResponse.json(setting ? { data: SettingResponseSchema.parse(setting) } : { data: null });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(JSON.stringify(e));

    return errorHandler(error.message, 500);
  }
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

  const requestData = setting.data;
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  await prisma.setting.upsert({
    where: {
      senderId: currentUser.id,
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
      senderId: currentUser.id
    }
  });

  return NextResponse.json({});
}
