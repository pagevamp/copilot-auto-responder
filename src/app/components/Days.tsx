import Typography from "./Typography";
import { DAYS, SelectedDay, DAY_KEY, DAY_VALUE } from "@/constants";

interface Props {
  selectedDays: SelectedDay[];
  onDayClick(day: DAY_VALUE): void;
}

const Days = ({ selectedDays, onDayClick }: Props) => {
  return (
    <ul className="flex justify-between items-center gap-2">
      {Object.keys(DAYS).map((day: DAY_KEY | string) => {
        const isSelected = !!selectedDays.find(
          (selectedDay) => DAYS[day as DAY_KEY] === selectedDay.day
        );
        return (
          <li
            key={day}
            onClick={() => onDayClick(DAYS[day as DAY_KEY])}
            className={`w-8 h-8 flex items-center justify-center rounded-full 
        uppercase text-center leading-8 ${
          isSelected ? "bg-slate-800" : "bg-slate-300"
        } ${isSelected ? "text-white" : ""} cursor-pointer hover:bg-slate-400
      `}
          >
            <Typography text={day.charAt(0)} />
          </li>
        );
      })}
    </ul>
  );
};

export default Days;
