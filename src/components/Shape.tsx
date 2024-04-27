import { ShapePoint } from "./ShapePoint";
import { Line } from "@react-three/drei";
import { useTween } from "../hooks/common";
import { TShape } from "../types";
import { useAtomValue } from "jotai";
import {
  flowEnabledAtom,
  hoveredPointIdAtom,
  selectedShapeAtom,
} from "../atoms/common";
import { NewPointPreview } from "./NewPointPreview";
import { Flow } from "./Flow";

export const Shape = ({ shape }: { shape: TShape }) => {
  const { points } = shape;
  const offset = useTween({ start: 2, end: 0, time: 1 });
  const selectedShape = useAtomValue(selectedShapeAtom);
  const isSelected = selectedShape?.id === shape.id;
  const flowEnabled = useAtomValue(flowEnabledAtom);
  const hoveredId = useAtomValue(hoveredPointIdAtom);

  return (
    <>
      {points.map((point) => (
        <ShapePoint key={point.id} point={point} isSelectedShape={isSelected} />
      ))}
      {points.length > 1 && (
        <Line
          points={points
            .map((point) => point.position)
            .concat(points[0].position)}
          color={isSelected ? "yellow" : "white"}
          lineWidth={2}
          dashed
          dashOffset={offset}
        />
      )}
      {isSelected && !hoveredId && <NewPointPreview shape={shape} />}
      {flowEnabled && <Flow shape={shape} />}
    </>
  );
};
