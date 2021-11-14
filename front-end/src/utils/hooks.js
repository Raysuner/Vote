import { useCallback, useState, useMemo } from "react"
import { useLocation } from "react-router-dom"

export function useInput(init = "") {
  const [value, setValue] = useState(init)
  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])
  return {value, onChange}
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
  return {checked, onChange}
}

export function useQuery(param) {
  const location = useLocation()
  const search = useMemo(() =>
    new URLSearchParams(location.search),
    [location.search]
  )
  return search.get(param)
}

export function useAxios({ url, method, headers, body }) {
}