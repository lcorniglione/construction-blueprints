import { useEffect, useRef, MouseEvent } from "react";

import { CanvasProps } from "types/annotation";

function Canvas({ draws, addItemToDraw, ...props }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect: DOMRect | undefined =
      canvasRef.current?.getBoundingClientRect();

    if (!rect) return;

    draws.forEach((draw) => {
      context.fillStyle = "#000000";
      context.fillRect(draw.x, draw.y, 30, 30);
    });
  }, [draws]);

  function handleClick(e: MouseEvent<HTMLElement>) {
    const rect: DOMRect | undefined =
      canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const position = { x: e.pageX - rect.left, y: e.pageY };
    addItemToDraw(position);
  }

  return <canvas ref={canvasRef} {...props} onClick={handleClick} />;
}

export default Canvas;
