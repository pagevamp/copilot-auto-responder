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
  PST = "PST-Pacific Standard Time (PST, UTC-8:00)",
  PDT = "PDT-Pacific Daylight Time (PDT, UTC-7:00)",
  MST = "MST-Mountain Standard Time (MST, UTC-7:00)",
  MDT = "MDT-Mountain Daylight Time (MDT, UTC-6:00)",
  CST = "CST-Central Standard Time (CST, UTC-6:00)",
  CDT = "CDT-Central Daylight Time (CDT, UTC-5:00)",
  EST = "EST-Eastern Standard Time (EST, UTC-5:00)",
  EDT = "EDT-Eastern Daylight Time (EDT, UTC-4:00)",
  AKST = "AKST-Alaska Standard Time (AKST, UTC-9:00)",
  AKDT = "AKDT-Alaska Daylight Time (AKDT, UTC-8:00)",
  HAST = "HAST-Hawaii-Aleutian Standard Time (HAST, UTC-10:00)",
  HADT = "HADT-Hawaii-Aleutian Daylight Time (HADT, UTC-9:00)",
  AST = "AST-Atlantic Standard Time (AST, UTC-4:00)",
  ADT = "ADT-Atlantic Daylight Time (ADT, UTC-3:00)",
  NST = "NST-Newfoundland Standard Time (NST, UTC-3:30)",
  NDT = "NDT-Newfoundland Daylight Time (NDT, UTC-2:30)",
  GMT = "GMT-Greenwich Mean Time (GMT, UTC+0:00)",
  BST = "BST-British Summer Time (BST, UTC+1:00)",
  CET = "CET-Central European Time (CET, UTC+1:00)",
  CEST = "CEST-Central European Summer Time (CEST, UTC+2:00)",
  EET = "EET-Eastern European Time (EET, UTC+2:00)",
  EEST = "EEST-Eastern European Summer Time (EEST, UTC+3:00)",
  IST = "IST-Indian Standard Time (IST, UTC+5:30)",
  AEST = "AEST-Australian Eastern Standard Time (AEST, UTC+10:00)",
  AEDT = "AEDT-Australian Eastern Daylight Time (AEDT, UTC+11:00)",
  NZST = "NZST-New Zealand Standard Time (NZST, UTC+12:00)",
  NZDT = "NZDT-New Zealand Daylight Time (NZDT, UTC+13:00)",
  JST = "JST-Japan Standard Time (JST, UTC+9:00)",
  CHST = "CST-China Standard Time (CST, UTC+8:00)",
  SGT = "SGT-Singapore Standard Time (SGT, UTC+8:00)",
}

export const TIMEZONE_LABELS = {
  [TIMEZONE.PST]: "PST-Pacific Standard Time (PST, UTC-8:00)",
  [TIMEZONE.PDT]: "PDT-Pacific Daylight Time (PDT, UTC-7:00)",
  [TIMEZONE.MST]: "MST-Mountain Standard Time (MST, UTC-7:00)",
  [TIMEZONE.MDT]: "MDT-Mountain Daylight Time (MDT, UTC-6:00)",
  [TIMEZONE.CST]: "CST-Central Standard Time (CST, UTC-6:00)",
  [TIMEZONE.CDT]: "CDT-Central Daylight Time (CDT, UTC-5:00)",
  [TIMEZONE.EST]: "EST-Eastern Standard Time (EST, UTC-5:00)",
  [TIMEZONE.EDT]: "EDT-Eastern Daylight Time (EDT, UTC-4:00)",
  [TIMEZONE.AKST]: "AKST-Alaska Standard Time (AKST, UTC-9:00)",
  [TIMEZONE.AKDT]: "AKDT-Alaska Daylight Time (AKDT, UTC-8:00)",
  [TIMEZONE.HAST]: "HAST-Hawaii-Aleutian Standard Time (HAST, UTC-10:00)",
  [TIMEZONE.HADT]: "HADT-Hawaii-Aleutian Daylight Time (HADT, UTC-9:00)",
  [TIMEZONE.AST]: "AST-Atlantic Standard Time (AST, UTC-4:00)",
  [TIMEZONE.ADT]: "ADT-Atlantic Daylight Time (ADT, UTC-3:00)",
  [TIMEZONE.NST]: "NST-Newfoundland Standard Time (NST, UTC-3:30)",
  [TIMEZONE.NDT]: "NDT-Newfoundland Daylight Time (NDT, UTC-2:30)",
  [TIMEZONE.PDT]: "PDT-Pacific Daylight Time (PDT, UTC-7:00)",
  [TIMEZONE.GMT]: "GMT-Greenwich Mean Time (GMT, UTC+0:00)",
  [TIMEZONE.BST]: "BST-British Summer Time (BST, UTC+1:00)",
  [TIMEZONE.CET]: "CET-Central European Time (CET, UTC+1:00)",
  [TIMEZONE.CEST]: "CEST-Central European Summer Time (CEST, UTC+2:00)",
  [TIMEZONE.EET]: "EET-Eastern European Time (EET, UTC+2:00)",
  [TIMEZONE.EEST]: "EEST-Eastern European Summer Time (EEST, UTC+3:00)",
  [TIMEZONE.IST]: "IST-Indian Standard Time (IST, UTC+5:30)",
  [TIMEZONE.AEST]: "AEST-Australian Eastern Standard Time (AEST, UTC+10:00)",
  [TIMEZONE.AEDT]: "AEDT-Australian Eastern Daylight Time (AEDT, UTC+11:00)",
  [TIMEZONE.NZST]: "NZST-New Zealand Standard Time (NZST, UTC+12:00)",
  [TIMEZONE.NZDT]: "NZDT-New Zealand Daylight Time (NZDT, UTC+13:00)",
  [TIMEZONE.JST]: "JST-Japan Standard Time (JST, UTC+9:00)",
  [TIMEZONE.CHST]: "CST-China Standard Time (CST, UTC+8:00)",
  [TIMEZONE.SGT]: "SGT-Singapore Standard Time (SGT, UTC+8:00)",
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
  timezone: TIMEZONE | "";
  selectedDays: SelectedDay[];
  response: string;
  sender: string;
}
