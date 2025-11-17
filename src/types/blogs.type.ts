export interface IBlogs {
  id: number
  title: string
  content: string
  thumbnail: string | null
  isFeatured: boolean
  tags: string[]
  views: number
  authorId: number
  createdAt: string
  updatedAt: string
  author: Author
}

export interface Author {
  id: number
  name: string
  email: string
}