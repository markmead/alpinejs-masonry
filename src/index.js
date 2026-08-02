import { useMasonry } from './useMasonry.js'

const defaultDuration = 2500
const minimumPollDuration = 100

export default function (Alpine) {
  Alpine.directive('masonry', (el, { modifiers }, { cleanup }) => {
    const [waitPollModifier, rawDuration] = modifiers
    const parsedDuration = Number(rawDuration)
    const hasDuration = Boolean(rawDuration) && Number.isFinite(parsedDuration)
    const waitPollDuration = hasDuration ? parsedDuration : defaultDuration

    const abortController = new AbortController()
    const buildMasonry = () => useMasonry(el)

    if (waitPollModifier === 'wait') {
      const waitTimer = setTimeout(buildMasonry, waitPollDuration)

      cleanup(() => clearTimeout(waitTimer))
    } else {
      buildMasonry()
    }

    if (waitPollModifier === 'poll') {
      // setInterval clamps anything below 4ms, so an unclamped 0 would run a
      // full relayout ~250x a second. Only poll needs this floor — a 0 wait is
      // a legitimate request to build immediately.
      const pollDuration = Math.max(waitPollDuration, minimumPollDuration)
      const pollTimer = setInterval(buildMasonry, pollDuration)

      cleanup(() => clearInterval(pollTimer))
    }

    const listenerOptions = { signal: abortController.signal }

    window.addEventListener('resize', buildMasonry, listenerOptions)
    window.addEventListener('reload:masonry', buildMasonry, listenerOptions)

    cleanup(() => abortController.abort())
  })
}
