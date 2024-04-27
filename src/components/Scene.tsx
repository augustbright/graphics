import { css } from "@emotion/css";
import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import { useAtom, useAtomValue } from "jotai";
import {
  grabPointIdAtom,
  hoveredPointAtom,
  planePointAtom,
} from "../atoms/common";
import { addPoint } from "../func/common";
import { PointerEvent, useRef, useState } from "react";
import { PointSelection } from "./PointSelection";
import {
  Camera,
  Raycaster,
  Vector3,
  Plane as ThreePlane,
  Vector2,
} from "three";
import { Shapes } from "./Shapes";

const raycaster = new Raycaster();
const plane = new ThreePlane(new Vector3(0, 0, 1), 0);

export const Scene = () => {
  const camera = useRef(null);

  const getEventPoint = (event: PointerEvent) => {
    const intersection = new Vector3();
    const uv = new Vector2();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    uv.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    uv.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(uv, camera.current as unknown as Camera);
    raycaster.ray.intersectPlane(plane, intersection);
    return intersection;
  };

  const [pointMoved, setPointMoved] = useState(false);

  const [planePoint, setPlanePoint] = useAtom(planePointAtom);
  const hoveredAtom = useAtomValue(hoveredPointAtom);
  const [grabId, setGrabId] = useAtom(grabPointIdAtom);
  const handlePointerDown = () => {
    setPointMoved(false);
    if (hoveredAtom) {
      setGrabId(hoveredAtom.id);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    setPointMoved(true);
    const eventPoint = getEventPoint(event);

    setPlanePoint(eventPoint.clone());
  };
  const handlePointerUp = (event: PointerEvent) => {
    if (grabId) {
      setGrabId(null);
      return;
    }
    if (pointMoved) {
      return;
    }
    if (hoveredAtom) {
      return;
    }
    const eventPoint = getEventPoint(event);
    addPoint(eventPoint.clone());
  };
  return (
    <div
      className={css`
        border: solid 1px black;
        flex: 1 1 auto;
        display: flex;
        align-items: stretch;
        > div {
          flex: 1 1 auto;
          height: unset !important;
        }
      `}
    >
      <Canvas
        // @ts-expect-error - OrbitControls typings are incorrect
        camera={camera}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <gridHelper rotation={[Math.PI / 2, 0, 0]} />
        <pointLight
          position={[planePoint.x, planePoint.y, 1]}
          intensity={hoveredAtom ? 10.5 : 5}
          color={grabId ? "yellow" : "white"}
        />
        <ambientLight intensity={0.1} />
        <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 10]} />
        <OrbitControls
          makeDefault
          enabled={!grabId}
          panSpeed={1}
          mouseButtons={{
            LEFT: 2, // rotate
            MIDDLE: 0, // zoom
            RIGHT: 1, // pan
          }}
          screenSpacePanning
        />

        <Plane args={[1000, 1000, 10, 10]} position={[0, 0, -1]}>
          <meshPhongMaterial color="gray" />
        </Plane>
        <Shapes />
        <PointSelection />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};
