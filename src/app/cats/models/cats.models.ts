export interface CatsFacts {
  fact: string
  length: number
}
export interface CatsFactsResponse {
  data: CatsFacts[]
  current_page: number
}
