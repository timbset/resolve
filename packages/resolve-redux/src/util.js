export function checkRequiredFields(obj, beforeWarnings, afterWarnings) {
  const warningMessages = Object.keys(obj)
    .map(
      fieldName =>
        obj[fieldName] ? null : `The '${fieldName}' field is required`
    )
    .filter(msg => msg)

  const shouldWarningsBePrinted = warningMessages.length > 0

  if (shouldWarningsBePrinted) {
    // eslint-disable-next-line no-console
    console.warn(
      [beforeWarnings, ...warningMessages, afterWarnings]
        .filter(line => line)
        .join('\n')
    )
  }

  return !shouldWarningsBePrinted
}

export function getRootableUrl(path) {
  let rootDir =
    typeof process !== 'undefined' &&
    typeof process.env !== 'undefined' &&
    process.env['ROOT_PATH']
      ? process.env['ROOT_PATH']
      : ''

  const isReactNative =
    typeof navigator !== 'undefined' && navigator.product === 'ReactNative'

  if (isReactNative && path === '/socket/') {
    rootDir = ''
  }

  let rootableUrl = rootDir
  if (!/\/$/.test(rootDir)) {
    rootableUrl += '/'
  }

  if (/^\//.test(path)) {
    rootableUrl += path.slice(1)
  } else {
    rootableUrl += path
  }

  return rootableUrl
}

export function getKey(viewModel, aggregateId) {
  return `${viewModel}:${aggregateId}`
}
