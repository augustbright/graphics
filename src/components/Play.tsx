import { bpmAtom } from "@/atoms/common";
import { css } from "@emotion/css";
import { useAtom } from "jotai";
import { Metronome } from "./Metronome";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const Play = () => {
  const [bpm, setBpm] = useAtom(bpmAtom);
  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Play</legend>
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Metronome />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Tempo</Label>
        <Input
          value={bpm}
          onChange={(e) => setBpm(Number(e.currentTarget.value))}
          type="number"
          min={1}
        />
      </div>
    </fieldset>
  );
};
