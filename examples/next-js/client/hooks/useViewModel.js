import useDataLoading from './useDataLoading'

const useViewModel = (viewModelName, aggregateId, args = {}) => {
  return useDataLoading(
    `/api/query/${viewModelName}/${aggregateId}`, JSON.stringify({ aggregateArgs: args })
  )
}

export default useViewModel
