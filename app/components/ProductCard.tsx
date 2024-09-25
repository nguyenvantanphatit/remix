import { Link } from "@remix-run/react";

interface ProductCardProps {
  id: string;
  attributes: {
    label: string;
    desc: string;
    slug: string;
    image_url: string;
    price: number;
  }
}

export default function ProductCard({ id, attributes }: ProductCardProps) {
  const { label, desc, slug, image_url, price } = attributes;
  return (
    <Link to={`/product/${slug}`} className="group">
      <h3 className="mt-4 text-sm text-gray-700">{label}</h3>
      <h3 className="mt-4 text-sm text-gray-700">{desc}</h3>
    </Link>
  );
}