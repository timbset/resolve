export default {
  name: 'List',
  projection: {
    Init: () => [],
    LIST_CREATED: (state, { aggregateId, payload: { title } }) => [
      ...state,
      {
        id: aggregateId,
        title
      }
    ],
    LIST_REMOVED: (state, { aggregateId }) =>
      state.filter(({ id }) => id !== aggregateId)
  },
  serializeState: state => JSON.stringify(state),
  deserializeState: state => JSON.parse(state)
}
