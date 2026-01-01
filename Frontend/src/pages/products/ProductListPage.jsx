import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts, deleteProducts } from "../../services/productServices.js";
import { createsale } from "../../services/saleService.js";
import { Edit2, Trash2, TrendingUp, ShoppingCart, Eye, Package, PlusCircle, Search, X, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx";

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [saleQuantities, setSaleQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [TotalBill, setTotalBill] = useState(0);
  const [prprice, setprprice] = useState(false);
  const [isSale, setisSale] = useState(false);
  const [loading, setloading] = useState(true);

  const filteredProduct = products.filter((item) =>
    item.itemname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleCartAdd = (product) => {
    const quantity = Number(saleQuantities[product._id] || 0);
    if (quantity <= 0) {
      toast.error('Please enter quantity');
      return;
    }

    const cartItem = {
      id: product._id,
      productname: product.itemname,
      price: product.sellingPrice,
      quantity,
      unit: product.unit
    };

    setTotalBill(
      TotalBill + (product.sellingPrice * quantity)
    );

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

  const ShowCart = () => {
    setShowSaleModal(true);
  };

  const confirmSaleOrPurchase = async () => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      type: "sale",
      customerName: customerName.trim()
    };

    try {
      setloading(true);
      const res = await createsale(payload);
      console.log("Sale Created:", res.data);
      toast.success("Sale Created")
      setCart([]);
      setSaleQuantities({});
      setCustomerName("");
      setShowSaleModal(false);
      setTotalBill(0);
      loadProducts();
    } catch (err) {
      toast.error("Failed to create Sale")
      console.error("Error creating record:", err);
      setloading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setloading(true);
      const res = await getProducts();
      setProducts(res.data);
      // toast.success("Products refreshed!")
      setloading(false);
    } catch (err) {
      toast.error("Failed to refresh products")
      console.error("Error fetching products:", err);
      setloading(false);
    }
  };

  const handleDelete = async (e) => {
    try {
      if (confirm(`Are you sure you want to delete "${e.itemname}"?`)) {
        await deleteProducts(e._id);
        toast.success('Product deleted successfully!');
        loadProducts();
      }
    } catch (err) {
      toast.error("Failed to delete product!")
      console.log(err);
    }
  };

  const handleCartDelete = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (!itemToRemove) return;

    // Total Bill update karo
    setTotalBill((prev) => prev - (itemToRemove.price * itemToRemove.quantity));

    // Cart update karo
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Agar cart empty ho gaya to back page (ya modal close) kar do
    if (updatedCart.length === 0) {
      setShowSaleModal(false)  // <-- yeh user ko previous page pe le jayega
    }
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      setisSale(false);
    } else if (location.pathname === "/sales/new") {
      setisSale(true);
    }
    loadProducts();
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-foreground)] p-2 md:p-4 transition-colors duration-300">
      {showSaleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel p-8 max-h-[90vh] rounded-2xl overflow-auto shadow-2xl w-full max-w-lg font-mono text-[var(--color-foreground)] print:shadow-none print:border-0 print:rounded-none print:p-0 print:bg-white animate-scale-in">
            <div className="flex justify-between items-start mb-4 print:hidden">
              <span className="text-xl font-bold">Checkout</span>
              <button onClick={() => setShowSaleModal(false)} className="p-1 rounded-full hover:bg-[var(--color-muted)] transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="text-center pb-4 mb-4 border-b border-dashed border-[var(--color-border)] print:border-black print:mb-2">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] tracking-wide">
                {JSON.parse(localStorage.getItem("user"))?.shopname}
              </h2>
              <p className="text-sm font-semibold text-[var(--color-muted-foreground)] mt-1">
                Sales Invoice
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-2">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="mb-6 flex flex-col sm:flex-row items-baseline gap-2">
              <p className="text-sm font-semibold text-[var(--color-foreground)] whitespace-nowrap">
                Customer:
              </p>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={"Enter customer name"}
                className="flex-1 w-full px-3 py-1 border-b border-[var(--color-border)] bg-transparent outline-none text-sm focus:border-[var(--color-primary)] transition placeholder:text-[var(--color-muted-foreground)]"
              />
            </div>
            {cart.length === 0 ? (
              <p className="text-[var(--color-muted-foreground)] text-center py-6">No items added to the cart.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-between font-bold text-sm border-b border-dashed border-[var(--color-border)] py-2 sticky top-0 bg-[var(--color-surface)] print:border-black print:bg-white">
                  <span className="flex-1">Item</span>
                  <span className="w-16 text-right">Qty</span>
                  <span className="w-20 text-right">Price</span>
                  <span className="w-20 text-right">Total</span>
                  <span className="w-8 text-right print:hidden"></span>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-dashed border-[var(--color-border)] print:border-black">
                    <span className="flex-1 font-medium text-wrap text-[var(--color-foreground)]">
                      {item.productname}
                    </span>
                    <span className="w-16 text-right break-words">{item.quantity} {item.unit}</span>
                    <span className="w-20 text-right">Rs {item.price.toLocaleString()}</span>
                    <span className="w-20 text-right font-semibold">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button className="w-8 flex justify-end text-red-500 hover:text-red-600 cursor-pointer print:hidden"
                      onClick={() => handleCartDelete(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-dashed border-[var(--color-border)] my-4 print:border-black"></div>
            <div className="flex justify-between items-baseline font-bold text-xl">
              <span>TOTAL:</span>
              <span className="text-[var(--color-primary)]">
                Rs {TotalBill.toLocaleString()}
              </span>
            </div>
            <div className="text-center text-xs text-[var(--color-muted-foreground)] mt-4 pt-2 border-t border-dashed border-[var(--color-border)] print:border-black">
              <p>Thank you for your business!</p>
            </div>
            <div className="flex justify-end gap-3 mt-6 print:hidden">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-6 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors text-[var(--color-foreground)]"
              >
                Cancel
              </button>
              <button
                onClick={confirmSaleOrPurchase}
                className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-xl hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-[var(--color-primary)]/20"
                disabled={cart.length === 0 || loading}
              >
                {loading ? 'Processing...' : 'Confirm Sale'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div>
          {isSale ?
            <>
              <div className="flex items-center gap-3">
                <TrendingUp size={28} className="text-[var(--color-primary)]" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Sales</h1>
                  <p className="text-[var(--color-muted-foreground)] text-sm">Manage your sales.</p>
                </div>
              </div>
            </>
            :
            <>
              <div className="flex items-center gap-3">
                <Package size={28} className="text-[var(--color-primary)]" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Products</h1>
                  <p className="text-[var(--color-muted-foreground)] text-sm">Manage your products.</p>
                </div>
              </div>
            </>

          }
        </div>
        {cart.length > 0 && (
          <button
            onClick={ShowCart}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2.5 text-sm font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <TrendingUp size={18} /> Sale ({cart.length})
          </button>
        )}
        {!isSale &&
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
            onClick={() => {
              navigate("/products/new");
            }}>
            <PlusCircle size={18} />
            Add Product
          </button>
        }
      </div>

      <div className="max-w-7xl mx-auto glass-panel rounded-2xl overflow-hidden animate-fade-in-up">

        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="relative group flex-1 md:flex-none min-w-64">
            <Search className="absolute left-3 top-2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 w-full md:w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
            />
          </div>
        </div>


        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : (
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
                    <th key={i} className="px-6 py-4 font-semibold tracking-wider">
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
                {filteredProduct.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-[var(--color-muted-foreground)]">
                      {searchTerm ? "No products found matching your search" : "No products available"}
                    </td>
                  </tr>
                ) : (
                  filteredProduct.map((p) => (
                    <tr key={p._id} className="hover:bg-[var(--color-muted)] transition-colors group">
                      <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{p.itemname}</td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{p.category}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {prprice ? `Rs ${p.purchasePrice.toLocaleString()}` : "•••"}
                      </td>
                      <td className="px-6 py-4 font-bold text-[var(--color-foreground)]">Rs {p.sellingPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 font-medium text-[var(--color-muted-foreground)]">{p.quantity}</td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{p.unit}</td>
                      {isSale && (
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                      )}
                      {!isSale && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2 transition-opacity">
                            <button
                              onClick={() => navigate("/products/edit/" + p._id)}
                              className="p-2 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="p-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
