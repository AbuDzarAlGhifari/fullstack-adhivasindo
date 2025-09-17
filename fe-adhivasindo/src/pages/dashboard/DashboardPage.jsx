import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { modulService } from '@/services/modulService';
import SearchInput from '@/components/ui/search-input';
import { Bell, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HighlightSection from './component/HighlightSection';
import ModuleCard from './component/ModulCard';
import StudentsSection from './component/StudentsSection';
import ProfileSection from './component/ProfileSection';
import CalendarSection from './component/CalendarSection';
import ScheduleSection from './component/ScheduleSection';
import VisualSection from './component/VisualSection';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const {
        data: modules = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['moduls'],
        queryFn: modulService.list,
    });

    if (isLoading) return <div>Loading modules...</div>;
    if (isError) return <div>Failed to load modules.</div>;

    return (
        <div className="min-h-screen">
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <h1 className="text-lg font-bold">
                                LEARNING MANAGEMENT SYSTEM
                            </h1>
                        </div>
                        <div className="flex items-center gap-3  md:w-auto">
                            <div className="flex items-center gap-3">
                                <div>
                                    <SearchInput
                                        placeholder="Search class..."
                                        value={query}
                                        onChange={setQuery}
                                        className="flex-1 md:flex-none"
                                    />
                                </div>
                                <button
                                    onClick={() => navigate('/upcoming')}
                                    className="relative p-1 rounded hover:bg-gray-200"
                                >
                                    <Bell className="w-5 h-5 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                                </button>
                                <button
                                    onClick={() => navigate('/upcoming')}
                                    className="relative p-1 rounded hover:bg-gray-200"
                                >
                                    <Mail className="w-5 h-5 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                                </button>
                            </div>
                        </div>
                    </section>
                    <HighlightSection />

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            MODUL KOMPETENSI
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {modules.map((mod) => (
                                <ModuleCard key={mod.id} module={mod} />
                            ))}
                        </div>
                    </section>

                    <StudentsSection />
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <ProfileSection />
                    <CalendarSection />
                    <ScheduleSection />
                    <VisualSection />
                </aside>
            </div>
        </div>
    );
};

export default DashboardPage;
