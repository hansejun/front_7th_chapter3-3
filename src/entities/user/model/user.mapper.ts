import { PaginatedData } from "@shared/model/response.interface"
import type { UserDto, AddressDto, CompanyDto, UsersResponseDto } from "./user.dto"
import type { User, Address, Company } from "./user.interface"

const toAddress = (dto: AddressDto | undefined): Address | null => {
  if (!dto) return null

  return {
    address: dto.address,
    city: dto.city,
    state: dto.state,
  }
}

const toCompany = (dto: CompanyDto | undefined): Company | null => {
  if (!dto) return null

  return {
    department: dto.department || "",
    name: dto.name,
    title: dto.title,
    address: toAddress(dto.address),
  }
}

const toUser = (dto: UserDto): User => ({
  id: dto.id,
  username: dto.username,
  email: dto.email || "",
  firstName: dto.firstName || "",
  lastName: dto.lastName || "",
  age: dto.age || 0,
  phone: dto.phone || "",
  image: dto.image || "",
  address: toAddress(dto.address),
  company: toCompany(dto.company),
})

const toUserList = (dtos: UserDto[]): User[] => {
  return dtos.map(toUser)
}

const toPaginatedUserList = (data: UsersResponseDto): PaginatedData<User> => {
  return {
    ...data,
    data: toUserList(data.users),
  }
}

export const userMapper = {
  toUser,
  toUserList,
  toAddress,
  toCompany,
  toPaginatedUserList,
}
