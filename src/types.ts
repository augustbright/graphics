import { Vector3 } from "three";
import { Frequency, Time } from "tone/build/esm/core/type/Units";

export type TVector3 = Vector3;

export type TPoint = {
  id: string;
  position: TVector3;
};

export type TShape = {
  id: string;
  frequency: Frequency;
  duration: Time;
  points: Array<TPoint>;
};
