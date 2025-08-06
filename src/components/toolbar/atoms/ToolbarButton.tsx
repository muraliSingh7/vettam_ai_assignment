import { Button } from "@/components/ui/button";
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
    variant={isActive ? "default" : "ghost"}
    size="icon"
    onClick={onClick}
    title={tooltip}
    className="hover:bg-[#e6dcef] group"
  >
    <Icon className="w-4 h-4 text-[#242424] group-hover:!text-[#694c80]" />
  </Button>
);
