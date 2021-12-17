import { useContext, useCallback, useState, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { UserContext } from "../components/login-context"

import { request } from "../utils/request"

export function useInput(init = "") {
  const [value, setValue] = useState(init)
  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])
  return { value, onChange }
}

export function useArray(init = ["", ""]) {
  const [array, setArray] = useState(init)
  return {
    array,
    setArray,
    clear: () => setArray([]),
    add: item => {
      setArray([...array, item])
    },
    modify: (idx, value) => {
      const copy = [...array]
      copy[idx] = value
      setArray(copy)
    },
    remove: idx => {
      const copy = [...array]
      copy.splice(idx, 1)
      setArray(copy)
    }
  }
}

export function useBoolInput(init = false) {
  const [checked, setChecked] = useState(init)
  const onChange = useCallback(() => {
    setChecked(!checked)
  }, [checked])
  return { checked, onChange }
}

export function useQuery(param) {
  const location = useLocation()
  const search = useMemo(() =>
    new URLSearchParams(location.search),
    [location.search]
  )
  return search.get(param)
}

export function useAxios({url, method, data}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [response, setResponse] = useState()
  const [count, setCount] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      setError(null)
      setLoading(true)
      try {
        const result = await request({url, method, data})
        setResponse(result.data)
      } catch (err) {
        setError(err.response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, method, data, count])

  const update = useCallback(() => {
    setCount(count => count + 1)
  }, [])

  return {
    loading,
    error,
    response,
    update
  }
}

export function useUser() {
  return useContext(UserContext)
}