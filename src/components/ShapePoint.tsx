import { Tetrahedron } from "@react-three/drei";
import { TPoint } from "../types";
import { useAtom, useAtomValue } from "jotai";
import {
  currentFlowPointAtom,
  hoveredPointIdAtom,
  selectedPointIdAtom,
} from "../atoms/common";
import { Color } from "@react-three/fiber";
import { useEffect } from "react";
import { Synth, now } from "tone";

const synth = new Synth().toDestination();

export const ShapePoint = ({ point }: { point: TPoint }) => {
  const [, setHoveredId] = useAtom(hoveredPointIdAtom);
  const [, setSelectedId] = useAtom(selectedPointIdAtom);

  const currentFlowPoint = useAtomValue(currentFlowPointAtom);
  const isCurrent = currentFlowPoint?.id === point.id;
  // useEffect(() => {
  //   if (isCurrent) {
  //     synth.triggerAttackRelease("C4", "8n");
  //   }
  // }, [isCurrent]);

  let color: Color = "white";
  if (isCurrent) {
    color = "red";
  }

  return (
    <>
      <Tetrahedron
        position={[point.x, point.y, point.z]}
        args={[0.5, 1]}
        onPointerEnter={() => {
          setHoveredId(point.id);
        }}
        onPointerLeave={() => {
          setHoveredId(null);
        }}
        onPointerDown={() => {
          setSelectedId(point.id);
        }}
      >
        {isCurrent && (
          <pointLight position={[0, 0, 1]} intensity={5} color={"red"} />
        )}

        <meshBasicMaterial color={color} wireframe />
      </Tetrahedron>
    </>
  );
};
