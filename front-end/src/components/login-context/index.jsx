import { memo, createContext, useEffect, useState, useCallback } from "react"

import { getLoginUser } from "src/utils/request"

export const UserContext = createContext()

export default memo(function LoginContext({ children }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [user, setUser] = useState()
  const [count, setCount] = useState(0)
  useEffect(() => {
    getLoginUser()
      .then((res) => {
        const data = res.data
        // console.log("success data", data)
        setError(null) // 因为初次进入以未登录的身份进入网站时，会返回error，调用setError。登录成功后再次进入，error数据应该再次被设置
        setUser(data)
        setLoading(false) //这个必须放到最后，因为依赖数组里面放的是loading，执行setLoading后立即再次刷新组件，其它数据来不及更新
      })
      .catch((err) => {
        const data = err.response.data
        // console.log("error data", data)
        setError(data)
        setUser(null)
        setLoading(false) //这个必须放到最后，因为依赖数组里面放的是loading，执行setLoading后立即再次刷新组件，其它数据来不及更新
      })
  }, [loading, count])
  const update = useCallback(() => {
    setLoading(true)
    setCount((count) => count + 1)
  }, [])
  return (
    <UserContext.Provider value={{ loading, error, user, update }}>
      {children}
    </UserContext.Provider>
  )
})
