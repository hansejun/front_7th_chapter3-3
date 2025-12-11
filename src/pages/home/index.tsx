import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

import { userService, type User } from "@entities/user"
import { commentService, type Comment, CreateCommentRequestDto } from "@entities/comment"
import { Post, usePostsSearchParams } from "@entities/post"
import { AddPostButton } from "@features/post/add-post"
import { ViewPostModal } from "@features/post/view-post"
import { AddCommentModal } from "@features/comment/add-comment"
import { EditCommentModal } from "@features/comment/edit-comment"
import { ViewUserModal } from "@features/user/view-user"
import { PostTable } from "./post-table"
import { useModal } from "@shared/hooks/use-modal"
import { PostSearchFilter } from "./post-search-filter"
import { PaginationControls } from "./pagination-controls"
import { useGetSuspendedPostsWithUser } from "./use-post-with-user.hook"

export const PostsManagerPage = () => {
  const { openModal } = useModal()
  const { params } = usePostsSearchParams()

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

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    fetchComments(post.id)
    openModal(ViewPostModal, {
      post,
      comments: comments[post.id] || [],
      searchTerm: params.search,
      onAddComment: (postId: number) => {
        const newComment: CreateCommentRequestDto = { body: "", postId, userId: 1 }
        openModal(AddCommentModal, {
          comment: newComment,
          onCommentChange: () => {},
          onAdd: () => addComment(newComment),
        })
      },
      onLikeComment: likeComment,
      onEditComment: (comment: Comment) => {
        let editedComment = { ...comment }
        openModal(EditCommentModal, {
          comment,
          onCommentChange: (c: Comment) => {
            editedComment = c
          },
          onUpdate: () => updateComment(editedComment),
        })
      },
      onDeleteComment: deleteComment,
    })
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await userService.getUserById(user.id)
      openModal(ViewUserModal, {
        user: userData,
      })
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchFilter />

          <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
            <PostTable openUserModal={openUserModal} openPostDetail={openPostDetail} />
          </Suspense>

          {/* 페이지네이션 */}
          <PaginationControls total={total} />
        </div>
      </CardContent>
    </Card>
  )
}
