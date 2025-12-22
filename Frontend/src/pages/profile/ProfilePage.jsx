import { useEffect, useState } from 'react';
import { getProfile, deleteProfile } from '../../services/profileServices.js';
import { User, Mail, Phone, Briefcase, Store, Calendar, Edit2, Trash2, MapPinned, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfileDetail = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 rounded-2xl bg-[var(--color-surface)] px-5 py-4 shadow-sm border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors">
        <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">{label}</span>
            <span className="text-base font-semibold text-[var(--color-foreground)] break-words">{value || "Not Provided"}</span>
        </div>
    </div>
);

const ProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            setProfile(response.data);
        } catch (error) {
            toast.error('Failed to fetch profile!');
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const deleted = await deleteProfile();
            if (deleted) {
                toast.success('Profile deleted successfully!');
                sessionStorage.clear();
                navigate('/login');
            }
        } catch (err) {
            toast.error('Failed to delete profile!');
        } finally {
            setLoading(false);
            setConfirmDelete(false);
        }
    };

    const handleEdit = () => {
        if (profile.role === "admin") {
            navigate('/admin/profile/edit', { state: { data: profile } });
        } else {
            navigate('/profile/edit');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const user = profile._id ? profile : JSON.parse(sessionStorage.getItem("user")) || {};

    return (
        <div className="relative min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-foreground)] flex items-center justify-center py-12 px-4 transition-colors duration-300">

            {/* Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="w-full max-w-lg transform rounded-3xl glass-panel p-8 text-center shadow-2xl transition-all duration-300 animate-scale-in">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            <Trash2 size={32} />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-[var(--color-foreground)]">Confirm Account Deletion</h2>
                        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                            Are you absolutely sure you want to delete your account? This action is <span className="font-bold text-[var(--color-foreground)]">irreversible</span> and will permanently remove all your data<span className={`${user.role === "admin" ? "hidden" : ""}`}>, including your shop, <span className="font-bold text-[var(--color-foreground)]">{user.shopname || "N/A"}</span></span>.
                        </p>
                        <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="w-full rounded-xl border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading && <Loader2 className="animate-spin" size={16} />}
                                {loading ? 'Deleting...' : 'Yes, delete my account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Card */}
            <div className="w-full max-w-4xl rounded-3xl glass-panel shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-blue-500 p-8 flex items-center justify-between h-48 relative overflow-hidden">
                    {/* Abstract background detail */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>


                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white hover:bg-white/30 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

                {/* Avatar + Name */}
                <div className="flex flex-col items-center -mt-16 px-6 pb-4 relative z-10">
                    <div className="h-32 w-32 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xl text-3xl font-bold border-4 border-[var(--color-background)]">
                        <User size={56} />
                    </div>
                    <h2 className="mt-4 text-3xl text-center font-bold text-[var(--color-foreground)]">{user.name}</h2>
                    <p className="text-sm capitalize font-medium text-[var(--color-muted-foreground)]">{user.role}</p>
                    <div className="mt-3 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm capitalize border border-[var(--color-primary)]/20 shadow-sm">{user.shopname || "No Shop Assigned"}</div>
                </div>

                {/* Details */}
                <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileDetail icon={<Mail size={20} />} label="Email" value={user.email} />
                    <ProfileDetail icon={<Phone size={20} />} label="Phone" value={user.phone} />
                    <ProfileDetail icon={<MapPinned size={20} />} label="Address" value={user.address} />
                    {user.role !== "admin" && (
                        <ProfileDetail icon={<Store size={20} />} label="Shop Name" value={user.shopname} />
                    )}
                    <ProfileDetail icon={<Briefcase size={20} />} label="Role" value={user.role} />
                    <ProfileDetail icon={<Calendar size={20} />} label="Joined On" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'} />
                </div>

                {/* Actions */}
                <div className="px-8 py-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 bg-[var(--color-muted)]/30">
                    <button
                        onClick={handleEdit}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-[var(--color-primary-foreground)] font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                        <Edit2 size={18} /> Edit Profile
                    </button>
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-red-500/50 px-6 py-3.5 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-[0.98]"
                    >
                        <Trash2 size={18} /> Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
