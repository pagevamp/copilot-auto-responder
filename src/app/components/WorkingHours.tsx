import { Controller } from "react-hook-form";

import Typography from "./Typography";
import SelectField from "./Select";
import {
  DAYS,
  DAY_KEY,
  HOUR,
  HOURS_SELECT_OPTIONS,
  SelectedDay,
} from "@/constants";

interface Props {
  selectedDays: SelectedDay[];
}

const WorkingHours = ({ selectedDays }: Props) => {
  return (
    <ul className="flex flex-col gap-6">
      {Object.keys(DAYS).map((day: DAY_KEY | string) => {
        const selectedDayIndex = selectedDays.findIndex((selectedDay) => {
          return selectedDay.day === DAYS[day as DAY_KEY];
        });

        if (selectedDayIndex < 0) {
          return null;
        }

        return (
          <li key={day} className="flex items-center">
            <Typography
              text={day.toLocaleLowerCase()}
              className="capitalize flex-1"
            />
            <div className="w-1/4 min-w-[100px] max-w-[200px]">
              <Controller
                name={`selectedDays[${selectedDayIndex}].startHour`}
                render={({ field: { onChange, value } }) => (
                  <SelectField<HOUR>
                    value={value}
                    options={HOURS_SELECT_OPTIONS}
                    className="rounded-tr-none rounded-br-none border-r-0"
                    onValueChange={(value: string) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </div>
            <div className="w-1/4 min-w-[100px] max-w-[200px]">
              <Controller
                name={`selectedDays[${selectedDayIndex}].endHour`}
                render={({ field: { onChange, value } }) => {
                  return (
                    <SelectField<HOUR>
                      value={value}
                      options={HOURS_SELECT_OPTIONS}
                      className="rounded-tl-none rounded-bl-none"
                      onValueChange={(value: string) => {
                        onChange(value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <span></span>
          </li>
        );
      })}
    </ul>
  );
};

export default WorkingHours;
