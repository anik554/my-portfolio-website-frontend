export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  picture: string | null;
  status: string;
  auths: Auth[];
  blogs: Blog[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  id: number;
  userId: number;
  provider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}
