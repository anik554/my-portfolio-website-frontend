export interface IProjects {
  id: number
  title: string
  description: string
  thumbnail: string
  repoLink: string
  liveLink: string
  features: string[]
  technologies: string[]
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