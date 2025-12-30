import { useEffect, useState } from 'react';
import { getProfile, deleteProfile } from '../../services/profileServices.js';
import { User, Mail, Phone, Briefcase, Store, Calendar, Edit2, Trash2, MapPinned, ArrowLeft, Loader2, CreditCard, Receipt, FileText, Info, Sun, Moon, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '../../components/Context/ThemeContext';

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

const MenuLink = ({ icon, label, onClick, danger, value }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-muted)] transition-all active:scale-[0.99] ${danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10' : 'text-[var(--color-foreground)]'}`}>
        <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${danger ? 'bg-red-100 dark:bg-red-900/20' : 'bg-[var(--color-primary)]/10'} ${danger ? 'text-red-500' : 'text-[var(--color-primary)]'}`}>
                {icon}
            </div>
            <span className="font-medium text-base">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-sm text-[var(--color-muted-foreground)]">{value}</span>}
            <ChevronRight size={18} className="text-[var(--color-muted-foreground)]" />
        </div>
    </button>
);

const ProfilePage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
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

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const [showPersonalDetails, setShowPersonalDetails] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const user = profile._id ? profile : JSON.parse(sessionStorage.getItem("user")) || {};

    return (
        <div className="relative min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-foreground)] flex flex-col items-center justify-center py-6 px-4 pb-24 md:pb-6 transition-colors duration-300">

            {/* Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
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

            {/* Profile Header Card */}
            <div className="w-full max-w-4xl rounded-3xl glass-panel shadow-lg overflow-hidden animate-fade-in-up mb-6">
                {/* Header Image */}
                <div className="bg-blue-600 h-32 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                            backgroundSize: '14px 14px'
                        }}>
                    </div>
                    {/* Desktop Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex absolute top-6 left-6 items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white hover:bg-white/30 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                    {/* Theme Toggle for Mobile inside banner */}
                    <button
                        onClick={toggleTheme}
                        className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white backdrop-blur-sm"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                <div className="px-6 pb-6 -mt-12 flex flex-col items-center relative z-10">
                    <div className="h-24 w-24 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] shadow-xl text-3xl font-bold border-4 border-[var(--color-background)]">
                        {user.name ? user.name[0].toUpperCase() : <User size={40} />}
                    </div>
                    <h2 className="mt-3 text-2xl text-center font-bold text-[var(--color-foreground)]">{user.name}</h2>
                    <p className="text-sm text-center text-[var(--color-muted-foreground)] font-medium capitalize mb-2">{user.role}</p>
                    {user.role !== "admin" && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-xs capitalize border border-[var(--color-primary)]/20">
                            <Store size={14} />
                            {user.shopname || "No Shop Assigned"}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 gap-6 items-start">

                {/* Personal Details - Collapsible on Mobile, Visible on Desktop */}
                <div className="space-y-4">
                    <button
                        onClick={() => setShowPersonalDetails(!showPersonalDetails)}
                        className="w-full flex items-center justify-between text-lg font-bold text-[var(--color-foreground)] px-1 md:cursor-default"
                    >
                        <span>Personal Details</span>
                        <ChevronRight className={`md:hidden transition-transform ${showPersonalDetails ? 'rotate-90' : ''}`} />
                    </button>

                    <div className={`grid grid-cols-1 gap-3 overflow-hidden transition-all duration-300 ${showPersonalDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                        <ProfileDetail icon={<Mail size={20} />} label="Email" value={user.email} />
                        <ProfileDetail icon={<Phone size={20} />} label="Phone" value={user.phone} />
                        <ProfileDetail icon={<MapPinned size={20} />} label="Address" value={user.address} />
                        <ProfileDetail icon={<Calendar size={20} />} label="Joined" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'} />
                    </div>
                    <div className={`pt-4 ${showPersonalDetails ? 'block' : 'hidden'} md:block`}>
                        <button
                            onClick={handleEdit}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-[var(--color-primary-foreground)] font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                            <Edit2 size={18} /> Edit Profile
                        </button>
                    </div>
                </div>

                {/* dashboard, credits, report , expenses */}
                <div className="space-y-6 md:hidden">
                    <h3 className="text-lg font-bold text-[var(--color-foreground)] px-1">Business</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <MenuLink
                            icon={<Briefcase size={20} />}
                            label="Expenses"
                            onClick={() => navigate('/expenses')}
                        />
                        <MenuLink
                            icon={<CreditCard size={20} />}
                            label="Credits"
                            onClick={() => navigate('/udhaar')}
                        />
                        <MenuLink
                            icon={<FileText size={20} />}
                            label="Reports"
                            onClick={() => navigate('/reports')}
                        />
                    </div>
                </div>

                {/* Mobile/Menu Actions Section - HIDDEN ON DESKTOP */}
                <div className="space-y-6 md:hidden">


                    {/* App Settings Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[var(--color-foreground)] px-1">App Settings</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <MenuLink
                                icon={<Info size={20} />}
                                label="About Us"
                                onClick={() => navigate('/footer')}
                            />
                            <MenuLink
                                icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                label="Theme"
                                value={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                onClick={toggleTheme}
                            />
                            <MenuLink
                                icon={<LogOut size={20} />}
                                label="Logout"
                                danger={true}
                                onClick={handleLogout}
                            />
                            <MenuLink
                                icon={<Trash2 size={20} />}
                                label="Delete Account"
                                danger={true}
                                onClick={() => setConfirmDelete(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
