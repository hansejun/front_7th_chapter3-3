import { Suspense, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

import { userService, type User } from "@entities/user"
import { commentService, type Comment, CreateCommentRequestDto } from "@entities/comment"
import {
  CreatePostRequestDto,
  Post,
  postService,
  Tag,
  PostsSearchParamsProvider,
  usePostsSearchParams,
} from "@entities/post"
import { AddPostModal } from "@features/post/add-post"
import { EditPostModal } from "@features/post/edit-post"
import { ViewPostModal } from "@features/post/view-post"
import { AddCommentModal } from "@features/comment/add-comment"
import { EditCommentModal } from "@features/comment/edit-comment"
import { ViewUserModal } from "@features/user/view-user"
import { PostTable } from "./post-table"
import { useModal } from "@shared/hooks/use-modal"
import { PostSearchFilter } from "./post-search-filter"
import { PaginationControls } from "./pagination-controls"

const PostsManager = () => {
  const { params } = usePostsSearchParams()
  const { openModal } = useModal()

  // 상태 관리
  const [posts, setPosts] = useState<(Post & { author?: User })[]>([])
  const [total, setTotal] = useState<number>(0)
  const [newPost, setNewPost] = useState<CreatePostRequestDto>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([
        postService.getPosts(params.skip, params.limit),
        userService.getUsers({ limit: 0, select: "username,image" }),
      ])

      const postsWithUsers = postsData.data.map((post) => ({
        ...post,
        author: usersData.data.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await postService.getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!params.search) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await postService.searchPosts(params.search)
      setPosts(data.data)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([
        postService.getPostsByTag(tag),
        userService.getUsers({ limit: 0, select: "username,image" }),
      ])

      const postsWithUsers = postsData.data.map((post) => ({
        ...post,
        author: usersData.data.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 추가
  const addPost = async (postData: CreatePostRequestDto) => {
    try {
      const data = await postService.createPost(postData)
      setPosts([data, ...posts])
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async (post: Post) => {
    try {
      const data = await postService.updatePost({ id: post.id, data: post })
      setPosts(posts.map((p) => (p.id === data.id ? data : p)))
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await postService.deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

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

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (params.tag) {
      fetchPostsByTag(params.tag)
    } else {
      fetchPosts()
    }
  }, [params.skip, params.limit, params.sortBy, params.sortOrder, params.tag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button
            onClick={() => {
              let postData = { ...newPost }
              openModal(AddPostModal, {
                newPost,
                setNewPost: (p: CreatePostRequestDto) => {
                  postData = p
                },
                onAddPost: () => addPost(postData),
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchFilter searchPosts={searchPosts} tags={tags} />

          <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
            <PostTable
              posts={posts}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              deletePost={deletePost}
              onEditPost={(post: Post) => {
                let editedPost = { ...post }
                openModal(EditPostModal, {
                  post,
                  onPostChange: (p: Post) => {
                    editedPost = p
                  },
                  onUpdate: () => updatePost(editedPost),
                })
              }}
            />
          </Suspense>

          {/* 페이지네이션 */}
          <PaginationControls total={total} />
        </div>
      </CardContent>
    </Card>
  )
}

const PostsManagerWithProvider = () => {
  return (
    <PostsSearchParamsProvider>
      <PostsManager />
    </PostsSearchParamsProvider>
  )
}

export default PostsManagerWithProvider
