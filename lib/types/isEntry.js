export function isEntry (_entry) {
  const {
    id,
    date,
    duration,
    description,
    tags
  } = _entry
  return (
    (
      typeof id === 'number' ||
      id === 'newId'
    ) &&
    typeof date === 'number' &&
    typeof duration === 'number' && duration % 1 === 0 &&
    typeof description === 'string' &&
    Array.isArray(tags)
  )
}
