import { useEffect, useState, useRef } from "react";
import { getsales, deletesale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseServices.js";
import { TrendingUp, Trash2, ShoppingBag, Calendar, ArrowUpRight, ArrowDownLeft, Receipt, Printer, X, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import dukaanLogo from "../../assets/Dukaan_Digital.svg";
import { useReactToPrint } from 'react-to-print'
import Loader from "../loader/loader.jsx"

const SalesListPage = () => {
  const invoiceRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const [type, setType] = useState();

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
    styleMedia: "print",
  });

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

  const filteredSales = sales.filter((sale) =>
    (sale.customerName || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredPurchases = purchases.filter((purchase) =>
    (purchase.suppliername || "").toLowerCase().includes(search.toLowerCase())
  );

  const RenderTable = ({ data }) => (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-muted-foreground)]">
          <Receipt size={48} className="mb-4 opacity-50" />
          <p>No records found for this period.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-background)] text-[var(--color-muted-foreground)] uppercase text-xs border-b border-[var(--color-border)]">
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
                  onClick={() => handleViewDetails(item)}
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
                    {/* <button
                      onClick={() => handleViewDetails(item)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button> */}
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
    <div className="relative p-2 md:p-4 space-y-6 min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      <div className="flex md:justify-between items-center flex-wrap gap-4 w-full glass-panel p-2 md:p-4 rounded-2xl animate-fade-in-down">
        <div className="flex items-center gap-2">
          {type === "sale" ? <TrendingUp className="text-[var(--color-primary)]" size={28} /> : <ShoppingBag className="text-[var(--color-primary)]" size={28} />}
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">{type === "sale" ? "Sales Records" : "Purchase Records"}</h1>
            <p className="text-[var(--color-muted-foreground)] text-sm">Manage your {type === "sale" ? "sales" : "purchase"} records</p>
          </div>
        </div>
        <button
          className="px-6 py-2.5 w-full bg-[var(--color-primary)] hover:brightness-110 transition-all text-[var(--color-primary-foreground)] rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--color-primary)]/20 active:scale-95"
          onClick={() => {
            type === "sale" && navigate("/sales/new")
            type === "purchase" && navigate("/purchase/new")
          }}
        >
          {
            type == "sale" ? <TrendingUp size={18} /> : <ShoppingBag size={18} />
          }
          {
            type == "sale" ? "New Sale" : "New Purchase"
          }
        </button>
      </div>

      <div className="relative glass-panel rounded-3xl shadow-xl animate-fade-in-up">
        <div className="text-md p-4 border-b border-[var(--color-border)] text-[var(--color-foreground)] flex items-center justify-between flex-wrap gap-3">
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
          <div className="relative group flex-1 md:flex-none min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ..."
              className="pl-10 pr-4 py-1 w-full md:w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
            />
          </div>
        </div>

        {loading &&
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        }
        {!loading && (
          <>
            {type === "sale" && (
              <RenderTable data={filteredSales} />
            )}
            {type === "purchase" && (
              <RenderTable data={filteredPurchases} />
            )}
          </>
        )}
      </div>

      {showDetails && selectedSale && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-screen overflow-auto relative bg-white w-full max-w-4xl rounded-xl shadow-2xl">
            <div ref={invoiceRef} className="relative z-10 p-2">
              <img
                src={dukaanLogo}
                alt="Dukaan Digital"
                className="absolute inset-0 m-auto w-64 opacity-[0.04] pointer-events-none select-none"
              />
              <div className="relative z-10 flex justify-between items-center px-8 py-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold tracking-wide text-gray-900">
                    {JSON.parse(sessionStorage.getItem("user"))?.shopname}
                  </h2>
                  <p className="text-sm text-gray-900">{type === "sale" ? "Sales Invoice" : "Purchase Invoice"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 font-medium">Invoice Date</p>
                  <p className="text-gray-600">
                    {new Date(selectedSale.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-6 px-8 py-5 border-b">
                <div>
                  <p className="text-xs uppercase text-gray-900 mb-1">
                    {type === "sale" ? "Billed To" : "Supplier"}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {type === "sale" ? selectedSale.customerName : selectedSale.suppliername || "Walk-in"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase text-gray-900 mb-1">Invoice ID</p>
                  <p className="font-semibold text-gray-900">
                    #{selectedSale._id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="relative z-10 px-8 py-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left text-sm text-gray-900">
                      <th className="py-2">Item</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Rate</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.items.map((it) => (
                      <tr key={it._id} className="border-b text-gray-800 last:border-none">
                        <td className="py-2 font-medium">{it.itemname || it.productName}</td>
                        <td className="py-2 text-right">{it.quantity}</td>
                        <td className="py-2 text-right">
                          Rs {type === "sale" ? it.price.toLocaleString() : it.purchasePrice.toLocaleString()}
                        </td>
                        <td className="py-2 text-right font-semibold">
                          Rs {(type === "sale"
                            ? it.price * it.quantity
                            : it.purchasePrice * it.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="relative z-10 flex justify-end px-8 py-6 border-t">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Grand Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rs {type === "sale" ? selectedSale.totalAmount.toLocaleString() : selectedSale.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="relative z-10 text-center text-xs text-gray-500 py-4 border-t">
                This is a system generated invoice by Dukaan Digital
              </div>
            </div>

            <div className="flex justify-center gap-3 px-6 py-4 border-t bg-gray-50">
              <button
                onClick={handlePrint}
                className="px-5 py-2 flex items-center gap-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition"
              >
                <Printer size={16} title="Print" />
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 flex items-center gap-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={16} title="Delete" />
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2 flex items-center gap-2 rounded-lg text-gray-600 bg-gray-300 hover:bg-gray-500 hover:text-white transition"
              >
                <X size={16} title="Close" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesListPage;
