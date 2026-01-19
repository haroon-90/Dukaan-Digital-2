import { useEffect, useState } from "react";
import { getUdhaarlist, deleteUdhaar } from "../../services/udhaarServices.js";
import { Trash2, Edit2, HandCoins, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../loader/loader.jsx"
import { useLoading } from "../../components/Context/LoadingContext";
import PageHeader from '../../components/UI/PageHeader';
import DateRangeFilter from '../../components/UI/DateRangeFilter';
import SearchBar from '../../components/UI/SearchBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/UI/TableComponents';
import EmptyState from '../../components/UI/EmptyState';
import StatusBadge from '../../components/UI/StatusBadge';
import { useConfirm } from '../../components/Context/Confirm';

const dummyUdhaarData = [
  {
    _id: 1,
    customerName: "Haroon",
    contact: "1234567890",
    amount: 1000,
    status: "paid",
    createdAt: "2022-01-01",
  },
  {
    _id: 2,
    customerName: "Fahad",
    contact: "0987654321",
    amount: 2000,
    status: "pending",
    createdAt: "2022-01-02",
  },
];

const UdhaarListPage = () => {
  const Confirm = useConfirm();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const [udhaarList, setUdhaarList] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [NoOfCredits, setNoOfCredits] = useState(0);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const user = JSON.parse(localStorage.getItem("user"));
  const isDemo = user?.isdemo;

  const getUdhaar = async () => {
    if (isDemo) {
      setUdhaarList(dummyUdhaarData);
      setNoOfCredits(dummyUdhaarData.length);
      return;
    }
    try {
      setIsLoading(true);
      const body = {
        startDate,
        endDate,
      }
      const res = await getUdhaarlist(body);
      setUdhaarList(res.data);
      setNoOfCredits(res.data.length);
      setIsLoading(false);
    } catch (err) {
      toast.error("Failed to refresh Credit record");
      console.error("Error fetching udhaar list", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUdhaar();
  }, [startDate, endDate]);

  const handleDelete = async (e) => {
    try {
      const isConfirmed = await Confirm("Are you really want to delete this credit record?");
      if (isConfirmed) {
        const res = await deleteUdhaar(e._id);
        if (res.status == 200 || res.status == 201) {
          toast.success("Deleted successfully");
        }
        getUdhaar();
      }
    } catch (err) {
      toast.error("Failed to delete Credit record");
      console.error("Error deleting: ", err);
    }
  }

  const handleEdit = (e) => {
    navigate(`/udhaar/edit/${e._id}`)
  }

  const filteredData = udhaarList.filter((item) => {
    const matchSearch =
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.includes(search);
    const matchStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-2 md:p-4 min-h-screen bg-[var(--color-background)] transition-colors duration-300">

      <PageHeader
        title="Credit Records"
        description="Manage your credit records"
        icon={HandCoins}
        actionButtonText="Add Credit"
        actionIcon={HandCoins}
        onAction={() => navigate("/udhaar/new")}
        actionDisabled={isDemo}
      />

      <div className="glass-panel shadow-xl rounded-2xl border border-[var(--color-border)] animate-fade-in-up">

        <div className="flex flex-wrap flex-1 gap-2 items-center justify-between p-2 border-b border-[var(--color-border)]">

          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
            disabled={isDemo}
          />

          <div className="flex justify-center gap-2 flex-wrap w-full lg:w-auto">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or contact..."
              stats={NoOfCredits}
              statsLabel="credits"
            />

            <div className="relative flex-1 md:flex-none">
              <Filter className="absolute left-3 top-2 text-[var(--color-muted-foreground)]" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-2 py-1 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>

          </div>

        </div>

        {isLoading &&
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        }

        {!isLoading &&
          <div className="overflow-x-auto">
            {filteredData.length > 0 ? (
              <Table>
                <Thead>
                  <Tr>
                    <Th>Customer Name</Th>
                    <Th>Contact</Th>
                    <Th>Amount</Th>
                    <Th>Reason</Th>
                    <Th>Status</Th>
                    <Th>Created At</Th>
                    <Th className="text-center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((item) => (
                    <Tr key={item._id}>
                      <Td className="font-medium text-[var(--color-foreground)]">{item.customerName}</Td>
                      <Td className="text-[var(--color-muted-foreground)]">{item.contact}</Td>
                      <Td className="font-semibold text-[var(--color-foreground)]">
                        Rs {item.amount.toLocaleString()}
                      </Td>
                      <Td className="text-[var(--color-muted-foreground)] max-w-xs truncate">
                        {item.reason || "No reason provided"}
                      </Td>
                      <Td>
                        <StatusBadge status={item.status} />
                      </Td>
                      <Td className="text-[var(--color-muted-foreground)]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <div className="flex justify-center items-center gap-2 transition-opacity">
                          <button disabled={isDemo} onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-blue-500/10 sm:bg-blue-500/0 text-blue-500 hover:bg-blue-500 hover:text-white transition-all" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button disabled={isDemo} onClick={() => handleDelete(item)} className="p-2 rounded-lg bg-red-500/10 sm:bg-red-500/0 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <EmptyState
                icon={HandCoins}
                message="No credit records found matching your criteria."
                query={search}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default UdhaarListPage;
