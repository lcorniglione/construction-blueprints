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

export interface CanvasProps<T> {
  draws: T[];
  width: number;
  height: number;
  style: object;
  addItemToDraw: (position: { x: number; y: number }) => void;
  draw?: (draw: T, canvasContext: CanvasRenderingContext2D) => void;
}
