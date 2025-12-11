import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

import { commentService, type Comment, CreateCommentRequestDto } from "@entities/comment"
import { AddPostModalTrigger } from "@features/post/add-post"

import { PostTable } from "./post-table"

import { PostSearchFilter } from "./post-search-filter"
import { PaginationControls } from "./pagination-controls"
import { useGetSuspendedPostsWithUser } from "./use-post-with-user.hook"

export const PostsManagerPage = () => {
  // React Query로 posts 데이터 가져오기
  const { total } = useGetSuspendedPostsWithUser()

  // 상태 관리

  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await commentService.getCommentsByPost(postId)
      setComments((prev) => ({ ...prev, [postId]: data.data }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async (commentData: CreateCommentRequestDto) => {
    try {
      const data = await commentService.createComment(commentData)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async (comment: Comment) => {
    try {
      const data = await commentService.updateComment(comment.id, comment.body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((c) => (c.id === data.id ? data : c)),
      }))
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await commentService.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const currentComment = comments[postId].find((c) => c.id === id)
      if (!currentComment) return

      const data = await commentService.likeComment(id, currentComment.likes + 1)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostModalTrigger />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchFilter />

          <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
            <PostTable />
          </Suspense>

          {/* 페이지네이션 */}
          <PaginationControls total={total} />
        </div>
      </CardContent>
    </Card>
  )
}
