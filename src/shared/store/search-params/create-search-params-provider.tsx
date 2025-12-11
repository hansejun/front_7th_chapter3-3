import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type {
  SearchParamValue,
  SearchParamsConfig,
  SearchParamsContextValue,
  SearchParamsObject,
  SearchParamsProviderInstance,
} from "./types"

/**
 * 값을 지정된 타입으로 파싱
 */
function parseValue(value: string, type?: "string" | "number" | "boolean"): SearchParamValue {
  if (type === "number") {
    const parsed = Number(value)
    return isNaN(parsed) ? 0 : parsed
  }
  if (type === "boolean") {
    return value === "true"
  }
  return value
}

/**
 * URL의 SearchParams에서 파라미터를 파싱하여 객체로 반환
 */
function parseParamsFromURL<T extends SearchParamsObject>(
  searchParams: URLSearchParams,
  config: SearchParamsConfig<T>,
): T {
  const result = { ...config.defaultParams }

  searchParams.forEach((value, key) => {
    if (key in result) {
      const schema = config.paramSchema?.[key as keyof T]
      result[key as keyof T] = parseValue(value, schema) as T[keyof T]
    }
  })

  return result
}

/**
 * 파라미터 객체를 URL의 SearchParams로 동기화
 * 사용자 요구사항: 모든 파라미터를 항상 동기화
 */
function syncToURL<T extends SearchParamsObject>(
  params: T,
  setSearchParams: (params: URLSearchParams, options?: { replace?: boolean }) => void,
): void {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    // 모든 파라미터를 항상 URL에 동기화
    searchParams.set(key, String(value))
  })

  setSearchParams(searchParams, { replace: true })
}

/**
 * 제네릭 SearchParams Provider를 생성하는 팩토리 함수
 *
 * @example
 * ```tsx
 * const { Provider, useSearchParams } = createSearchParamsProvider<PostsSearchParams>({
 *   defaultParams: { skip: 0, limit: 10, search: '' },
 *   paramSchema: { skip: 'number', limit: 'number', search: 'string' }
 * })
 * ```
 */
export function createSearchParamsProvider<T extends SearchParamsObject>(
  config: SearchParamsConfig<T>,
): SearchParamsProviderInstance<T> {
  // Context 생성
  const SearchParamsContext = createContext<SearchParamsContextValue<T> | null>(null)

  // Provider 컴포넌트
  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState<T>(() => {
      // URL에서 초기값 읽기
      return parseParamsFromURL(searchParams, config)
    })

    // URL이 외부에서 변경될 때 (예: 브라우저 뒤로가기) state 업데이트
    useEffect(() => {
      const urlParams = parseParamsFromURL(searchParams, config)
      // 실제로 값이 변경된 경우에만 업데이트 (무한 루프 방지)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParams((prev) => {
        const hasChanged = Object.keys(urlParams).some((key) => prev[key as keyof T] !== urlParams[key as keyof T])
        return hasChanged ? urlParams : prev
      })
    }, [searchParams])

    // 파라미터 업데이트 (부분 업데이트 가능)
    const updateParams = useCallback(
      (partial: Partial<T>) => {
        setParams((prev) => {
          const newParams = { ...prev, ...partial }
          // URL 동기화
          syncToURL(newParams, setSearchParams)
          return newParams
        })
      },
      [setSearchParams],
    )

    // 파라미터를 기본값으로 리셋
    const resetParams = useCallback(() => {
      setParams(config.defaultParams)
      syncToURL(config.defaultParams, setSearchParams)
    }, [setSearchParams])

    return (
      <SearchParamsContext.Provider value={{ params, updateParams, resetParams }}>
        {children}
      </SearchParamsContext.Provider>
    )
  }

  // Hook
  const useSearchParamsHook = (): SearchParamsContextValue<T> => {
    const context = useContext(SearchParamsContext)
    if (!context) {
      throw new Error("useSearchParams must be used within the corresponding Provider")
    }
    return context
  }

  return {
    Provider,
    useSearchParams: useSearchParamsHook,
  }
}
