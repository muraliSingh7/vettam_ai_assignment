import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const EditorTab: React.FC<EditorTabProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <Button
    variant="ghost"
    className={cn(
      "text-sm text-center font-['Avenir_Next'] rounded-tl-lg rounded-tr-lg rounded-b-none hover:bg-[#f2edf7] hover:text-[#694c80]",
      isActive && "bg-[#e6dcef] text-[#523D66] font-semibold",
      !isActive && "bg-transparent text-[#4E4E50]"
    )}
    onClick={onClick}
  >
    {label}
  </Button>
);
