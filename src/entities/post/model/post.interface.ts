import { type User } from "@entities/user/@x/post"
import { SearchParamValue } from "@shared/store/search-params"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: PostReactions
  views: number
}

export interface PostReactions {
  likes: number
  dislikes: number
}

export interface Tag {
  slug: string
  name: string
  url: string
}

export interface PostWithAuthor extends Post {
  author: User
}

export interface PostsSearchParams {
  [key: string]: SearchParamValue
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
}
