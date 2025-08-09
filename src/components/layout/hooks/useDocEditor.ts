import { PageBlock } from "@/components/extensions/PageBlock";
import { TiptapFooter } from "@/components/extensions/TiptapFooter";
import { TiptapHeader } from "@/components/extensions/TiptapHeader";
import { Watermark } from "@/components/extensions/Watermark";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useCallback, useState } from "react";
import { Node } from "prosemirror-model";
import { Style } from "@/components/extensions/Style";

export interface DocStats {
  totalCharacters: number;
  totalPages: number;
  pages: Node[][];
  currentPage: number;
}

const useDocEditor = () => {
  const [docStats, setDocStats] = useState<DocStats>({
    totalCharacters: 0,
    totalPages: 1,
    currentPage: 1,
    pages: [],
  });

  const goToPage = useCallback((pageNumber: number) => {
    const el = document.querySelector(`[data-page-index="${pageNumber}"]`);
    if (el) {
        console.log("el", el, pageNumber);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setDocStats((prev) => ({ ...prev, currentPage: pageNumber }));
    }
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TiptapHeader,
      TiptapFooter,
      PageBlock,
      Style,
      Watermark,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: {
      type: "doc",
      content: [
        {
          type: "pageBlock",
          attrs: { pageIndex: 1 },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Hello world" }],
            },
          ],
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none bg-[#f2f2f7] mx-auto box-border w-full text-xs",
        style: `font-family: 'Avenir Next', sans-serif;`,
      },
    },
    onUpdate: ({ editor }) => {
      setDocStats((prev) => {
        const pages: Node[][] = [];
        let current: Node[] = [];
        editor.state.doc.descendants((node) => {
          if (node.type.name === "pageBlock") {
            if (current.length > 0) {
              pages.push(current);
              current = [];
            }
          } else {
            current.push(node);
          }
        });
        if (current.length > 0) {
          pages.push(current);
        }
        console.log("pages", pages);
        return {
          ...prev,
          totalCharacters: editor.state.doc.textContent.length,
          totalPages: pages.length,
          pages,
        };
      });
    },
  });

  const handleScroll = useCallback((e: Event) => {
    const container = e.target as HTMLElement;
    const scrollTop = container.scrollTop;
  
    const pageElements = container.querySelectorAll("[data-page-index]");
    let foundPage = 0;
  
    pageElements.forEach((el) => {
      const offsetTop = (el as HTMLElement).offsetTop;
      if (offsetTop - 100 <= scrollTop) {
        const index = parseInt(el.getAttribute("data-page-index") || "0", 10);
        foundPage = index;
      }
    });
  
    setDocStats((prev) => ({ ...prev, currentPage: foundPage }));
  }, []);
  

  const editorRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        node.addEventListener("scroll", handleScroll, { passive: true });
      }

      return () => {
        node?.removeEventListener("scroll", handleScroll);
      };
    },
    [handleScroll]
  );

  return {
    editor,
    editorRef,
    docStats,
    goToPage,
  };
};

export default useDocEditor;
