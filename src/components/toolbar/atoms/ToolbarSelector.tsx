import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface ToolbarSelectorProps {
  title: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
}

export const ToolbarSelector = ({
  title,
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: ToolbarSelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger
      className={cn("p-1 rounded-none border-none shadow-none max-w-max", className)}
      title={title}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ label, value }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
