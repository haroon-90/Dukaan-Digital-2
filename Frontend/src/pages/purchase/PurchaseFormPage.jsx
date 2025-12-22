import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { addPurchase } from '../../services/purchaseServices.js';
import { getProducts } from '../../services/productServices.js';
import Dukaan_Digital from '../../assets/Dukaan_Digital.svg'
import { useNavigate } from 'react-router-dom';
import { Package, Tag, CheckCircle, Trash2, Store, Weight, ArrowLeft, Loader2, Plus, ShoppingBag } from 'lucide-react';

const PurchaseFormPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState({
    suppliername: '',
    items: [],
  });
  const [currentItem, setCurrentItem] = useState({
    itemname: '',
    category: '',
    unit: '',
    purchasePrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [processing, setProcessing] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load existing products');
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSupplierChange = (e) => {
    setPurchaseDetails({ ...purchaseDetails, suppliername: e.target.value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    // agar input ka naam "itemname" hai
    if (name === "itemname") {
      setCurrentItem({ ...currentItem, itemname: value });

      if (!value.trim()) {
        // input khali ho gaya to reset
        setIsNewProduct(false);
        setFilteredProducts([]);
        setCurrentItem({
          itemname: '',
          category: '',
          unit: '',
          purchasePrice: 0,
          sellingPrice: 0,
          quantity: 0,
        });
        return;
      }

      const filtered = products.filter(p =>
        p.itemname.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);

      const match = products.find(
        p => p.itemname.toLowerCase() === value.toLowerCase()
      );

      if (match) {
        setIsNewProduct(false);
        setCurrentItem({
          itemname: match.itemname,
          category: match.category || '',
          unit: match.unit || '',
          purchasePrice: match.purchasePrice,
          sellingPrice: match.sellingPrice,
          quantity: 0,
        });
      } else {
        setIsNewProduct(true);
        setCurrentItem({
          ...currentItem,
          itemname: value,
        });
      }
    } else {
      // baaki fields (price, qty, category, unit)
      setCurrentItem({ ...currentItem, [name]: value });
    }
  };


  const handleProductSelect = (product) => {
    setCurrentItem({
      itemname: product.itemname,
      category: product.category || '',
      unit: product.unit || '',
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      quantity: 0,
    });
    setIsNewProduct(false);
    setFilteredProducts([]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (
      !currentItem.itemname ||
      currentItem.quantity <= 0 ||
      currentItem.purchasePrice <= 0 ||
      currentItem.sellingPrice <= 0
    ) {
      toast.error('Please fill all product details correctly.');
      return;
    }

    const existingIndex = purchaseDetails.items.findIndex(
      item => item.itemname.toLowerCase() === currentItem.itemname.toLowerCase()
    );

    let newItems = [...purchaseDetails.items];
    if (existingIndex !== -1) {
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + Number(currentItem.quantity),
        purchasePrice: Number(currentItem.purchasePrice),
        sellingPrice: Number(currentItem.sellingPrice),
      };
    } else {
      newItems.push({
        ...currentItem,
        purchasePrice: Number(currentItem.purchasePrice),
        sellingPrice: Number(currentItem.sellingPrice),
        quantity: Number(currentItem.quantity),
      });
    }

    setPurchaseDetails({ ...purchaseDetails, items: newItems });

    setCurrentItem({
      itemname: '',
      category: '',
      unit: '',
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 0,
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = purchaseDetails.items.filter((_, i) => i !== index);
    setPurchaseDetails({ ...purchaseDetails, items: newItems });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!purchaseDetails.suppliername || purchaseDetails.items.length === 0) {
      toast.error('Supplier name and at least one item are required.');
      return;
    }

    try {
      setProcessing(true);
      const res = await addPurchase(purchaseDetails);
      toast.success(res.data.message || "Purchased");
      setPurchaseDetails({
        suppliername: '',
        items: [],
      });
      setProcessing(false);
    } catch (err) {
      toast.error('Failed to record purchase');
      console.error('Error adding purchase:', err);
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    if (isNaN(price) || price === null) {
      return 'Rs. 0';
    }
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-background)] p-6 transition-colors duration-300">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
        >
          <ArrowLeft size={16} className="text-[var(--color-primary)]" />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] text-center">New Purchase</h1>
          <p className="text-[var(--color-muted-foreground)] text-sm mt-1">Record a new inventory purchase</p>
        </div>

        <div className="mb-8">
          <label htmlFor="suppliername" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Supplier Name</label>
          <div className="relative">
            <Store className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
            <input
              type="text"
              id="suppliername"
              name="suppliername"
              value={purchaseDetails.suppliername}
              onChange={handleSupplierChange}
              placeholder="Enter supplier name"
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-6 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[var(--color-primary)]" /> Add Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="relative">
              <label htmlFor="itemname" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Item Name</label>
              <div className="relative">
                <Tag className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                <input
                  type="text"
                  id="itemname"
                  name="itemname"
                  value={currentItem.itemname}
                  onChange={handleItemChange}
                  placeholder="Scan or enter item name"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                  autoComplete="off"
                />
              </div>
              {filteredProducts.length > 0 && currentItem.itemname && (
                <ul className="absolute z-20 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl mt-1 max-h-40 overflow-y-auto shadow-xl">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductSelect(product)}
                      className="px-4 py-3 cursor-pointer hover:bg-[var(--color-muted)] transition duration-200 flex items-center space-x-2 text-[var(--color-foreground)] border-b border-[var(--color-border)] last:border-0"
                    >
                      <CheckCircle className="text-emerald-500" size={16} />
                      <span className="font-medium text-sm">{product.itemname}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Purchase Price</label>
              <div className="relative">
                <span className="absolute left-5 top-3.5 text-[var(--color-muted-foreground)] font-bold text-sm">₨</span>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={currentItem.purchasePrice}
                  onChange={handleItemChange}
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sellingPrice" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Selling Price</label>
              <div className="relative">
                <span className="absolute left-5 top-3.5 text-[var(--color-muted-foreground)] font-bold text-sm">₨</span>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  value={currentItem.sellingPrice}
                  onChange={handleItemChange}
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Quantity</label>
              <div className="relative">
                <Package className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={currentItem.quantity}
                  onChange={handleItemChange}
                  placeholder="Qty"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                />
              </div>
            </div>

            {isNewProduct && (
              <>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="Enter category"
                      value={currentItem.category}
                      onChange={handleItemChange}
                      className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Unit</label>
                  <div className="relative">
                    <Weight className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                    <input
                      id="unit"
                      name="unit"
                      type='text'
                      placeholder="e.g. kg, pcs"
                      value={currentItem.unit}
                      onChange={handleItemChange}
                      className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleAddItem}
            type="button"
            className="w-full mt-6 bg-[var(--color-surface)] hover:bg-[var(--color-muted)] text-[var(--color-primary)] font-bold py-3 px-4 rounded-xl border border-[var(--color-primary)] hover:border-transparent transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Item to Cart
          </button>
        </div>

        {purchaseDetails.items.length > 0 && (
          <div className="mb-8 border-t border-[var(--color-border)] pt-8 animate-fade-in">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-[var(--color-background)] rounded-full flex items-center justify-center mb-2 border border-[var(--color-border)]">
                  <ShoppingBag size={20} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-[var(--color-foreground)] mb-1 text-lg font-bold">{JSON.parse(sessionStorage.getItem("user"))?.shopname}</h2>
                <div className="border-t border-dashed w-full border-[var(--color-border)] py-2"></div>
              </div>
              <div className="mb-4 text-[var(--color-muted-foreground)]">
                <h2 className="text-xl font-bold text-center text-[var(--color-foreground)] tracking-wide mb-2">Purchase Receipt</h2>
                <div className="flex justify-between items-center text-xs text-[var(--color-muted-foreground)] mb-2">
                  <span>Date: {new Date().toLocaleDateString()}</span>
                  <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="border-t border-dashed w-full border-[var(--color-border)] py-2"></div>
                <p className="pb-2 tracking-wide text-sm font-semibold text-[var(--color-foreground)]">Supplier: <span className="font-normal text-[var(--color-muted-foreground)]">{purchaseDetails.suppliername}</span></p>
                <div className="border-t border-dashed w-full border-[var(--color-border)] py-2"></div>
              </div>
              {purchaseDetails.items.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b border-dashed border-[var(--color-border)] py-3 last:border-b-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-[var(--color-foreground)] text-base mb-1">{item.itemname}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      P-Price: <span className="text-[var(--color-foreground)] font-medium">{formatPrice(item.purchasePrice)}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[var(--color-foreground)] text-base">x{item.quantity}</p>
                    <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                      {formatPrice(item.quantity * item.purchasePrice)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-4 text-red-500 hover:text-red-700 transition duration-300 p-2 rounded-full hover:bg-[var(--color-background)]"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <div className="pt-6">
                <div className="flex justify-between font-semibold text-[var(--color-muted-foreground)]">
                  <span>Total Items:</span>
                  <span>{purchaseDetails.items.length}</span>
                </div>
                <div className="flex justify-between font-bold text-[var(--color-foreground)] mt-2 text-xl border-t-2 border-dashed border-[var(--color-border)] pt-2">
                  <span>Grand Total:</span>
                  <span>{formatPrice(purchaseDetails.items.reduce((total, item) => total + (item.quantity * item.purchasePrice), 0))}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="border-t border-dashed w-full border-[var(--color-border)] py-2"></div>
                <p className="text-xs text-[var(--color-muted-foreground)]">Thank you for your business!</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handlePurchase}
            type="button"
            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!purchaseDetails.suppliername || processing || purchaseDetails.items.length === 0}
          >
            {processing && <Loader2 className="animate-spin" size={20} />}
            {processing ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFormPage;
