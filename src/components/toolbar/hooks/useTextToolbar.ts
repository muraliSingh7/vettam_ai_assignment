import { useMemo, useState } from "react";
import { Editor } from "@tiptap/react";
import { FontSize, FontStyle, TextAlignment } from "@/components/toolbar/types";

export interface TextToolbarState {
  fontFamily: string;
  fontSize: FontSize;
  fontStyle: FontStyle;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  textAlign: TextAlignment;
}

export interface TextToolbarActions {
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleStrike: () => void;
  setTextAlign: (alignment: TextAlignment) => void;
  setFontSize: (fontSize: FontSize) => void;
  setFontStyle: (fontStyle: FontStyle) => void;
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

const useTextToolbar = ({ editor }: { editor: Editor | null }) => {
  const [textToolbar, setTextToolbar] = useState<TextToolbarState>({
    fontFamily: "Arial",
    fontSize: "12",
    fontStyle: "Regular",
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrike: false,
    textAlign: "left",
  });

  const textToolbarActions: TextToolbarActions = useMemo(
    () => ({
      toggleBold: () =>
        setTextToolbar((prev) => {
          const newState = { ...prev, isBold: !prev.isBold };
          editor?.chain().focus().toggleBold().run();
          return newState;
        }),
      toggleItalic: () => {
        setTextToolbar((prev) => {
          const newState = { ...prev, isItalic: !prev.isItalic };
          editor?.chain().focus().toggleItalic().run();
          return newState;
        });
      },
      toggleUnderline: () => {
        setTextToolbar((prev) => {
          const newState = { ...prev, isUnderline: !prev.isUnderline };
          editor?.chain().focus().toggleUnderline().run();
          return newState;
        });
      },
      toggleStrike: () => {
        setTextToolbar((prev) => {
          const newState = { ...prev, isStrike: !prev.isStrike };
          editor?.chain().focus().toggleStrike().run();
          return newState;
        });
      },
      addLink: () => {
        const url = window.prompt("Enter URL:");
        if (url) {
          editor?.chain().focus().setLink({ href: url }).run();
        }
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
      toggleHighlight: (color: string = "#fffbeb") => {
        editor
          ?.chain()
          .focus()
          .setMark("textStyle", { backgroundColor: color })
          .run();
      },
      setTextAlign: (alignment: TextAlignment) => {
        setTextToolbar((prev) => ({ ...prev, textAlign: alignment }));
        editor?.chain().focus().setTextAlign(alignment).run();
      },
      setFontFamily: (fontFamily: string) => {
        setTextToolbar((prev) => ({ ...prev, fontFamily }));
        editor?.chain().focus().setMark("textStyle", { fontFamily }).run();
      },
      setFontStyle: (fontStyle: FontStyle) => {
        setTextToolbar((prev) => ({ ...prev, fontStyle }));
        editor?.chain().focus().setMark("textStyle", { fontStyle }).run();
      },
      setFontSize: (fontSize: FontSize) => {
        setTextToolbar((prev) => ({ ...prev, fontSize }));
        editor?.chain().focus().setMark("textStyle", { fontSize }).run();
      },
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
        const rowsAndColumns = window.prompt("Enter number of rows and columns in format rows x columns. E.g. 2x2", );
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
    textToolbar,
    textToolbarActions,
  };
};

export default useTextToolbar;
