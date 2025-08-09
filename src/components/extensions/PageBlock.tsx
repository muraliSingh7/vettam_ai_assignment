import { Node } from "@tiptap/core";
import { PAGE_BREAK_HEIGHT, PAGE_SIZES } from "../toolbar/pageConfig";

export const PageBlock = Node.create({
  name: "pageBlock",
  group: "block",
  content: "block+",
  atom: false,
  selectable: false,
  draggable: false,
  isolating: true,

  addAttributes() {
    return {
      pageHeight: {
        default: PAGE_SIZES.A4.height,
      },
      pageWidth: {
        default: PAGE_SIZES.A4.width,
      },
      pagePaddingTop: {
        default: PAGE_SIZES.A4.padding,
      },
      pagePaddingRight: {
        default: PAGE_SIZES.A4.padding,
      },
      pagePaddingBottom: {
        default: PAGE_SIZES.A4.padding,
      },
      pagePaddingLeft: {
        default: PAGE_SIZES.A4.padding,
      },
      pageBreakHeight: {
        default: PAGE_BREAK_HEIGHT,
      },
      pageIndex: {
        default: 1,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type=pageBlock]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const {
      pageHeight,
      pageWidth,
      pagePaddingTop,
      pagePaddingRight,
      pagePaddingBottom,
      pagePaddingLeft,
      pageBreakHeight,
      pageIndex,
    } = HTMLAttributes;

    const paddingStyle = `padding: ${pagePaddingTop} ${pagePaddingRight} ${pagePaddingBottom} ${pagePaddingLeft};`;

    return [
      "div",
      {
        "data-type": "pageBlock",
        "data-page-index": pageIndex,
        style: `width: ${pageWidth};`,
        class: "relative break-inside-avoid print:break-before-page mx-auto",
      },
      [
        "div",
        {
          style: `height: ${pageHeight}; ${paddingStyle}`,
          class: "bg-white w-full shadow",
        },
        0, // This is where the content goes
      ],
      [
        "div",
        {
          style: `height: ${pageBreakHeight};`,
          class: "bg-[#f2f2f7] w-full h-3 print:hidden print:h-0",
        },
      ],
    ];
  },
});
