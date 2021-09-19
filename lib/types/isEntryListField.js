export function isEntryListField (_entryListField) {
  return [
    'date',
    'description',
    'duration',
    'project',
    'tags',
    'user'
  ].includes(_entryListField)
}
