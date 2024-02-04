import { StoreApi, UseBoundStore, create } from 'zustand'

export type loaderProps = {
    isLoading: boolean,
    enableLoader: () => unknown,
    disableLoader:()=>unknown
}
const useLoaderStore:UseBoundStore<StoreApi<loaderProps>> = create((set) => ({
  isLoading: false,
  enableLoader: () => set({isLoading:true}),
  disableLoader: () => set({isLoading:false}),
}))


export default useLoaderStore