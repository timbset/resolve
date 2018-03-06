import optionBuilders from './option_builders'

export default function assignConfig(args, config) {
  const options = { ...args }
  optionBuilders.mode(options, { ...process.env })

  const { env, ...other } = config

  Object.assign(args, other)

  if (env && env[options.mode]) {
    Object.assign(args, env[options.mode])
  }

  Object.assign(args, options)
}
