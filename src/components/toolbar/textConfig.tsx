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
import { TextToolbarActions, TextEditorStateSnapshot } from "@/components/toolbar/hooks/useTextToolbar";

// Configuration for font families
export const FONT_FAMILIES = [
  { label: "Avenir Next", value: '"Avenir Next", sans-serif' },
  { label: "Arial", value: 'Arial,sans-serif' },
  { label: "Times New Roman", value: '"Times New Roman", serif' },
  { label: "Georgia", value: 'Georgia, serif' },
  { label: "Verdana", value: 'Verdana, sans-serif' },
  { label: "Courier New", value: '"Courier New", monospace' },
];

// Configuration for font sizes
const fontSizes = [10, 12, 14, 16, 18, 20];

export const FONT_SIZES = fontSizes.map((size) => ({
  label: size.toString(),
  value: `${size}px`,
}));


export const FONT_STYLES = [
  { label: "Regular", value: "normal" },
  { label: "Title", value: "text-2xl font-semibold" },
  { label: "Subtitle", value: "text-xl font-light" },
  { label: "Body", value: "text-base font-normal" },
  { label: "Heading 1", value: "text-4xl font-bold" },
  { label: "Heading 2", value: "text-3xl font-semibold" },
  { label: "Heading 3", value: "text-2xl font-medium" },
];

export type ZeroArgActionKeys<T> = {
  [K in keyof T]: T[K] extends () => void ? K : never;
}[keyof T];

export type ZeroArgTextActions = Pick<TextToolbarActions, ZeroArgActionKeys<TextToolbarActions>>;
export type ZeroArgTextButtonConfig = ToolbarButtonConfig<keyof ZeroArgTextActions> & {
  isActive?: (state: TextEditorStateSnapshot | null) => boolean | undefined
};

// Configuration for text formatting buttons
export const TEXT_FORMATTING_BUTTONS: ZeroArgTextButtonConfig[] = [
  {
    key: "bold",
    icon: Bold,
    action: "toggleBold",
    tooltip: "Bold (Ctrl+B)",
    isActive: (state) => state?.isBold
  },
  {
    key: "italic",
    icon: Italic,
    action: "toggleItalic",
    tooltip: "Italic (Ctrl+I)",
    isActive: (state) => state?.isItalic
  },
  {
    key: "underline",
    icon: UnderlineIcon,
    action: "toggleUnderline",
    tooltip: "Underline (Ctrl+U)",
    isActive: (state) => state?.isUnderline,
  },
  {
    key: "strike",
    icon: Strikethrough,
    action: "toggleStrike",
    tooltip: "Strikethrough (Ctrl+Shift+S)",
    isActive: (state) => state?.isStrike
  },
  {
    key: "link",
    icon: LinkIcon,
    action: "addLink",
    tooltip: "Insert link (Ctrl+K)",
    isActive: (state) => false,
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
