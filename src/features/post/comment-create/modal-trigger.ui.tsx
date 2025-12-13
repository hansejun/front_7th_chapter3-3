import { Button } from "@shared/ui/button"
import { Plus } from "lucide-react"
import { AddCommentModal } from "./modal.ui"
import { useModal } from "@shared/hooks/use-modal"

export const AddCommentModalTrigger = ({ postId }: { postId: number }) => {
  const { openModal } = useModal()

  const handleOpenAddCommentModal = () => {
    openModal(AddCommentModal, { postId })
  }

  return (
    <Button size="sm" onClick={handleOpenAddCommentModal}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
