export default {
  Init: () => ({
    type: 'viewModel',
    value: 0
  }),
  COUNTER_INCREASED: (state) => ({
    ...state,
    value: state.value + 1
  }),
  COUNTER_DECREASED: (state) => ({
    ...state,
    value: state.value - 1
  })
}
