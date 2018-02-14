import { isV4Format } from 'ip'

export default {
  mode(argv) {
    if (
      process.env.NODE_ENV &&
      ['development', 'production'].indexOf(process.env.NODE_ENV) === -1
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `NODE_ENV, Given: "${
            process.env.NODE_ENV
          }", Choices: "development", "production"`
      )
    }
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'
    argv.mode = argv.prod ? 'production' : process.env.NODE_ENV
    process.env.NODE_ENV = argv.mode
    delete argv.dev
    delete argv.prod
    return true
  },

  inpect(argv) {
    const inpectArgs = argv.debug.split(':')
    if (inpectArgs.length === 1) {
      inpectArgs[1] = inpectArgs[0] || 9229
      inpectArgs[0] = '127.0.0.1'
    }
    const [ip, port] = inpectArgs

    delete argv.inspect
    argv.inspectHost = ip
    argv.inspectPort = +port

    return isV4Format(ip) && Number.isInteger(+port)
  }
}
