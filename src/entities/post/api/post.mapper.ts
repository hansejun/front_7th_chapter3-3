import { PaginatedData } from "@shared/model/response.interface"
import type { PostDto, PostListResponseDto, TagDto } from "../api/post.dto"
import type { Post, Tag } from "../model/post.interface"

const toPost = (dto: PostDto): Post => ({
  id: dto.id,
  title: dto.title,
  body: dto.body,
  userId: dto.userId,
  tags: dto.tags || [],
  reactions: dto.reactions || { likes: 0, dislikes: 0 },
  views: dto.views || 0,
})

const toPostList = (dtos: PostDto[]): Post[] => {
  return dtos.map(toPost)
}

const toTag = (dto: TagDto): Tag => ({
  slug: dto.slug,
  name: dto.name,
  url: dto.url,
})

const toTagList = (dtos: TagDto[]): Tag[] => {
  return dtos.map(toTag)
}

const toPaginatedPostList = (data: PostListResponseDto): PaginatedData<Post> => {
  return {
    ...data,
    data: toPostList(data.posts),
  }
}

export const postMapper = {
  toPost,
  toPostList,
  toPaginatedPostList,
  toTag,
  toTagList,
}
