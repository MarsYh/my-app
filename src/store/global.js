import { createContext, useContext } from "react"

const context = createContext()

export function useGlobal(){
    return useContext(context)
}

export default context