import cn from "classnames";
import { css } from "@emotion/css";
import { Play } from "./Play";
import { EditShape } from "./EditShape";
import { useAtomValue } from "jotai";
import { selectedShapeAtom } from "@/atoms/common";

export const Sidebar = () => {
  const selectedShape = useAtomValue(selectedShapeAtom);
  return (
    <aside
      className={cn(
        css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 200px;
          padding: 16px;
        `,
        "border-r"
      )}
    >
      <Play />
      {selectedShape && <EditShape />}
    </aside>
  );
};
