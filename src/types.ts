import { Vector3 } from "three";

export type TVector3 = Vector3;

export type TPoint = {
  id: string;
  position: TVector3;
};

export type TShape = {
  id: string;
  points: Array<TPoint>;
};
