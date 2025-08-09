import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  tooltip: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon: Icon,
  isActive = false,
  onClick,
  tooltip,
}) => (
<Button
  variant="ghost"
  size="icon"
  onClick={onClick}
  title={tooltip}
  className={cn(
    "group",
    isActive ? "bg-[#e6dcef]" : "hover:bg-[#e6dcef]"
  )}
>
  <Icon
    className={cn(
      "w-4 h-4 text-[#242424]",
      isActive ? "!text-[#694c80]" : "group-hover:!text-[#694c80]"
    )}
  />
</Button>
);
