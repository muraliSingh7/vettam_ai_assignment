import { LucideIcon } from "lucide-react";
import { FONT_FAMILIES, FONT_SIZES, FONT_STYLES } from "./textConfig";

export interface FontOption {
  value: string;
  label: string;
}

export interface ToolbarButtonConfig<T extends string> {
  key: string;
  icon: LucideIcon;
  shortcut?: string;
  tooltip: string;
  action: T;
}

export interface AlignmentButtonConfig {
  key: string;
  icon: LucideIcon;
  value: TextAlignment;
  shortcut?: string;
  tooltip: string;
}

export type TextAlignment = "left" | "center" | "right" | "justify";
export type FontFamily = typeof FONT_FAMILIES[number];
export type FontSize = typeof FONT_SIZES[number];
export type FontStyle = typeof FONT_STYLES[number];