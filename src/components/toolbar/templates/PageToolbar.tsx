import React from "react";
import { ToggleButton } from "../atoms/ToggleButton";
import { PAGE_SIZE_OPTIONS, PageSizeId, ZOOM_OPTIONS } from "@/components/toolbar/pageConfig";
import { Separator } from "@/components/ui/separator";
import { ToolbarSelector } from "@/components/toolbar/atoms/ToolbarSelector";
import { Button } from "@/components/ui/button";
import { useToolbar } from "@/components/toolbar/contexts/toolbar";

const PageToolbar = () => {
  const { pageToolbar, pageToolbarActions: actions } = useToolbar();

  const toggleButtons = [
    {
      label: "Header & Footer",
      visible: pageToolbar.headerFooterVisible,
      onClick: actions.toggleHeaderFooter,
    },
    {
      label: "Margins",
      visible: pageToolbar.marginsVisible,
      onClick: actions.toggleMargins,
    },
    {
      label: "Rulers",
      visible: pageToolbar.rulersVisible,
      onClick: actions.toggleRulers,
    },
    {
      label: "Character Count",
      visible: pageToolbar.characterCountVisible,
      onClick: actions.toggleCharacterCount,
    },
    {
      label: "Watermark",
      visible: pageToolbar.watermarkEnabled,
      onClick: actions.toggleWatermark,
    },
  ];

  return (
    <div className="flex items-center flex-wrap bg-[#f2edf7] px-2 py-1 gap-2 w-full">
      {toggleButtons.map(({ label, visible, onClick }, index) => (
        <React.Fragment key={label}>
          <ToggleButton
            label={label}
            isVisible={visible}
            onClick={onClick}
          />
          {index < toggleButtons.length - 1 && (
            <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />
          )}
        </React.Fragment>
      ))}

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">Zoom</span>
        <ToolbarSelector
          title="Zoom"
          value={pageToolbar.zoom}
          onChange={(zoom: string) => actions.setZoom(zoom)}
          options={ZOOM_OPTIONS}
          placeholder="Select a zoom"
          className="font-semibold text-[#523D66]"
        />
      </div>

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">Page Size</span>
        <ToolbarSelector
          title="Page Size"
          value={pageToolbar.pageSize}
          onChange={(pageSize: string) => actions.setPageSize(pageSize as PageSizeId)}
          options={PAGE_SIZE_OPTIONS}
          placeholder="Select a page size"
          className="font-semibold text-[#523D66]"
        />
      </div>

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      <Button
        className={
          "text-[#242424] bg-transparent text-sm font-medium font-['Avenir_Next'] flex items-center gap-1 p-2 rounded-lg hover:!bg-white/80"
        }
        onClick={actions.insertPageBreak}
      >
        Insert Page Break
      </Button>
    </div>
  );
};

export default PageToolbar;
