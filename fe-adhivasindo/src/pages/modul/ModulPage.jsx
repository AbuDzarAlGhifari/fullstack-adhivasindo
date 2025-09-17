import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import ActionButton from '@/components/common/ActionButton';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useValidation } from '@/hooks/useValidation';
import { modulSchema } from '@/lib/validations/modulSchema';
import { modulService } from '@/services/modulService';
import ModulModal from './components/ModulModal';

const ModulPage = () => {
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingModul, setEditingModul] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useValidation(modulSchema);

    const {
        data: moduls = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['moduls'],
        queryFn: modulService.list,
    });

    const saveMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            id
                ? modulService.update(id, payload)
                : modulService.create(payload),
        onSuccess: () => {
            toast.success(editingModul ? 'Modul updated' : 'Modul created');
            queryClient.invalidateQueries(['moduls']);
            setModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Save failed');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: modulService.remove,
        onSuccess: () => {
            toast.success('Modul deleted');
            queryClient.invalidateQueries(['moduls']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Delete failed');
        },
    });

    const openNew = () => {
        setEditingModul(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (modul) => {
        setEditingModul(modul);
        reset(modul);
        setModalOpen(true);
    };

    const onSubmit = (values) => {
        saveMutation.mutate({ id: editingModul?.id, payload: values });
    };

    const columns = useMemo(
        () => [
            { header: 'No.', cell: (row) => row.row.index + 1 },
            { header: 'Title', accessorKey: 'title' },
            { header: 'Description', accessorKey: 'description' },
            { header: 'Instructor', accessorKey: 'instructor.name' },
            {
                id: 'actions',
                header: 'Actions',
                headerClassName: 'text-center',
                bodyClassName: 'item-center flex justify-center',
                cell: ({ row }) => {
                    const modul = row.original;
                    return (
                        <div className="flex space-x-2 justify-center">
                            <ActionButton
                                label={`Edit`}
                                icon={<Edit2 className="w-4 h-4" />}
                                onClick={() => openEdit(modul)}
                            />
                            <ActionButton
                                label={`Delete`}
                                icon={
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                }
                                onClick={() => deleteMutation.mutate(modul.id)}
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
                <h2 className="text-xl font-semibold">Moduls</h2>
                <Button onClick={openNew} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Modul
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={moduls}
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

            <ModulModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                editingModul={editingModul}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                saveLoading={saveMutation.isLoading}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
};

export default ModulPage;
