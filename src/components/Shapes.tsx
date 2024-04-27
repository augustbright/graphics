import { shapesAtom } from "../atoms/common";
import { useAtomValue } from "jotai";
import { Shape } from "./Shape";

export const Shapes = () => {
  const shapes = useAtomValue(shapesAtom);

  return (
    <>
      {shapes.map((shape) => (
        <Shape key={shape.id} shape={shape} />
      ))}
    </>
  );
};
