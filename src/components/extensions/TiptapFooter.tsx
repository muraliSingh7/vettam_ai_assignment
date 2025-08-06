import { Node, mergeAttributes } from '@tiptap/core'

export const TiptapFooter = Node.create({
  name: 'tiptapFooter',
  group: 'block',
  content: 'inline*',
  selectable: false,
  isolating: true,

  parseHTML() {
    return [{ tag: 'footer' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['footer', mergeAttributes(HTMLAttributes, { class: 'text-xs text-gray-400 border-t border-dashed pt-2 mt-4 text-center', }), 0]
  },
})
