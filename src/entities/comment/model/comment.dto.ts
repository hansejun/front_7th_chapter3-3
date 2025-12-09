import { PaginatedResponseBase } from "@shared/model/response.interface"

interface CommentUserDto {
  id: number
  username: string
  fullName?: string
}

export interface CommentDto {
  id: number
  body: string
  postId: number
  userId: number
  likes?: number
  user?: CommentUserDto
}

export interface CreateCommentRequestDto {
  body: string
  postId: number | null
  userId: number
}

export interface UpdateCommentRequestDto {
  id: number
  body: string
}

export interface CommentListResponseDto extends PaginatedResponseBase {
  comments: CommentDto[]
}
