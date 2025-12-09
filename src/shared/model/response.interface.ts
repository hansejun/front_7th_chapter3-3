export interface PaginatedResponseBase {
  total: number
  skip: number
  limit: number
}

export interface PaginatedData<T> extends PaginatedResponseBase {
  data: T[]
  total: number
  skip: number
  limit: number
}
