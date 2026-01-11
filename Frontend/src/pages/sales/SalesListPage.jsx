import { useEffect, useState } from "react";
import { getsales, deletesale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseServices.js";
import SaleInvoice from "./saleInvoice.jsx";
import { ShoppingCart, Trash2, ShoppingBag, Calendar, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx"
import { useLoading } from "../../components/Context/LoadingContext";

const SalesListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [NoOfSales, setNoOfSales] = useState(0);
  const [NoOfPurchases, setNoOfPurchases] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const [type, setType] = useState();

  const fetchSales = async () => {
    try {
      setIsLoading(true);
      const body = {
        startDate,
        endDate,
      };
      const res = await getsales(body);
      if (!res.data || res.data.length === 0) {
        setSales([]);
        return;
      }
      setSales(res.data);
      setNoOfSales(res.data.length);
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPurchase = async () => {
    try {
      setIsLoading(true);
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
      setNoOfPurchases(res.data.length);
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setIsLoading(false);
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
      toast.error(err.response?.data?.msg || "Error deleting sale")
    }
  }

  const filteredSales = sales.filter((sale) => {
    const query = search.trim();
    if (query.startsWith(">")) {
      const num = parseFloat(query.slice(1));
      return !isNaN(num) && sale.totalAmount > num;
    }
    if (query.startsWith("<")) {
      const num = parseFloat(query.slice(1));
      return !isNaN(num) && sale.totalAmount < num;
    }
    return (
      sale.customerName?.toLowerCase().includes(query.toLowerCase()) ||
      sale._id.toLowerCase().includes(query.toLowerCase())
    );
  });

  const filteredPurchases = purchases.filter((purchase) => {
    const query = search.trim();
    if (query.startsWith(">")) {
      const num = parseFloat(query.slice(1));
      return !isNaN(num) && purchase.totalAmount > num;
    }
    if (query.startsWith("<")) {
      const num = parseFloat(query.slice(1));
      return !isNaN(num) && purchase.totalAmount < num;
    }
    return (
      purchase.suppliername?.toLowerCase().includes(query.toLowerCase()) ||
      purchase._id.toLowerCase().includes(query.toLowerCase())
    );
  });

  const RenderTable = ({ data }) => (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-muted-foreground)]">
          {type === "sale" ? <ShoppingCart size={40} /> : <ShoppingBag size={40} />}
          <p>No {type === "sale" ? "sales" : "purchases"} found for this period.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`bg-[var(--color-background)] text-[var(--color-muted-foreground)] uppercase text-xs border-b border-[var(--color-border)] ${data.length > 0 ? '' : 'hidden'}`}>
              <tr>
                <th className="p-4 font-semibold">Invoice ID</th>
                <th className="p-4 font-semibold">{type == "sale" ? "Customer" : "Supplier"}</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total Amount</th>
                <th className="p-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {data.map((item) => (
                <tr
                  onClick={() => handleViewDetails(item)}
                  key={item._id}
                  className="hover:bg-[var(--color-muted)] transition-colors duration-200"
                >
                  <td className="px-4 py-2 font-medium text-[var(--color-foreground)]">
                    {item._id.slice(-6)}
                  </td>
                  <td className="px-4 py-2 font-medium text-[var(--color-foreground)]">
                    <div className="flex items-center gap-2">
                      {type === "sale"
                        ? <ArrowUpRight size={14} className="text-emerald-500" />
                        : <ArrowDownLeft size={14} className="text-rose-500" />
                      }
                      {item.customerName ? item.customerName : item.suppliername}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[var(--color-muted-foreground)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 font-semibold text-[var(--color-foreground)]">
                    Rs {item.totalAmount ? item.totalAmount.toLocaleString() : item.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 rounded-lg bg-red-500/10 md:bg-red-500/0 text-red-500 hover:bg-red-500 hover:text-white transition-all"
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
          {type === "sale" ? <ShoppingCart className="text-[var(--color-primary)]" size={28} /> : <ShoppingBag className="text-[var(--color-primary)]" size={28} />}
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">{type === "sale" ? "Sales Records" : "Purchase Records"}</h1>
            <p className="text-[var(--color-muted-foreground)] text-sm">Manage your {type === "sale" ? "sales" : "purchase"} records</p>
          </div>
        </div>
        <button
          className="px-6 py-2.5 w-full md:w-auto bg-[var(--color-primary)] hover:brightness-110 transition-all text-[var(--color-primary-foreground)] rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--color-primary)]/20 active:scale-95"
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

      <div className="relative glass-panel rounded-2xl shadow-xl animate-fade-in-up">
        <div className="text-md p-2 border-b border-[var(--color-border)] text-[var(--color-foreground)] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center justify-center flex-wrap w-full lg:w-auto gap-4">
            <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-xl border border-[var(--color-border)]">
              <Calendar size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none text-[var(--color-foreground)] text-sm focus:ring-0 cursor-pointer outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-xl border border-[var(--color-border)]">
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
          <div className="flex justify-center gap-3 flex-wrap w-full lg:w-auto">
            <div className="relative group flex-1 md:flex-none min-w-40">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ..."
                className="pl-10 pr-4 py-1 w-full md:w-60 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
              />
            </div>
            <div className="flex items-center gap-2 px-3  text-xs font-medium border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-muted-foreground)]">
              <span className="text-[var(--color-foreground)] font-semibold">
                {type == "sale" ? NoOfSales : NoOfPurchases}
              </span>
              {type == "sale" ? "sales" : "purchases"}
            </div>
          </div>
        </div>

        {isLoading &&
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        }
        {!isLoading && (
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
        <SaleInvoice
          selected={selectedSale}
          showDetails={showDetails}
          handleClose={handleClose}
          type={type}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SalesListPage;
