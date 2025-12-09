// Pagination 타입
export interface PaginationParams {
  skip: number
  limit: number
}

// Sort 타입
export interface SortParams {
  sortBy: string
  sortOrder: "asc" | "desc"
}

// Filter 타입
export interface FilterParams {
  search?: string
  tag?: string
}
