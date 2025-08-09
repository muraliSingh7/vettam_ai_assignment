import { Mark } from '@tiptap/core';

export const Style = Mark.create({
  name: 'style',
  addAttributes() {
    return {
      style: {
        default: '',
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (attributes.style) {
            return { style: attributes.style };
          }
          return {};
        },
      },
      class: {
        default: '',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (attributes.class) {
            return { class: attributes.class };
          }
          return {};
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[style]',
        getAttrs: element => ({ style: element.getAttribute('style') }),
      },
      {
        tag: 'span[class]',
        getAttrs: element => ({ class: element.getAttribute('class') }),
      },
      {
        tag: 'span[style][class]',
        getAttrs: element => ({
          style: element.getAttribute('style'),
          class: element.getAttribute('class'),
        }),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
});
