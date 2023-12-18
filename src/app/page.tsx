import { $Enums } from '@prisma/client';

import { HOUR, SettingsData } from '@/constants';
import { SettingResponse } from '@/types/setting';
import AutoResponder from '@/app/components/AutoResponder';
import { SettingService } from '@/app/api/settings/services/setting.service';
import { Company, CopilotAPI } from '@/utils/copilotApiUtils';
import { ClientResponse, MeResponse } from '@/types/common';
import { z } from 'zod';

type SearchParams = { [key: string]: string | string[] | undefined };

const settingsService = new SettingService();

async function getContent(searchParams: SearchParams) {
  if (!searchParams.token) {
    throw new Error('Missing token');
  }

  const copilotAPI = new CopilotAPI(z.string().parse(searchParams.token));
  const result: { client?: ClientResponse; company?: Company; me?: MeResponse } = {};

  result.me = await copilotAPI.me();

  if (searchParams.clientId && typeof searchParams.clientId === 'string') {
    result.client = await copilotAPI.getClient(searchParams.clientId);
  }

  if (searchParams.companyId && typeof searchParams.companyId === 'string') {
    result.company = await copilotAPI.getCompany(searchParams.companyId);
  }

  return result;
}

const populateSettingsFormData = (settings: SettingResponse): Omit<SettingsData, 'sender'> => {
  return {
    autoRespond: settings.type || $Enums.SettingType.DISABLED,
    response: settings.message || null,
    timezone: settings.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedDays: (settings.workingHours || [])?.map((workingHour) => ({
      day: workingHour.weekday,
      startHour: workingHour.startTime as HOUR,
      endHour: workingHour.endTime as HOUR,
    })),
  };
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { me } = await getContent(searchParams);

  const setting = await settingsService.findByUserId(me?.id as string);
  const saveSettings = async (data: SettingsData) => {
    'use server';

    const setting = {
      type: data.autoRespond,
      message: data.response,
      timezone: data.timezone,
      workingHours: Array.isArray(data.selectedDays)
        ? data.selectedDays.map((selectedDay) => ({
            weekday: selectedDay.day,
            startTime: selectedDay.startHour,
            endTime: selectedDay.endHour,
          }))
        : data.selectedDays,
    };
    await settingsService.save(setting);
  };

  return (
    <main className="h-full">
      <AutoResponder
        onSave={saveSettings}
        activeSettings={{
          ...populateSettingsFormData(setting as SettingResponse),
          sender: `${me?.givenName} ${me?.familyName}`,
        }}
      />
    </main>
  );
}
