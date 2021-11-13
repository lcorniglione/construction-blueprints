import React, { MouseEvent, useRef, useState, useCallback } from "react";
import "./App.css";

import Bubble from "Bubble";
import { Annotation, types } from "types/annotation";

const IMAGE_HEIGHT: number = 1132;
const IMAGE_WIDTH: number = 1026;
const DEFAULT_TYPE: keyof typeof types = "Unconfirmed";
const DEFAULT_ANNOTATIONS: Annotation[] = [
  {
    x: 438,
    y: 473,
    label: "#45",
    type: "Damage",
  },
  {
    x: 354,
    y: 900,
    label: "#46",
    type: "Damage",
  },
  {
    x: 689,
    y: 711,
    label: "#47",
    type: "Damage",
  },
  {
    x: 795,
    y: 283,
    label: "#48",
    type: "Incomplete",
  },
  {
    x: 563,
    y: 100,
    label: "#50",
    type: "Observation",
  },
  {
    x: 908,
    y: 114,
    label: "#55",
    type: "Resolved",
  },
];

function getCoordinates(
  bounding: DOMRect,
  event: MouseEvent<HTMLElement>
): { x: number; y: number } {
  const x = event.pageX - bounding.left;
  const y = event.pageY - bounding.top;
  return { x, y };
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [annotations, setAnnotations] =
    useState<Annotation[]>(DEFAULT_ANNOTATIONS);

  const getBubblePosition = useCallback(() => {
    if (!canvasRef) return;
    const rect: DOMRect | undefined =
      canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    return { top: rect.top, left: rect.left };
  }, []);

  function handleCanvasClick(e: MouseEvent<HTMLElement>) {
    if (!canvasRef) return;
    const rect: DOMRect | undefined =
      canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { x, y } = getCoordinates(rect, e);
    setAnnotations((ann) => [
      ...ann,
      { x, y, label: "dsaf", type: DEFAULT_TYPE },
    ]);
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{ backgroundImage: "url(/site-blueprint.png)" }}
      />
      {annotations.map((ann, i) => (
        <Bubble
          key={String(ann.x + ann.y)}
          annotation={ann}
          getBubblePosition={getBubblePosition}
        />
      ))}
    </div>
  );
}

export default App;
