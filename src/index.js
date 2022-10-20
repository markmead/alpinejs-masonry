export default function (Alpine) {
  Alpine.directive(
    '[name]',
    (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {}
  )

  Alpine.magic('[name]', (el, { Alpine }) => {})
}
