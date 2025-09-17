import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { format, addMonths, startOfWeek, addDays } from 'date-fns';

const CalendarSection = () => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(today);
    const [selected, setSelected] = useState(viewDate);

    const monthLabel = useMemo(() => format(viewDate, 'LLLL yyyy'), [viewDate]);

    const prev = () => setViewDate((d) => addMonths(d, -1));
    const next = () => setViewDate((d) => addMonths(d, 1));

    const start = startOfWeek(selected, { weekStartsOn: 0 });
    const week = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <Card className="bg-[#2A2545] text-white rounded-lg max-w-lg mx-auto">
            <div className="flex items-center justify-between px-4 py-2">
                <button
                    onClick={prev}
                    className="p-1 hover:bg-[#2A2545] rounded"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-medium">{monthLabel}</div>
                <button
                    onClick={next}
                    className="p-1 hover:bg-[#2A2545] rounded"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <div className="flex justify-between px-4 py-2">
                {daysOfWeek.map((d) => (
                    <div
                        key={d}
                        className="text-xs w-8 text-center font-semibold text-gray-300"
                    >
                        {d}
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-4 pb-4">
                {week.map((date) => {
                    const day = date.getDate();
                    const isCurrentMonth =
                        date.getMonth() === viewDate.getMonth();
                    const isSelected =
                        date.toDateString() === selected.toDateString();
                    return (
                        <button
                            key={day}
                            onClick={() => isCurrentMonth && setSelected(date)}
                            className={`w-8 h-8 flex items-center justify-center text-xs transition-colors rounded-lg
                ${
                    isSelected
                        ? 'bg-white text-[#2A2545] font-bold'
                        : isCurrentMonth
                        ? 'bg-white/20 hover:bg-white/40'
                        : 'bg-transparent text-white/50 cursor-default'
                }
              `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
};

export default CalendarSection;
