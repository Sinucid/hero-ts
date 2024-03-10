import { api } from "../api";
import { ProductApi, Slide } from "../models";

export class ProductSlidesService {
  private url = "https://dummyjson.com/products";

  async get(): Promise<Slide[]> {
    const response = await api<ProductApi.Response>({ url: this.url });

    if (response.data) return this.normalize(response.data);

    //error handled
    return [];
  }

  protected normalize(response: ProductApi.Response): Slide[] {
    return (
      response.products
        //get first 5 products
        .slice(0, 5)
        .map((product) => ({
          title: product.title,
          description: product.description,
          image: product.images[0],
          //product does not contain url
          url: `/`,
        }))
    );
  }
}
