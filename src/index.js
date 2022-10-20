import { useMasonry } from './useMasonry'

export default function (Alpine) {
  Alpine.directive('masonry', (el, {}, { cleanup }) => {
    useMasonry(el)

    window.addEventListener('resize', () => useMasonry(el))

    cleanup(() => {
      window.removeEventListener('resize', useMasonry)
    })
  })
}
