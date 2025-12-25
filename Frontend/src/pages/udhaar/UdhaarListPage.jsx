import { useEffect, useState } from "react";
import { getUdhaarlist, deleteUdhaar } from "../../services/udhaarServices.js";
import { Trash2, Edit2, HandCoins, Search, Filter, Loader2, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UdhaarListPage = () => {
  const navigate = useNavigate();
  const [udhaarList, setUdhaarList] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setloading] = useState(true);

  const getUdhaar = async () => {
    try {
      setloading(true);
      const res = await getUdhaarlist();
      setUdhaarList(res.data.reverse());
      // toast.success("Data Refreshed")
      setloading(false);
    } catch (err) {
      toast.error("Failed to refresh Credit record");
      console.error("Error fetching udhaar list", err);
      setloading(false);
    }
  };

  useEffect(() => {
    getUdhaar();
  }, []);

  const handleDelete = async (e) => {
    try {
      if (confirm("Are you really want to delete this credit record?")) {
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
    <div className="p-6 min-h-screen bg-[var(--color-background)] transition-colors duration-300">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div className="flex flex-wrap flex-1 gap-4 items-center">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-3 top-2.5 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by name or contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
            />
          </div>

          <div className="relative flex-1 md:flex-none">
            <Filter className="absolute left-3 top-2.5 text-[var(--color-muted-foreground)]" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/udhaar/new")}
            className="w-full md:w-auto bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] px-6 py-2 rounded-xl transition-all shadow-lg hover:shadow-[var(--color-primary)]/20 active:scale-95 flex items-center justify-center gap-2 font-bold"
          >
            <HandCoins size={20} />
            Add Credit
          </button>
        </div>
      </div>

      <div className="glass-panel shadow-xl rounded-3xl border border-[var(--color-border)] p-6 space-y-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-[var(--color-foreground)] flex items-center gap-2">
          <CreditCard size={28} className="text-[var(--color-primary)]" />
          Credit Records
        </h1>

        {loading &&
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
          </div>
        }

        {!loading &&
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[var(--color-surface)] text-[var(--color-muted-foreground)] uppercase text-xs border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer Name</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created At</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[var(--color-muted)] transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{item.customerName}</td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{item.contact}</td>
                      <td className="px-6 py-4 font-semibold text-[var(--color-foreground)]">
                        Rs {item.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)] max-w-xs truncate">
                        {item.reason || "No reason provided"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.status === "paid"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-rose-500/10 text-rose-500"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(item)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-[var(--color-muted-foreground)]"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <CreditCard size={40} className="opacity-20" />
                        <p>No credit records found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default UdhaarListPage;
