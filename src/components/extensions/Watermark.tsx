import { Node, mergeAttributes } from '@tiptap/core';

export const Watermark = Node.create({
  name: 'tiptapWatermark',
  group: 'block',
  atom: true,
  selectable: false,

  addAttributes() {
    return {
      text: {
        default: 'WATERMARK',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-watermark]',
        getAttrs: (el) => ({
          text: el.innerText,
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-watermark': 'true',
        class: `
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 
          -rotate-30 
          text-[8rem] text-gray-400 text-center 
          opacity-10 
          pointer-events-none select-none 
          whitespace-nowrap 
          z-0
        `.replace(/\s+/g, ' ').trim(),
      }),
      HTMLAttributes.text,
    ];
  }
  
});
