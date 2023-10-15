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
  timezone: TIMEZONE.CST,
  selectedDays: defaultSelectedDays,
  response: "",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <h3 className="text-2xl">Auto responder</h3>
          <p className="text-gray-500">{getAutoResponseMessage()}</p>
          <br />
          <section className="p-4 border border-gray-300 rounded-md">
            <div className="mb-2">Enable auto response</div>
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
          </section>
        </fieldset>
        <br />
        <br />
        {autoRespond === AUTO_RESPONSE.OUTSIDE_WORKING_HOURS && (
          <fieldset>
            <h3 className="text-2xl">Set your working hours</h3>
            <p className="text-gray-500">
              Your automated response will send outside of these hours.
            </p>
            <br />
            <section className="px-4 border border-gray-300 rounded-md">
              <div className="py-4">
                <div className="mb-2">Timezone</div>
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
              <div className="flex items-center justify-between py-8 mt-4 mb-8 border-y border-gray-300">
                <div className="mb-2">Select days</div>
                <Days
                  selectedDays={selectedDays.fields}
                  onDayClick={toggleSelectedDay}
                />
              </div>
              <WorkingHours selectedDays={selectedDays.fields} />
            </section>
          </fieldset>
        )}
        <br />
        <br />
        {autoRespond !== AUTO_RESPONSE.OFF && (
          <fieldset>
            <h3 className="text-2xl">Set your automated response</h3>
            <p className="text-gray-500">
              The app will send your automated response outside of these hours
            </p>
            <br />
            <section className="p-4 border border-gray-300 rounded-md">
              <div className="mb-2">Response</div>
              <textarea
                id="response"
                placeholder="Your automated response"
                className="block w-full p-2 rounded-md bg-transparent border border-gray-300 mb-8"
                {...register("response")}
              />
              <p>Sent by </p>
            </section>
          </fieldset>
        )}
        <button
          type="submit"
          className="p-4 bg-slate-800 rounded-md mt-8 min-w-[120px] text-white hover:bg-slate-900"
        >
          Save
        </button>
      </form>
    </FormProvider>
  );
};

export default AutoResponder;
