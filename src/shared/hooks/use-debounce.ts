import { useEffect, useState } from "react"

/**
 * 값의 변경을 지연시키는 debounce hook
 * @param value - debounce할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns debounced된 값
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
