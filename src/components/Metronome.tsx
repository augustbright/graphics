import { css } from "@emotion/css";
import { useAtomValue } from "jotai";
import { currentAngleAtom, flowEnabledAtom } from "../atoms/common";
import { useAtom } from "jotai";
import { Button } from "@mui/material";

export const Metronome = () => {
  const angle = useAtomValue(currentAngleAtom);
  const [flowEnabled, setFlowEnabled] = useAtom(flowEnabledAtom);
  const handleClick = () => {
    setFlowEnabled(!flowEnabled);
  };

  return (
    <Button
      variant="outlined"
      className={css`
        display: flex !important;
        align-items: stretch !important;
        justify-content: center !important;
        padding: 8px !important;

        width: 100px;
        height: 100px;
        border-radius: 50% !important;
      `}
      color={flowEnabled ? "success" : "warning"}
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
