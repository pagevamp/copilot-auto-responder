import { SelectOption } from "@/app/components/Select";

export enum AUTO_RESPONSE {
  ALWAYS_ON = "alwaysOn",
  OUTSIDE_WORKING_HOURS = "outsideWorkingHours",
  OFF = "off",
}

export const AUTO_RESPONSE_OPTIONS: SelectOption<AUTO_RESPONSE>[] = [
  {
    value: AUTO_RESPONSE.OUTSIDE_WORKING_HOURS,
    label: "Outside working hours",
  },
  { value: AUTO_RESPONSE.ALWAYS_ON, label: "Always on" },
  { value: AUTO_RESPONSE.OFF, label: "Off" },
];

export enum DAY {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}

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

export interface SelectedDay {
  day: DAY;
  startHour: HOUR;
  endHour: HOUR;
}

export enum TIMEZONE {
  MT = "mt",
  PT = "pt",
  CST = "cst",
}

export const TIMEZONE_LABELS = {
  [TIMEZONE.MT]: "Mountain Time Zone",
  [TIMEZONE.PT]: "Pacific Time",
  [TIMEZONE.CST]: "Central Standard Time",
} as const;

const TIMEZONE_LABEL = Object.values(TIMEZONE_LABELS);

type TimezoneOption = {
  label: (typeof TIMEZONE_LABEL)[number];
  value: TIMEZONE;
};

export const TIMEZONE_OPTIONS: Record<TIMEZONE, TimezoneOption> = {
  [TIMEZONE.MT]: {
    label: TIMEZONE_LABELS[TIMEZONE.MT],
    value: TIMEZONE.MT,
  },
  [TIMEZONE.PT]: {
    label: TIMEZONE_LABELS[TIMEZONE.PT],
    value: TIMEZONE.PT,
  },
  [TIMEZONE.CST]: {
    label: TIMEZONE_LABELS[TIMEZONE.CST],
    value: TIMEZONE.CST,
  },
};

export interface SettingsData {
  autoRespond: AUTO_RESPONSE;
  timezone: TIMEZONE;
  selectedDays: SelectedDay[];
  response: string;
}
