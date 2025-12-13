import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useDeletePost } from "./use-delete-post.hook"

interface DeletePostButtonProps {
  postId: number
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { mutate: deletePost } = useDeletePost()

  const handleDeletePost = async () => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success("게시물이 삭제되었습니다")
      },
      onError: (error) => {
        toast.error("게시물 삭제 실패")
      },
    })
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleDeletePost}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
