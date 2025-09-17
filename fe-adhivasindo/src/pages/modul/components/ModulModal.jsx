import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ModulModal({
    open,
    onOpenChange,
    editingModul,
    onSubmit,
    register,
    errors,
    isSubmitting,
    saveLoading,
    onCancel,
}) {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={editingModul ? 'Edit Modul' : 'New Modul'}
            description={
                editingModul
                    ? 'Update existing modul details.'
                    : 'Fill the form to create a new modul.'
            }
            footer={
                <>
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        form="modul-form"
                        type="submit"
                        loading={isSubmitting || saveLoading}
                    >
                        {editingModul ? 'Update' : 'Create'}
                    </Button>
                </>
            }
        >
            <form id="modul-form" onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-4">
                    <Input
                        name="title"
                        label="Title"
                        {...register('title')}
                        error={errors.title?.message}
                        required
                    />
                    <Input
                        name="description"
                        type="textarea"
                        label="Description (JSON)"
                        {...register('description')}
                        error={errors.description?.message}
                        placeholder='{"overview":"..."}'
                    />
                    <Input
                        name="cover_image"
                        label="Cover Image URL"
                        {...register('cover_image')}
                        error={errors.cover_image?.message}
                    />
                    <Input
                        name="user_id"
                        label="Instructor User ID"
                        type="number"
                        {...register('user_id')}
                        error={errors.user_id?.message}
                    />
                    {/* <div className="grid grid-cols-2 gap-4">
                        <Input
                            name="start_date"
                            label="Start Date"
                            type="date"
                            {...register('start_date')}
                            error={errors.start_date?.message}
                        />
                        <Input
                            name="end_date"
                            label="End Date"
                            type="date"
                            {...register('end_date')}
                            error={errors.end_date?.message}
                        />
                    </div> */}
                </div>
            </form>
        </Modal>
    );
}
