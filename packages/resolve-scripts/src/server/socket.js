import eventStore from './event_store'

export default async function subscribe({ types, ids }, callback) {
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
