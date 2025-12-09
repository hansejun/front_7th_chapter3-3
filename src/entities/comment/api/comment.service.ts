import { apiInstance } from "@shared/api/instance"
import type { CommentDto, CommentListResponseDto, CreateCommentRequestDto } from "../model/comment.dto"
import type { Comment } from "../model/comment.interface"
import { commentMapper } from "../model/comment.mapper"
import { PaginatedData } from "@shared/model/response.interface"

// 특정 게시물의 댓글 목록 조회
const getCommentsByPost = async (postId: number): Promise<PaginatedData<Comment>> => {
  const response = await apiInstance.get<CommentListResponseDto>(`/comments/post/${postId}`)
  return commentMapper.toPaginatedCommentList(response.data)
}

// 댓글 생성
const createComment = async (data: CreateCommentRequestDto): Promise<Comment> => {
  const response = await apiInstance.post<CommentDto>("/comments/add", data)
  return commentMapper.toComment(response.data)
}

// 댓글 수정
const updateComment = async (id: number, body: string): Promise<Comment> => {
  const response = await apiInstance.put<CommentDto>(`/comments/${id}`, { body })
  return commentMapper.toComment(response.data)
}

// 댓글 좋아요
const likeComment = async (id: number, likes: number): Promise<Comment> => {
  const response = await apiInstance.patch<CommentDto>(`/comments/${id}`, { likes })
  return commentMapper.toComment(response.data)
}

// 댓글 삭제
const deleteComment = async (id: number): Promise<void> => {
  await apiInstance.delete(`/comments/${id}`)
}

export const commentService = {
  getCommentsByPost,
  createComment,
  updateComment,
  likeComment,
  deleteComment,
}
