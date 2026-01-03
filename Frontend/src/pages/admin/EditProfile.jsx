import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { editUserProfile } from '../../services/adminServices.js';
import { User, Mail, Phone, MapPin, Store, Lock, ArrowLeft, Loader2 } from 'lucide-react';

const EditProfile = () => {
    const location = useLocation();
    const data = location.state?.data;
    console.log(data);
    const [form, setform] = useState({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        address: data?.address || "",
        shopname: data?.shopname || "",
        password: ""
    })

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await editUserProfile(data._id, form);
            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    navigate('/admin');
                }, 200);
            } else {
                toast.error(response.msg || "Failed to update profile");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile");
        }
        setLoading(false);
    }

    return (
        <div className="flex items-center justify-center p-6 min-h-screen bg-[var(--color-background)] font-sans transition-colors duration-300">
            <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="p-8">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-full shadow-sm hover:brightness-95 transition-all duration-300 border border-[var(--color-border)]"
                    >
                        <ArrowLeft size={16} className="text-[var(--color-primary)]" />
                        <span className="font-medium text-sm">Back</span>
                    </button>

                    <h1 className="text-center text-3xl font-extrabold text-[var(--color-foreground)] mb-2">Edit Profile</h1>
                    <p className="text-center text-[var(--color-muted-foreground)] text-sm mb-8">Update personal and business information.</p>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)]">Name</label>
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

                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)]">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                                        placeholder="Enter your email address"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-foreground)]">Phone</label>
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

                            <div className="space-y-1">
                                <label htmlFor="address" className="block text-sm font-medium text-[var(--color-foreground)]">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                                        placeholder="Enter your full address"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {data.role !== "admin" && (
                                <div className="space-y-1">
                                    <label htmlFor="shopname" className="block text-sm font-medium text-[var(--color-foreground)]">Shop Name</label>
                                    <div className="relative">
                                        <Store className="absolute left-4 top-3.5 text-[var(--color-muted-foreground)]" size={18} />
                                        <input
                                            type="text"
                                            id="shopname"
                                            name="shopname"
                                            value={form.shopname}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] outline-none"
                                            placeholder="Enter your shop's name"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)]">New Password</label>
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
                                className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 mt-4 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;