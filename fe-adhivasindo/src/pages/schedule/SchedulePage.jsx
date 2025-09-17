import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Edit2, Eye, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useValidation } from '@/hooks/useValidation';
import { scheduleSchema } from '@/lib/validations/scheduleSchema';
import { schedulesService } from '@/services/schedulesService';
import ScheduleModal from './components/ScheduleModal';
import ScheduleDetailModal from './components/ScheduleDetailModal';
import ActionButton from '@/components/common/ActionButton';

const SchedulePage = () => {
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailSchedule, setDetailSchedule] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useValidation(scheduleSchema);

    const {
        data: schedules = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['schedules'],
        queryFn: schedulesService.list,
    });

    const saveMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            id
                ? schedulesService.update(id, payload)
                : schedulesService.create(payload),
        onSuccess: () => {
            toast.success(
                editingSchedule ? 'Schedule updated' : 'Schedule created'
            );
            queryClient.invalidateQueries(['schedules']);
            setModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Save failed');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: schedulesService.remove,
        onSuccess: () => {
            toast.success('Schedule deleted');
            queryClient.invalidateQueries(['schedules']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Delete failed');
        },
    });

    const openNew = () => {
        setEditingSchedule(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (schedule) => {
        setEditingSchedule(schedule);
        reset(schedule);
        setModalOpen(true);
    };

    const openDetail = (schedule) => {
        setDetailSchedule(schedule);
        setDetailOpen(true);
    };

    const onSubmit = (values) => {
        saveMutation.mutate({ id: editingSchedule?.id, payload: values });
    };

    const columns = useMemo(
        () => [
            { header: 'No.', cell: (row) => row.row.index + 1 },
            { header: 'Title', accessorKey: 'title' },
            { header: 'Module', accessorKey: 'modul.title' },
            { header: 'Instructor', accessorKey: 'instructor.name' },
            { header: 'Start', accessorKey: 'start_time' },
            { header: 'End', accessorKey: 'end_time' },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const sched = row.original;
                    return (
                        <div className="flex space-x-2 justify-center">
                            <ActionButton
                                label={`View`}
                                icon={<Eye className="w-4 h-4" />}
                                onClick={() => openDetail(sched)}
                            />
                            <ActionButton
                                label={`Edit`}
                                icon={<Edit2 className="w-4 h-4" />}
                                onClick={() => openEdit(sched)}
                            />
                            <ActionButton
                                label={`Delete`}
                                icon={
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                }
                                onClick={() => deleteMutation.mutate(sched.id)}
                            />
                        </div>
                    );
                },
            },
        ],
        [deleteMutation]
    );

    return (
        <div className="space-y-6 sm:mt-7">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Schedules</h2>
                <Button onClick={openNew} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Schedule
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={schedules}
                loading={isLoading}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 25]}
                showPagination
                search
                order
                refresh
                onRefresh={() =>
                    refetch().then(() => toast.success('Refreshed'))
                }
            />

            <ScheduleModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                editingSchedule={editingSchedule}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                saveLoading={saveMutation.isLoading}
                onCancel={() => setModalOpen(false)}
            />

            <ScheduleDetailModal
                open={detailOpen}
                onOpenChange={setDetailOpen}
                schedule={detailSchedule}
            />
        </div>
    );
};

export default SchedulePage;
