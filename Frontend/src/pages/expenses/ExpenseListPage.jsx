import { useCallback, useEffect, useState } from 'react';
import { getExpense, deleteExpense } from '../../services/expenseServices.js';
import { Trash2, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../loader/loader.jsx';
import { useLoading } from '../../components/Context/LoadingContext';
import PageHeader from '../../components/UI/PageHeader';
import DateRangeFilter from '../../components/UI/DateRangeFilter';
import SearchBar from '../../components/UI/SearchBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/UI/TableComponents';
import EmptyState from '../../components/UI/EmptyState';
import { useConfirm } from '../../components/UI/Confirm';

const ExpenseListPage = () => {
  const Confirm = useConfirm();
  const demoData = [
    { _id: 1, title: "Demo Expense 1", amount: 100, description: "Demo Expense", createdAt: new Date() },
    { _id: 2, title: "Demo Expense 2", amount: 200, description: "Demo Expense", createdAt: new Date() },
    { _id: 3, title: "Demo Expense 3", amount: 300, description: "Demo Expense", createdAt: new Date() },
  ];
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const [expenseList, setExpenseList] = useState([]);
  const [query, setQuery] = useState("");
  const [NoOfExpenses, setNoOfExpenses] = useState(0);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const user = JSON.parse(localStorage.getItem("user"));
  const isDemo = user?.isdemo;

  const fetchExpenses = useCallback(async () => {
    if (isDemo) {
      setExpenseList(demoData);
      setNoOfExpenses(demoData.length);
      return;
    }
    try {
      setIsLoading(true);
      const body = {
        startDate,
        endDate,
      }
      const res = await getExpense(body);
      if (res.data && res.data.length > 0) {
        setExpenseList(res.data);
        setNoOfExpenses(res.data.length);
      } else {
        setExpenseList([]);
      }
    } catch (err) {
      toast.error("Failed to refresh expenses")
      console.error("Failed to refresh expenses", err);
    }
    setIsLoading(false);
  }, [startDate, endDate, isDemo]);

  useEffect(() => {
    fetchExpenses();
  }, [startDate, endDate]);

  const handleDelete = async (e) => {
    if (isDemo) {
      toast.error("In demo mode, can't delete expense")
      return;
    }
    try {
      const isConfirmed = await Confirm("Are you really want to delete this?");
      if (isConfirmed) {
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

      <PageHeader
        title="Expense Records"
        description="Manage and track your business expenses."
        icon={Banknote}
        actionButtonText="Add Expense"
        actionIcon={Banknote}
        onAction={() => navigate('/expenses/new')}
        actionDisabled={isDemo}
      />

      <div className="max-w-7xl mx-auto glass-panel rounded-2xl overflow-hidden animate-fade-in-up">

        <div className="flex flex-wrap gap-3 items-center justify-between p-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
            disabled={isDemo}
          />

          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search expenses..."
            stats={NoOfExpenses}
            statsLabel="expenses"
          />
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : (
          <Table>
            <Thead className={filteredExpenses.length > 0 ? '' : 'hidden'}>
              <Tr>
                <Th>Title</Th>
                <Th>Amount</Th>
                <Th>Description</Th>
                <Th>Created At</Th>
                <Th className="text-center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <Tr key={expense._id}>
                    <Td className="font-medium text-[var(--color-foreground)]">{expense.title}</Td>
                    <Td className="font-bold text-red-600 dark:text-red-400">
                      ₨ {expense.amount.toLocaleString()}
                    </Td>
                    <Td className="text-[var(--color-muted-foreground)] max-w-xs truncate">{expense.description || "-"}</Td>
                    <Td className="text-[var(--color-muted-foreground)]">{new Date(expense.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <div className="flex justify-center transition-opacity">
                        <button
                          onClick={() => handleDelete(expense)}
                          className="p-2 bg-red-500/10 md:bg-red-500/0 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <td colSpan="5">
                    <EmptyState
                      icon={Banknote}
                      message="No expense records found"
                      query={query ? query : null}
                    />
                  </td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ExpenseListPage;
