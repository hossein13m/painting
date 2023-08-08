'use client';

import React from 'react';
import { type Paint, usePaint } from '@/app/hooks/usePaint';

export default function Painting() {
    const { canvasRef, onMouseDown } = usePaint(paintLine);
    const canvasWidth = window.innerWidth - 100;
    const canvasHeight = window.innerHeight - 300;

    function paintLine({ prevPoint, currentPoint, ctx }: Paint) {
        const { x: currentX, y: currentY } = currentPoint;

        const color = '#000';
        const fontSize = 5;
        const circleRadius = 2;

        let startPoint = prevPoint ?? currentPoint;

        ctx.beginPath();
        ctx.lineWidth = fontSize;
        ctx.strokeStyle = color;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    return (
        <div className="flex-grow">
            <main className="flex flex-col screen-height ">
                <header className="bg-sky-700">
                    <div className="flex flex-col items-center text-white ">
                        <h1 className="font-bold pt-4 text-2xl">Painting Web App</h1>
                        <div className="flex mt-4">
                            <div className="flex mr-4">
                                <label htmlFor="stroke" className="mx-2">
                                    Color:
                                </label>
                                <input id="stroke" name="stroke" type="color" />
                            </div>

                            <label htmlFor="lineWidth">Font Size:</label>

                            <input type="range" id="lineWidth" name="lineWidth" min="0" step="1" max="50" />
                        </div>
                        <div className="flex">
                            <button className="bg-sky-200 text-black rounded-xl p-1 m-4" id="clear">
                                Clear
                            </button>

                            <button className="bg-sky-200 text-black rounded-xl p-1 my-4" id="theme">
                                Change Theme
                            </button>
                        </div>
                    </div>
                </header>
                <section className="screen-height flex justify-center dark:bg-red-400 bg-white">
                    <div>
                        <canvas
                            width={canvasWidth}
                            height={canvasHeight}
                            onMouseDown={onMouseDown}
                            ref={canvasRef}
                            className="rounded border-lime-300 border-8 mt-8"
                        ></canvas>
                    </div>
                </section>
            </main>
        </div>
    );
}
