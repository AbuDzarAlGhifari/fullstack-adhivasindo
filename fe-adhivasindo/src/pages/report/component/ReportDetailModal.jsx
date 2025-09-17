import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';

const ReportDetailModal = ({ open, onOpenChange, report }) => {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Report Details"
            description="View detailed information for this report."
            footer={
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                    Close
                </Button>
            }
        >
            {report ? (
                <div className="space-y-2">
                    <p>
                        <strong>ID:</strong> {report.id}
                    </p>
                    <p>
                        <strong>User ID:</strong> {report.user_id}
                    </p>
                    <p>
                        <strong>Module ID:</strong> {report.modul_id}
                    </p>
                    <p>
                        <strong>Class ID:</strong> {report.class_id}
                    </p>
                    <p>
                        <strong>Score:</strong> {report.score ?? 'N/A'}
                    </p>
                    <p>
                        <strong>Submitted At:</strong>{' '}
                        {report.submitted_at ?? 'N/A'}
                    </p>
                </div>
            ) : (
                <p>No report selected.</p>
            )}
        </Modal>
    );
};

export default ReportDetailModal;
