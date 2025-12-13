import { User, UserProfile } from "@entities/user"
import { UserDetailModal } from "./modal.ui"
import { useModal } from "@shared/hooks/use-modal"

export const UserDetailModalTrigger = ({ user }: { user: User }) => {
  const { openModal } = useModal()

  const handleOpenUserDetailModal = () => {
    openModal(UserDetailModal, { user })
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleOpenUserDetailModal}>
      <UserProfile user={user} />
      <span>{user.username}</span>
    </div>
  )
}
