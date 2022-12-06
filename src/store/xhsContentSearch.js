import { createContext, useContext } from "react"

const context = createContext()

export function useXhsContentSearch () {
  return useContext(context)
}

export default context