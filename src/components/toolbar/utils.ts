import { Editor, NodePos } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";
import { PageToolbarState } from "@/components/toolbar/hooks/usePageToolbar";

export function removeHeaderFooter(editor: Editor | null) {
  if (!editor) {
    return;
  }
  const positionsToDelete: { from: number; to: number }[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (!node || !node.type || !node.type.name) return;
    if (
      node.type.name === "tiptapHeader" ||
      node.type.name === "tiptapFooter"
    ) {
      positionsToDelete.push({ from: pos, to: pos + node.nodeSize });
    }
  });

  editor.chain().focus();

  // Delete from end to start (to avoid shifting positions)
  positionsToDelete.reverse().forEach(({ from, to }) => {
    editor.commands.deleteRange({ from, to });
  });
}

export function insertHeaderFooter(editor: Editor | null) {
  if (!editor) return;

  const { doc, tr } = editor.state;
  const headerNodeType = editor.schema.nodes.tiptapHeader;
  const footerNodeType = editor.schema.nodes.tiptapFooter;
  if (!headerNodeType || !footerNodeType) return;

  // Store inserts so we apply them later all at once
  const inserts: { pos: number; node: Node }[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name === "pageBlock") {
      const offset = pos + 1; // Start inside the block
      const hasHeader = node.content?.content?.some(
        (child) => child.type.name === "tiptapHeader"
      );
      const hasFooter = node.content?.content?.some(
        (child) => child.type.name === "tiptapFooter"
      );

      if (!hasHeader) {
        inserts.push({
          pos: offset,
          node: headerNodeType.create(null, editor.schema.text("Header")),
        });
      }

      if (!hasFooter) {
        inserts.push({
          pos: pos + node.nodeSize - 1, // Before end of this pageBlock
          node: footerNodeType.create(null, editor.schema.text("Footer")),
        });
      }
    }
  });

  // Apply all insertions in reverse order to avoid shifting positions
  let transaction = tr;
  inserts
    .sort((a, b) => b.pos - a.pos)
    .forEach(({ pos, node }) => {
      transaction = transaction.insert(pos, node);
    });

  if (transaction.docChanged) {
    editor.view.dispatch(transaction);
  }
}

export function insertWatermarks(
  editor: Editor | null,
  watermarkText: string = "WATERMARK"
) {
  if (!editor) return;

  const { doc, tr } = editor.state;
  const watermarkNodeType = editor.schema.nodes.tiptapWatermark;
  if (!watermarkNodeType) return;

  const inserts: { pos: number; node: Node }[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name === "pageBlock") {
      const hasWatermark = node.content?.content?.some(
        (child) => child.type.name === "tiptapWatermark"
      );

      if (!hasWatermark) {
        const insertPos = pos + 1;
        inserts.push({
          pos: insertPos,
          node: watermarkNodeType.create({ text: watermarkText }),
        });
      }
    }
  });

  let transaction = tr;
  inserts
    .sort((a, b) => b.pos - a.pos)
    .forEach(({ pos, node }) => {
      transaction = transaction.insert(pos, node);
    });

  if (transaction.docChanged) {
    editor.view.dispatch(transaction);
  }
}

export function removeWatermarks(editor: Editor | null) {
  if (!editor) {
    return;
  }
  const positionsToDelete: { from: number; to: number }[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === "tiptapWatermark") {
      positionsToDelete.push({ from: pos, to: pos + node.nodeSize });
    }
  });

  positionsToDelete.reverse().forEach(({ from, to }) => {
    editor.commands.deleteRange({ from, to });
  });
}

export function insertNewPageAfterCurrent(
  editor: Editor | null,
  pageToolbar: PageToolbarState
) {
  if (!editor) return;

  const currentPos = editor.state.selection.from;
  const pageBlock = editor.$pos(currentPos).closest("pageBlock");

  if (!pageBlock) {
    console.warn("No pageBlock found at this position.");
    return;
  }

  let insertAt: NodePos | null | number = pageBlock?.after ?? null;
  // Fallback: insert at the end of the document
  if (!insertAt) {
    insertAt = editor.state.doc.content.size;
  }

  const newPageIndex = pageBlock.attributes.pageIndex + 1;
  editor
    .chain()
    .focus()
    .insertContentAt(insertAt, {
      type: "pageBlock",
      attrs: { pageIndex: newPageIndex },
      content: [
        ...(pageToolbar.headerFooterVisible
          ? [
              {
                type: "tiptapHeader",
                content: [{ type: "text", text: "New Page" }],
              },
            ]
          : []),
        {
          type: "paragraph",
          content: [{ type: "text", text: "New Page" }],
        },
        ...(pageToolbar.headerFooterVisible
          ? [
              {
                type: "tiptapFooter",
                content: [{ type: "text", text: "New Page" }],
              },
            ]
          : []),
        ...(pageToolbar.watermarkEnabled
          ? [
              {
                type: "tiptapWatermark",
                attrs: { text: "WATERMARK" },
              },
            ]
          : []),
      ],
    })
    .run();
}

type PaddingObject = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function changeMargin(editor: Editor | null, padding: PaddingObject) {
  if (!editor) return;

  const { doc, tr } = editor.state;
  const pageBlockType = editor.schema.nodes.pageBlock;
  if (!pageBlockType) return;

  const newPadding = `${padding.top}in ${padding.right}in ${padding.bottom}in ${padding.left}in`;

  doc.descendants((node, pos) => {
    if (node.type.name === "pageBlock") {
      const currentPadding = `${node.attrs.pagePaddingTop} ${node.attrs.pagePaddingRight} ${node.attrs.pagePaddingBottom} ${node.attrs.pagePaddingLeft}`;
      if (currentPadding !== newPadding) {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          pagePaddingTop: `${padding.top}in`,
          pagePaddingRight: `${padding.right}in`,
          pagePaddingBottom: `${padding.bottom}in`,
          pagePaddingLeft: `${padding.left}in`,
        });
      }
    }
  });

  if (tr.docChanged) {
    editor.view.dispatch(tr);
  }
}

export function changePageSize({
  editor,
  width,
  height,
}: {
  editor: Editor | null;
  width: string;
  height: string;
}) {
  if (!editor) return;

  const { doc, tr } = editor.state;
  const pageBlockType = editor.schema.nodes.pageBlock;
  if (!pageBlockType) return;

  doc.descendants((node, pos) => {
    if (node.type.name === "pageBlock") {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        pageWidth: width,
        pageHeight: height,
      });
    }
  });

  if (tr.docChanged) {
    editor.view.dispatch(tr);
  }
}
