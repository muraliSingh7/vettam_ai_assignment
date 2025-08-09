import React from "react";
import { ToolbarSelector } from "@/components/toolbar/atoms/ToolbarSelector";
import { Separator } from "@/components/ui/separator";
import { ToolbarButtonGroup } from "@/components/toolbar/molecules/ToolbarButtonGroup";
import { List } from "lucide-react";
import { ToolbarButton } from "@/components/toolbar/atoms/ToolbarButton";
import {
  FONT_FAMILIES,
  FONT_SIZES,
  TEXT_FORMATTING_BUTTONS,
  TEXT_STYLE_BUTTONS,
  // ALIGNMENT_BUTTONS,
  SCRIPT_BUTTONS,
  SPACING_BUTTONS,
  INSERT_BUTTONS,
  FONT_STYLES,
} from "../textConfig";
import { useToolbar } from "../contexts/toolbar";


export const TextToolbar = () => {
  const { textToolbar, textToolbarActions: actions } = useToolbar();
  console.log(textToolbar?.fontSize);
  return (
    <div className="flex items-center flex-wrap bg-[#f2edf7] px-2 py-1 gap-2 w-full">
      {/* Font Family Selector */}
      <ToolbarSelector
        title="font-family"
        value={textToolbar?.fontFamily}
        onChange={actions.setFontFamily}
        options={FONT_FAMILIES}
        placeholder="Select font"
      />

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Font Weight Selector */}
      <ToolbarSelector
        title="font-style"
        value={textToolbar?.fontStyle}
        onChange={actions.setFontStyle}
        options={FONT_STYLES}
        placeholder="Select style"
      />

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Font Size Selector */}
      <ToolbarSelector
        title="font-size"
        value={textToolbar?.fontSize}
        onChange={actions.setFontSize}
        options={FONT_SIZES}
        placeholder="Size"
      />

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Text Formatting Buttons */}
      <div className="flex items-center p-1">
        <ToolbarButtonGroup
          buttons={TEXT_FORMATTING_BUTTONS}
          actions={actions}
          state={textToolbar}
        />
      </div>

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Text Style Buttons */}
      <div className="flex items-center p-1">
        <ToolbarButtonGroup
          buttons={TEXT_STYLE_BUTTONS}
          actions={actions}
          state={textToolbar}
        />
      </div>

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Alignment Buttons */}
      {/* <ToolbarSelector
        buttons={ALIGNMENT_BUTTONS}
        actions={actions}
        currentValue={textToolbar.textAlign}
      /> */}

      {/* List Button */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={List}
          onClick={actions.toggleBulletList}
          tooltip="Bullet list (Ctrl+Shift+8)"
        />
      </div>

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Script Buttons */}
      <ToolbarButtonGroup
        buttons={SCRIPT_BUTTONS}
        actions={actions}
        state={textToolbar}
      />

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Spacing Buttons */}
      <ToolbarButtonGroup
        buttons={SPACING_BUTTONS}
        actions={actions}
        state={textToolbar}
      />

      <Separator orientation="vertical" className="!h-9 bg-[#bbb9bd]" />

      {/* Insert Buttons */}
      <ToolbarButtonGroup
        buttons={INSERT_BUTTONS}
        actions={actions}
        state={textToolbar}
      />
    </div>
  );
};
