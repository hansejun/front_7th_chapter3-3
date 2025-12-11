import { Post } from "@entities/post"
import { useModal } from "@shared/hooks/use-modal"
import { Button } from "@shared/ui/button"
import { EditPostModal } from "./modal.ui"
import { Edit2 } from "lucide-react"

interface EditPostModalTriggerProps {
  post: Post
}

export function EditPostModalTrigger({ post }: EditPostModalTriggerProps) {
  const { openModal } = useModal()

  const handleOpenEditPostModal = () => {
    openModal(EditPostModal, { post })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleOpenEditPostModal}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
