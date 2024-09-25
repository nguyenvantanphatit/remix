import { Link } from "@remix-run/react";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, slug, name, image, price }: ProductCardProps) {
  return (
    <Link to={`/products/${slug}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price.toFixed(2)}</p>
    </Link>
  );
}