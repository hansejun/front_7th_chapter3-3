export interface AddressDto {
  address: string
  city: string
  state: string
  stateCode?: string
  postalCode?: string
  coordinates?: {
    lat: number
    lng: number
  }
  country?: string
}

export interface CompanyDto {
  department?: string
  name: string
  title: string
  address?: AddressDto
}

export interface UserDto {
  id: number
  username: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
  phone?: string
  image?: string
  address?: AddressDto
  company?: CompanyDto
}

export interface UsersResponseDto {
  users: UserDto[]
  total: number
  skip: number
  limit: number
}
