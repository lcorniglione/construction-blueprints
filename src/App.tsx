import React, { useState, useCallback } from "react";
import "./App.css";

import Canvas from "./Canvas";
import { Annotation, types } from "types/annotation";

const BUBBLE_PATH = new Path2D(
  "M20,3H4A2,2,0,0,0,2,5V22l5.36-5H20a2,2,0,0,0,2-2V5A2,2,0,0,0,20,3Z"
);
const IMAGE_HEIGHT: number = 1132;
const IMAGE_WIDTH: number = 1026;
const BUBBLE_SIZE: number = 24;
const OPTIMAL_BUBBLE_SIZE: number = 72;
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

function App() {
  const [annotations, setAnnotations] =
    useState<Annotation[]>(DEFAULT_ANNOTATIONS);

  const addItemToDraw = useCallback((position: { x: number; y: number }) => {
    setAnnotations((prev) => {
      const lastItem = prev[prev.length - 1];
      const labelNumber = Number(lastItem.label.slice(1)) + 1;

      return [
        ...prev,
        {
          x: position.x,
          y: position.y,
          label: "#" + labelNumber,
          type: DEFAULT_TYPE,
        },
      ];
    });
  }, []);

  const draw = useCallback(
    (draw: Annotation, canvasContext: CanvasRenderingContext2D) => {
      canvasContext.save();
      canvasContext.fillStyle = types[draw.type] + "CC";
      canvasContext.translate(draw.x, draw.y - OPTIMAL_BUBBLE_SIZE);
      canvasContext.scale(
        OPTIMAL_BUBBLE_SIZE / BUBBLE_SIZE,
        OPTIMAL_BUBBLE_SIZE / BUBBLE_SIZE
      );
      canvasContext.fill(BUBBLE_PATH);

      canvasContext.restore();

      canvasContext.save();
      canvasContext.font = "bold 16px Arial";
      canvasContext.fillStyle = "#FFFFFFFF";
      canvasContext.fillText(
        draw.label,
        draw.x + OPTIMAL_BUBBLE_SIZE / 2,
        draw.y - OPTIMAL_BUBBLE_SIZE / 2
      );
      canvasContext.restore();
    },
    []
  );

  return (
    <div className="App">
      <Canvas
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        addItemToDraw={addItemToDraw}
        draws={annotations}
        draw={draw}
        style={{ backgroundImage: "url(/site-blueprint.png)" }}
      />
    </div>
  );
}

export default App;
