import { useState, useEffect } from 'react';
import { addProduct, getProductById, updateProduct } from '../../services/productServices.js';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Tag, Package, Weight, Box, ArrowLeft, Loader2 } from 'lucide-react';

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
          // toast.success('Product fetched successfully!');
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
            <label className="block text-sm font-medium text-[var(--color-foreground)]">Item Name</label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
              <input
                name="itemname"
                value={product.itemname}
                onChange={handleChange}
                type="text"
                placeholder="Enter item name"
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-foreground)]">Category</label>
            <div className="relative">
              <Weight className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                type="text"
                placeholder="Enter category"
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--color-foreground)]">Purchase Price</label>
              <div className="relative">
                <span className="absolute left-5 top-3.5 text-[var(--color-muted-foreground)] font-bold text-sm">₨</span>
                <input
                  name="purchasePrice"
                  value={product.purchasePrice}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--color-foreground)]">Selling Price</label>
              <div className="relative">
                <span className="absolute left-5 top-3.5 text-[var(--color-muted-foreground)] font-bold text-sm">₨</span>
                <input
                  name="sellingPrice"
                  value={product.sellingPrice}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pb-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--color-foreground)]">Quantity</label>
              <div className="relative">
                <Package className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                <input
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter quantity"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--color-foreground)]">Unit</label>
              <div className="relative">
                <Box className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                <input
                  name="unit"
                  value={product.unit}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. kg, pcs"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                  required
                />
              </div>
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
