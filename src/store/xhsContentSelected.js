import { atom,useRecoilState } from "recoil"

/**
 * 
 * {
 * 
        time:[<div>近三天</div>],
        type:[<div>官方</div>]
   }
 */
export const XHS_SELECTED = atom({
    key:"XHS_SELECTED",
    default:{ }
})

export function useXhsSelected(){
    return useRecoilState(XHS_SELECTED)
}