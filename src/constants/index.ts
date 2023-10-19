import { SelectOption } from "@/app/components/Select";
import { $Enums } from "@prisma/client";

export enum AUTO_RESPONSE {
  ALWAYS_ON = "alwaysOn",
  OUTSIDE_WORKING_HOURS = "outsideWorkingHours",
  OFF = "off",
}

export const AUTO_RESPONSE_OPTIONS: SelectOption<$Enums.SettingType>[] = [
  {
    value: $Enums.SettingType.OUTSIDE_WORKING_HOURS,
    label: "Outside working hours",
  },
  { value: $Enums.SettingType.ENABLED, label: "Always on" },
  { value: $Enums.SettingType.DISABLED, label: "Off" },
];

export const DAYS = {
  SUNDAY: 1,
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
};

export enum HOUR {
  "0AM" = "0:00 AM",
  "1AM" = "1:00 AM",
  "2AM" = "2:00 AM",
  "3AM" = "3:00 AM",
  "4AM" = "4:00 AM",
  "5AM" = "5:00 AM",
  "6AM" = "6:00 AM",
  "7AM" = "7:00 AM",
  "8AM" = "8:00 AM",
  "9AM" = "9:00 AM",
  "10AM" = "10:00 AM",
  "11AM" = "11:00 AM",
  "12PM" = "12:00 PM",
  "1PM" = "1:00 PM",
  "2PM" = "2:00 PM",
  "3PM" = "3:00 PM",
  "4PM" = "4:00 PM",
  "5PM" = "5:00 PM",
  "6PM" = "6:00 PM",
  "7PM" = "7:00 PM",
  "8PM" = "8:00 PM",
  "9PM" = "9:00 PM",
  "10PM" = "10:00 PM",
  "11PM" = "11:00 PM",
}

export const DEFAULT_START_HOUR = HOUR["9AM"];
export const DEFAULT_END_HOUR = HOUR["5PM"];

export const HOURS_SELECT_OPTIONS: SelectOption<HOUR>[] = Object.values(
  HOUR
).map((hour) => ({
  label: hour,
  value: hour,
}));

export type DAY_VALUE = (typeof DAYS)[keyof typeof DAYS];
export type DAY_KEY = keyof typeof DAYS;

export interface SelectedDay {
  day: DAY_VALUE;
  startHour: HOUR;
  endHour: HOUR;
}

export enum TIMEZONE {
  "PST-Pacific Standard Time (PST, UTC-8:00)" = "UTC-8:00",
  "PDT-Pacific Daylight Time (PDT, UTC-7:00)" = "UTC-7:00",
  "MST-Mountain Standard Time (MST, UTC-7:00)" = "UTC-7:00",
  "MDT-Mountain Daylight Time (MDT, UTC-6:00)" = "UTC-6:00",
  "CST-Central Standard Time (CST, UTC-6:00)" = "UTC-6:00",
  "CDT-Central Daylight Time (CDT, UTC-5:00)" = "UTC-5:00",
  "EST-Eastern Standard Time (EST, UTC-5:00)" = "UTC-5:00",
  "EDT-Eastern Daylight Time (EDT, UTC-4:00)" = "UTC-4:00",
  "AKST-Alaska Standard Time (AKST, UTC-9:00)" = "UTC-9:00",
  "AKDT-Alaska Daylight Time (AKDT, UTC-8:00)" = "UTC-8:00",
  "HAST-Hawaii-Aleutian Standard Time (HAST, UTC-10:00)" = "UTC-10:00",
  "HADT-Hawaii-Aleutian Daylight Time (HADT, UTC-9:00)" = "UTC-9:00",
  "AST-Atlantic Standard Time (AST, UTC-4:00)" = "UTC-4:00",
  "ADT-Atlantic Daylight Time (ADT, UTC-3:00)" = "UTC-3:00",
  "NST-Newfoundland Standard Time (NST, UTC-3:30)" = "UTC-3:30",
  "NDT-Newfoundland Daylight Time (NDT, UTC-2:30)" = "UTC-2:30",
  "GMT-Greenwich Mean Time (GMT, UTC+0:00)" = "UTC+0:00",
  "BST-British Summer Time (BST, UTC+1:00)" = "UTC+1:00",
  "CET-Central European Time (CET, UTC+1:00)" = "UTC+1:00",
  "CEST-Central European Summer Time (CEST, UTC+2:00)" = "UTC+2:00",
  "EET-Eastern European Time (EET, UTC+2:00)" = "UTC+2:00",
  "EEST-Eastern European Summer Time (EEST, UTC+3:00)" = "UTC+3:00",
  "IST-Indian Standard Time (IST, UTC+5:30)" = "UTC+5:30",
  "AEST-Australian Eastern Standard Time (AEST, UTC+10:00)" = "UTC+10:00",
  "AEDT-Australian Eastern Daylight Time (AEDT, UTC+11:00)" = "UTC+11:00",
  "NZST-New Zealand Standard Time (NZST, UTC+12:00)" = "UTC+12:00",
  "NZDT-New Zealand Daylight Time (NZDT, UTC+13:00)" = "UTC+13:00",
  "JST-Japan Standard Time (JST, UTC+9:00)" = "UTC+9:00",
  "CST-China Standard Time (CST, UTC+8:00)" = "UTC+8:00",
  "SGT-Singapore Standard Time (SGT, UTC+8:00)" = "UTC+8:00",
}

export const TIMEZONE_LABELS = {
  [TIMEZONE["PST-Pacific Standard Time (PST, UTC-8:00)"]]:
    "PST-Pacific Standard Time (PST, UTC-8:00)",
  [TIMEZONE["PDT-Pacific Daylight Time (PDT, UTC-7:00)"]]:
    "PDT-Pacific Daylight Time (PDT, UTC-7:00)",
  [TIMEZONE["MST-Mountain Standard Time (MST, UTC-7:00)"]]:
    "MST-Mountain Standard Time (MST, UTC-7:00)",
  [TIMEZONE["MDT-Mountain Daylight Time (MDT, UTC-6:00)"]]:
    "MDT-Mountain Daylight Time (MDT, UTC-6:00)",
  [TIMEZONE["CST-Central Standard Time (CST, UTC-6:00)"]]:
    "CST-Central Standard Time (CST, UTC-6:00)",
  [TIMEZONE["CDT-Central Daylight Time (CDT, UTC-5:00)"]]:
    "CDT-Central Daylight Time (CDT, UTC-5:00)",
  [TIMEZONE["EST-Eastern Standard Time (EST, UTC-5:00)"]]:
    "EST-Eastern Standard Time (EST, UTC-5:00)",
  [TIMEZONE["EDT-Eastern Daylight Time (EDT, UTC-4:00)"]]:
    "EDT-Eastern Daylight Time (EDT, UTC-4:00)",
  [TIMEZONE["AKST-Alaska Standard Time (AKST, UTC-9:00)"]]:
    "AKST-Alaska Standard Time (AKST, UTC-9:00)",
  [TIMEZONE["AKDT-Alaska Daylight Time (AKDT, UTC-8:00)"]]:
    "AKDT-Alaska Daylight Time (AKDT, UTC-8:00)",
  [TIMEZONE["HAST-Hawaii-Aleutian Standard Time (HAST, UTC-10:00)"]]:
    "HAST-Hawaii-Aleutian Standard Time (HAST, UTC-10:00)",
  [TIMEZONE["HADT-Hawaii-Aleutian Daylight Time (HADT, UTC-9:00)"]]:
    "HADT-Hawaii-Aleutian Daylight Time (HADT, UTC-9:00)",
  [TIMEZONE["AST-Atlantic Standard Time (AST, UTC-4:00)"]]:
    "AST-Atlantic Standard Time (AST, UTC-4:00)",
  [TIMEZONE["ADT-Atlantic Daylight Time (ADT, UTC-3:00)"]]:
    "ADT-Atlantic Daylight Time (ADT, UTC-3:00)",
  [TIMEZONE["NST-Newfoundland Standard Time (NST, UTC-3:30)"]]:
    "NST-Newfoundland Standard Time (NST, UTC-3:30)",
  [TIMEZONE["NDT-Newfoundland Daylight Time (NDT, UTC-2:30)"]]:
    "NDT-Newfoundland Daylight Time (NDT, UTC-2:30)",
  [TIMEZONE["GMT-Greenwich Mean Time (GMT, UTC+0:00)"]]:
    "GMT-Greenwich Mean Time (GMT, UTC+0:00)",
  [TIMEZONE["BST-British Summer Time (BST, UTC+1:00)"]]:
    "BST-British Summer Time (BST, UTC+1:00)",
  [TIMEZONE["CET-Central European Time (CET, UTC+1:00)"]]:
    "CET-Central European Time (CET, UTC+1:00)",
  [TIMEZONE["CEST-Central European Summer Time (CEST, UTC+2:00)"]]:
    "CEST-Central European Summer Time (CEST, UTC+2:00)",
  [TIMEZONE["EET-Eastern European Time (EET, UTC+2:00)"]]:
    "EET-Eastern European Time (EET, UTC+2:00)",
  [TIMEZONE["EEST-Eastern European Summer Time (EEST, UTC+3:00)"]]:
    "EEST-Eastern European Summer Time (EEST, UTC+3:00)",
  [TIMEZONE["IST-Indian Standard Time (IST, UTC+5:30)"]]:
    "IST-Indian Standard Time (IST, UTC+5:30)",
  [TIMEZONE["AEST-Australian Eastern Standard Time (AEST, UTC+10:00)"]]:
    "AEST-Australian Eastern Standard Time (AEST, UTC+10:00)",
  [TIMEZONE["AEDT-Australian Eastern Daylight Time (AEDT, UTC+11:00)"]]:
    "AEDT-Australian Eastern Daylight Time (AEDT, UTC+11:00)",
  [TIMEZONE["NZST-New Zealand Standard Time (NZST, UTC+12:00)"]]:
    "NZST-New Zealand Standard Time (NZST, UTC+12:00)",
  [TIMEZONE["NZDT-New Zealand Daylight Time (NZDT, UTC+13:00)"]]:
    "NZDT-New Zealand Daylight Time (NZDT, UTC+13:00)",
  [TIMEZONE["JST-Japan Standard Time (JST, UTC+9:00)"]]:
    "JST-Japan Standard Time (JST, UTC+9:00)",
  [TIMEZONE["CST-China Standard Time (CST, UTC+8:00)"]]:
    "CST-China Standard Time (CST, UTC+8:00)",
  [TIMEZONE["SGT-Singapore Standard Time (SGT, UTC+8:00)"]]:
    "SGT-Singapore Standard Time (SGT, UTC+8:00)",
} as const;

const TIMEZONE_LABEL = Object.values(TIMEZONE_LABELS);

type TimezoneOption = {
  label: (typeof TIMEZONE_LABEL)[number];
  value: TIMEZONE;
};

export const TIMEZONE_OPTIONS = Object.entries(TIMEZONE_LABELS).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        label: TIMEZONE_LABELS[key as TIMEZONE],
        value: key,
      },
    };
  },
  {}
) as Record<TIMEZONE, TimezoneOption>;

export interface SettingsData {
  autoRespond: $Enums.SettingType;
  timezone: TIMEZONE | string;
  selectedDays: SelectedDay[];
  response: string;
  sender: string;
}
