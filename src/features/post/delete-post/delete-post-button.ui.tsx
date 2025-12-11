import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"
import { useDeletePost } from "./use-delete-post.hook"

interface DeletePostButtonProps {
  postId: number
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { mutate: deletePost } = useDeletePost()

  const handleDeletePost = async () => {
    deletePost(postId, {
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleDeletePost}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
