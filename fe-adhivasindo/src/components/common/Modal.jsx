import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    trigger,
    size = 'md',
    contentClassName = '',
    className = '',
}) {
    const sizeClass =
        {
            sm: 'sm:max-w-md',
            md: 'sm:max-w-lg',
            lg: 'sm:max-w-2xl',
            xl: 'sm:max-w-4xl',
            full: 'w-full max-w-none',
        }[size] ?? 'sm:max-w-lg';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className={cn('w-full p-0', sizeClass, className)}>
                <div className="flex flex-col w-full max-h-[80vh] min-h-0">
                    <div className="px-6 py-4">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            {description && (
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>
                    </div>

                    <div
                        className={cn(
                            'px-6 py-4 overflow-auto flex-1 min-h-0',
                            contentClassName
                        )}
                    >
                        {children}
                    </div>

                    <DialogFooter className="flex justify-end space-x-2 px-6 py-3 border-t">
                        {footer ?? (
                            <>
                                <Button
                                    variant="ghost"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={() => onOpenChange(false)}>
                                    OK
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
