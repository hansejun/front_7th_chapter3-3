import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { QueryKey, UseMutationOptions } from "@tanstack/react-query"

export interface OptimisticOptions<TQueryData, TVariables> {
  /** 낙관적 업데이트를 적용할 대상 쿼리 키 */
  optimisticKey: QueryKey

  /** 성공/정착 후 invalidate할 QueryKey 목록 */
  invalidateKeys?: QueryKey[]

  /** 낙관적 업데이트 시 데이터를 어떻게 갱신할지 */
  updateFn: (oldData: TQueryData, newItem: TVariables) => TQueryData

  /** onSuccess / onSettled / never */
  strategy?: "onSuccess" | "onSettled" | "never"
}

type SimpleMutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  "onMutate" | "onError" | "onSuccess" | "onSettled"
> & {
  onMutate?: (variables: TVariables) => void | Promise<void>
  onError?: (error: TError, variables: TVariables, context: unknown) => void
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: unknown) => void
}

export function useOptimisticMutation<TData, TError, TVariables, TQueryData = unknown>(
  mutationOptions: SimpleMutationOptions<TData, TError, TVariables>,
  optimisticOptions: OptimisticOptions<TQueryData, TVariables>,
) {
  const queryClient = useQueryClient()

  const {
    optimisticKey,
    invalidateKeys = [optimisticKey], // 기본적으로 optimisticKey만 invalidate
    updateFn,
    strategy = "onSettled",
  } = optimisticOptions

  return useMutation<TData, TError, TVariables, TQueryData>({
    ...mutationOptions,

    async onMutate(newItem) {
      await queryClient.cancelQueries({ queryKey: optimisticKey })

      // 이전 데이터 저장
      const previousData = queryClient.getQueryData<TQueryData>(optimisticKey)

      // 낙관적 업데이트 적용
      queryClient.setQueryData<TQueryData>(optimisticKey, (old) => (old ? updateFn(old, newItem) : old))

      // 추가로 전달받은 onMutate 실행
      if (mutationOptions.onMutate) {
        await mutationOptions.onMutate(newItem)
      }

      return previousData as TQueryData
    },

    onError(error, newItem, context) {
      // 실패 시 롤백
      if (context) {
        queryClient.setQueryData(optimisticKey, context)
      }

      mutationOptions.onError?.(error, newItem, context)
    },

    onSuccess(data, variables, context) {
      if (strategy === "onSuccess") {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }))
      }

      mutationOptions.onSuccess?.(data, variables, context)
    },

    onSettled(data, error, variables, context) {
      if (strategy === "onSettled") {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }))
      }

      mutationOptions.onSettled?.(data, error, variables, context)
    },
  })
}
