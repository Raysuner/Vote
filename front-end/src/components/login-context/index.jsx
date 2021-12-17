import { memo, createContext } from "react"

import { getLoginUser } from "src/utils/request"
import { useAxios } from "src/utils/hooks"

export const UserContext = createContext()

export default memo(function LoginContext({ children }) {
  const {
    loading,
    error,
    response: user,
    update
  } = useAxios(getLoginUser())
  return (
    <UserContext.Provider value={{ loading, error, user, update }}>
      {children}
    </UserContext.Provider>
  )
})
