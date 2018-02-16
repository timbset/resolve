import { exec as nativeExec } from 'child_process'

function exec(cmd, env) {
  return new Promise((resolve, reject) => {
    nativeExec(
      cmd.replace('resolve-scripts', 'node bin/resolve-scripts.js') +
        ' --print-config',
      { env },
      (err, stdout) => (!err ? resolve(JSON.parse(stdout)) : reject(err))
    )
  })
}

describe('resolve-scripts build', () => {
  describe('argv.mode', () => {
    it('resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build')

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'development')
    })

    it('resolve-scripts build --dev', async () => {
      const json = await exec('resolve-scripts build --dev')

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'development')
    })

    it('resolve-scripts build --prod', async () => {
      const json = await exec('resolve-scripts build --prod')

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'production')
    })

    it('resolve-scripts build --dev --prod (fail)', async () => {
      try {
        await exec('resolve-scripts build --dev --prod')
      } catch (error) {
        return
      }
      throw new Error()
    })

    it('NODE_ENV=production resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', {
        NODE_ENV: 'production'
      })

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'production')
    })

    it('NODE_ENV=development resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', {
        NODE_ENV: 'development'
      })

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'development')
    })

    it('NODE_ENV=test resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', {
        NODE_ENV: 'development'
      })

      expect(json).toHaveProperty('build', true)
      expect(json).toHaveProperty('mode', 'development')
    })

    it('NODE_ENV=INCORRECT_VALUE resolve-scripts build (fail)', async () => {
      try {
        await exec('resolve-scripts build', { NODE_ENV: 'INCORRECT_VALUE' })
      } catch (error) {
        return
      }
      throw new Error()
    })
  })

  describe('argv.watch', () => {
    it('resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build')

      expect(json).toHaveProperty('watch', false)
    })

    it('resolve-scripts build --watch', async () => {
      const json = await exec('resolve-scripts build --watch')

      expect(json).toHaveProperty('watch', true)
    })

    it('WATCH=false resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', { WATCH: false })

      expect(json).toHaveProperty('watch', false)
    })

    it('WATCH=true resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', { WATCH: true })

      expect(json).toHaveProperty('watch', true)
    })
  })

  describe('argv.start', () => {
    it('resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build')

      expect(json).toHaveProperty('start', false)
    })

    it('resolve-scripts build --start', async () => {
      const json = await exec('resolve-scripts build --start')

      expect(json).toHaveProperty('start', true)
    })

    it('START=false resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', { START: false })

      expect(json).toHaveProperty('start', false)
    })

    it('START=true resolve-scripts build', async () => {
      const json = await exec('resolve-scripts build', { START: true })

      expect(json).toHaveProperty('start', true)
    })
  })

  describe('argv.host', () => {
    it('resolve-scripts build --start --host=http://test.test', async () => {
      const json = await exec(
        'resolve-scripts build --start --host=http://test.test'
      )

      expect(json).toHaveProperty('start', true)
      expect(json).toHaveProperty('host', 'http://test.test')
    })

    it('resolve-scripts build --host=http://test.test (fail)', async () => {
      try {
        await exec('resolve-scripts build --host=http://test.test')
      } catch (error) {
        return
      }
      throw new Error()
    })
  })

  describe('argv.port', () => {
    it('resolve-scripts build --start --port=1234', async () => {
      const json = await exec('resolve-scripts build --start --port=1234')

      expect(json).toHaveProperty('start', true)
      expect(json).toHaveProperty('port', 1234)
    })

    it('resolve-scripts build --port=1234 (fail)', async () => {
      try {
        await exec('resolve-scripts build --port=1234')
      } catch (error) {
        return
      }
      throw new Error()
    })
  })
})
