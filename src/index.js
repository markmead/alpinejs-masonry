import { useMasonry } from './useMasonry'

export default function (Alpine) {
  Alpine.directive('masonry', (el, { modifiers }, { cleanup }) => {
    const pollModifier = modifiers[0]
    const pollDuration = modifiers[1] || 2500

    useMasonry(el)

    if (pollModifier) {
      setInterval(() => useMasonry(el), pollDuration)
    }

    window.addEventListener('resize', () => useMasonry(el))
    window.addEventListener('reload:masonry', () => useMasonry(el))

    cleanup(() => {
      window.removeEventListener('resize', useMasonry)
      window.addEventListener('reload:masonry', useMasonry)
    })
  })
}
