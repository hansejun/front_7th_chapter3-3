import { User } from "../model/user.interface"

export const UserProfile = ({ user }: { user: User }) => {
  return <img src={user.image} alt={user.username} className="w-8 h-8 rounded-full" />
}
