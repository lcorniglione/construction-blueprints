import { useEffect, useRef, MouseEvent } from "react";

import { CanvasProps } from "types/annotation";

function Canvas<T extends { x: number; y: number }>({
  draws,
  addItemToDraw,
  draw,
  width,
  height,
  ...props
}: CanvasProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = getCanvasContext();
    if (!context) return;

    const rect = getBoundings();
    if (!rect) return;

    context.clearRect(0, 0, width, height);
    draws.forEach((itemToDraw) => {
      if (draw) {
        draw(itemToDraw, context);
      }
    });
  }, [draws, draw, width, height]);

  function getCanvasContext() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return canvas.getContext("2d");
  }

  function getBoundings() {
    return canvasRef.current?.getBoundingClientRect();
  }

  function handleClick(e: MouseEvent<HTMLElement>) {
    const rect = getBoundings();
    if (!rect) return;
    const position = { x: e.pageX - rect.left, y: e.pageY };
    addItemToDraw(position);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      {...props}
    />
  );
}

export default Canvas;
