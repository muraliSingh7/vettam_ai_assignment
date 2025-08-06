import React from "react";
import { Triangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MarkerType } from "@/components/ruler/types";

interface MarkerProps {
  type: MarkerType;
  position: number;
  onDrag: (e: React.MouseEvent) => void;
  zoom: number;
}

const typeLabelMap: Record<MarkerProps["type"], string> = {
  top: "Top Margin",
  bottom: "Bottom Margin",
  left: "Left Margin",
  right: "Right Margin",
};

export const Marker: React.FC<MarkerProps> = ({
  type,
  position,
  onDrag,
  zoom,
}) => {
  const getPositionStyle = () => {
    const posValue = `${position * zoom}in`;
    if (type === "top" || type === "bottom") return { top: posValue };
    return { left: posValue };
  };

  const getTransformClass = () => {
    if (type === "top" || type === "bottom") return "rotate-90";
    return "rotate-180";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="z-40 cursor-pointer absolute"
            data-type={type}
            style={getPositionStyle()}
            onMouseDown={onDrag}
          >
            <Triangle
              size={14}
              className={cn(
                "text-blue-500 hover:text-blue-600 opacity-70 hover:opacity-100 transition fill-blue-600",

                getTransformClass()
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {typeLabelMap[type]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
