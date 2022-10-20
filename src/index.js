import { useMasonry } from './useMasonry'

export default function (Alpine) {
  Alpine.directive('masonry', (el, { modifiers }, { cleanup }) => {
    const pollModifier = modifiers[0]
    const pollDuration = modifiers[1]

    useMasonry(el)

    if (pollModifier) {
      setInterval(() => useMasonry(el), pollDuration)
    }

    window.addEventListener('resize', () => useMasonry(el))

    cleanup(() => {
      window.removeEventListener('resize', useMasonry)
    })
  })
}
