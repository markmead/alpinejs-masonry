export function useMasonry(el) {
  // An unset gap computes to "normal", not "0px". Without the fallback every
  // margin below is written as "-NaNpx" and silently dropped by the parser.
  const gridGap = parseFloat(getComputedStyle(el).gap) || 0
  const gridItems = [...el.childNodes].filter(
    (gridItem) => ((gridItem.nodeType === 1) && (gridItem.tagName !== 'TEMPLATE'))
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
      gridItem.style.marginTop = `${gridGap - spaceBetween}px`
    }
  })
}
