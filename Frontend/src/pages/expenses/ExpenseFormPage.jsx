import { useState } from 'react';
import { addExpense } from '../../services/expenseServices.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FileText, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import InputField from '../../components/UI/inputFields.jsx';
import RS from '../../components/UI/RS.jsx';

const ExpenseFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      const res = await addExpense(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Expense added successfully!")
        setFormData({
          title: '',
          description: '',
          amount: ''
        });
        setTimeout(() => {
          navigate('/expenses')
        }, 200);
      } else {
        toast.error("Failed to add expense!")
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!")
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-[var(--color-background)] transition-colors duration-300">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
        >
          <ArrowLeft size={16} className="text-[var(--color-primary)]" />
          <span className="font-medium text-sm">Back</span>
        </button>

        <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-2 text-center">
          Add New Expense
        </h2>
        <p className="text-[var(--color-muted-foreground)] text-center text-sm mb-8">
          Fill out the details below to add a new expense.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <InputField
              name="title"
              label="Title"
              icon={Tag}
              type="text"
              placeholder="Enter expense title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <InputField
              name="amount"
              label="Amount"
              icon={Tag}
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <InputField
              name="description"
              label="Description"
              icon={FileText}
              type="textarea"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={handleChange}
              required={false}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Saving...</span>
              </>
            ) : (
              'Add Expense'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormPage;
