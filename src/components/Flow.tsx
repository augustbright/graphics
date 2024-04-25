import { useAtomValue } from "jotai";
import { flowPositionAtom } from "../atoms/common";

export const Flow = () => {
  const flowPosition = useAtomValue(flowPositionAtom);
  if (!flowPosition) {
    return null;
  }

  return (
    <>
      <pointLight
        position={flowPosition.clone().add({ x: 0, y: 0, z: 1 })}
        intensity={10}
        color={"red"}
      />
      <mesh position={flowPosition}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};
