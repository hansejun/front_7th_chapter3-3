import { queryOptions } from "@tanstack/react-query"
import { userService } from "./user.service"

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params?: { limit?: number; skip?: number; select?: string }) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}

export const userQueries = {
  // 사용자 목록 조회
  list: (params?: { limit?: number; skip?: number; select?: string }) =>
    queryOptions({
      queryKey: userKeys.list(params),
      queryFn: () => userService.getUsers(params),
    }),

  // 특정 사용자 조회
  detail: (id: number) =>
    queryOptions({
      queryKey: userKeys.detail(id),
      queryFn: () => userService.getUserById(id),
    }),
}
