import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { PAGE_SIZES, PageSizeId } from "@/components/toolbar/pageConfig";
import {
  changePageSize,
  changeMargin,
  insertHeaderFooter,
  insertNewPageAfterCurrent,
  insertWatermarks,
  removeHeaderFooter,
  removeWatermarks,
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

  const pageToolbarActions: PageToolbarActions = {
    toggleHeaderFooter: () => {
      setPageToolbar((prev) => {
        const newState = {
          ...prev,
          headerFooterVisible: !prev.headerFooterVisible,
        };

        if (newState.headerFooterVisible) insertHeaderFooter(editor);
        else removeHeaderFooter(editor);
        return newState;
      });
    },
    toggleWatermark: () => {
      setPageToolbar((prev) => {
        const newState = {
          ...prev,
          watermarkEnabled: !prev.watermarkEnabled,
        };
        if (newState.watermarkEnabled) insertWatermarks(editor);
        else removeWatermarks(editor);
        return newState;
      });
    },
    toggleRulers: () => {
      setPageToolbar((prev) => ({
        ...prev,
        rulersVisible: !prev.rulersVisible,
      }));
    },
    toggleCharacterCount: () => {
      setPageToolbar((prev) => ({
        ...prev,
        characterCountVisible: !prev.characterCountVisible,
      }));
    },
    toggleMargins: () => {
      const isEnabling = !pageToolbar.marginsVisible;
      const defaultPadding = isEnabling
        ? parseFloat(PAGE_SIZES[pageToolbar.pageSize].padding.replace("in", ""))
        : 0.1;
      const paddingObj = {
        top: isEnabling ? defaultPadding : 0.1,
        right: defaultPadding,
        bottom: defaultPadding,
        left: defaultPadding,
      };

      setPageToolbar((prev) => ({
        ...prev,
        marginsVisible: isEnabling,
      }));
      setPagePadding(paddingObj);
      changeMargin(editor, paddingObj);
    },
    setPageSize: (pageSize: PageSizeId) => {
      setPageToolbar((prev) => ({
        ...prev,
        pageSize,
      }));

      const newPageSize = PAGE_SIZES[pageSize];
      const paddingInches = parseFloat(newPageSize.padding.replace("in", ""));
      changePageSize({
        editor,
        width: newPageSize.width,
        height: newPageSize.height,
      });
      setPagePadding({
        top: paddingInches,
        right: paddingInches,
        bottom: paddingInches,
        left: paddingInches,
      });
    },
    setZoom: (zoom: string) => {
      setPageToolbar((prev) => ({
        ...prev,
        zoom,
      }));
    },
    insertPageBreak: () => {
      insertNewPageAfterCurrent(editor, pageToolbar);
    },
    handlePagePaddingChanges: (markerType: MarkerType, value: number) => {
      setPagePadding((prev) => ({
        ...prev,
        [markerType]: value,
      }));
      changeMargin(editor, {
        ...pagePadding,
        [markerType]: value,
      });
    },
  };

  useEffect(() => {
    if (!editor) return;

    // Insert header and footer if enabled
    if (pageToolbar.headerFooterVisible) {
      insertHeaderFooter(editor);
    }

    // Insert watermark if enabled
    if (pageToolbar.watermarkEnabled) {
      insertWatermarks(editor);
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

    changeMargin(editor, padding);
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
