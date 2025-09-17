import React from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';

const KelasDetailModal = ({ open, onOpenChange, kelas }) => {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Class Details"
            description="View detailed information for this class."
            footer={
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                    Close
                </Button>
            }
        >
            {kelas ? (
                <div className="space-y-2">
                    <p>
                        <strong>ID:</strong> {kelas.id}
                    </p>
                    <p>
                        <strong>Modul ID:</strong> {kelas.modul_id}
                    </p>
                    <p>
                        <strong>Name:</strong> {kelas.name}
                    </p>
                    {kelas.cover_image && (
                        <p>
                            <strong>Cover Image:</strong>{' '}
                            <a
                                href={kelas.cover_image}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Image
                            </a>
                        </p>
                    )}
                    {kelas.description && (
                        <p>
                            <strong>Description:</strong> {kelas.description}
                        </p>
                    )}
                    {kelas.resource_url && (
                        <p>
                            <strong>Resource URL:</strong>{' '}
                            <a
                                href={kelas.resource_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {kelas.resource_url}
                            </a>
                        </p>
                    )}
                </div>
            ) : (
                <p>No class selected.</p>
            )}
        </Modal>
    );
};

export default KelasDetailModal;
