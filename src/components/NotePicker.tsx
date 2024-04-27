import cn from "classnames";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "./ui/command";
import { Command as CommandP } from "cmdk";

const notes = ["A", "B", "C", "D", "E", "F", "G"]
  .flatMap((note) => Array.from({ length: 8 }, (_, i) => `${note}${i + 1}`))
  .map((note) => ({ label: note, value: note }));

export const NotePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? notes.find((note) => note.value === value)?.label
            : "Select note..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />

          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>

            <CommandGroup>
              {notes.map((note) => (
                <CommandP.Item
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground "
                  key={note.value}
                  disabled={false}
                  value={note.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === note.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {note.label}
                </CommandP.Item>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
