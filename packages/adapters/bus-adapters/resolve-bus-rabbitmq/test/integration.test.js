import adapter from '../src'

describe('RabbitMQ bus', () => {
  let instance

  const adapterConfig = {
    url: 'amqp://localhost:5672',
    messageTtl: 65536,
    maxLength: 65536
  }

  const message = {
    content: JSON.stringify({ type: 'eventType' })
  }

  afterEach(async () => {
    if (instance) {
      await instance.close()
    }
  })

  describe('common', () => {
    it('sends events correctly', async done => {
      instance = adapter(adapterConfig)
      await instance.init()

      await instance.subscribe(event => {
        expect(Object.keys(event)).toEqual(Object.keys(message))
        expect(event.content).toEqual(message.content)
        done()
      })

      await instance.publish(message)
    })
  })
})
