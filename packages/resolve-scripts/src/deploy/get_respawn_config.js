export default (path, debug) => {
  if (debug) {
    return ['node', '--inspect', path]
  } else {
    return ['node', path]
  }
}
