import { useAtomValue } from "jotai";
import { NotePicker } from "./NotePicker";
import { selectedShapeAtom } from "@/atoms/common";
import { updateShapeById } from "@/func/common";

export const EditShape = () => {
  const selectedShape = useAtomValue(selectedShapeAtom);
  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Edit shape</legend>
      <div className="grid gap-2">
        <label htmlFor="frequency" className="text-sm font-medium">
          Frequency
        </label>
        <NotePicker
          value={String(selectedShape?.frequency)}
          onChange={(frequency) => {
            selectedShape && updateShapeById(selectedShape.id, { frequency });
          }}
        />
      </div>
    </fieldset>
  );
};
