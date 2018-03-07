import createEventStore from 'resolve-es'

const storageAdapter = require($resolve.storage.adapter) // eslint-disable-line
const storageParams = $resolve.storage.params // eslint-disable-line
const busAdapter = require($resolve.bus.adapter) // eslint-disable-line
const busParams = $resolve.bus.params // eslint-disable-line

const storage = storageAdapter(storageParams)

const bus = busAdapter(busParams)

const eventStore = createEventStore({ storage, bus })

// TODO. Move to 'resolve-es'
eventStore.subscribeOnBus = async ({ types, ids }, callback) => {
  if (Array.isArray(types) && ids === '*') {
    return await eventStore.subscribeByEventType(types, callback, {
      onlyBus: true
    })
  } else if (Array.isArray(types) && Array.isArray(ids)) {
    return await eventStore.subscribeByAggregateId(
      ids,
      event => types.includes(event.type) && callback(event),
      { onlyBus: true }
    )
  } else {
    throw new Error('Wrong parameter for event subscription')
  }
}

export default eventStore
