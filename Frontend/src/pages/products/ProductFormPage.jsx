import { useState, useEffect } from 'react';
import { addProduct, getProductById, updateProduct } from '../../services/productServices.js';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Tag, Package, Weight, Box, ArrowLeft, Loader2 } from 'lucide-react';
import RS from '../../components/UI/RS.jsx';
import InputField from '../../components/UI/inputFields.jsx';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    itemname: '',
    category: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    unit: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await getProductById(id);
          setProduct(res.data);
        } catch (err) {
          toast.error('Failed to fetch product!');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateProduct(id, product);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(product);
        toast.success('Product added successfully!');
        setProduct({
          itemname: '',
          category: '',
          purchasePrice: '',
          sellingPrice: '',
          quantity: '',
          unit: ''
        });
      }
      setTimeout(() => {
        navigate('/products');
      }, 200);
    } catch (err) {
      toast.error('Error saving product!');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-[var(--color-background)] transition-colors duration-300">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
        >
          <ArrowLeft size={16} className="text-[var(--color-primary)]" />
          <span className="font-medium text-sm">Back</span>
        </button>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] text-center">
            {id ? "Edit Product" : "Add New Product"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <InputField
              label="Item Name"
              icon={Tag}
              type="text"
              name="itemname"
              placeholder="Enter item name"
              required
              value={product.itemname}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <InputField
              label="Category"
              icon={Weight}
              type="text"
              name="category"
              placeholder="Enter category"
              required
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <InputField
                label="Purchase Price"
                icon={RS}
                type="number"
                name="purchasePrice"
                placeholder="Enter purchase price"
                required
                value={product.purchasePrice}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <InputField
                label="Selling Price"
                icon={RS}
                type="number"
                name="sellingPrice"
                placeholder="Enter selling price"
                required
                value={product.sellingPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pb-2">
            <div className="space-y-1">
              <InputField
                label="Quantity"
                icon={Package}
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                required
                value={product.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <InputField
                label="Unit"
                icon={Box}
                type="text"
                name="unit"
                placeholder="e.g. kg, pcs"
                required
                value={product.unit}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>{id ? "Updating..." : "Saving..."}</span>
              </>
            ) : (
              id ? "Update Product" : "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;
