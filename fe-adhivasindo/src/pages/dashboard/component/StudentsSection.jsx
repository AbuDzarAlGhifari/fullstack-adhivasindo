import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { DataTable } from '@/components/ui/data-table';
import { reportsService } from '@/services/reportsService';

const StudentsSection = () => {
    const {
        data: reports = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['reports'],
        queryFn: reportsService.list,
    });

    const columns = React.useMemo(
        () => [
            {
                id: 'rank',
                header: 'Rank',
                cell: ({ row }) => {
                    const rank = row.index + 1;
                    const getRankIcon = (r) => {
                        switch (r) {
                            case 1:
                                return '🥇';
                            case 2:
                                return '🥈';
                            case 3:
                                return '🥉';
                            default:
                                return r.toString();
                        }
                    };
                    return (
                        <div className="flex items-center justify-center text-sm font-medium">
                            {getRankIcon(rank)}
                        </div>
                    );
                },
                meta: {
                    headerClassName: 'text-gray-500 font-medium text-sm',
                },
            },
            {
                accessorKey: 'user.name',
                header: 'Name',
                cell: ({ getValue }) => (
                    <span className="font-medium text-gray-800">
                        {getValue()}
                    </span>
                ),
                meta: {
                    headerClassName: 'text-gray-500 font-medium text-sm',
                },
            },
            {
                accessorKey: 'class.name',
                header: 'Class',
                cell: ({ getValue }) => (
                    <span className="text-gray-500 text-sm">{getValue()}</span>
                ),
                meta: {
                    headerClassName: 'text-gray-500 font-medium text-sm',
                },
            },
            {
                accessorKey: 'modul.title',
                header: 'Module',
                cell: ({ getValue }) => (
                    <span className="text-gray-500 text-sm">{getValue()}</span>
                ),
                meta: {
                    headerClassName: 'text-gray-500 font-medium text-sm',
                },
            },
            {
                accessorKey: 'score',
                header: 'Point',
                cell: ({ getValue }) => (
                    <span className="font-medium text-green-600">
                        {getValue()?.toLocaleString() ?? '0'} Point
                    </span>
                ),
                meta: {
                    headerClassName: 'text-gray-500 font-medium text-sm',
                },
            },
        ],
        []
    );

    if (isLoading) return <div>Loading student scores...</div>;
    if (isError) {
        toast.error('Failed to load student scores');
        return <div>Error loading student scores.</div>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">NILAI PESERTA</h3>
            <DataTable
                columns={columns}
                data={reports}
                order
                refresh={false}
                showPagination
                initialPageSize={10}
                headerClassName="bg-gray-50 border-b"
                bodyClassName="bg-white"
                className="text-sm"
            />
        </div>
    );
};

export default StudentsSection;
