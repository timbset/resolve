export default function validate(validators, argv, config) {
  for (const validator of validators) {
    const result = validator(argv, config)
    if (result !== true) {
      return result
    }
  }
  return true
}
