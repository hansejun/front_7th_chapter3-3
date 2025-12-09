import { PaginatedResponseBase } from "@shared/model/response.interface"

interface PostReactionsDto {
  likes: number
  dislikes: number
}

export interface PostDto {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: PostReactionsDto
  views?: number
}

export interface TagDto {
  slug: string
  name: string
  url: string
}

export interface CreatePostRequestDto {
  title: string
  body: string
  userId: number
  tags?: string[]
}

export interface UpdatePostRequestDto {
  id: number
  data: Partial<PostDto>
}

export interface PostListResponseDto extends PaginatedResponseBase {
  posts: PostDto[]
}
