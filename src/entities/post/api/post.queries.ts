import { queryOptions } from "@tanstack/react-query"
import { postService } from "./post.service"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (skip: number, limit: number) => [...postKeys.lists(), { skip, limit }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
  tags: () => [...postKeys.all, "tags"] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  byTag: (tag: string) => [...postKeys.all, "byTag", tag] as const,
}

export const postQueries = {
  // 게시물 목록 조회
  list: (skip: number, limit: number) =>
    queryOptions({
      queryKey: postKeys.list(skip, limit),
      queryFn: () => postService.getPosts(skip, limit),
    }),

  // 태그 목록 조회
  tags: () =>
    queryOptions({
      queryKey: postKeys.tags(),
      queryFn: () => postService.getTags(),
    }),

  // 게시물 검색
  search: (query: string) =>
    queryOptions({
      queryKey: postKeys.search(query),
      queryFn: () => postService.searchPosts(query),
      enabled: query.length > 0,
    }),

  // 태그별 게시물 조회
  byTag: (tag: string) =>
    queryOptions({
      queryKey: postKeys.byTag(tag),
      queryFn: () => postService.getPostsByTag(tag),
      enabled: tag.length > 0,
    }),
}
