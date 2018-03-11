import eventStore from './event_store'

const socketHandler = socket => {
  const emitter = event => socket.emit('event', JSON.stringify(event))

  let unsubscribePromise = eventStore.subscribeOnBus(
    { types: [], ids: [] },
    emitter
  )
  const unsubscribe = () => {
    if (unsubscribePromise) {
      unsubscribePromise.then(unsubcribeCallback => unsubcribeCallback())
      unsubscribePromise = null
    }
  }

  socket.on('setSubscription', eventsDescription => {
    unsubscribe()
    unsubscribePromise = eventStore.subscribeOnBus(eventsDescription, emitter)
  })

  socket.on('disconnect', unsubscribe)
}

export default socketHandler
