import { PaginatedData } from "@shared/model/response.interface"
import { apiInstance } from "../../../shared/api/instance"
import { CreatePostRequestDto, PostDto, PostListResponseDto, TagDto, UpdatePostRequestDto } from "../model/post.dto"
import { Post, Tag } from "../model/post.interface"
import { postMapper } from "../model/post.mapper"

// 게시물 목록 조회
const getPosts = async (skip: number, limit: number): Promise<PaginatedData<Post>> => {
  const response = await apiInstance.get<PostListResponseDto>("/posts", {
    params: { skip, limit },
  })

  return postMapper.toPaginatedPostList(response.data)
}

// 태그 목록 조회
const getTags = async (): Promise<Tag[]> => {
  const response = await apiInstance.get<TagDto[]>("/posts/tags")
  return postMapper.toTagList(response.data)
}

// 게시물 검색
const searchPosts = async (query: string): Promise<PaginatedData<Post>> => {
  const response = await apiInstance.get<PostListResponseDto>("/posts/search", {
    params: { q: query },
  })
  return postMapper.toPaginatedPostList(response.data)
}

// 태그별 게시물 조회
const getPostsByTag = async (tag: string): Promise<PaginatedData<Post>> => {
  const response = await apiInstance.get<PostListResponseDto>(`/posts/tag/${tag}`)
  return postMapper.toPaginatedPostList(response.data)
}

// 게시물 생성
const createPost = async (data: CreatePostRequestDto): Promise<Post> => {
  const response = await apiInstance.post<PostDto>("/posts/add", data)
  return postMapper.toPost(response.data)
}

// 게시물 수정
const updatePost = async (data: UpdatePostRequestDto): Promise<Post> => {
  const response = await apiInstance.put<PostDto>(`/posts/${data.id}`, data.data)
  return postMapper.toPost(response.data)
}

// 게시물 삭제
const deletePost = async (id: number): Promise<void> => {
  await apiInstance.delete(`/posts/${id}`)
}

export const postService = {
  getPosts,
  getTags,
  searchPosts,
  getPostsByTag,
  createPost,
  updatePost,
  deletePost,
}
