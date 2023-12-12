import { Controller } from 'react-hook-form'

import Typography from './Typography'
import SelectField from './Select'
import {
    DAYS,
    DAY_KEY,
    HOUR,
    HOURS_SELECT_OPTIONS,
    SelectedDay,
} from '@/constants'
import React, { useMemo } from 'react'

interface Props {
    selectedDays: SelectedDay[]
    errors: Record<number, string>
}

const WorkingHours = ({ selectedDays, errors }: Props) => {
    const daysToRender = useMemo(() => {
        return Object.keys(DAYS).map((day: DAY_KEY | string) => {
            const selectedDayIndex = selectedDays.findIndex((selectedDay) => {
                return selectedDay.day === DAYS[day as DAY_KEY]
            })

            if (selectedDayIndex < 0) {
                return null
            }

            const error = errors[DAYS[day as DAY_KEY]]

            return (
                <li key={day}>
                    <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
                        <Typography
                            text={day.toLocaleLowerCase()}
                            className="capitalize flex-1"
                            variant="label"
                        />
                        <div className="flex justify-end md:w-[372px]">
                            <div className="w-1/2 min-w-[100px] md:max-w-[200px]">
                                <Controller
                                    name={`selectedDays[${selectedDayIndex}].startHour`}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <SelectField<HOUR>
                                            value={value}
                                            options={HOURS_SELECT_OPTIONS}
                                            className="rounded-tr-none rounded-br-none border-r-0"
                                            onValueChange={(value: string) => {
                                                onChange(value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-1/2 min-w-[100px] md:max-w-[200px]">
                                <Controller
                                    name={`selectedDays[${selectedDayIndex}].endHour`}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <SelectField<HOUR>
                                            value={value}
                                            options={HOURS_SELECT_OPTIONS}
                                            className="rounded-tl-none rounded-bl-none"
                                            onValueChange={(value: string) => {
                                                onChange(value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    {errors && (
                        <p className="text-right text-red-500 text-xs mt-1">
                            {error}
                        </p>
                    )}
                </li>
            )
        })
    }, [selectedDays, errors])

    return <ul className="flex flex-col gap-6">{daysToRender}</ul>
}

export default React.memo(WorkingHours)
