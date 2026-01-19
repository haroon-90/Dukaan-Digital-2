import { useEffect, useState } from "react";
import { getsales, deletesale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseServices.js";
import SaleInvoice from "./saleInvoice.jsx";
import { ShoppingCart, Trash2, ShoppingBag, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx"
import { useLoading } from "../../components/Context/LoadingContext";
import PageHeader from '../../components/UI/PageHeader';
import DateRangeFilter from '../../components/UI/DateRangeFilter';
import SearchBar from '../../components/UI/SearchBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/UI/TableComponents';
import EmptyState from '../../components/UI/EmptyState';
import { useConfirm } from '../../components/Context/Confirm';

const dummySaleData = [
  {
    _id: "1",
    customerName: "Haroon",
    createdAt: "2022-01-01",
    totalAmount: 70,
    items: [
      {
        name: "Product 1",
        price: 10,
        quantity: 5,
      },
      {
        name: "Product 2",
        price: 20,
        quantity: 1,
      },
    ],
  },
  {
    _id: "2",
    customerName: "Fahad",
    createdAt: "2022-01-02",
    totalAmount: 140,
    items: [
      {
        name: "Product 1",
        price: 10,
        quantity: 2,
      },
      {
        name: "Product 2",
        price: 20,
        quantity: 5,
      },
    ],
  },
];

const dummyPurchaseData = [
  {
    _id: "1",
    suppliername: "Haroon",
    createdAt: "2022-01-01",
    items: [
      {
        name: "Product 1",
        purchasePrice: 10,
        quantity: 5,
      },
      {
        name: "Product 2",
        purchasePrice: 20,
        quantity: 1,
      },
    ],
    total: 70,
  },
  {
    _id: "2",
    suppliername: "Fahad",
    createdAt: "2022-01-02",
    items: [
      {
        name: "Product 1",
        purchasePrice: 10,
        quantity: 2,
      },
      {
        name: "Product 2",
        purchasePrice: 20,
        quantity: 5,
      },
    ],
    total: 140,
  },
];

const SalesListPage = () => {
  const Confirm = useConfirm();
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

  const user = JSON.parse(localStorage.getItem("user"));
  const isDemo = user?.isdemo === true;

  const fetchSales = async () => {
    if (isDemo) {
      setSales(dummySaleData);
      return;
    }
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
    if (isDemo) {
      setPurchases(dummyPurchaseData);
      return;
    }
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
    // if (isDemo) {
    //   toast.error("Demo mode is enabled");
    //   return;
    // }
    setSelectedSale(sale);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedSale(null);
  };

  const handleDelete = async (item) => {
    try {
      const isConfirmed = await Confirm("Are you really want to delete this?");
      if (isConfirmed) {
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
        <EmptyState
          icon={type === "sale" ? ShoppingCart : ShoppingBag}
          message={`No ${type === "sale" ? "sales" : "purchases"} found for this period.`}
          query={search}
        />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Invoice ID</Th>
              <Th>{type == "sale" ? "Customer" : "Supplier"}</Th>
              <Th>Date</Th>
              <Th>Total Amount</Th>
              <Th className="text-center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr
                onClick={() => handleViewDetails(item)}
                key={item._id}
                className="cursor-pointer hover:bg-[var(--color-muted)]"
              >
                <Td className="font-medium text-[var(--color-foreground)]">
                  {item._id.slice(-6)}
                </Td>
                <Td className="font-medium text-[var(--color-foreground)]">
                  <div className="flex items-center gap-2">
                    {type === "sale"
                      ? <ArrowUpRight size={14} className="text-emerald-500" />
                      : <ArrowDownLeft size={14} className="text-rose-500" />
                    }
                    {item.customerName ? item.customerName : item.suppliername}
                  </div>
                </Td>
                <Td className="text-[var(--color-muted-foreground)]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Td>
                <Td className="font-semibold text-[var(--color-foreground)]">
                  Rs {item.totalAmount ? item.totalAmount?.toLocaleString() : item.total?.toLocaleString() || 0}
                </Td>
                <Td>
                  <div className="flex justify-center transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      disabled={isDemo}
                      className="p-2 rounded-lg bg-red-500/10 md:bg-red-500/0 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-2 md:p-4 transition-colors duration-300">

      <PageHeader
        title={type === "sale" ? "Sales Records" : "Purchase Records"}
        description={`Manage your ${type === "sale" ? "sales" : "purchase"} records`}
        icon={type === "sale" ? ShoppingCart : ShoppingBag}
        actionButtonText={type === "sale" ? "New Sale" : "New Purchase"}
        actionIcon={type === "sale" ? ShoppingCart : ShoppingBag}
        onAction={() => {
          type === "sale" && navigate("/sales/new")
          type === "purchase" && navigate("/purchase/new")
        }}
        actionDisabled={isDemo}
      />

      <div className="relative glass-panel rounded-2xl shadow-xl animate-fade-in-up">

        <div className="flex flex-wrap gap-3 items-center justify-between p-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
          />

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ..."
            stats={type == "sale" ? NoOfSales : NoOfPurchases}
            statsLabel={type == "sale" ? "sales" : "purchases"}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
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
