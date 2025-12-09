import { PaginatedData } from "@shared/model/response.interface"
import type { CommentDto, CommentListResponseDto } from "../api/comment.dto"
import type { Comment, CommentUser } from "./comment.interface"

const toCommentUser = (dto: CommentDto["user"]): CommentUser => {
  if (!dto) {
    return {
      id: 0,
      username: "Unknown",
      fullName: "",
    }
  }

  return {
    id: dto.id,
    username: dto.username,
    fullName: dto.fullName || "",
  }
}

const toComment = (dto: CommentDto): Comment => ({
  id: dto.id,
  body: dto.body,
  postId: dto.postId,
  userId: dto.userId,
  likes: dto.likes || 0,
  user: toCommentUser(dto.user),
})

const toCommentList = (dtos: CommentDto[]): Comment[] => {
  return dtos.map(toComment)
}

const toPaginatedCommentList = (data: CommentListResponseDto): PaginatedData<Comment> => {
  return {
    ...data,
    data: toCommentList(data.comments),
  }
}

export const commentMapper = {
  toComment,
  toCommentList,
  toPaginatedCommentList,
  toCommentUser,
}
