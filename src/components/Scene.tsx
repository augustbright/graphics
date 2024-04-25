import { css } from "@emotion/css";
import { Canvas, ThreeEvent } from "@react-three/fiber";
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
  shapeAtom,
} from "../atoms/common";
import { addPoint } from "../func/common";
import { useState } from "react";
import { Shape } from "./Shape";
import { NewPointPreview } from "./NewPointPreview";
import { Flow } from "./Flow";
import { PointSelection } from "./PointSelection";
import { effectsAtom } from "../atoms/effects";

export const Scene = () => {
  useAtom(effectsAtom);
  const [pointMoved, setPointMoved] = useState(false);

  const [planePoint, setPlanePoint] = useAtom(planePointAtom);
  const hoveredAtom = useAtomValue(hoveredPointAtom);
  const [grabId, setGrabId] = useAtom(grabPointIdAtom);
  const [shape, setShape] = useAtom(shapeAtom);
  const handlePointerDown = () => {
    setPointMoved(false);
    if (hoveredAtom) {
      setGrabId(hoveredAtom.id);
    }
  };
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    setPointMoved(true);
    setPlanePoint({
      x: event.point.x,
      y: event.point.y,
      z: event.point.z,
    });

    if (grabId) {
      setShape(
        shape.map((point) => {
          if (point.id === grabId) {
            return {
              ...point,
              x: event.point.x,
              y: event.point.y,
              z: event.point.z,
            };
          }
          return point;
        })
      );
    }
  };
  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
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
    addPoint({
      x: event.point.x,
      y: event.point.y,
      z: event.point.z,
    });
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
      <Canvas>
        <pointLight
          position={[planePoint.x, planePoint.y, 1]}
          intensity={hoveredAtom ? 10.5 : 5}
          color={grabId ? "yellow" : "white"}
        />
        <ambientLight intensity={0.1} />
        <PerspectiveCamera makeDefault position={[0, 0, 100]} />
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

        <Plane
          args={[10, 10, 10, 10]}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          <meshStandardMaterial wireframe color="gray" />
        </Plane>
        <Shape />
        <PointSelection />
        <NewPointPreview />
        <Flow />
        <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[80, 80]} // widget margins (X, Y)
          // onUpdate={() => {} /* called during camera animation  */}
          // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
          // renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
        >
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
      </Canvas>
    </div>
  );
};
