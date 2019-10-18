import useDataLoading from './useDataLoading'

const useReadModel = (queryName, resolverName, args = {}) => {
  return useDataLoading(`/api/query/${queryName}/${resolverName}`, JSON.stringify({
    aggregateArgs: args
  }))
}

export default useReadModel
