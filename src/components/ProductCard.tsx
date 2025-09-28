import { EditIcon, Trash2Icon } from "lucide-react";
import type { Products } from "../types";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const ProductCard = ({ id, image, name, price }: Products) => {
  const { deleteProduct } = useProductStore();
  return (
    <div className="card bg-base-100 shadow-2xl transition-shadow duration-100">
      <figure className="relative pt-[56.25%]">
        <img
          src={image}
          alt={name}
          className="absolute top-0 w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{name}</h2>
        <p className="text-2xl font-bold text-primary">
          ${Number(price).toFixed(2)}
        </p>
      </div>
      <div className="card-actions justify-end mt-4">
        <Link to={`/product/${id}`} className="btn btn-sm btn-info btn-outline">
          <EditIcon className="size-4" />
        </Link>
        <button
          className="btn btn-sm btn-error btn-outline<"
          onClick={() => deleteProduct(id)}
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
