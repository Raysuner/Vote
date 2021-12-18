import { memo, createContext } from "react"

import { getLoginUser } from "src/utils/request"
import { useAxios } from "src/utils/hooks"

export const LoginContext = createContext()

export default memo(function AuthProvider({ children }) {
  const {
    loading,
    error,
    response: user,
    reFetch
  } = useAxios(getLoginUser())
  return (
    <LoginContext.Provider value={{ loading, error, user, reFetch }}>
      {children}
    </LoginContext.Provider>
  )
})
