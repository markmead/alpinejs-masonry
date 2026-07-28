import { useMasonry } from './useMasonry.js'

export default function (Alpine) {
  Alpine.directive('masonry', (el, { modifiers }, { cleanup }) => {
    const [waitPollModifier, rawDuration] = modifiers
    const waitPollDuration = Number(rawDuration) || 2500

    const abortController = new AbortController()
    const buildMasonry = () => useMasonry(el)

    if (waitPollModifier === 'wait') {
      const waitTimer = setTimeout(buildMasonry, waitPollDuration)

      cleanup(() => clearTimeout(waitTimer))
    } else {
      buildMasonry()
    }

    if (waitPollModifier === 'poll') {
      const pollTimer = setInterval(buildMasonry, waitPollDuration)

      cleanup(() => clearInterval(pollTimer))
    }

    const listenerOptions = { signal: abortController.signal }

    window.addEventListener('resize', buildMasonry, listenerOptions)
    window.addEventListener('reload:masonry', buildMasonry, listenerOptions)

    cleanup(() => abortController.abort())
  })
}
