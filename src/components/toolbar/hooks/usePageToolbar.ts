import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { PAGE_SIZES, PageSizeId } from "@/components/toolbar/pageConfig";
import {
  insertNewPageAfterCurrent,
  nodeCrud,
} from "@/components/toolbar/utils";
import { MarkerType } from "@/components/ruler/types";

export interface PageToolbarState {
  headerFooterVisible: boolean;
  marginsVisible: boolean;
  rulersVisible: boolean;
  characterCountVisible: boolean;
  watermarkEnabled: boolean;
  pageSize: PageSizeId;
  zoom: string;
}

export type PagePaddingState = {
  [key in MarkerType]: number;
};

export interface PageToolbarActions {
  toggleHeaderFooter: () => void;
  toggleMargins: () => void;
  toggleRulers: () => void;
  toggleCharacterCount: () => void;
  toggleWatermark: () => void;
  setZoom: (zoom: string) => void;
  insertPageBreak: () => void;
  setPageSize: (pageSize: PageSizeId) => void;
  handlePagePaddingChanges: (markerType: MarkerType, value: number) => void;
}

const toggleHeaderFooterInEditor = (editor: Editor | null, visible: boolean, header: string, footer: string) => {
  if (!editor) return;
  if (visible) {
    nodeCrud.insert(editor, {
      type: "tiptapHeader",
      content: editor.schema.text(header),
      insideNodeType: "pageBlock",
      position: "start",
    });
    nodeCrud.insert(editor, {
      type: "tiptapFooter",
      content: editor.schema.text(footer),
      insideNodeType: "pageBlock",
      position: "end",
    });
  } else {
    nodeCrud.delete(editor, { type: "tiptapHeader" });
    nodeCrud.delete(editor, { type: "tiptapFooter" });
  }
};

const toggleWatermarkInEditor = (editor: Editor | null, enabled: boolean, watermarkText: string) => {
  if (!editor) return;
  if (enabled) nodeCrud.insert(editor, {
    type: "tiptapWatermark",
    attrs: { text: watermarkText },
    insideNodeType: "pageBlock",
    position: "start",
  });
  else nodeCrud.delete(editor, { type: "tiptapWatermark" });
};

const updateMarginsInEditor = (editor: Editor | null, padding: PagePaddingState) => {
  nodeCrud.update(editor, {
    type: "pageBlock",
    attrs: {
      pagePaddingTop: `${padding.top}in`,
      pagePaddingRight: `${padding.right}in`,
      pagePaddingBottom: `${padding.bottom}in`,
      pagePaddingLeft: `${padding.left}in`,
    },
  });
};

const updatePageSizeInEditor = (editor: Editor | null, width: string, height: string) => {
  nodeCrud.update(editor, {
    type: "pageBlock",
    attrs: { pageWidth: width, pageHeight: height },
  });
};

const usePageToolbar = ({ editor }: { editor: Editor | null }) => {
  const [pageToolbar, setPageToolbar] = useState<PageToolbarState>({
    headerFooterVisible: true,
    marginsVisible: true,
    rulersVisible: false,
    characterCountVisible: true,
    watermarkEnabled: false,
    pageSize: "A4",
    zoom: "100",
  });

  const [pagePadding, setPagePadding] = useState<PagePaddingState>({
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  });

  const [header, setHeader] = useState<string>("Header");
  const [footer, setFooter] = useState<string>("Footer");
  const [watermarkText, setWatermarkText] = useState<string>("RED");

  const pageToolbarActions: PageToolbarActions = {
    toggleHeaderFooter: () => {
      setPageToolbar(prev => {
        const newVisible = !prev.headerFooterVisible;
        toggleHeaderFooterInEditor(editor, newVisible, header, footer);
        return { ...prev, headerFooterVisible: newVisible };
      });
    },
  
    toggleWatermark: () => {
      setPageToolbar(prev => {
        const newEnabled = !prev.watermarkEnabled;
        toggleWatermarkInEditor(editor, newEnabled, watermarkText);
        return { ...prev, watermarkEnabled: newEnabled };
      });
    },
  
    toggleRulers: () =>
      setPageToolbar(prev => ({ ...prev, rulersVisible: !prev.rulersVisible })),
  
    toggleCharacterCount: () =>
      setPageToolbar(prev => ({ ...prev, characterCountVisible: !prev.characterCountVisible })),
  
    toggleMargins: () => {
      const isEnabling = !pageToolbar.marginsVisible;
      const defaultPadding = isEnabling
        ? parseFloat(PAGE_SIZES[pageToolbar.pageSize].padding.replace("in", ""))
        : 0.1;
  
      const paddingObj = {
        top: defaultPadding,
        right: defaultPadding,
        bottom: defaultPadding,
        left: defaultPadding,
      };
  
      setPageToolbar(prev => ({ ...prev, marginsVisible: isEnabling }));
      setPagePadding(paddingObj);
      updateMarginsInEditor(editor, paddingObj);
    },
  
    setPageSize: (pageSize: PageSizeId) => {
      setPageToolbar(prev => ({ ...prev, pageSize }));
      const newPageSize = PAGE_SIZES[pageSize];
      const paddingInches = parseFloat(newPageSize.padding.replace("in", ""));
  
      updatePageSizeInEditor(editor, newPageSize.width, newPageSize.height);
      setPagePadding({
        top: paddingInches,
        right: paddingInches,
        bottom: paddingInches,
        left: paddingInches,
      });
    },
  
    setZoom: (zoom: string) =>
      setPageToolbar(prev => ({ ...prev, zoom })),
  
    insertPageBreak: () => {
      insertNewPageAfterCurrent(editor, pageToolbar);
    },
  
    handlePagePaddingChanges: (markerType: MarkerType, value: number) => {
      const newPadding = { ...pagePadding, [markerType]: value };
      setPagePadding(newPadding);
      updateMarginsInEditor(editor, newPadding);
    },
  };
  

  useEffect(() => {
    if (!editor) return;

    // Insert header and footer if enabled
    if (pageToolbar.headerFooterVisible) {
      toggleHeaderFooterInEditor(editor, pageToolbar.headerFooterVisible, header, footer);
    }

    // Insert watermark if enabled
    if (pageToolbar.watermarkEnabled) {
      nodeCrud.insert(editor, { type: "tiptapWatermark", content: watermarkText });
    }

    const pageSizeInfo = PAGE_SIZES[pageToolbar.pageSize];

    // Set margins if enabled
    const defaultPadding = pageToolbar.marginsVisible
      ? parseFloat(pageSizeInfo.padding.replace("in", ""))
      : 0.1;
    const padding = {
      top: defaultPadding,
      right: defaultPadding,
      bottom: defaultPadding,
      left: defaultPadding,
    };
    setPagePadding(padding);

    nodeCrud.update(editor, {
      type: "pageBlock",
      attrs: {
        pagePaddingTop: `${padding.top}in`,
        pagePaddingRight: `${padding.right}in`,
        pagePaddingBottom: `${padding.bottom}in`,
        pagePaddingLeft: `${padding.left}in`,
      },
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]); // Only runs once when editor is available as part of initialization


  return {
    pageToolbar,
    pagePadding,
    setPageToolbar,
    setPagePadding,
    pageToolbarActions,
  };
};

export default usePageToolbar;
