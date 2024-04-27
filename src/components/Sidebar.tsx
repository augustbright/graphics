import { useAtom, useAtomValue } from "jotai";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  planePointAtom,
  selectedPointAtom,
  soundEnabledAtom,
} from "../atoms/common";
import { VectorDataView } from "./VectorDataView";
import { css } from "@emotion/css";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePoint } from "../func/common";
import { Metronome } from "./Metronome";

export const Sidebar = () => {
  const planePoint = useAtomValue(planePointAtom);
  const selectedPoint = useAtomValue(selectedPointAtom);
  const [soundEnabled, setSoundEnabled] = useAtom(soundEnabledAtom);
  return (
    <aside
      className={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 200px;
        padding: 16px;
        background-color: #303030;
      `}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Metronome />
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
                color="primary"
                icon={<VolumeOffIcon />}
                checkedIcon={<VolumeUpIcon />}
              />
            }
            label="Sound"
          />
        </FormGroup>
      </div>
      <Button
        disabled={!selectedPoint}
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => {
          if (selectedPoint) {
            deletePoint(selectedPoint.id);
          }
        }}
      >
        Delete
      </Button>
      <h1>sidebar</h1>

      <VectorDataView vector={planePoint} />
    </aside>
  );
};
