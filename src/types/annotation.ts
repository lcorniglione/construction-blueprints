import { RefObject } from "react";

export const types = {
  Damage: "#EE6352",
  Incomplete: "#FAC05E",
  Observation: "#3FA7D6",
  Resolved: "#59CD90",
  Unconfirmed: "#474954",
};

export interface Annotation {
  x: number;
  y: number;
  label: string;
  type: keyof typeof types;
}

export interface AnnotationProps {
  annotation: Annotation;
  getBubblePosition: () => { top: number; left: number } | undefined;
}
