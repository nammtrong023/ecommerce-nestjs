export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentRequestBody {
  products: Product[];
  currency: string;
}
