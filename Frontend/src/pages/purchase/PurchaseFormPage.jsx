import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { addPurchase } from '../../services/purchaseServices.js';
import { getProducts } from '../../services/productServices.js';
import Dukaan_Digital from '../../assets/Dukaan_Digital_Icon.svg'
import { useNavigate } from 'react-router-dom';
import { Package, Tag, CheckCircle, Trash2, Store, Weight, ArrowLeft, Loader2, Plus } from 'lucide-react';
import InputField from '../../components/UI/inputFields';
import RS from '../../components/UI/RS.jsx'

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

    if (name === "itemname") {
      setCurrentItem({ ...currentItem, itemname: value });

      if (!value.trim()) {
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
          <InputField
            label="Supplier Name"
            name="suppliername"
            placeholder="Enter supplier name"
            type="text"
            icon={Store}
            value={purchaseDetails.suppliername}
            onChange={handleSupplierChange}
            required
          />
        </div>

        <div className="mb-6 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
            <Package size={20} className="text-[var(--color-primary)]" /> Add Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="relative">
              <InputField
                label="Item Name"
                name="itemname"
                placeholder="Scan or enter item name"
                type="text"
                icon={Tag}
                required
                value={currentItem.itemname}
                onChange={handleItemChange}
                autoComplete="off"
              />
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
              <InputField
                label="Purchase Price"
                name="purchasePrice"
                placeholder="0.00"
                type="number"
                icon={RS}
                value={currentItem.purchasePrice}
                onChange={handleItemChange}
                required
              />
            </div>

            <div>
              <InputField
                label="Selling Price"
                name="sellingPrice"
                placeholder="0.00"
                type="number"
                icon={RS}
                value={currentItem.sellingPrice}
                onChange={handleItemChange}
                required
              />
            </div>

            <div>
              <InputField
                label="Quantity"
                name="quantity"
                placeholder="Qty"
                type="number"
                icon={Package}
                value={currentItem.quantity}
                onChange={handleItemChange}
                required
              />
            </div>

            {isNewProduct && (
              <>
                <div>
                  <InputField
                    label="Category"
                    name="category"
                    placeholder="Enter category"
                    type="text"
                    icon={Tag}
                    value={currentItem.category}
                    onChange={handleItemChange}
                    required
                  />
                </div>
                <div>
                  <InputField
                    label="Unit"
                    name="unit"
                    type='text'
                    placeholder="e.g. kg, pcs"
                    icon={Weight}
                    value={currentItem.unit}
                    onChange={handleItemChange}
                    required
                  />
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
          <div className=" w-full max-w-3xl bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden">

            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

            <div className="px-8 py-6 text-center border-b border-[var(--color-border)]">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-[var(--color-background)] border flex items-center justify-center">
                  <img src={Dukaan_Digital} alt="Logo" className="w-7 h-7" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-[var(--color-foreground)] tracking-wide">
                {JSON.parse(localStorage.getItem("user"))?.shopname}
              </h2>

              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Purchase Receipt
              </p>
            </div>

            <div className="px-6 py-4 border-b border-dashed border-[var(--color-border)] text-sm">
              <div className="flex justify-around">
                <span className="text-[var(--color-muted-foreground)]">Supplier</span>
                <span className="font-medium text-[var(--color-foreground)]">
                  {purchaseDetails.suppliername}
                </span>
              </div>

              <div className="flex justify-around mt-2">
                <span className="text-[var(--color-muted-foreground)]">Date</span>
                <span className="text-[var(--color-foreground)]">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              {purchaseDetails.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start border-b border-dashed border-[var(--color-border)] pb-3 last:border-none"
                >
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)]">
                      {item.itemname}
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      Price: {formatPrice(item.purchasePrice)}
                    </p>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <div className="flex items-center flex-col">
                      <p className="text-sm font-medium text-[var(--color-foreground)]">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.quantity * item.purchasePrice)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-dashed border-[var(--color-border)]">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>
                  {formatPrice(
                    purchaseDetails.items.reduce(
                      (sum, i) => sum + i.quantity * i.purchasePrice,
                      0
                    )
                  )}
                </span>
              </div>
            </div>

            <div className="text-center text-xs text-[var(--color-muted-foreground)] py-4 border-t border-[var(--color-border)]">
              Thank you for shopping with us
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
