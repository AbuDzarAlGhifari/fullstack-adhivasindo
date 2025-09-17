import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Edit2, Eye, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useValidation } from '@/hooks/useValidation';
import { reportSchema } from '@/lib/validations/reportSchema';
import { reportsService } from '@/services/reportsService';
import ReportModal from './component/ReportModal';
import ReportDetailModal from './component/ReportDetailModal';
import ActionButton from '@/components/common/ActionButton';

const ReportPage = () => {
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingReport, setEditingReport] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailReport, setDetailReport] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useValidation(reportSchema);

    const {
        data: reports = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['reports'],
        queryFn: reportsService.list,
    });

    const saveMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            id
                ? reportsService.update(id, payload)
                : reportsService.create(payload),
        onSuccess: () => {
            toast.success(editingReport ? 'Report updated' : 'Report created');
            queryClient.invalidateQueries(['reports']);
            setModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Save failed');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: reportsService.remove,
        onSuccess: () => {
            toast.success('Report deleted');
            queryClient.invalidateQueries(['reports']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Delete failed');
        },
    });

    const openNew = () => {
        setEditingReport(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (report) => {
        setEditingReport(report);
        reset(report);
        setModalOpen(true);
    };

    const openDetail = (report) => {
        setDetailReport(report);
        setDetailOpen(true);
    };

    const onSubmit = (values) => {
        saveMutation.mutate({ id: editingReport?.id, payload: values });
    };

    const columns = useMemo(
        () => [
            { header: 'No.', cell: (row) => row.row.index + 1 },
            { header: 'User', accessorKey: 'user.name' },
            { header: 'Module', accessorKey: 'modul.title' },
            { header: 'Class', accessorKey: 'class.name' },
            { header: 'Score', accessorKey: 'score' },
            {
                id: 'actions',
                header: 'Actions',
                headerClassName: 'text-center',
                bodyClassName: 'item-center flex justify-center',
                cell: ({ row }) => {
                    const report = row.original;
                    return (
                        <div className="flex space-x-2 justify-center">
                            <ActionButton
                                label={`View`}
                                icon={<Eye className="w-4 h-4" />}
                                onClick={() => openDetail(report)}
                            />
                            <ActionButton
                                label={`Edit`}
                                icon={<Edit2 className="w-4 h-4" />}
                                onClick={() => openEdit(report)}
                            />
                            <ActionButton
                                label={`Delete`}
                                icon={
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                }
                                onClick={() => deleteMutation.mutate(report.id)}
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
                <h2 className="text-xl font-semibold">Reports</h2>
                <Button onClick={openNew} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Report
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={reports}
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

            <ReportModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                editingReport={editingReport}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                saveLoading={saveMutation.isLoading}
                onCancel={() => setModalOpen(false)}
            />

            <ReportDetailModal
                open={detailOpen}
                onOpenChange={setDetailOpen}
                report={detailReport}
            />
        </div>
    );
};

export default ReportPage;
