import { Editor, NodePos } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";
import { PageToolbarState } from "./hooks/usePageToolbar";

type NodePredicate = (node: Node) => boolean;

interface InsertOptions {
  type: string;
  attrs?: Record<string, any>;
  content?: any;
  position?: "start" | "end" | number;
  insideNodeType?: string;
}

interface UpdateOptions {
  type: string;
  predicate?: NodePredicate;
  attrs?: Record<string, any>;
}

interface DeleteOptions {
  type: string;
  predicate?: NodePredicate;
}

export const nodeCrud = {
  insert(editor: Editor | null, opts: InsertOptions) {
    if (!editor) return;
    const { doc, tr } = editor.state;
    const nodeType = editor.schema.nodes[opts.type];
    if (!nodeType) return;
  
    const inserts: { pos: number; node: Node }[] = [];
  
    doc.descendants((node, pos) => {
      if (opts.insideNodeType && node.type.name === opts.insideNodeType) {
        const alreadyExists = node.content?.content?.some(
          child => child.type.name === opts.type
        );

        if (alreadyExists) return; // Skip if node already exists
  
        let insertPos = pos + 1;
        if (opts.position === "end") {
          insertPos = pos + node.nodeSize - 1;
        } else if (typeof opts.position === "number") {
          insertPos = opts.position;
        }
        inserts.push({
          pos: insertPos,
          node: nodeType.create(opts.attrs || null, opts.content || null),
        });
      }
    });
  
    inserts.sort((a, b) => b.pos - a.pos).forEach(({ pos, node }) => {
      tr.insert(pos, node);
    });
  
    if (tr.docChanged) {
      editor.view.dispatch(tr);
    }
  },

  update(editor: Editor | null, opts: UpdateOptions) {
    if (!editor) return;
    const { doc, tr } = editor.state;
    doc.descendants((node, pos) => {
      if (node.type.name === opts.type && (!opts.predicate || opts.predicate(node))) {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          ...opts.attrs,
        });
      }
    });
    if (tr.docChanged) {
      editor.view.dispatch(tr);
    }
  },

  delete(editor: Editor | null, opts: DeleteOptions) {
    if (!editor) return;
    const positions: { from: number; to: number }[] = [];
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === opts.type && (!opts.predicate || opts.predicate(node))) {
        positions.push({ from: pos, to: pos + node.nodeSize });
      }
    });
    positions.reverse().forEach(({ from, to }) => {
      editor.commands.deleteRange({ from, to });
    });
  },
};


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