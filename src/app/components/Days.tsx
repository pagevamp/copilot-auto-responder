import Typography from './Typography';
import { DAYS, SelectedDay, DAY_KEY, DAY_VALUE } from '@/constants';
import { keys } from '@/utils/common';

interface Props {
  selectedDays: SelectedDay[];
  onDayClick(day: DAY_VALUE): void;
}

const Days = ({ selectedDays, onDayClick }: Props) => {
  return (
    <ul className="flex  flex-wrap  items-center gap-4">
      {keys(DAYS).map((day) => {
        const isSelected = !!selectedDays.find((selectedDay) => DAYS[day] === selectedDay.day);
        return (
          <li
            key={day}
            onClick={() => onDayClick(DAYS[day])}
            className={`w-8 h-8 flex  items-center justify-center rounded-full 
        uppercase text-center leading-8 ${isSelected ? 'bg-text' : 'bg-border'} ${
          isSelected ? 'text-white' : 'text-text'
        } cursor-pointer hover:bg-text hover:text-white
      `}
          >
            <Typography className="text-heading-md" text={day.charAt(0)} />
          </li>
        );
      })}
    </ul>
  );
};

export default Days;
