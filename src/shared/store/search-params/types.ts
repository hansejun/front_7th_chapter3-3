/**
 * 공통 SearchParams Provider 타입 정의
 */

/**
 * SearchParams에서 허용되는 값 타입
 */
export type SearchParamValue = string | number | boolean

/**
 * SearchParams 객체의 기본 타입
 */
export type SearchParamsObject = Record<string, SearchParamValue>

/**
 * SearchParams Provider 팩토리 함수의 설정 타입
 */
export interface SearchParamsConfig<T extends SearchParamsObject> {
  /** 기본 파라미터 값 */
  defaultParams: T
  /** URL 파싱을 위한 스키마 (optional) */
  paramSchema?: {
    [K in keyof T]?: "string" | "number" | "boolean"
  }
}

/**
 * SearchParams Context가 제공하는 값의 타입
 */
export interface SearchParamsContextValue<T extends SearchParamsObject> {
  /** 현재 검색 파라미터 */
  params: T
  /** 파라미터 업데이트 함수 (부분 업데이트 가능) */
  updateParams: (partial: Partial<T>) => void
  /** 파라미터를 기본값으로 초기화 */
  resetParams: () => void
}

/**
 * createSearchParamsProvider 팩토리 함수의 반환 타입
 */
export interface SearchParamsProviderInstance<T extends SearchParamsObject> {
  /** Provider 컴포넌트 */
  Provider: React.FC<{ children: React.ReactNode }>
  /** SearchParams를 사용하기 위한 Hook */
  useSearchParams: () => SearchParamsContextValue<T>
}
