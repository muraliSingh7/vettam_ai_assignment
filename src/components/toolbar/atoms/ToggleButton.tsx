import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface ToggleButtonProps {
  label: string;
  isVisible: boolean;
  onClick: () => void;
}
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isVisible,
  onClick,
}) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "text-[#242424] text-sm font-medium font-['Avenir_Next'] flex items-center gap-1 p-1 rounded-lg hover:bg-white/80",
      isVisible && "bg-white"
    )}
    onClick={onClick}
  >
    <span className="text-sm">{label}</span>
    {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
  </Button>
);
