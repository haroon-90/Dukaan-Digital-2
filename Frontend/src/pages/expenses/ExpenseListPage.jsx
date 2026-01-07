import { useEffect, useState } from 'react';
import { getExpense, deleteExpense } from '../../services/expenseServices.js';
import { Trash2, Search, Banknote, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../loader/loader.jsx';

const ExpenseListPage = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [NoOfExpenses, setNoOfExpenses] = useState(0);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const body = {
        startDate,
        endDate,
      }
      const res = await getExpense(body);
      if (res.data && res.data.length > 0) {
        setExpenseList(res.data.reverse());
        setNoOfExpenses(res.data.length);
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

  useEffect(() => {
    fetchExpenses();
  }, [startDate, endDate]);

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
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-foreground)] p-2 md:p-4 transition-colors duration-300">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
        <div>
          <div className="flex items-center gap-3">
            <Banknote size={28} className="text-[var(--color-primary)]" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Expense Records</h1>
              <p className="text-[var(--color-muted-foreground)] text-sm">Manage and track your business expenses.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/expenses/new')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Banknote size={18} /> Add Expense
        </button>
      </div>

      <div className="max-w-7xl mx-auto glass-panel rounded-2xl overflow-hidden animate-fade-in-up">

        <div className="flex flex-wrap gap-3 items-center justify-between p-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-center flex-wrap w-full lg:w-auto gap-4">
            <div className="flex items-center gap-2 bg-[var(--color-surface)] px-2 py-1.5 rounded-xl border border-[var(--color-border)]">
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
            <div className="relative group flex-1 min-w-[220px] md:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors"
              />
              <input
                type="text"
                placeholder="Search expenses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-1 w-full md:w-96 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
              />
            </div>
            <div className="flex items-center gap-2 px-3  text-xs font-medium border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-muted-foreground)]">
              <span className="text-[var(--color-foreground)] font-semibold">
                {NoOfExpenses}
              </span>
              expenses
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className={`bg-[var(--color-background)] border-b border-[var(--color-border)] text-[var(--color-muted-foreground)] font-medium uppercase text-xs ${filteredExpenses.length > 0 ? '' : 'hidden'}`}>
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <tr key={expense._id} className="hover:bg-[var(--color-muted)] transition-colors group">
                      <td className="px-4 py-2 font-medium text-[var(--color-foreground)]">{expense.title}</td>
                      <td className="px-4 py-2 font-bold text-red-600 dark:text-red-400">
                        ₨ {expense.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-[var(--color-muted-foreground)] max-w-xs truncate">{expense.description || "-"}</td>
                      <td className="px-4 py-2 text-[var(--color-muted-foreground)]">{new Date(expense.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center transition-opacity">
                          <button
                            onClick={() => handleDelete(expense)}
                            className="p-2 bg-red-500/10 md:bg-red-500/0 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
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
                      <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <Banknote size={40} />
                        <p className="text-sm">{query ? "No expenses found matching your search" : "No expense records found"}</p>
                      </div>
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
