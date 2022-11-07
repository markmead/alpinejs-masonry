export function useMasonry(el) {
  const gridGap = parseFloat(getComputedStyle(el).gap)
  const gridItems = [...el.childNodes].filter(
    (gridItem) => gridItem.nodeType === 1
  )
  const perChunk = getComputedStyle(el).gridTemplateColumns.split(' ').length

  gridItems.forEach((gridItem) => gridItem.style.removeProperty('margin-top'))

  if (perChunk === 1) {
    return
  }

  gridItems.forEach(function (gridItem, itemIndex) {
    const previousItem = gridItems[itemIndex - perChunk]

    if (!previousItem) {
      return
    }

    const currentItemTop = gridItem.getBoundingClientRect().top
    const previousItemBottom = previousItem.getBoundingClientRect().bottom
    const spaceBetween = currentItemTop - previousItemBottom

    if (spaceBetween !== gridGap) {
      gridItem.style.marginTop = `-${spaceBetween - gridGap}px`
    }
  })
}
