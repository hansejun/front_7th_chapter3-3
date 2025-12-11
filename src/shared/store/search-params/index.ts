/**
 * 범용 SearchParams Provider 팩토리
 *
 * @example
 * ```tsx
 * // 1. Provider 생성
 * const { Provider, useSearchParams } = createSearchParamsProvider({
 *   defaultParams: { skip: 0, limit: 10 }
 * })
 *
 * // 2. App에서 Provider로 감싸기
 * <Provider>
 *   <YourComponent />
 * </Provider>
 *
 * // 3. 컴포넌트에서 사용
 * function YourComponent() {
 *   const { params, updateParams, resetParams } = useSearchParams()
 *   // ...
 * }
 * ```
 */
export { createSearchParamsProvider } from "./create-search-params-provider"
export type {
  SearchParamValue,
  SearchParamsObject,
  SearchParamsConfig,
  SearchParamsContextValue,
  SearchParamsProviderInstance,
} from "./types"
