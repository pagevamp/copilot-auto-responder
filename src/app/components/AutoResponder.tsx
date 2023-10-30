"use client";
import { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import Days from "./Days";
import Fieldset from "./Fieldset";
import SelectField from "./Select";
import Typography from "./Typography";
import { $Enums } from "@prisma/client";
import WorkingHours from "./WorkingHours";
import {
  AUTO_RESPONSE_OPTIONS,
  DAYS,
  DAY_VALUE,
  DEFAULT_END_HOUR,
  DEFAULT_START_HOUR,
  SelectedDay,
  SettingsData,
} from "@/constants";

const defaultSelectedDays: SelectedDay[] = [
  {
    day: DAYS.MONDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAYS.TUESDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAYS.WEDNESDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAYS.THURSDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAYS.FRIDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
];

const defaultSettingsData: SettingsData = {
  autoRespond: $Enums.SettingType.DISABLED,
  timezone: "",
  selectedDays: [],
  response:
    "Thanks for getting in touch. We’re currently out of the office and won’t be able to immediately respond. We’ll get back to you as as soon as we can.",
  sender: "",
};

interface Props {
  onSave(data: SettingsData): Promise<void>;
  currentSetting: SettingsData;
}

const AutoResponder = ({ onSave, currentSetting }: Props) => {
  const [saving, setSaving] = useState(false);
  const methods = useForm<SettingsData>({
    defaultValues: currentSetting,
  });
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty },
    getValues,
  } = methods;

  const selectedDays = useFieldArray({
    control: control,
    name: "selectedDays",
  });
  const autoRespond = watch("autoRespond");

  useEffect(() => {
    if (isDirty) {
      if (autoRespond === $Enums.SettingType.DISABLED) {
        setValue("selectedDays", []);
        setValue("timezone", "");
        setValue("response", "");
      }
      if (autoRespond === $Enums.SettingType.ENABLED) {
        setValue(
          "timezone",
          getValues().timezone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        setValue("selectedDays", []);
      }
      if (autoRespond === $Enums.SettingType.OUTSIDE_WORKING_HOURS) {
        setValue(
          "timezone",
          getValues().timezone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        setValue("selectedDays", defaultSelectedDays);
      }
    }
  }, [autoRespond, setValue]);

  const toggleSelectedDay = (day: DAY_VALUE) => {
    const selectedDayIndex = selectedDays.fields.findIndex(
      (selectedDay) => selectedDay.day === day
    );

    if (selectedDayIndex >= 0) {
      selectedDays.remove(selectedDayIndex);
      return;
    }

    selectedDays.append({
      day,
      startHour: DEFAULT_START_HOUR,
      endHour: DEFAULT_END_HOUR,
    });
  };

  const getAutoResponseMessage = () => {
    if (autoRespond === $Enums.SettingType.DISABLED) {
      return "Set up automatic responses to incoming messages in the Messages App";
    }

    if (autoRespond === $Enums.SettingType.ENABLED) {
      return "Set up automatic responses to incoming messages in the Messages App";
    }

    if (autoRespond === $Enums.SettingType.OUTSIDE_WORKING_HOURS) {
      return "When your clients message you outside of working hours, automatically reply to them.";
    }

    return "";
  };

  const onSubmit: SubmitHandler<SettingsData> = async (data) => {
    setSaving(true);
    await onSave(data);
    setSaving(false);
    reset({}, { keepValues: true });
  };

  const onReset = () => {
    reset(currentSetting);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <div className="w-full flex-1 overflow-y-scroll px-6 py-16">
          <div className="w-full max-w-[880px] mx-auto">
            <Fieldset
              title="Auto responder configuration"
              info="Set up automatic responses to incoming messages in the Messages App"
            >
              <Typography text="Enable auto response" className="mb-2" />
              <Controller
                name="autoRespond"
                render={({ field: { onChange, value } }) => (
                  <SelectField<$Enums.SettingType>
                    value={value}
                    options={AUTO_RESPONSE_OPTIONS}
                    onValueChange={(value: string) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </Fieldset>
            {autoRespond === $Enums.SettingType.OUTSIDE_WORKING_HOURS && (
              <Fieldset
                title="Working hours"
                info="Your automated response will send outside of these hours"
              >
                <div>
                  <Typography text="Timezone" className="mb-2" />
                  <Controller
                    name="timezone"
                    render={({ field: { onChange, value } }) => (
                      <TimezoneSelect
                        value={value}
                        onChange={(selectedTimeZone) => {
                          onChange(selectedTimeZone.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex items-center justify-between py-6 my-6 border-y border-gray-300">
                  <Typography text="Select days" />
                  <Days
                    selectedDays={selectedDays.fields}
                    onDayClick={toggleSelectedDay}
                  />
                </div>
                <WorkingHours selectedDays={selectedDays.fields} />
              </Fieldset>
            )}
            {autoRespond !== $Enums.SettingType.DISABLED && (
              <Fieldset
                title="Response message"
                info="Customize the automated response message"
              >
                <Typography text="Response" className="mb-2" />
                <textarea
                  placeholder="Your automated response"
                  className="block w-full p-3 text-[14px] font-normal rounded-md bg-transparent border border-gray-300 mb-8 resize-none"
                  {...register("response")}
                />
                <Typography text="Sent by" className="mb-2 mt-6" />
                <input
                  disabled
                  placeholder="Your name"
                  className="block w-full p-3 text-[14px] font-normal rounded-md bg-transparent border border-gray-300 mb-8 disabled:text-gray-500"
                  {...register("sender")}
                />
              </Fieldset>
            )}
          </div>
        </div>
        {isDirty && (
          <div className="flex items-center justify-end gap-3 py-[14px] px-[20px] border-t border-gray-300">
            <button
              className="h-8 py-1 px-3 rounded-md min-w-[70px] bg-white border border-gray-300 text-sm disabled:cursor-not-allowed disabled:opacity-70"
              onClick={onReset}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 py-1 px-3 bg-slate-800 rounded-md min-w-[70px] text-white hover:bg-slate-900 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default AutoResponder;
