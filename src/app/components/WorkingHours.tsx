import { DAY, HOURS_SELECT_OPTIONS, SelectedDay } from "@/constants";
import SelectField from "./Select";
import { Controller } from "react-hook-form";
import Days from "./Days";

interface Props {
  selectedDays: SelectedDay[];
}

const WorkingHours = ({ selectedDays }: Props) => {
  return (
    <ul>
      {Object.values(DAY).map((day) => {
        const selectedDayIndex = selectedDays.findIndex(
          (selectedDay) => selectedDay.day === day
        );

        if (selectedDayIndex < 0) {
          return null;
        }

        return (
          <li key={day} className="flex items-center mb-4">
            <span className="capitalize flex-1">{day}</span>
            <Controller
              name={`selectedDays[${selectedDayIndex}].startHour`}
              render={({ field: { onChange, value } }) => (
                <SelectField
                  value={value}
                  options={HOURS_SELECT_OPTIONS}
                  onValueChange={(value: string) => {
                    onChange(value);
                  }}
                />
              )}
            />
            <Controller
              name={`selectedDays[${selectedDayIndex}].startHour`}
              render={({ field: { onChange, value } }) => (
                <SelectField
                  value={value}
                  options={HOURS_SELECT_OPTIONS}
                  onValueChange={(value: string) => {
                    onChange(value);
                  }}
                />
              )}
            />
            <span></span>
          </li>
        );
      })}
    </ul>
  );
};

export default WorkingHours;
