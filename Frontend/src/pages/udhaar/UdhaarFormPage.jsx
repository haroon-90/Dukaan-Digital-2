import { useState, useEffect } from "react";
import { addUdhaar, getUdhaarById, updateUdhaar } from "../../services/udhaarServices.js";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Phone, MessageSquare, CheckCircle, ArrowLeft, Loader2, CreditCard } from 'lucide-react';
import InputField from '../../components/UI/inputFields';
import RS from '../../components/UI/RS.jsx'

const UdhaarFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    customerName: "",
    contact: "",
    amount: "",
    reason: "",
    status: "pending"
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const res = await getUdhaarById(id);
          if (!res) {
            toast.error("Failed to edit credit")
            setTimeout(() => {
              navigate('/udhaar')
            }, 1500);
          }
          setFormData(res.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isEdit) {
        res = await updateUdhaar(id, {
          amount: formData.amount,
          status: formData.status
        });
      } else {
        res = await addUdhaar(formData);
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(isEdit ? "Credit updated successfully!" : "Credit added successfully!");
        setTimeout(() => {
          navigate('/udhaar');
        }, 200);
      } else {
        toast.error('Failed');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--color-background)] transition-colors duration-300">
      <div className="relative glass-panel rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
        >
          <ArrowLeft size={16} className="text-[var(--color-primary)]" />
          <span className="font-medium text-sm">Back</span>
        </button>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] text-center flex items-center gap-2">
            <CreditCard size={32} className="text-[var(--color-primary)]" />
            {isEdit ? "Edit Credit" : "Add Credit"}
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-sm mt-2 text-center">
            {isEdit ? "Update existing credit details" : "Record a new credit transaction"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Customer Name"
            name="customerName"
            placeholder="Enter customer name"
            icon={User}
            value={formData.customerName}
            onChange={handleChange}
            disabled={isEdit}
            required
          />

          <InputField
            label="Contact Number"
            name="contact"
            placeholder="03XXXXXXXXX"
            icon={Phone}
            value={formData.contact}
            onChange={handleChange}
            disabled={isEdit}
            required
          />

          <InputField
            label="Amount"
            name="amount"
            placeholder="Enter amount"
            type="number"
            icon={RS}
            value={formData.amount}
            onChange={handleChange}
            disabled={isEdit}
            required
          />

          <InputField
            label="Reason"
            name="reason"
            placeholder="Enter reason"
            type="textarea"
            icon={MessageSquare}
            value={formData.reason}
            onChange={handleChange}
            disabled={isEdit}
            required={false}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Status</label>
            <div className="relative">
              <CheckCircle className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] appearance-none outline-none cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? "Saving..." : isEdit ? "Update Credit" : "Save Credit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UdhaarFormPage;