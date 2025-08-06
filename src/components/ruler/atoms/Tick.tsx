import { cn } from "@/lib/utils";
import { TickType, Direction } from "@/components/ruler/types";

interface TickProps {
  type: TickType;
  label: string | null;
  isActive: boolean;
  direction: Direction;
}

export const Tick: React.FC<TickProps> = ({
  type = "smallest",
  label,
  isActive = false,
  direction = "horizontal",
}) => {
  const getTickClass = (): string => {
    if (direction === "horizontal") {
      switch (type) {
        case "major":
          return "w-px h-5";
        case "medium":
          return "w-px h-3";
        case "minor":
          return "w-px h-2";
        default:
          return "w-px h-1";
      }
    } else {
      switch (type) {
        case "major":
          return "h-px w-5";
        case "medium":
          return "h-px w-3";
        case "minor":
          return "h-px w-2"; 
        default:
          return "h-px w-1";
      }
    }
  };

  const tickPositionStyle =
    direction === "horizontal" ? "flex-col-reverse" : "flex-row-reverse";

  return (
    <div className={cn("flex items-center gap-1", tickPositionStyle)}>
      <div
        className={cn("bg-gray-400", isActive && "bg-blue-500", getTickClass())}
      />
      {label && <span className="text-[10px] text-gray-700">{label}</span>}
    </div>
  );
};
