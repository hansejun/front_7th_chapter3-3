import { apiInstance } from "@shared/api/instance"
import type { UserDto, UsersResponseDto } from "../model/user.dto"
import { PaginatedData } from "@shared/model/response.interface"
import { User } from "../model/user.interface"
import { userMapper } from "../model/user.mapper"

// 사용자 목록 조회
const getUsers = async (params?: { limit?: number; skip?: number; select?: string }): Promise<PaginatedData<User>> => {
  const response = await apiInstance.get<UsersResponseDto>("/users", {
    params,
  })
  return userMapper.toPaginatedUserList(response.data)
}

// 특정 사용자 조회
const getUserById = async (id: number): Promise<User> => {
  const response = await apiInstance.get<UserDto>(`/users/${id}`)
  return userMapper.toUser(response.data)
}

export const userService = {
  getUsers,
  getUserById,
}
