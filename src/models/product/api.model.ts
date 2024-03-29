export namespace ProductApi {
  export interface Response {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
  }

  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
}
