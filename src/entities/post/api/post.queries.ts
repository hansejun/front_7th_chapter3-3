import { queryOptions } from "@tanstack/react-query"
import { postService } from "./post.service"
import { PaginationParams } from "@shared/model/param.interface"

export interface PostsQueryParams extends PaginationParams {
  search?: string
  tag?: string
}

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  // 통합된 list 쿼리 키 - search, tag 파라미터 포함
  list: (params: PostsQueryParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
  tags: () => [...postKeys.all, "tags"] as const,
}

// Query Options
export const postQueries = {
  // 통합된 게시물 목록 조회 - search, tag, 일반 목록을 하나로 통합
  list: (params: PostsQueryParams) =>
    queryOptions({
      queryKey: postKeys.list(params),
      queryFn: async () => {
        const { skip = 0, limit = 10, search, tag } = params

        // 검색어가 있는 경우 (빈 문자열 제외)
        if (search && search.trim() !== "") {
          return postService.searchPosts(search)
        }

        // 태그가 있는 경우 (all 태그는 제외)
        if (tag && tag !== "all") {
          return postService.getPostsByTag(tag)
        }

        // 기본 목록 조회
        return postService.getPosts(skip, limit)
      },
    }),

  // 태그 목록 조회
  tags: () =>
    queryOptions({
      queryKey: postKeys.tags(),
      queryFn: () => postService.getTags(),
    }),
}
