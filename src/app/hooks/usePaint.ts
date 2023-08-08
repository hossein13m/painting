import { useEffect, useRef, useState } from 'react';

export type Point = Record<'x' | 'y', number>;

export interface Paint {
    ctx: CanvasRenderingContext2D;
    currentPoint: Point;
    prevPoint: Point | null;
}

export function usePaint(onPaint: ({ ctx, currentPoint, prevPoint }: Paint) => void) {
    const [mouseDown, setMouseDown] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevAxis = useRef<Point | null>(null);

    function onMouseDown(): void {
        setMouseDown(!mouseDown);
    }

    function clearCanvas(): void {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {
        function mouseMoveEventHandler(event: MouseEvent): void {
            if (!mouseDown) return;
            const currentAxis = setAxis(event);
            const ctx = canvasRef.current?.getContext('2d');

            if (!ctx || !currentAxis) return;

            onPaint({ ctx, currentPoint: currentAxis, prevPoint: prevAxis.current });
            prevAxis.current = currentAxis;
        }

        function mouseUpEventHandler() {
            setMouseDown(!mouseDown);
            prevAxis.current = null;
        }

        function setAxis(event: MouseEvent): Point | void {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            console.log(rect);
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            return { x, y };
        }

        canvasRef.current?.addEventListener('mousemove', mouseMoveEventHandler);
        window.addEventListener('mouseup', mouseUpEventHandler);

        return () => {
            canvasRef.current?.removeEventListener('mousemove', mouseMoveEventHandler);
            window.removeEventListener('mouseup', mouseUpEventHandler);
        };
    }, [onPaint]);

    return {
        canvasRef,
        onMouseDown,
        clearCanvas,
    };
}
