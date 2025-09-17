import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReportModal = ({
    open,
    onOpenChange,
    editingReport,
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
            title={editingReport ? 'Edit Report' : 'New Report'}
            description={
                editingReport
                    ? 'Update existing report details.'
                    : 'Fill the form to create a new report.'
            }
            footer={
                <>
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        form="report-form"
                        type="submit"
                        loading={isSubmitting || saveLoading}
                    >
                        {editingReport ? 'Update' : 'Create'}
                    </Button>
                </>
            }
        >
            <form id="report-form" onSubmit={onSubmit} className="space-y-4">
                <Input
                    name="user_id"
                    label="User ID"
                    type="number"
                    {...register('user_id')}
                    error={errors.user_id?.message}
                    required
                />
                <Input
                    name="modul_id"
                    label="Module ID"
                    type="number"
                    {...register('modul_id')}
                    error={errors.modul_id?.message}
                    required
                />
                <Input
                    name="class_id"
                    label="Class ID"
                    type="number"
                    {...register('class_id')}
                    error={errors.class_id?.message}
                    required
                />
                <Input
                    name="score"
                    label="Score"
                    type="number"
                    {...register('score')}
                    error={errors.score?.message}
                />
            </form>
        </Modal>
    );
};

export default ReportModal;
