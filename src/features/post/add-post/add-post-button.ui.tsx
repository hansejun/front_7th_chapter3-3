import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@shared/ui/button"
import { useModal } from "@shared/hooks/use-modal"
import { CreatePostRequestDto } from "@entities/post"
import { AddPostModal } from "./modal.ui"
import { useAddPost } from "./use-add-post.hook"

export function AddPostButton() {
  const { openModal } = useModal()
  const addPostMutation = useAddPost()
  const [newPost, setNewPost] = useState<CreatePostRequestDto>({
    title: "",
    body: "",
    userId: 1
  })

  const handleAddPost = async (postData: CreatePostRequestDto) => {
    try {
      await addPostMutation.mutateAsync(postData)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Button
      onClick={() => {
        let postData = { ...newPost }
        openModal(AddPostModal, {
          newPost,
          setNewPost: (p: CreatePostRequestDto) => {
            postData = p
          },
          onAddPost: () => handleAddPost(postData),
        })
      }}
    >
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}