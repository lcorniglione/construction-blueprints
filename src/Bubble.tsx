import { memo } from "react";

import { AnnotationProps, types } from "types/annotation";

function Bubble({ annotation, getBubblePosition }: AnnotationProps) {
  const position = getBubblePosition();
  return (
    <div
      style={{
        position: "absolute",
        width: 30,
        height: 30,
        backgroundColor: types[annotation.type],
        top: annotation.y + (position?.top || 0),
        left: annotation.x + (position?.left || 0),
        opacity: "80%",
      }}
    >
      <label>{annotation.label}</label>
    </div>
  );
}

export default memo(Bubble);
