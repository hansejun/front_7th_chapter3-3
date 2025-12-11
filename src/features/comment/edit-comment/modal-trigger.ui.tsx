import { useModal } from "@shared/hooks/use-modal"
import { Button } from "@shared/ui/button"
import { EditCommentModal } from "./modal.ui"
import { Comment } from "@entities/comment"
import { Edit2 } from "lucide-react"

interface EditCommentModalTriggerProps {
  comment: Comment
}

export const EditCommentModalTrigger = ({ comment }: EditCommentModalTriggerProps) => {
  const { openModal } = useModal()

  const handleOpenEditCommentModal = () => {
    openModal(EditCommentModal, { comment })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleOpenEditCommentModal}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
