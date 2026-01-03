import { useState } from "react";
import { updateProfile } from "../../services/profileServices.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Phone, Lock, ArrowLeft, Loader2, Edit, Send } from 'lucide-react';
import InputField from "../../components/UI/inputFields";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user?.id) {
        toast.error("User ID not found");
        return;
      }

      const formDataToSend = {};
      if (form.name !== user?.name) formDataToSend.name = form.name;
      if (form.phone !== user?.phone) formDataToSend.phone = form.phone;
      if (form.password) formDataToSend.password = form.password;

      if (Object.keys(formDataToSend).length === 0) {
        toast("No changes to save.", { icon: 'ℹ️' });
        setLoading(false);
        return;
      }

      const res = await updateProfile(formDataToSend);
      if (res.data) {
        toast.success("Profile updated successfully!");

        const updatedUser = { ...user, ...formDataToSend };
        if (formDataToSend.password) delete updatedUser.password;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setTimeout(() => {
          navigate('/profile');
        }, 100);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen bg-[var(--color-background)] font-sans transition-colors duration-300">
      <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in-up">
        <div className="p-8">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
          >
            <ArrowLeft size={16} className="text-[var(--color-primary)]" />
            <span className="font-medium text-sm">Back</span>
          </button>

          <h1 className="text-center text-3xl font-extrabold text-[var(--color-foreground)] mb-2 flex items-center justify-center gap-2">
            <Edit size={28} className="text-[var(--color-primary)]" />
            Edit Profile
          </h1>
          <p className="text-center text-[var(--color-muted-foreground)] text-sm mb-8">Update your personal information.</p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  name="name"
                  label="Name"
                  icon={User}
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />

                <InputField
                  name="phone"
                  label="Phone"
                  icon={Phone}
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                />

                <InputField
                  name="password"
                  label="New Password"
                  icon={Lock}
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  required={false}
                />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 mt-4 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
          <div className="mt-8 text-center bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
            <span className="text-xs text-[var(--color-muted-foreground)] font-medium">To make any other changes, please contact the administrator.</span>
            <div className="flex items-center justify-center mt-2 text-sm">
              {/* whatsapp link */}
              <a href="https://wa.me/923279351337?text=Hello%20Dukaan%20Digital%20Team%2C%20I%20need%20to%20make%20some%20changes%20to%20my%20profile." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Send size={20} className="text-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)] underline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;