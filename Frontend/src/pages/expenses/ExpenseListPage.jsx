import { useEffect, useState } from 'react';
import { getExpense, deleteExpense } from '../../services/expenseServices.js';
import { Trash2, PlusCircle, Search, ReceiptIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../loader/loader.jsx';

const ExpenseListPage = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await getExpense();
      if (res.data && res.data.length > 0) {
        setExpenseList(res.data.reverse());
        // toast.success("Data refreshed!");
      } else {
        setExpenseList([]);
      }
    } catch (err) {
      toast.error("Failed to refresh expenses")
      console.error("Failed to refresh expenses", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (e) => {
    try {
      if (confirm("Are you really want to delete this?")) {
        const res = await deleteExpense(e._id);
        if (res.status == 200) {
          toast.success("Expense deleted successfully!")
        }
        fetchExpenses();
      }
    } catch (err) {
      toast.error("Failed to delete expense")
      console.error("Failed to delete expense", err);
    }
  }

  const filteredExpenses = expenseList.filter(expense =>
    expense.title.toLowerCase().includes(query.toLowerCase()) ||
    expense.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-foreground)] p-4 md:p-6 transition-colors duration-300">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div>
          <div className="flex items-center gap-3">
            <ReceiptIcon size={28} className="text-[var(--color-primary)]" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Expense Records</h1>
              <p className="text-[var(--color-muted-foreground)] text-sm">Manage and track your business expenses.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/expenses/new')}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <PlusCircle size={18} /> Add Expense
        </button>
      </div>

      <div className="max-w-7xl mx-auto glass-panel rounded-2xl overflow-hidden animate-fade-in-up">

        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search expenses..."
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all placeholder:text-[var(--color-muted-foreground)]"
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
              <thead className="bg-[var(--color-surface)] text-[var(--color-muted-foreground)] font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <tr key={expense._id} className="hover:bg-[var(--color-surface)] transition-colors group">
                      <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{expense.title}</td>
                      <td className="px-6 py-4 font-bold text-red-600 dark:text-red-400">
                        ₨ {expense.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)] max-w-xs truncate">{expense.description || "-"}</td>
                      <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{new Date(expense.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center transition-opacity">
                          <button
                            onClick={() => handleDelete(expense)}
                            className="p-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-[var(--color-muted-foreground)]">
                      {query ? "No expenses found matching your search" : "No expense records found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseListPage;
