import { DAY, SelectedDay } from "@/constants";

interface Props {
  selectedDays: SelectedDay[];
  onDayClick(day: DAY): void;
}

const Days = ({ selectedDays, onDayClick }: Props) => {
  return (
    <ul className="flex justify-between items-center gap-2">
      {Object.values(DAY).map((day) => {
        const isSelected = !!selectedDays.find(
          (selectedDay) => day === selectedDay.day
        );
        return (
          <li
            key={day}
            onClick={() => onDayClick(day)}
            className={`w-8 h-8 rounded-full 
        uppercase text-center leading-8 ${
          isSelected ? "bg-slate-800" : "bg-slate-300"
        } ${isSelected ? "text-white" : ""} cursor-pointer hover:bg-slate-400
      `}
          >
            {day.charAt(0)}
          </li>
        );
      })}
    </ul>
  );
};

export default Days;
