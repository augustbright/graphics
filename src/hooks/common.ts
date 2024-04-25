import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export const useTween = ({
  start,
  end,
  time,
}: {
  start: number;
  end: number;
  time: number;
}) => {
  const [offset, setOffset] = useState(start);

  useFrame((_, delta) => {
    setOffset((offset) => {
      const diff = end - start;
      const speed = diff / time;
      const newOffset = offset + speed * delta;
      if (speed > 0 && newOffset > end) {
        return newOffset - end + start;
      }
      if (speed < 0 && newOffset < end) {
        return newOffset + end - start;
      }
      return newOffset;
    });
  });

  return offset;
};
