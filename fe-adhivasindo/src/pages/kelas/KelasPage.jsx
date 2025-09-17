import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Edit2, Eye, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useValidation } from '@/hooks/useValidation';
import { classSchema } from '@/lib/validations/classSchema';
import KelasModal from './components/KelasModal';
import KelasDetailModal from './components/KelasDetailModal';
import ActionButton from '@/components/common/ActionButton';
import { classesService } from '@/services/classesService';

const KelasPage = () => {
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingKelas, setEditingKelas] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailKelas, setDetailKelas] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useValidation(classSchema);

    const {
        data: kelasList = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['classes'],
        queryFn: classesService.list,
    });

    const saveMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            id
                ? classesService.update(id, payload)
                : classesService.create(payload),
        onSuccess: () => {
            toast.success(editingKelas ? 'Class updated' : 'Class created');
            queryClient.invalidateQueries(['classes']);
            setModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Save failed');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: classesService.remove,
        onSuccess: () => {
            toast.success('Class deleted');
            queryClient.invalidateQueries(['classes']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Delete failed');
        },
    });

    const openNew = () => {
        setEditingKelas(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (kelas) => {
        setEditingKelas(kelas);
        reset(kelas);
        setModalOpen(true);
    };

    const openDetail = (kelas) => {
        setDetailKelas(kelas);
        setDetailOpen(true);
    };

    const onSubmit = (values) => {
        saveMutation.mutate({ id: editingKelas?.id, payload: values });
    };

    const columns = useMemo(
        () => [
            { header: 'No.', cell: (row) => row.row.index + 1 },
            { header: 'Name', accessorKey: 'name' },
            { header: 'Description', accessorKey: 'description' },
            {
                id: 'actions',
                header: 'Actions',
                headerClassName: 'text-center',
                bodyClassName: 'item-center flex justify-center',
                cell: ({ row }) => {
                    const kelas = row.original;
                    return (
                        <div className="flex space-x-2 justify-center">
                            <ActionButton
                                label={`View`}
                                icon={<Eye className="w-4 h-4" />}
                                onClick={() => openDetail(kelas)}
                            />
                            <ActionButton
                                label={`Edit`}
                                icon={<Edit2 className="w-4 h-4" />}
                                onClick={() => openEdit(kelas)}
                            />
                            <ActionButton
                                label={`Delete`}
                                icon={
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                }
                                onClick={() => deleteMutation.mutate(kelas.id)}
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
                <h2 className="text-xl font-semibold">Classes</h2>
                <Button onClick={openNew} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Class
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={kelasList}
                loading={isLoading}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 25]}
                showPagination
                search
                // order
                refresh
                onRefresh={() =>
                    refetch().then(() => toast.success('Refreshed'))
                }
            />

            <KelasModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                editingKelas={editingKelas}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                saveLoading={saveMutation.isLoading}
                onCancel={() => setModalOpen(false)}
            />

            <KelasDetailModal
                open={detailOpen}
                onOpenChange={setDetailOpen}
                kelas={detailKelas}
            />
        </div>
    );
};

export default KelasPage;
