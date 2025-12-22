import { useEffect, useState } from "react";
import { getsales, deletesale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseServices.js";
import { Eye, ShoppingCart, Trash2, ShoppingBag, Calendar, ArrowUpRight, ArrowDownLeft, Receipt, X, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx";

const SalesListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const [type, setType] = useState();

  const fetchSales = async () => {
    try {
      setLoading(true);
      const body = {
        startDate,
        endDate,
      };
      const res = await getsales(body);
      if (!res.data || res.data.length === 0) {
        setSales([]);
        return;
      }
      console.log("Sales data : ", res.data)
      setSales(res.data.reverse());
      // toast.success("Data refreshed")
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchase = async () => {
    try {
      setLoading(true);
      const body = {
        startDate,
        endDate,
      };
      const res = await getPurchases(body);
      if (!res.data || res.data.length === 0) {
        setPurchases([]);
        return;
      }
      setPurchases(res.data.reverse());
      // toast.success("Data refreshed")
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/sales") {
      setType("sale");
      fetchSales();
    } else if (location.pathname === "/purchase") {
      setType("purchase");
      fetchPurchase();
    }
  }, [location]);

  useEffect(() => {
    if (type == "sale") {
      fetchSales();
    } else if (type == "purchase") {
      fetchPurchase();
    }
  }, [startDate, endDate]);

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedSale(null);
  };

  const handleDelete = async (item) => {
    try {
      if (confirm("Are you really want to delete this?")) {
        if (type == "sale") {
          const res = await deletesale(selectedSale?._id || item._id);
          if (res.status == 200 || res.status == 201) {
            toast.success("deleted successfully")
          }
          fetchSales();
          setShowDetails(false);
        } else {
          const res = await deletePurchase(selectedSale?._id || item._id);
          if (res.status == 200 || res.status == 201) {
            toast.success("deleted successfully")
          }
          fetchPurchase();
          setShowDetails(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Error deleting sale")
    }
  }

  const RenderTable = ({ data }) => (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-muted-foreground)]">
          <Receipt size={48} className="mb-4 opacity-50" />
          <p>No records found for this period.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-surface)] text-[var(--color-muted-foreground)] uppercase text-xs border-b border-[var(--color-border)]">
              <tr>
                <th className="px-6 py-4 font-semibold">{type == "sale" ? "Customer" : "Supplier"}</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-[var(--color-muted)] transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium text-[var(--color-foreground)] flex items-center gap-2">
                    {type === "sale" ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownLeft size={14} className="text-rose-500" />}
                    {item.customerName ? item.customerName : item.suppliername}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[var(--color-foreground)]">
                    Rs {item.totalAmount ? item.totalAmount.toLocaleString() : item.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative p-6 space-y-6 min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      <div className="flex md:justify-between items-center flex-wrap gap-4 justify-center glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div className="flex items-center justify-center flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-2 rounded-xl border border-[var(--color-border)]">
            <Calendar size={16} className="text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border-none text-[var(--color-foreground)] text-sm focus:ring-0 cursor-pointer outline-none"
            />
          </div>
          <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-2 rounded-xl border border-[var(--color-border)]">
            <Calendar size={16} className="text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent border-none text-[var(--color-foreground)] text-sm focus:ring-0 cursor-pointer outline-none"
            />
          </div>
        </div>
        <button
          className="px-6 py-2.5 bg-[var(--color-primary)] hover:brightness-110 transition-all text-[var(--color-primary-foreground)] rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-[var(--color-primary)]/20 active:scale-95"
          onClick={() => {
            type === "sale" && navigate("/sales/new")
            type === "purchase" && navigate("/purchase/new")
          }}
        >
          {
            type == "sale" ? <ShoppingCart size={18} /> : <ShoppingBag size={18} />
          }
          {
            type == "sale" ? "New Sale" : "New Purchase"
          }
        </button>
      </div>

      <div className="relative glass-panel rounded-3xl p-6 shadow-xl animate-fade-in-up">
        <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
          <Receipt className="text-[var(--color-primary)]" size={24} />
          {type === "sale" ? "Sales Records" : "Purchase Records"}
        </h2>

        {loading &&
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
          </div>
        }
        {!loading && (
          <>
            {type === "sale" && (
              <RenderTable data={sales} />
            )}
            {type === "purchase" && (
              <RenderTable data={purchases} />
            )}
          </>
        )}
      </div>

      {showDetails && selectedSale && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel p-0 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-scale-in">

            {/* Modal Header */}
            <div className="bg-[var(--color-surface)] p-6 border-b border-[var(--color-border)] flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-foreground)]">{type === "sale" ? "Sales Invoice" : "Purchase Receipt"}</h3>
                <p className="text-xs text-[var(--color-muted-foreground)]">Details for transaction on {new Date(selectedSale.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-[var(--color-muted)] rounded-full transition-colors text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 font-mono text-sm bg-[var(--color-background)] max-h-[70vh] overflow-y-auto custom-scrollbar">

              <div className="text-center pb-6 mb-6 border-b-2 border-dashed border-[var(--color-border)]">
                <h2 className="text-xl font-bold text-[var(--color-foreground)] tracking-wide uppercase">
                  {JSON.parse(sessionStorage.getItem("user"))?.shopname}
                </h2>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[var(--color-muted-foreground)] text-xs uppercase mb-1">{type === "sale" ? "Customer" : "Supplier"}</p>
                  <p className="text-[var(--color-foreground)] font-bold">{type === "sale" ? selectedSale.customerName : selectedSale.suppliername || "Walk-in"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--color-muted-foreground)] text-xs uppercase mb-1">Date</p>
                  <p className="text-[var(--color-foreground)] font-bold">{new Date(selectedSale.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] overflow-hidden mb-6">
                <div className="flex justify-between font-bold text-xs bg-[var(--color-surface)] p-3 text-[var(--color-muted-foreground)] uppercase">
                  <span className="flex-1">Item</span>
                  <span className="w-16 text-right">Qty</span>
                  <span className="w-20 text-right">Price</span>
                  <span className="w-24 text-right">Total</span>
                </div>

                <div className="divide-y divide-[var(--color-border)]">
                  {selectedSale.items.map((it) => (
                    <div key={it._id} className="flex justify-between p-3 text-[var(--color-foreground)]">
                      <span className="flex-1 font-medium">{it.itemname || it.productName}</span>
                      <span className="w-16 text-right text-[var(--color-muted-foreground)]">{it.quantity} {it.unit || ""}</span>
                      {type == "sale" &&
                        <span className="w-20 text-right text-[var(--color-muted-foreground)]">Rs {it.price.toLocaleString()}</span> ||
                        <span className="w-20 text-right text-[var(--color-muted-foreground)]">Rs {it.purchasePrice.toLocaleString()}</span>
                      }
                      <span className="w-24 text-right font-bold">
                        Rs {type == "sale" ? (it.quantity * it.price).toLocaleString() : (it.quantity * it.purchasePrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>


              <div className="border-t-2 border-dashed border-[var(--color-border)] pt-4">
                <div className="flex justify-between items-baseline font-bold text-xl text-[var(--color-foreground)]">
                  <span>TOTAL</span>
                  <span className="text-[var(--color-primary)]">
                    Rs {type == "sale" ? selectedSale.totalAmount.toLocaleString() : selectedSale.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-[var(--color-muted-foreground)] mt-8">
                <p>Thank you for your business!</p>
              </div>
            </div>

            <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-end gap-3">
              <button
                onClick={handleDelete}
                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-xl transition-all font-medium flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={handleClose}
                className="bg-[var(--color-background)] hover:bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)] px-6 py-2.5 rounded-xl transition-all font-medium"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );

};

export default SalesListPage;
