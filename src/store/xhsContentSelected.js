import { atom, useRecoilState } from "recoil"

export const XHS_SELECTED = atom({
  key: 'XHS_SELECTED',
  default: {}
})
export function useXhsSelected () {
  // const [state, setState] = useRecoilState(XHS_SELECTED)
  // return [state, setState]
  return useRecoilState(XHS_SELECTED)
}