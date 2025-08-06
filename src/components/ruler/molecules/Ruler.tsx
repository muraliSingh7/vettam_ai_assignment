import { Tick } from "@/components/ruler/atoms/Tick";
import { Marker } from "@/components/ruler/atoms/Marker";
import { useToolbar } from "@/components/toolbar/contexts/toolbar";
import { PAGE_SIZES } from "@/components/toolbar/pageConfig";
import {
  Direction,
  TickType,
  MarkerType,
  BASE_DPI,
} from "@/components/ruler/types";

interface GenerateTicksParams {
  pageSizeInches: number;
  direction: Direction;
  zoom: number;
  margins: Record<string, number>;
  currentPage?: string;
}

const generateTicks = ({
  pageSizeInches,
  direction,
  zoom,
  margins = {},
}: GenerateTicksParams) => {
  const ticks = [];
  const effectiveDPI = BASE_DPI * zoom;
  const pageSizePx = pageSizeInches * effectiveDPI;
  for (let i = 0; i <= pageSizePx; i += effectiveDPI / 16) {
    const sixteenths = Math.round((i * 16) / effectiveDPI);
    const inches = sixteenths / 16;

    let type: TickType = "smallest";
    let label: string | null = null;

    if (sixteenths >= 0 && sixteenths % 16 === 0) {
      type = "major";
      label = inches.toString();
    } else if (sixteenths % 8 === 0) {
      type = "medium";
    } else if (sixteenths % 4 === 0) {
      type = "minor";
    }

    let isActive = false;

    if (direction === "horizontal") {
      const leftMarginPx = (margins.left ?? 0) * effectiveDPI;
      const rightMarginPx = pageSizePx - (margins.right ?? 0) * effectiveDPI;

      isActive = i >= leftMarginPx && i <= rightMarginPx;
    } else {
      const topMarginPx = (margins.top ?? 0) * effectiveDPI;
      const bottomMarginPx = pageSizePx - (margins.bottom ?? 0) * effectiveDPI;

      isActive = i >= topMarginPx && i <= bottomMarginPx;
    }

    ticks.push({
      id: `${direction === "horizontal" ? "h" : "v"}-tick-${i}`,
      position: i,
      type,
      label,
      isActive,
    });
  }

  return ticks;
};

interface RulerProps {
  children: React.ReactNode;
}

export const Ruler: React.FC<RulerProps> = ({ children }) => {
  const { pageToolbar, pagePadding, pageToolbarActions } = useToolbar();
  const zoom = parseInt(pageToolbar.zoom.replace("%", "")) / 100;
  const pageWidthInches = parseFloat(
    PAGE_SIZES[pageToolbar.pageSize].width.replace("in", "")
  );
  const pageHeightInches = parseFloat(
    PAGE_SIZES[pageToolbar.pageSize].height.replace("in", "")
  );

  const markerLeftPos = pagePadding.left * zoom;
  const markerRightPos = (pageWidthInches - pagePadding.right) * zoom;
  const markerTopPos = pagePadding.top * zoom;
  const markerBottomPos = (pageHeightInches - pagePadding.bottom) * zoom;

  const verticalTicks = generateTicks({
    pageSizeInches: pageHeightInches,
    direction: "vertical",
    zoom,
    margins: { top: pagePadding.top, bottom: pagePadding.bottom },
  });

  const horizontalTicks = generateTicks({
    pageSizeInches: pageWidthInches,
    direction: "horizontal",
    zoom,
    margins: { left: pagePadding.left, right: pagePadding.right },
  });

  const handleMouse = (
    e: React.MouseEvent,
    type: MarkerType,
    initialPaddingInches: number
  ) => {
    const isVertical = type === "top" || type === "bottom";
    const startMousePos = isVertical ? e.clientY : e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const currentMousePos = isVertical
        ? moveEvent.clientY
        : moveEvent.clientX;
      const deltaPx = currentMousePos - startMousePos;
      const deltaInches = deltaPx / (BASE_DPI * zoom);
      let newPadding =
        type === "right" || type === "bottom"
          ? initialPaddingInches - deltaInches
          : initialPaddingInches + deltaInches;

      // Lower bound check
      if (newPadding < 0) newPadding = 0;

      // Upper bound check
      if (type === "left" || type === "right") {
        if (newPadding > pageWidthInches) newPadding = pageWidthInches;
      } else if (type === "top" || type === "bottom") {
        if (newPadding > pageHeightInches) newPadding = pageHeightInches;
      }

      pageToolbarActions.handlePagePaddingChanges(type, newPadding);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (!pageToolbar.rulersVisible) {
    return <div className="flex-2 bg-[#f8f9fa]">{children}</div>;
  }

  return (
    <div className="flex flex-row flex-2 bg-[#f8f9fa] overflow-auto scrollbar-thin scrollbar-thumb-[#694c80] scrollbar-track-transparent">
      <div
        className="flex flex-row bg-[#f8f9fa] mt-15"
        style={{ height: `${pageHeightInches}in` }}
      >
        {/* Vertical padding handles */}
        <div className="relative w-4">
          <Marker
            type="top"
            position={markerTopPos}
            onDrag={(e) => handleMouse(e, "top", pagePadding.top)}
            zoom={zoom}
          />
          <Marker
            type="bottom"
            position={markerBottomPos}
            onDrag={(e) => handleMouse(e, "bottom", pagePadding.bottom)}
            zoom={zoom}
          />
        </div>
        {/* relative */}
        <div
          className="flex flex-col justify-around border-r border-gray-400"
          style={{ height: `${pageHeightInches}in` }}
        >
          {verticalTicks.map((tick) => (
            <Tick key={tick.id} {...tick} direction="vertical" />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-2 ">
        <div className="mx-auto" style={{ width: `${pageWidthInches}in` }}>
          {/* relative */}
          {/* Horizontal padding handles */}
          <div className="relative h-5">
            <Marker
              type="left"
              position={markerLeftPos}
              onDrag={(e) => handleMouse(e, "left", pagePadding.left)}
              zoom={zoom}
            />
            <Marker
              type="right"
              position={markerRightPos}
              onDrag={(e) => handleMouse(e, "right", pagePadding.right)}
              zoom={zoom}
            />
          </div>
          <div className="flex flex-row justify-around border-b border-gray-400">
            {horizontalTicks.map((tick) => (
              <Tick key={tick.id} {...tick} direction="horizontal" />
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
