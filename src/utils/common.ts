import { NextResponse } from 'next/server';
import { CopilotAPI, MeResponse } from '@/utils/copilotApiUtils';
import { WorkingHours } from '@/types/setting';
import { DayOfWeek, LocalTime, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';

export function errorHandler(message: string, status: number = 200) {
  return NextResponse.json(
    { message },
    {
      status,
    },
  );
}

export async function getCurrentUser(): Promise<MeResponse> {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error('Copilot API key is not set.');
  }

  const copilotClient = new CopilotAPI(process.env.COPILOT_API_KEY);
  return await copilotClient.me();
}

export function isWithinWorkingHours(timezone: string, workingHours: WorkingHours) {
  const currentDateTime = ZonedDateTime.now(ZoneId.of(timezone));
  const currentDay = currentDateTime.dayOfWeek();
  const workingDay = workingHours.find((workingHour) => DayOfWeek.of(workingHour.weekday).equals(currentDay));

  if (!workingDay) {
    return false;
  }

  const currentTime = currentDateTime.toLocalTime();

  return (
    currentTime.isAfter(LocalTime.parse(workingDay.startTime)) && currentTime.isBefore(LocalTime.parse(workingDay.endTime))
  );
}
