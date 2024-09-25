import ProductCard from "./ProductCard";

export interface Product {
  price: number;
  product: any;
  id: string;
  attributes: {
    label: string;
    en_label: string;
    slug: string;
    desc: string;
    en_desc: string;
    image_url: string;
    image_placeholder_url: string;
    price: number;
    medicines: any;
  }
}



interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}