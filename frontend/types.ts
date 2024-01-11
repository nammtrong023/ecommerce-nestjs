export type TokenType = {
    accessToken: string;
    refreshToken: string;
};

export type UserType = {
    id: string;
    name: string;
    email: string;
    orders: OrderType[];
};

export type CategoryType = {
    id: string;
    name: string;
    image: string;
    product: ProductType[];
    createdAt: Date;
};

export type ProductType = {
    id: string;
    price: number;
    name: string;
    images: Image[];
    category: CategoryType;
    desc: string;
    isFeatured: boolean;
    colors: ColorsOnProducts[];
    sizes: SizesOnProducts[];
    createdAt: Date;
};

export type ProductInCart = {
    id: string;
    productId: string;
    name: string;
    images: Image[];
    category: CategoryType;
    desc: string;
    size: string | null;
    color: string | null;
    createdAt: Date;
    price: number;
    quantity: number;
};

export type Image = {
    id: string;
    url: string;
};

export type SizeType = {
    id: string;
    value: string;
    createdAt: Date;
};

export type ColorType = {
    id: string;
    name: string;
    value: string;
    createdAt: Date;
};

export type OrderType = {
    id: string;
    total: number;
    user: UserType;
    address: string;
    phone: string;
    orderItems: OrderDetailType[];
    createdAt: Date;
};

export type OrderDetailType = {
    id: string;
    product: ProductType;
    size: string;
    price: number;
    color: string;
    quantity: number;
    createdAt: Date;
};

type ColorsOnProducts = {
    id: string;
    color: ColorType;
};

type SizesOnProducts = {
    id: string;
    size: SizeType;
};
