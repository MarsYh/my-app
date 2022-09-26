import { createContext, useContext } from "react"
// 1.创建 
const context = createContext()

// 3. 使用
export function useXhsDetail () {
    return useContext(context)
}

export default context