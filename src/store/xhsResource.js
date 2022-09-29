import { createContext, useContext } from "react"

const context = createContext()

export function useXhsResource () {
  return useContext(context)
}

export default context