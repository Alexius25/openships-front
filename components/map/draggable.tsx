"use client";

import { PointerEvent as ReactPointerEvent, ReactNode, useRef } from "react";

interface DraggableProps {
    children: ReactNode;
    position: {
        x: number;
        y: number;
    };
    onPositionChange: (position: { x: number; y: number }) => void;
    handle?: string;
}

export default function Draggable({
    children,
    position,
    onPositionChange,
    handle,
}: DraggableProps) {
    const dragStart = useRef<{
        mouseX: number;
        mouseY: number;
        x: number;
        y: number;
    } | null>(null);

    const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (handle && !(e.target as HTMLElement).closest(handle)) {
            return;
        }

        dragStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            x: position.x,
            y: position.y,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragStart.current) return;

        const { mouseX, mouseY, x, y } = dragStart.current;

        onPositionChange({
            x: x + e.clientX - mouseX,
            y: y + e.clientY - mouseY,
        });
    };

    const handlePointerUp = () => {
        dragStart.current = null;
    };

    return (
        <div
            className="fixed z-[9999]"
            style={{
                left: position.x,
                top: position.y,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {children}
        </div>
    );
}
