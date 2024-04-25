import { css } from "@emotion/css";
import { TVector3 } from "../types";

export const VectorDataView = ({ vector }: { vector: TVector3 }) => {
  return (
    <div
      className={css`
        font-size: 10px;
        font-family: monospace;
        font-weight: bold;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        gap: 4px;
      `}
    >
      <span
        className={css`
          color: #f00;
        `}
      >
        {vector.x.toFixed(2)}
      </span>
      <span
        className={css`
          color: #0f0;
        `}
      >
        {vector.y.toFixed(2)}
      </span>
      <span
        className={css`
          color: #00f;
        `}
      >
        {vector.z.toFixed(2)}
      </span>
    </div>
  );
};
