"use client";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import Days from "./Days";
import SelectField from "./Select";
import WorkingHours from "./WorkingHours";
import {
  AUTO_RESPONSE,
  AUTO_RESPONSE_OPTIONS,
  DAY,
  DEFAULT_END_HOUR,
  DEFAULT_START_HOUR,
  HOUR,
  SelectedDay,
  SettingsData,
  TIMEZONE,
  TIMEZONE_OPTIONS,
} from "@/constants";
import { useEffect } from "react";
import Typography from "./Typography";
import Fieldset from "./Fieldset";

const defaultSelectedDays: SelectedDay[] = [
  {
    day: DAY.MONDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAY.TUESDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAY.WEDNESDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAY.THURSDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
  {
    day: DAY.FRIDAY,
    startHour: DEFAULT_START_HOUR,
    endHour: DEFAULT_END_HOUR,
  },
];

const defaultSettingsData: SettingsData = {
  autoRespond: AUTO_RESPONSE.OUTSIDE_WORKING_HOURS,
  timezone: null,
  selectedDays: [],
  response:
    "Thanks for getting in touch. We’re currently out of the office and won’t be able to immediately respond. We’ll get back to you as as soon as we can. ",
  sender: "",
};

const AutoResponder = () => {
  const methods = useForm<SettingsData>({
    defaultValues: defaultSettingsData,
  });
  const { control, register, handleSubmit, watch, setValue } = methods;
  const onSubmit: SubmitHandler<SettingsData> = (data) => console.log(data);
  const selectedDays = useFieldArray({
    control: control,
    name: "selectedDays",
  });
  const autoRespond = watch("autoRespond");

  useEffect(() => {
    if (autoRespond === AUTO_RESPONSE.OFF) {
      setValue("selectedDays", []);
      setValue("timezone", TIMEZONE.CST);
      setValue("response", "");
    }
    if (autoRespond === AUTO_RESPONSE.ALWAYS_ON) {
      setValue("timezone", TIMEZONE.CST);
      setValue("selectedDays", []);
    }
    if (autoRespond === AUTO_RESPONSE.OUTSIDE_WORKING_HOURS) {
      setValue("selectedDays", defaultSelectedDays);
    }
  }, [autoRespond, setValue]);

  const toggleSelectedDay = (day: DAY) => {
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
    if (autoRespond === AUTO_RESPONSE.OFF) {
      return "Never reply any message automatically.";
    }

    if (autoRespond === AUTO_RESPONSE.ALWAYS_ON) {
      return "Always reply all message automatically.";
    }

    if (autoRespond === AUTO_RESPONSE.OUTSIDE_WORKING_HOURS) {
      return " When your clients message you outside of working hours, automatically reply to them.";
    }

    return "";
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <div className="w-full flex-1 overflow-y-scroll px-6 py-16">
          <div className="w-full max-w-[880px] mx-auto">
            <Fieldset
              title="Auto responder configuration"
              info={getAutoResponseMessage()}
            >
              <Typography text="Enable auto response" className="mb-2" />
              <Controller
                name="autoRespond"
                render={({ field: { onChange, value } }) => (
                  <SelectField<AUTO_RESPONSE>
                    value={value}
                    options={AUTO_RESPONSE_OPTIONS}
                    onValueChange={(value: string) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </Fieldset>
            {autoRespond === AUTO_RESPONSE.OUTSIDE_WORKING_HOURS && (
              <Fieldset
                title="Working hours"
                info="Your automated response will send outside of these hours"
              >
                <div>
                  <Typography text="Timezone" className="mb-2" />
                  <Controller
                    name="timezone"
                    render={({ field: { onChange, value } }) => (
                      <SelectField<TIMEZONE>
                        value={value}
                        options={Object.values(TIMEZONE_OPTIONS)}
                        onValueChange={(value: string) => {
                          onChange(value);
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
            {autoRespond !== AUTO_RESPONSE.OFF && (
              <Fieldset
                title="Response message"
                info="Customize the automated response message"
              >
                <Typography text="Response" className="mb-2" />
                <textarea
                  id="response"
                  placeholder="Your automated response"
                  className="block w-full p-3 text-[14px] font-normal rounded-md bg-transparent border border-gray-300 mb-8"
                  {...register("response")}
                />
                <Typography text="Sent by" className="mb-2 mt-6" />
                <input
                  id="sender"
                  placeholder="Your name"
                  className="block w-full p-3 text-[14px] font-normal rounded-md bg-transparent border border-gray-300 mb-8"
                  disabled
                  {...register("sender")}
                />
              </Fieldset>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 py-[14px] px-[20px] border-t border-gray-300">
          <button
            type="reset"
            className="h-8 py-1 px-3 rounded-md min-w-[70px] bg-white border border-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-8 py-1 px-3 bg-slate-800 rounded-md min-w-[70px] text-white hover:bg-slate-900  text-sm"
          >
            Save changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AutoResponder;
