import { Post } from "@entities/post"
import { PostDetailModal } from "./modal.ui"
import { useModal } from "@shared/hooks/use-modal"
import { MessageSquare } from "lucide-react"
import { Button } from "@shared/ui/button"

export const PostDetailModalTrigger = ({ post }: { post: Post }) => {
  const { openModal } = useModal()

  const handleOpenPostDetailModal = () => {
    openModal(PostDetailModal, { post })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleOpenPostDetailModal}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
