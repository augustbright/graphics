import { Tetrahedron } from "@react-three/drei";
import { TPoint } from "../types";
import { useAtom } from "jotai";
import { hoveredPointIdAtom, selectedPointIdAtom } from "../atoms/common";
import { useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Sphere,
  SphereGeometry,
} from "three";
import { runInALoop } from "@/loop";

export const ShapePoint = ({
  point,
  isSelectedShape,
}: {
  point: TPoint;
  isSelectedShape: boolean;
}) => {
  const [, setHoveredId] = useAtom(hoveredPointIdAtom);
  const [, setSelectedId] = useAtom(selectedPointIdAtom);

  return (
    <>
      <Tetrahedron
        position={point.position}
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
        <meshBasicMaterial
          color={isSelectedShape ? "yellow" : "white"}
          wireframe
        />
      </Tetrahedron>
    </>
  );
};
