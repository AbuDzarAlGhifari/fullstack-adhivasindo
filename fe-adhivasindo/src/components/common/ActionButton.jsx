import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';

export default function ActionButton({
    label,
    icon,
    onClick,
    variant = 'ghost',
    size = 'sm',
    className = 'p-1',
    sideOffset = 6,
    ...props
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size={size}
                    variant={variant}
                    onClick={onClick}
                    className={className}
                    aria-label={label}
                    {...props}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={sideOffset}>{label}</TooltipContent>
        </Tooltip>
    );
}
