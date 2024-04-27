import { css } from "@emotion/css";
import { currentAngleAtom, flowEnabledAtom } from "../atoms/common";
import { useAtom } from "jotai";
import { Button } from "./ui/button";

export const Metronome = () => {
  const [angle, setAngle] = useAtom(currentAngleAtom);
  const [flowEnabled, setFlowEnabled] = useAtom(flowEnabledAtom);
  const handleClick = () => {
    setFlowEnabled(!flowEnabled);
    setAngle(0);
  };

  return (
    <Button
      variant={flowEnabled ? "outline" : "destructive"}
      className={css`
        display: flex !important;
        align-items: stretch !important;
        justify-content: center !important;
        padding: 8px !important;

        width: 100px;
        height: 100px;
        border-radius: 50% !important;
      `}
      onClick={handleClick}
    >
      <div
        className={css`
          flex-direction: column;
          transform: rotate(${angle}deg);
        `}
      >
        <div
          className={css`
            width: 2px;
            height: 50%;
            background-color: white;
          `}
        ></div>
        <div
          className={css`
            width: 2px;
            height: 50%;
            background-color: transparent;
          `}
        ></div>
      </div>
    </Button>
  );
};
