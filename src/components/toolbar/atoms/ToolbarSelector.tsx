import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ToolbarSelectorProps<T, TValue extends string> {
  title: string;
  value: TValue;
  onChange: (value: TValue) => void;
  options: T[];
  placeholder: string;
  getLabel: (item: T) => string;
  getValue: (item: T) => TValue;
  className?: string;
}

export const ToolbarSelector = <T, TValue extends string>({
  title,
  value,
  onChange,
  options,
  placeholder,
  getLabel,
  getValue,
  className="",
}: ToolbarSelectorProps<T, TValue>) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger
      className={cn("p-1 rounded-none border-none shadow-none max-w-max", className)}
      title={title}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => {
        const val = getValue(option);
        const label = getLabel(option);

        return (
          <SelectItem key={val} value={val}>
            {label}
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
);
