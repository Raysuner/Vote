import { useContext, useCallback, useState, useMemo } from "react"
import { useLocation } from "react-router-dom"

// import axios from "axios"

import { UserContext } from "../components/login-context"

// axios.interceptors.request.use(config => {
//   const user = window.localStorage.getItem("user")
//   if (user) {
//     let token = JSON.parse(user).token
//     config.headers['Authorization'] = `Bearer ${token}`
//   }
//   return config
// }, err => {
//   if (axios.isAxiosError(err)) {
//     console.error("it's a axios error")
//   } else {
//     console.error(err.message)
//   }
// })

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

// export function useAxios(config) {
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState()
//   const [data, setData] = useState()
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     const CancelToken = axios.CancelToken
//     const source = cancelToken.source()
//     const request = axios({
//       ...config,
//       cancelToken: source.token,
//       timeout: 5000
//     })

//     request.then(res => {
//       if (res.data.errorMsg) {
//         setError(res.data)
//         setData(null)
//       } else {
//         setError(null)
//         setData(res.data)
//       }
//       setLoading(false)
//     }, err => {
//       if (axios.isCancel(err)) {
//         console.error("Request canceled", err.message)
//       } else {
//         console.error("Request Failed")
//       }
//       setError(err.message)
//       setLoading(false)
//     })

//     const update = useCallback(() => {
//       setCount(count => count + 1)
//     }, [])
//   }, [config.url])
// }

export function useUser() {
  return useContext(UserContext)
}