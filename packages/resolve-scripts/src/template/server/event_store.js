import createEventStore from 'resolve-es'

const storageAdapter = require($resolve.storage.adapter) // eslint-disable-line
const storageParams = $resolve.storage.params // eslint-disable-line
const busAdapter = require($resolve.bus.adapter) // eslint-disable-line
const busParams = $resolve.bus.params // eslint-disable-line

const storage = storageAdapter(storageParams)

const bus = busAdapter(busParams)

const eventStore = createEventStore({ storage, bus })

export default eventStore
