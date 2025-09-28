import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "./../store/useProductStore";
import { useEffect, type FormEvent } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(currentProduct);

  useEffect(() => {
    fetchProduct(Number(id));
  }, [fetchProduct, id]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg">{error}</div>
      </div>
    );
  //* handle delete product
  const handleDelete = () => {
    if (!currentProduct) return;
    const confirm = window.confirm(
      `Are you sure you want to delete "${currentProduct.name}"?`
    );
    if (confirm) {
      deleteProduct(currentProduct.id);
      navigate("/");
    }
  };
  // if (!currentProduct) return <div className="">No product found</div>;
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="size-full object-cover"
          />
        </div>
        <div className="card bg-base-100 shadow-lg ">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>
            <form
              className="space-y-6"
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                updateProduct(Number(id));
              }}
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              {/* form actions */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
