import { HOURS_SELECT_OPTIONS, SelectedDay } from "@/constants";
import SelectField from "./Select";
import { Controller } from "react-hook-form";

interface Props {
  selectedDays: SelectedDay[];
}

const WorkingHours = ({ selectedDays }: Props) => {
  return (
    <ul>
      {selectedDays.map(({ day }, i) => (
        <li key={day} className="flex items-center mb-4">
          <span className="capitalize flex-1">{day}</span>
          <Controller
            name={`selectedDays[${i}].startHour`}
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
            name={`selectedDays[${i}].startHour`}
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
      ))}
    </ul>
  );
};

export default WorkingHours;
