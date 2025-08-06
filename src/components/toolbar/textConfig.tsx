import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  FoldHorizontal,
  FoldVertical,
  Highlighter,
  ImageIcon,
  Italic,
  LinkIcon,
  Strikethrough,
  Subscript,
  Superscript,
  Table2Icon,
  UnderlineIcon,
} from "lucide-react";
import {
  FontOption,
  ToolbarButtonConfig,
  AlignmentButtonConfig,
} from "./types";
import { TextToolbarActions } from "@/components/toolbar/hooks/useTextToolbar";

// Configuration for font families
export const FONT_FAMILIES: FontOption[] = [
  { value: "Avenir Next", label: "Avenir Next" },
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Helvetica", label: "Helvetica" },
];

// Configuration for font sizes
export const FONT_SIZES = [
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
] as const;

export const FONT_STYLES = [
  "Regular",
  "Title",
  "Subtitle",
  "Body",
  "Heading 1",
  "Heading 2",
  "Heading 3",
] as const;

export type ZeroArgActionKeys<T> = {
  [K in keyof T]: T[K] extends () => void ? K : never;
}[keyof T];

export type ZeroArgTextActions = Pick<TextToolbarActions, ZeroArgActionKeys<TextToolbarActions>>;
export type ZeroArgTextButtonConfig = ToolbarButtonConfig<keyof ZeroArgTextActions>;

// Configuration for text formatting buttons
export const TEXT_FORMATTING_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "bold",
    icon: Bold,
    action: "toggleBold",
    tooltip: "Bold (Ctrl+B)",
  },
  {
    key: "italic",
    icon: Italic,
    action: "toggleItalic",
    tooltip: "Italic (Ctrl+I)",
  },
  {
    key: "underline",
    icon: UnderlineIcon,
    action: "toggleUnderline",
    tooltip: "Underline (Ctrl+U)",
  },
  {
    key: "strike",
    icon: Strikethrough,
    action: "toggleStrike",
    tooltip: "Strikethrough (Ctrl+Shift+S)",
  },
  {
    key: "link",
    icon: LinkIcon,
    action: "addLink",
    tooltip: "Insert link (Ctrl+K)",
  },
];

// Configuration for text style buttons
export const TEXT_STYLE_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "baseline",
    icon: Baseline,
    action: "toggleBaseline",
    tooltip: "Text color",
  },
  {
    key: "highlight",
    icon: Highlighter,
    action: "toggleHighlight",
    tooltip: "Highlight (Ctrl+Alt+H)",
  },
];

// Configuration for alignment buttons
export const ALIGNMENT_BUTTONS: AlignmentButtonConfig[] = [
  {
    key: "left",
    icon: AlignLeft,
    value: "left",
    tooltip: "Align left (Ctrl+Shift+L)",
  },
  {
    key: "center",
    icon: AlignCenter,
    value: "center",
    tooltip: "Align center (Ctrl+Shift+E)",
  },
  {
    key: "right",
    icon: AlignRight,
    value: "right",
    tooltip: "Align right (Ctrl+Shift+R)",
  },
  {
    key: "justify",
    icon: AlignJustify,
    value: "justify",
    tooltip: "Justify (Ctrl+Shift+J)",
  },
];

// Configuration for script buttons
export const SCRIPT_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "subscript",
    icon: Subscript,
    action: "toggleSubscript",
    tooltip: "Subscript (Ctrl+,)",
  },
  {
    key: "superscript",
    icon: Superscript,
    action: "toggleSuperscript",
    tooltip: "Superscript (Ctrl+.)",
  },
];

// Configuration for spacing buttons
export const SPACING_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "lineSpacing",
    icon: FoldVertical,
    action: "toggleLineSpacing",
    tooltip: "Line spacing",
  },
  {
    key: "paragraphSpacing",
    icon: FoldHorizontal,
    action: "toggleParagraphSpacing",
    tooltip: "Paragraph spacing",
  },
];

// Configuration for insert buttons
export const INSERT_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "table",
    icon: Table2Icon,
    action: "insertTable",
    tooltip: "Insert table (Ctrl+Alt+T)",
  },
  {
    key: "image",
    icon: ImageIcon,
    action: "insertImage",
    tooltip: "Insert image (Ctrl+Alt+I)",
  },
];
