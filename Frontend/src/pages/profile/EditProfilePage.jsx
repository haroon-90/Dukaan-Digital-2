import { useState } from "react";
import { updateProfile } from "../../services/profileServices.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Phone, Lock, ArrowLeft, Loader2, Edit, Send } from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null;

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
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

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
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                    placeholder="Leave blank to keep current password"
                    disabled={loading}
                  />
                </div>
              </div>

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
            <span className="text-xs text-[var(--color-muted-foreground)] font-medium">To make any other changes, please contact your administrator.</span>
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