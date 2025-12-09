export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  age: number
  phone: string
  image: string
  address: Address | null
  company: Company | null
}

export interface Address {
  address: string
  city: string
  state: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address | null
}
