import { useQuery } from '@tanstack/react-query'
import { userQueries } from '../api/user.queries'

// 사용자 목록 조회
export const useUsers = (params?: { limit?: number; skip?: number; select?: string }) => {
  return useQuery(userQueries.list(params))
}

// 특정 사용자 조회
export const useUser = (id: number) => {
  return useQuery(userQueries.detail(id))
}
