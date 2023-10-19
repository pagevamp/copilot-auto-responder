import AutoResponder from "./components/AutoResponder";
import {
  Client,
  Company,
  CopilotAPI,
  MeResponse,
} from "@/utils/copilotApiUtils";
import { SettingsData } from "@/constants";
import { SettingService } from "./api/settings/services/setting.service";

type SearchParams = { [key: string]: string | string[] | undefined };

const settingsService = new SettingService();

async function getContent(searchParams: SearchParams) {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error("Missing COPILOT_API_KEY");
  }

  const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY);
  const result: { client?: Client; company?: Company; me?: MeResponse } = {};

  result.me = await copilotAPI.me();

  if (searchParams.clientId && typeof searchParams.clientId === "string") {
    result.client = await copilotAPI.getClient(searchParams.clientId);
  }

  if (searchParams.companyId && typeof searchParams.companyId === "string") {
    result.company = await copilotAPI.getCompany(searchParams.companyId);
  }

  return result;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { me } = await getContent(searchParams);

  const saveSettings = async (data: SettingsData) => {
    "use server";

    const setting = {
      type: data.autoRespond,
      message: data.response,
      timezone: data.timezone,
      workingHours: data.selectedDays.map((selectedDay) => ({
        weekday: selectedDay.day,
        startTime: selectedDay.startHour,
        endTime: selectedDay.endHour,
      })),
    };
    await settingsService.save(setting);
  };
  return (
    <main className="h-full">
      <AutoResponder
        sender={`${me?.givenName} ${me?.familyName}`}
        onSave={saveSettings}
      />
    </main>
  );
}
