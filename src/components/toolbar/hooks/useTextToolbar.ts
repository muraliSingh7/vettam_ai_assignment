import { useEffect, useMemo, useState } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { FontFamily, FontSize, FontStyle, TextAlignment } from "@/components/toolbar/types";

export interface TextEditorStateSnapshot {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;

  isBold: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isUnderline: boolean;
  isCode: boolean;
  canCode: boolean;
  canClearMarks: boolean;

  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;

  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
}


export interface TextToolbarActions {
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleStrike: () => void;
  setTextAlign: (alignment: TextAlignment) => void;
  setFontSize: (fontSize: string) => void;
  setFontStyle: (fontStyle: string) => void;
  setFontFamily: (fontFamily: string) => void;
  addLink: () => void;
  toggleBaseline: () => void;
  toggleHighlight: () => void;
  toggleBulletList: () => void;
  toggleSubscript: () => void;
  toggleSuperscript: () => void;
  toggleLineSpacing: () => void;
  toggleParagraphSpacing: () => void;
  insertTable: () => void;
  insertImage: () => void;
}


// Helper function to safely merge class strings
const mergeClasses = (existingClasses: string | null, newClasses: string | null): string => {
  const classes = new Set<string>();
  if (existingClasses) {
    existingClasses.split(' ').forEach(cls => cls && classes.add(cls));
  }
  if (newClasses) {
    newClasses.split(' ').forEach(cls => cls && classes.add(cls));
  }
  return Array.from(classes).join(' ');
};


// Helper function to parse style strings
function parseStyleString(style: string): Record<string, string> {
  return style
    .split(';')
    .filter(Boolean)
    .reduce((acc, item) => {
      const [key, val] = item.split(':').map(s => s.trim());
      if (key && val) acc[key] = val;
      return acc;
    }, {} as Record<string, string>);
}

function appendInlineStyle(editor: Editor | null, options: { style?: Record<string, string>; class?: string }) {
  if (!editor) return;
  console.log(options.style, options.class);
  const currentMarkAttributes = editor.getAttributes('style');

  let styleString = '';
  if (options.style) {
    const existingStyle = currentMarkAttributes.style || '';
    const styleMap = parseStyleString(existingStyle);
    const updatedStyles = { ...styleMap, ...options.style };
    styleString = Object.entries(updatedStyles)
      .map(([key, val]) => `${key}: ${val}`)
      .join(';');
  } else if (currentMarkAttributes.style) {
    // If no new styles are provided but existing ones exist, retain them
    styleString = currentMarkAttributes.style;
  }

  let classString = '';
  if (options.class) {
    const existingClass = currentMarkAttributes.class || null;
    classString = mergeClasses(existingClass, options.class);
  } else if (currentMarkAttributes.class) {
    // If no new classes are provided but existing ones exist, retain them
    classString = currentMarkAttributes.class;
  }

  // Prepare the attributes object to pass to setMark
  const markAttributes: Record<string, string> = {};
  if (styleString) {
    markAttributes.style = styleString;
  }
  if (classString) {
    markAttributes.class = classString;
  }

  editor.chain().focus().setMark('style', markAttributes).run();
}


function getCurrentStyle(editor: Editor, styleProp: keyof CSSStyleDeclaration): string {
  const { from } = editor.state.selection;
  const domAtPos = editor.view.domAtPos(from);
  const element = domAtPos.node.nodeType === 1
    ? domAtPos.node as HTMLElement
    : (domAtPos.node.parentElement as HTMLElement);

  console.log(element
    ? window.getComputedStyle(element)[styleProp] as string
    : '');
  return element
    ? window.getComputedStyle(element)[styleProp] as string
    : '';
}


const useTextToolbar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState<TextEditorStateSnapshot>({
    editor,
    selector: ctx => {
      return {
        fontFamily: ctx.editor ? getCurrentStyle(ctx.editor, 'fontFamily') : '',
        fontSize: ctx.editor ? getCurrentStyle(ctx.editor, 'fontSize') : '',
        fontStyle: ctx.editor ? getCurrentStyle(ctx.editor, 'fontStyle') : '',
        isBold: ctx.editor?.isActive('bold') ?? false,
        isItalic: ctx.editor?.isActive('italic') ?? false,
        isUnderline: ctx.editor?.isActive('underline') ?? false,
        isStrike: ctx.editor?.isActive('strike') ?? false,
        isCode: ctx.editor?.isActive('code') ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive('paragraph') ?? false,
        isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
      }
    },
  })

  const textToolbarActions: TextToolbarActions = useMemo(
    () => ({
      toggleBold: () => editor?.can().chain().focus().toggleBold().run(),
      toggleItalic: () => editor?.can().chain().focus().toggleItalic().run(),
      toggleUnderline: () => editor?.can().chain().focus().toggleUnderline().run(),
      toggleStrike: () => editor?.can().chain().focus().toggleStrike().run(),
      addLink: () => {
        const url = window.prompt("Enter URL:");
        if (url) editor?.can().chain().focus().setLink({ href: url }).run();

      },
      toggleBaseline: () => {
        const current = editor?.getAttributes("textStyle").textDecoration || "";
        editor
          ?.chain()
          .focus()
          .setMark("textStyle", {
            textDecoration: current.includes("underline")
              ? "none"
              : "underline",
          })
          .run();
      },
      toggleHighlight: (color: string = "#fffbeb") => editor
        ?.chain()
        .focus()
        .setMark("textStyle", { backgroundColor: color })
        .run()
      ,
      setTextAlign: (alignment: TextAlignment) => editor?.chain().focus().setTextAlign(alignment).run(),
      setFontFamily: (fontFamily: string) => appendInlineStyle(editor, { style: { "font-family": fontFamily } }),
      setFontStyle: (fontStyle: string) => appendInlineStyle(editor, { class: fontStyle }),
      setFontSize: (fontSize: string) => appendInlineStyle(editor, { style: { "font-size": fontSize } }),
      toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
      toggleSubscript: () =>
        editor
          ?.chain()
          .focus()
          .setMark("textStyle", { verticalAlign: "sub", fontSize: "smaller" })
          .run(),
      toggleSuperscript: () =>
        editor
          ?.chain()
          .focus()
          .setMark("textStyle", { verticalAlign: "super", fontSize: "smaller" })
          .run(),
      toggleLineSpacing: () => {
        const spacing = window.prompt("Enter line spacing:", "1.5");
        editor
          ?.chain()
          .focus()
          .updateAttributes("paragraph", { style: `line-height: ${spacing}` })
          .run();
      },

      toggleParagraphSpacing: () => {
        const spacing = window.prompt("Enter paragraph spacing:", "1rem");
        editor
          ?.chain()
          .focus()
          .updateAttributes("paragraph", { style: `margin-bottom: ${spacing}` })
          .run();
      },
      insertTable: () => {
        const rowsAndColumns = window.prompt("Enter number of rows and columns in format rows x columns. E.g. 2x2",);
        if (!rowsAndColumns) return;

        const [rows, columns] = rowsAndColumns.split("x").map(Number);

        // Generate table rows and cells dynamically
        const tableContent = [];
        for (let i = 0; i < rows; i++) {
          const rowCells = [];
          for (let j = 0; j < columns; j++) {
            rowCells.push({
              type: 'tableCell',
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Cell' }] }],
            });
          }
          tableContent.push({ type: 'tableRow', content: rowCells });
        }

        editor
          ?.chain()
          .focus()
          .insertContent({ type: 'table', content: tableContent }) // Insert the table using insertContent
          .run();
      },
      insertImage: () => {
        const url = window.prompt("Enter Image URL:");
        editor?.chain().focus()
          .insertContent(`<img src="${url}" style="max-width:100%">`)
          .run();
      }
    }),
    [editor]
  );

  return {
    textToolbar: editorState,
    textToolbarActions,
  };
};

export default useTextToolbar;
