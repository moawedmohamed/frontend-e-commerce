  import { useNavigate, useParams } from "react-router-dom";
  import { useProductStore } from "./../store/useProductStore";
  import { useEffect } from "react";
  import { ArrowLeftIcon } from "lucide-react";

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

    useEffect(() => {
      fetchProduct(Number(id));
      
    }, [fetchProduct, id]);
    if (loading)
      return (
        <div className="flex justify-end items-center min-h-screen">
          <div className="loading loading-spinner loading-lg" />
        </div>
      );
    if (error)
      return (
        <div className="container mx-auto px-4 py=8">
          <div className="alert alert-error shadow-lg">{error}</div>
        </div>
      );
    if (!currentProduct) return <div className="">No product found</div>;
    return (
      <div className="container mx-auto px-4 py=8 max-w-4xl">
        <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Products
        </button>
      </div>
    );
  };

  export default ProductPage;
