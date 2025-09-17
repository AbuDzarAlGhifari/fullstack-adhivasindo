import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ScheduleModal = ({
    open,
    onOpenChange,
    editingSchedule,
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
            title={editingSchedule ? 'Edit Schedule' : 'New Schedule'}
            description={
                editingSchedule
                    ? 'Update existing schedule details.'
                    : 'Fill the form to create a new schedule.'
            }
            footer={
                <>
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        form="schedule-form"
                        type="submit"
                        loading={isSubmitting || saveLoading}
                    >
                        {editingSchedule ? 'Update' : 'Create'}
                    </Button>
                </>
            }
        >
            <form id="schedule-form" onSubmit={onSubmit} className="space-y-4">
                <Input
                    name="modul_id"
                    label="Modul ID"
                    type="number"
                    {...register('modul_id')}
                    error={errors.modul_id?.message}
                    required
                />
                <Input
                    name="user_id"
                    label="Instructor User ID"
                    type="number"
                    {...register('user_id')}
                    error={errors.user_id?.message}
                />
                <Input
                    name="title"
                    label="Title"
                    {...register('title')}
                    error={errors.title?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        name="start_time"
                        label="Start Time"
                        type="datetime-local"
                        {...register('start_time')}
                        error={errors.start_time?.message}
                        required
                    />
                    <Input
                        name="end_time"
                        label="End Time"
                        type="datetime-local"
                        {...register('end_time')}
                        error={errors.end_time?.message}
                        required
                    />
                </div>
                <Input
                    name="location"
                    label="Location"
                    {...register('location')}
                    error={errors.location?.message}
                />
            </form>
        </Modal>
    );
};

export default ScheduleModal;
