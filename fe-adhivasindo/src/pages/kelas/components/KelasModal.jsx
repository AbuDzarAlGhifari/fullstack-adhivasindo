import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const KelasModal = ({
    open,
    onOpenChange,
    editingKelas,
    onSubmit,
    register,
    errors,
    isSubmitting,
    saveLoading,
    onCancel,
}) => {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={editingKelas ? 'Edit Class' : 'New Class'}
            description={
                editingKelas
                    ? 'Update existing class details.'
                    : 'Fill the form to create a new class.'
            }
            footer={
                <>
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        form="kelas-form"
                        type="submit"
                        loading={isSubmitting || saveLoading}
                    >
                        {editingKelas ? 'Update' : 'Create'}
                    </Button>
                </>
            }
        >
            <form id="kelas-form" onSubmit={onSubmit} className="space-y-4">
                <Input
                    name="modul_id"
                    label="Modul ID"
                    type="number"
                    {...register('modul_id')}
                    error={errors.modul_id?.message}
                    required
                />
                <Input
                    name="name"
                    label="Class Name"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                />
                <Input
                    name="cover_image"
                    label="Cover Image URL"
                    {...register('cover_image')}
                    error={errors.cover_image?.message}
                />
                <Input
                    name="description"
                    type="textarea"
                    label="Description"
                    {...register('description')}
                    error={errors.description?.message}
                />
                <Input
                    name="resource_url"
                    label="Resource URL"
                    {...register('resource_url')}
                    error={errors.resource_url?.message}
                />
            </form>
        </Modal>
    );
};

export default KelasModal;
