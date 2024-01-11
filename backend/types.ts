import { Image, Product } from '@prisma/client';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  id: string;
  email: string;
};

export type UserType = {
  email: string;
  name: string;
};

export type JwtPayloadWithRtToken = JwtPayload & { refreshToken: string };
export type JwtPayloadWithAtToken = JwtPayload & { accessToken: string };
export type JwtPayloadWithTokens = JwtPayload & Tokens;

export type ProductType = {
  id: string;
  name: string;
  desc: string;
  price: number;
  isFeatured: boolean;
  updatedAt: Date;
  status: number;
  categoryId: string;
  category: {
    name: string;
  };
  sizes: string[];
  colors: string[];
  image: Image[];
  createdAt: string;
};

export type FilterType = {
  status?: string;
  itemsPerPage?: number;
  page?: number;
  search?: string;
};

export type FilterProductsType = {
  catId?: string;
  sizeId?: string;
  colorId?: string;
  price?: number;
  sort?: 'asc' | 'desc';
};

type PaginationType = {
  total: number;
  currentPage?: number;
  itemsPerPage?: number;
};

export type FilterProductsAndPagination = FilterType & FilterProductsType;

export type ProductFilterType = PaginationType & {
  data: Product[];
};
