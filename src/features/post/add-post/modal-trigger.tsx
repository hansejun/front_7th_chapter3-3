import { Plus } from "lucide-react"
import { Button } from "@shared/ui/button"
import { useModal } from "@shared/hooks/use-modal"
import { AddPostModal } from "./modal.ui"

export function AddPostModalTrigger() {
  const { openModal } = useModal()

  const handleOpenAddPostModal = () => {
    openModal(AddPostModal, {})
  }

  return (
    <Button onClick={handleOpenAddPostModal}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
