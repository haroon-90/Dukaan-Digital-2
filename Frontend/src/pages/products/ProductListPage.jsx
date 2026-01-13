import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts, deleteProducts } from "../../services/productServices.js";
import { createsale } from "../../services/saleService.js";
import {
  Edit2, Trash2, ShoppingCart, Eye, Package, PlusCircle,
  Search, X, EyeOff, Grid3x3, List, Zap, Plus, Minus,
  Filter, ChevronDown, ShoppingBag,
  MessageCircleWarning
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx";
import { useLoading } from "../../components/Context/LoadingContext";

const DUMMY_PRODUCTS = [
  { _id: '1', itemname: 'Sample Product A', sellingPrice: 100, quantity: 50, category: 'Electronics', unit: 'pcs' },
  { _id: '2', itemname: 'Sample Product B', sellingPrice: 200, quantity: 30, category: 'Groceries', unit: 'kg' },
  { _id: '3', itemname: 'Sample Product C', sellingPrice: 150, quantity: 10, category: 'Electronics', unit: 'pcs' },
];

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const [products, setProducts] = useState([]);
  const [saleQuantities, setSaleQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [TotalBill, setTotalBill] = useState(0);
  const [prprice, setprprice] = useState(false);
  const [isSale, setisSale] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [NoOfProducts, setNoOfProducts] = useState(0);

  // New states for view modes
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'quick'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProduct = products.filter((item) => {
    const matchesSearch = item.itemname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // const categories = ['all', ...new Set(products.map(p => p.category))];
  const categories = useMemo(() =>
    ['all', ...new Set(products.map(p => p.category))],
    [products]
  );

  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const isDemo = user?.isdemo === true; // Demo check

  const handleSaleChange = (p, value) => {
    if (isSale && p.quantity < value) {
      toast.error('Stock shortage');
    } else {
      setSaleQuantities((prev) => ({
        ...prev,
        [p._id]: value
      }));
    }
  };

  const handleCartAdd = (product, customQty = null) => {
    const quantity = customQty || Number(saleQuantities[product._id] || 0);
    if (quantity <= 0) {
      toast.error('Please enter quantity');
      return;
    }

    if (product.quantity < quantity) {
      toast.error('Stock shortage');
      return;
    }

    const cartItem = {
      id: product._id,
      productname: product.itemname,
      price: product.sellingPrice,
      quantity,
      unit: product.unit
    };

    const lineTotal = product.sellingPrice * quantity;

    // Use functional updates to avoid dependency on current state values
    setTotalBill(prev => prev + lineTotal);
    setTotalAfterDiscount(prev => prev + lineTotal);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, cartItem];
      }
    });

    setSaleQuantities((prev) => ({
      ...prev,
      [product._id]: ""
    }));
    toast.success("Added to cart");
  };

  const incrementQuantity = (productId) => {
    setSaleQuantities((prev) => ({
      ...prev,
      [productId]: (Number(prev[productId]) || 0) + 1
    }));
  };

  const decrementQuantity = (productId) => {
    setSaleQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (Number(prev[productId]) || 0) - 1)
    }));
  };

  const ShowCart = () => {
    setShowSaleModal(true);
  };

  const confirmSaleOrPurchase = async () => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    const payload = {
      discount,
      totalAfterDiscount,
      TotalBill,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      type: "sale",
      customerName: customerName.trim()
    };

    if (isDemo) {
      toast.success("Demo Mode: Sale Created (Not saved to DB)");
      resetSaleStates();
      setProducts(prev => prev.map(p => {
        const cartItem = cart.find(c => c.id === p._id);
        return cartItem ? { ...p, quantity: p.quantity - cartItem.quantity } : p;
      }));
      return;
    }

    try {
      setIsLoading(true);
      await createsale(payload);
      toast.success("Sale Created")
      setCart([]);
      setSaleQuantities({});
      setCustomerName("");
      setShowSaleModal(false);
      setTotalBill(0);
      setDiscount(0);
      setTotalAfterDiscount(0);
      loadProducts();
    } catch (err) {
      toast.error("Failed to create Sale")
      setIsLoading(false);
    }
  };

  const resetSaleStates = () => {
    setCart([]);
    setSaleQuantities({});
    setCustomerName("");
    setShowSaleModal(false);
    setTotalBill(0);
    setDiscount(0);
    setTotalAfterDiscount(0);
    setIsLoading(false);
  };

  const loadProducts = useCallback(async () => {
    if (isDemo) {
      setProducts(DUMMY_PRODUCTS);
      setNoOfProducts(DUMMY_PRODUCTS.length);
      return;
    }
    try {
      setIsLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setIsLoading(false);
      setNoOfProducts(res.data.length);
    } catch (err) {
      toast.error("Failed to refresh products")
      console.error("Error fetching products:", err);
      setIsLoading(false);
    }
  }, [isDemo, setIsLoading]);

  const handleDelete = async (e) => {
    if (confirm(`Are you sure you want to delete "${e.itemname}"?`)) {
      if (isDemo) {
        setProducts(prev => prev.filter(item => item._id !== e._id));
        toast.success('Demo Mode: Product deleted successfully!');
        return;
      }
      try {
        await deleteProducts(e._id);
        toast.success('Product deleted successfully!');
        loadProducts();
      }
      catch (err) {
        toast.error("Failed to delete product!")
        console.log(err);
      }
    }
  };

  const handleCartDelete = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (!itemToRemove) return;

    setTotalBill((prev) => prev - (itemToRemove.price * itemToRemove.quantity));
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    if (updatedCart.length === 0) {
      setShowSaleModal(false)
    }
  };

  const handleDiscountChange = (e) => {
    const val = Number(e.target.value) || 0;
    setDiscount(val);
    setTotalAfterDiscount(TotalBill - (TotalBill * val) / 100);
  };

  const handleTotalAfterDiscountChange = (e) => {
    const value = Number(e.target.value) || 0;
    setTotalAfterDiscount(value);
    const calculatedDiscount = ((TotalBill - value) / TotalBill) * 100;
    setDiscount(Number(calculatedDiscount));
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      setisSale(false);
    } else if (location.pathname === "/sales/new") {
      setisSale(true);
    }
    loadProducts();
  }, [location.pathname]);

  // Grid Card Component
  const ProductCard = ({ product }) => {
    const quantity = saleQuantities[product._id] || 0;
    const isLowStock = product.quantity < 3;

    return (
      <div className="group relative bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)] hover:shadow-xl hover:shadow-[var(--color-primary)]/10 transition-all duration-300 hover:-translate-y-1">
        {/* Stock Badge */}
        {isLowStock && (
          <div className="absolute group top-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
              <MessageCircleWarning size={12} />
              <span className="text-xs font-medium hidden group-hover:block">Low Stock</span>
            </span>
          </div>
        )}

        {/* Product Image Placeholder */}
        {/* <div className="relative w-full h-40 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <Package size={48} className="text-[var(--color-primary)] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div> */}

        {/* Product Info */}
        <div className="space-y-2">
          <div>
            <h3 className="font-bold text-[var(--color-foreground)] text-lg truncate group-hover:text-[var(--color-primary)] transition-colors">
              {product.itemname}
            </h3>
            <p className="text-xs text-[var(--color-muted-foreground)] font-medium">
              {product.category}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[var(--color-foreground)]">
                Rs {product.sellingPrice.toLocaleString()}
              </p>
              {/* {product.purchasePrice && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Cost: Rs {product.purchasePrice.toLocaleString()}
                </p>
              )} */}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[var(--color-muted-foreground)]">
                {product.quantity} {product.unit}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                in stock
              </p>
            </div>
          </div>

          {/* Sale Actions */}
          {isSale && (
            <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQuantity(product._id)}
                  className="p-2 py-3 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => handleSaleChange(product, e.target.value)}
                  className="min-w-12 text-center p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none font-bold"
                />
                <button
                  onClick={() => incrementQuantity(product._id)}
                  className="p-2 py-3 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => handleCartAdd(product)}
                disabled={quantity <= 0}
                className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          )}

          {/* Product Actions */}
          {!isSale && (
            <div className="flex gap-2 pt-3 border-t border-[var(--color-border)]">
              <button
                onClick={() => navigate("/products/edit/" + product._id)}
                className="flex-1 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product)}
                className="flex-1 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Quick Sale Card Component
  const QuickSaleCard = ({ product }) => {
    const quantity = saleQuantities[product._id] || 0;

    return (
      <div className="group bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] hover:shadow-lg transition-all duration-200 hover:border-[var(--color-primary)]">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 hidden md:flex items-center justify-center flex-shrink-0">
            <Package size={24} className="text-[var(--color-primary)]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--color-foreground)] truncate">
              {product.itemname}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-[var(--color-primary)]">
                Rs {product.sellingPrice.toLocaleString()}
              </span>
              <span className="text-[var(--color-muted-foreground)]">•</span>
              <span className="text-[var(--color-muted-foreground)]">
                {product.quantity} {product.unit}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1 bg-[var(--color-muted)] rounded-lg p-1">
              <button
                onClick={() => decrementQuantity(product._id)}
                className="p-1 hover:bg-[var(--color-background)] rounded transition-colors"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => handleSaleChange(product, e.target.value)}
                className="w-12 text-center bg-transparent font-bold text-sm outline-none"
              />
              <button
                onClick={() => incrementQuantity(product._id)}
                className="p-1 hover:bg-[var(--color-background)] rounded transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => handleCartAdd(product)}
              disabled={quantity <= 0}
              className="p-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-foreground)] p-2 md:p-4 transition-colors duration-300">
      {/* Sale Modal */}
      {showSaleModal && (
        <div
          onClick={() => setShowSaleModal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4 animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-8 max-h-[90vh] text-black rounded-2xl overflow-auto shadow-2xl lg:min-w-4xl min-w-[90vw] w-full max-w-lg font-mono print:shadow-none print:border-0 print:rounded-none print:p-0 bg-white animate-scale-in">
            <div className="flex justify-between items-start mb-4 print:hidden">
              <span className="text-xl font-bold">Checkout</span>
              <button onClick={() => setShowSaleModal(false)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="text-center pb-4 mb-4 border-b border-dashed border-[var(--color-border)] print:border-black print:mb-2">
              <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
                {JSON.parse(localStorage.getItem("user"))?.shopname}
              </h2>
              <p className="text-sm font-semibold text-black mt-1">Sales Invoice</p>
              <p className="text-xs text-black mt-2">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row items-baseline gap-2">
              <p className="text-sm font-semibold text-black whitespace-nowrap">Customer:</p>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={"Enter customer name"}
                className="flex-1 w-full px-3 py-1 border-b border-[var(--color-border)] bg-transparent outline-none text-sm focus:border-[var(--color-primary)] transition placeholder:text-black"
              />
            </div>

            {cart.length === 0 ? (
              <p className="text-black text-center py-6">No items added to the cart.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-between font-bold px-0.5 text-sm border-b border-dashed border-[var(--color-border)] py-2 sticky top-0 bg-gray-200 print:border-black print:bg-white">
                  <span className="flex-1">Item</span>
                  <span className="w-16 pr-1 text-right">Qty</span>
                  <span className="w-20 pr-1 text-right">Price</span>
                  <span className="w-20 pr-1 text-right">Total</span>
                  <span className="w-8 text-right print:hidden"></span>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between px-0.5 text-sm py-2 border-b border-dashed border-[var(--color-border)] print:border-black">
                    <span className="flex-1 font-medium text-wrap text-black">{item.productname}</span>
                    <span className="w-16 pr-1 text-right break-words">{item.quantity} {item.unit}</span>
                    <span className="w-20 pr-1 text-right">Rs {item.price.toLocaleString()}</span>
                    <span className="w-20 pr-1 text-right font-semibold">Rs {(item.price * item.quantity).toLocaleString()}</span>
                    <button className="w-8 flex justify-end text-red-500 hover:text-red-600 cursor-pointer print:hidden"
                      onClick={() => handleCartDelete(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 mt-2">
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-black">Rs {TotalBill.toLocaleString()}</span>
              </div>
              <div className="border-t border-dashed border-[var(--color-border)] my-4 print:border-black"></div>

              <div className="flex justify-between items-center text-lg">
                <span>Discount</span>
                <div>
                  <span className="text-right pr-1">%</span>
                  <input
                    type="number"
                    value={discount.toFixed(2)}
                    onChange={handleDiscountChange}
                    className="w-32 border rounded px-2 py-1 text-right"
                  />
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl">
                <span>Grand Total</span>
                <div>
                  <span className="text-right pr-1">RS</span>
                  <input
                    type="number"
                    value={totalAfterDiscount}
                    onChange={handleTotalAfterDiscountChange}
                    className="w-32 border rounded px-2 py-1 text-right"
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-black mt-4 pt-2 border-t border-dashed border-[var(--color-border)] print:border-black">
              <p>Best of luck!</p>
            </div>

            <div className="flex justify-center mt-6 print:hidden">
              <button
                onClick={confirmSaleOrPurchase}
                className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-xl hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-[var(--color-primary)]/20"
                disabled={cart.length === 0 || isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Sale'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-3 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div>
          {isSale ? (
            <div className="flex items-center gap-3">
              <ShoppingCart size={28} className="text-[var(--color-primary)]" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Point of Sales</h1>
                <p className="text-[var(--color-muted-foreground)] text-sm">Manage your sales.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Package size={28} className="text-[var(--color-primary)]" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Inventory</h1>
                <p className="text-[var(--color-muted-foreground)] text-sm">Manage your products.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isSale && (
            <button
              onClick={ShowCart}
              disabled={cart.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-foreground)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-background)] px-4 py-2.5 text-sm font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <ShoppingBag size={18} />
              Cart ({cart.length})
            </button>
          )}
          {!isSale && (
            <button
              disabled={isDemo}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
              onClick={() => navigate("/products/new")}
            >
              <PlusCircle size={18} />
              Add Product
            </button>
          )}
          {!isSale && (
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
              onClick={() => navigate("/sales/new")}
            >
              <ShoppingCart size={18} />
              POS
            </button>
          )}
          {isSale && (
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
              onClick={() => navigate("/products")}
            >
              <Package size={18} />
              Products
            </button>
          )}
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl p-4 mb-4 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative group flex-1 w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          {/* View Mode & Filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 h-11 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors text-sm font-medium"
              >
                <Filter size={16} />
                {selectedCategory === 'all' ? 'All' : selectedCategory}
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              {showFilters && (
                <div className="absolute top-full mt-2 left-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl z-10 min-w-[160px] overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-muted)] transition-colors ${selectedCategory === cat ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold' : ''
                        }`}
                    >
                      {cat === 'all' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Buttons */}
            {isSale && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg'
                    : 'hover:bg-[var(--color-muted)]'
                    }`}
                  title="Grid View"
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg'
                    : 'hover:bg-[var(--color-muted)]'
                    }`}
                  title="List View"
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('quick')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'quick'
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg'
                    : 'hover:bg-[var(--color-muted)]'
                    }`}
                  title="Quick Sale"
                >
                  <Zap size={18} />
                </button>
              </div>
            )}

            {/* Product Count */}
            <div className="flex items-center gap-2 px-4 h-11 text-sm font-medium border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-muted-foreground)]">
              <span className="text-[var(--color-foreground)] font-bold">
                {filteredProduct.length}
              </span>
              / {NoOfProducts} items
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="max-w-7xl mx-auto animate-fade-in-up">
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : filteredProduct.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <Package size={64} className="mx-auto text-[var(--color-muted-foreground)] opacity-50 mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
              No products found
            </h3>
            <p className="text-[var(--color-muted-foreground)]">
              {searchTerm || selectedCategory !== 'all'
                ? "Try adjusting your filters or search term"
                : "Start by adding your first product"}
            </p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {(viewMode === 'grid' && isSale) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProduct.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Quick Sale View */}
            {(viewMode === 'quick' && isSale) && (
              <div className="glass-panel rounded-2xl p-4 space-y-3">
                {filteredProduct.map((product) => (
                  <QuickSaleCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* List/Table View */}
            {(viewMode === 'list' || !isSale) && (
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)] text-[var(--color-muted-foreground)] font-medium uppercase text-xs">
                      <tr>
                        {[
                          "Item Name",
                          "Category",
                          "Purchase Price",
                          "Selling Price",
                          "Quantity",
                          "Unit",
                          ...(isSale ? ["Sale"] : []),
                          ...(isSale ? [] : ["Created At"]),
                          ...(isSale ? [] : ["Actions"]),
                        ].map((header, i) => (
                          <th key={i} className="p-4 font-semibold tracking-wider">
                            {header.toLowerCase() === "purchase price" ? (
                              <button className="flex gap-2 items-center uppercase hover:text-[var(--color-foreground)] transition-colors" onClick={() => setprprice(!prprice)}>
                                {header}
                                {prprice ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            ) : (
                              header
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {filteredProduct.map((p) => (
                        <tr key={p._id} className="hover:bg-[var(--color-muted)] transition-colors group">
                          <td className="px-4 py-3 font-medium text-[var(--color-foreground)]">{p.itemname}</td>
                          <td className="px-4 py-3 text-[var(--color-muted-foreground)]">{p.category}</td>
                          <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">
                            {prprice ? `Rs ${p.purchasePrice.toLocaleString()}` : "•••"}
                          </td>
                          <td className="px-4 py-3 font-bold text-[var(--color-foreground)]">Rs {p.sellingPrice.toLocaleString()}</td>
                          <td className="px-4 py-3 font-medium text-[var(--color-muted-foreground)]">{p.quantity}</td>
                          <td className="px-4 py-3 text-[var(--color-muted-foreground)]">{p.unit}</td>
                          {isSale && (
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  placeholder="Qty"
                                  value={saleQuantities[p._id] || ""}
                                  onChange={(e) => handleSaleChange(p, e.target.value)}
                                  className="w-20 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm transition-all"
                                />
                                <button
                                  onClick={() => handleCartAdd(p)}
                                  className="p-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 shadow-md transition-all active:scale-95"
                                  title="Add to Sale"
                                >
                                  <ShoppingCart size={16} />
                                </button>
                              </div>
                            </td>
                          )}
                          {!isSale && (
                            <td className="px-4 py-3 text-[var(--color-muted-foreground)]">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                          )}
                          {!isSale && (
                            <td className="px-4 py-3">
                              <div className="flex gap-2 transition-opacity">
                                <button
                                  disabled={isDemo}
                                  onClick={() => navigate("/products/edit/" + p._id)}
                                  className="p-2 bg-blue-500/10 md:bg-blue-500/0 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  disabled={isDemo}
                                  onClick={() => handleDelete(p)}
                                  className="p-2 bg-red-500/10 md:bg-red-500/0 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;