export type TVector3 = {
  x: number;
  y: number;
  z: number;
};

export type TPoint = TVector3 & {
  id: string;
};

export type TShape = Array<TPoint>;
