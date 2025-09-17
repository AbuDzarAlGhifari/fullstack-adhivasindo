import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';

const ScheduleDetailModal = ({ open, onOpenChange, schedule }) => {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Schedule Details"
            description="View detailed information for this schedule."
            footer={
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                    Close
                </Button>
            }
        >
            {schedule ? (
                <div className="space-y-2">
                    <p>
                        <strong>ID:</strong> {schedule.id}
                    </p>
                    <p>
                        <strong>Modul ID:</strong> {schedule.modul_id}
                    </p>
                    <p>
                        <strong>Instructor ID:</strong>{' '}
                        {schedule.user_id ?? 'N/A'}
                    </p>
                    <p>
                        <strong>Title:</strong> {schedule.title ?? 'N/A'}
                    </p>
                    <p>
                        <strong>Start Time:</strong> {schedule.start_time}
                    </p>
                    <p>
                        <strong>End Time:</strong> {schedule.end_time}
                    </p>
                    <p>
                        <strong>Location:</strong> {schedule.location ?? 'N/A'}
                    </p>
                </div>
            ) : (
                <p>No schedule selected.</p>
            )}
        </Modal>
    );
};

export default ScheduleDetailModal;
