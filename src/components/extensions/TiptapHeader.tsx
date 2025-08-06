import { Node, mergeAttributes } from '@tiptap/core'

export const TiptapHeader = Node.create({
  name: 'tiptapHeader',
  group: 'block',
  content: 'inline*',
  selectable: false,
  isolating: true,

  parseHTML() {
    return [{ tag: 'header' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['header', mergeAttributes(HTMLAttributes, { class: 'text-xs text-gray-400 border-b border-dashed pb-2 mb-4 text-center' }), 0]
  },

  addAttributes() {
    return {
      class: {
        default: 'text-xs text-gray-400 border-b border-dashed pb-2 mb-4 text-center',
      },
    }
  },
})
