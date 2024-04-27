import { ShapePoint } from "./ShapePoint";
import { Line } from "@react-three/drei";
import { useTween } from "../hooks/common";
import { TShape } from "../types";
import { useAtomValue } from "jotai";
import {
  currentAngleAtom,
  flowEnabledAtom,
  hoveredPointIdAtom,
  selectedShapeAtom,
} from "../atoms/common";
import { NewPointPreview } from "./NewPointPreview";
import { Flow } from "./Flow";
import { calculateCurrentFlowPoint } from "@/func/shape";
import { useEffect } from "react";
import { playShapeSound } from "@/func/common";
import { useThree } from "@react-three/fiber";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { runInALoop } from "@/loop";

export const Shape = ({ shape }: { shape: TShape }) => {
  const { points } = shape;
  const offset = useTween({ start: 2, end: 0, time: 1 });
  const selectedShape = useAtomValue(selectedShapeAtom);
  const isSelected = selectedShape?.id === shape.id;
  const flowEnabled = useAtomValue(flowEnabledAtom);
  const hoveredId = useAtomValue(hoveredPointIdAtom);
  const currentFlowPoint = calculateCurrentFlowPoint(
    shape,
    useAtomValue(currentAngleAtom)
  );
  const { scene } = useThree();

  useEffect(() => {
    if (!currentFlowPoint) {
      return;
    }
    const originalRadius = 0.1;
    const geometry = new SphereGeometry(originalRadius, 16, 16);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(
      currentFlowPoint.position.x,
      currentFlowPoint.position.y,
      currentFlowPoint.position.z
    );
    let newRadius = originalRadius;
    runInALoop((delta) => {
      newRadius += 0.1 * delta;

      if (sphere.scale.x > 15) {
        scene.remove(sphere);
        return false;
      }

      sphere.scale.set(newRadius, newRadius, newRadius);

      return true;
    });
    scene.add(sphere);

    playShapeSound(shape.id);
  }, [currentFlowPoint?.id, shape.id]);

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
