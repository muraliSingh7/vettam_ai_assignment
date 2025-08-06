import React, { createContext, useContext, useEffect } from "react";
import useTextToolbar, {
  TextToolbarActions,
  TextToolbarState,
} from "@/components/toolbar/hooks/useTextToolbar";
import usePageToolbar, {
  PagePaddingState,
  PageToolbarActions,
  PageToolbarState,
} from "@/components/toolbar/hooks/usePageToolbar";
import { Editor } from "@tiptap/react";
import { PAGE_SIZES } from "../pageConfig";

export interface ToolbarContext {
  textToolbar: TextToolbarState;
  pageToolbar: PageToolbarState;
  pagePadding: PagePaddingState;
  textToolbarActions: TextToolbarActions;
  pageToolbarActions: PageToolbarActions;
}

const ToolbarContext = createContext<ToolbarContext | null>(null);
export const ToolbarProvider = ({
  children,
  editor,
}: {
  children: React.ReactNode;
  editor: Editor | null;
}) => {
  const { textToolbar, textToolbarActions } = useTextToolbar({
    editor,
  });

  const { pageToolbar, pagePadding, pageToolbarActions } = usePageToolbar({
    editor,
  });

  useEffect(() => {
    if (!editor) return;
  
    const el = editor.view.dom as HTMLElement;
    el.style.fontFamily = textToolbar.fontFamily;
    el.style.fontSize = `${textToolbar.fontSize}px`;
    el.style.width = PAGE_SIZES[pageToolbar.pageSize].width;

  }, [editor, textToolbar.fontFamily, textToolbar.fontSize, pageToolbar.pageSize]);
  

  return (
    <ToolbarContext.Provider
      value={{
        textToolbar,
        pageToolbar,
        pagePadding,
        textToolbarActions,
        pageToolbarActions,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};
export const useToolbar = () => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
};
