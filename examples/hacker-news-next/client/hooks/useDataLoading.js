import { useEffect, useReducer } from 'react'

const defaultState = {
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataLoadingSucceeded': {
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null
      }
    }
    case 'dataLoadingFailed': {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case 'dataLoadingStarted': {
      return {
        ...state,
        loading: true
      }
    }
    default: {
      return state
    }
  }
}

const useDataLoading = (apiUrl, body) => {
  const [{ data, error, loading }, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    const run = async () => {
      try {
        dispatch({
          type: 'dataLoadingStarted'
        })

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        })

        dispatch({
          type: 'dataLoadingSucceeded',
          data: await response.json()
        })
      } catch (e) {
        dispatch({
          type: 'dataLoadingFailed',
          error: e
        })
      }
    }

    run()
  }, [])

  return { data, error, loading }
}

export default useDataLoading
