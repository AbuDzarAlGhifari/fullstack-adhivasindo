import React from 'react';
import { ChevronRight } from 'lucide-react';

const scheduleData = [
    {
        id: '1',
        title: 'Storytelling dalam Pemasaran',
        time: '09:00 – 11:00',
        presenter: 'mr.jjam',
        colorClass: 'bg-purple-500',
    },
    {
        id: '2',
        title: 'Pemrograman Frontend Modern',
        time: '12:00 – 14:00',
        presenter: 'mr.firman',
        colorClass: 'bg-red-400',
    },
    {
        id: '3',
        title: 'Pengembangan API',
        time: '14:30 – 15:30',
        presenter: 'mr.Panji',
        colorClass: 'bg-yellow-400',
    },
];

const ScheduleSection = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 tracking-wide">
                JADWAL PEMATERI
            </h3>

            <div className="space-y-3">
                {scheduleData.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                        <div
                            className={`${item.colorClass} w-4 h-4 rounded flex-shrink-0`}
                        />

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 leading-snug truncate">
                                {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                                {item.time} with {item.presenter}
                            </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 self-end sm:self-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleSection;
