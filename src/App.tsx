import React, { useState } from "react";
import "./App.css";

import Canvas from "./Canvas";
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

function App() {
  const [annotations, setAnnotations] =
    useState<Annotation[]>(DEFAULT_ANNOTATIONS);

  function addItemToDraw(position: { x: number; y: number }) {
    setAnnotations((prev) => [
      ...prev,
      { x: position.x, y: position.y, label: "321", type: DEFAULT_TYPE },
    ]);
  }

  return (
    <div className="App">
      <Canvas
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        addItemToDraw={addItemToDraw}
        draws={annotations}
        style={{ backgroundImage: "url(/site-blueprint.png)" }}
      />
    </div>
  );
}

export default App;
