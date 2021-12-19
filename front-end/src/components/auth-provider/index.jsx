import { memo, createContext } from "react"

import { getLoginUser } from "../../utils/request"
import { useAxios } from "../../utils/hooks"

export const LoginContext = createContext()

export default memo(function AuthProvider({ children }) {
  const {
    loading,
    error,
    response: user,
    refetch
  } = useAxios(getLoginUser())
  return (
    <LoginContext.Provider value={{ loading, error, user, refetch }}>
      {children}
    </LoginContext.Provider>
  )
})
