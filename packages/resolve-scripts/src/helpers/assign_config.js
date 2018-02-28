import optionBuilders from '../option_builders'

export default function assignConfig(argv, config) {
  const options = { ...argv }
  optionBuilders.mode(options, { ...process.env })

  const { env, ...other } = config

  Object.assign(argv, other)

  if (env && env[options.mode]) {
    Object.assign(argv, env[options.mode])
  }

  Object.assign(argv, options)
}
