import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from "react";
import {
    Store,
    Shield,
    PlusCircle,
    RefreshCw,
    Search,
    AlertTriangle,
    Edit2,
    Trash2,
    CheckCircle,
    Ban
} from "lucide-react";
import toast from "react-hot-toast";
import { getAdminDashboard, deleteUserProfile, editUserStatus } from '../../services/adminServices.js';
import { useLoading } from "../../components/Context/LoadingContext";

const isYou = JSON.parse(localStorage.getItem("user"))?.id || "";

const Admindashboard = () => {
    const { isLoading, setIsLoading } = useLoading();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [managers, setManagers] = useState([]);
    const [admins, setAdmins] = useState([])

    const fetchDashboard = async () => {
        try {
            setIsLoading(true);
            setError("");
            const response = await getAdminDashboard();
            setManagers((response.data.shops).filter((shop) => shop.role === "manager").sort((a, b) => {
                const order = { active: 1, suspended: 2, inactive: 3 };
                return (order[a.status] || 4) - (order[b.status] || 4);
            }));
            setAdmins((response.data.shops).filter((shop) => shop.role === "admin"));
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.msj || "Failed to fetch dashboard data");
            setIsLoading(false);
            toast.error("Failed to refresh data");
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const filteredManagers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return managers;
        return managers
            .sort((a, b) => {
                const order = { active: 1, suspended: 2, inactive: 3 };
                return (order[a.status] || 4) - (order[b.status] || 4);
            })
            .filter((m) =>
                [m.name, m.email, m.phone, m.shopname, m.status]
                    .filter(Boolean)
                    .some((val) => String(val).toLowerCase().includes(q))
            )
    }, [query, managers]);

    const statusBadge = (status) => {
        const base = "px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border";
        if (status === "active")
            return <span className={`${base} border-[var(--color-success)] bg-[var(--color-success)]/10 text-[var(--color-success)] dark:bg-[var(--color-success)]/20 dark:border-[var(--color-success)]`}>● Active</span>;
        if (status === "suspended")
            return <span className={`${base} border-[var(--color-danger)] bg-[var(--color-danger)]/10 text-[var(--color-danger)] dark:bg-[var(--color-danger)]/20 dark:border-[var(--color-danger)]`}>● Suspended</span>;
        if (status === "inactive")
            return <span className={`${base} border-[var(--color-warning)] bg-[var(--color-warning)]/10 text-[var(--color-warning)] dark:bg-[var(--color-warning)]/20 dark:border-[var(--color-warning)]`}>● Inactive</span>;
    };

    const handleDelete = async (e) => {
        setIsLoading(true)
        try {
            if (confirm("Are you sure you want to delete this manager? This action cannot be undone.")) {
                const deleted = await deleteUserProfile(e._id);
                if (deleted) {
                    fetchDashboard();
                }
            }
        } catch (err) {
            toast.error('Failed to fetch profile!')
            setIsLoading(false)
        }
    }

    const handlestatusupdate = async (e) => {
        setIsLoading(true);
        try {
            const updated = await editUserStatus(e._id);
            if (updated) {
                fetchDashboard();
            }
        }
        catch (err) {
            toast.error('Failed to fetch profile!')
            console.error('Error fetching profile:', err);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">

            <div className="mx-auto max-w-8xl p-1 py-4 md:p-4 lg:p-6 space-y-8 animate-fade-in-up">
                {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-4 text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div>
                            <div className="font-medium">Heads up</div>
                            <div className="text-sm opacity-90">{error}</div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Store} label="Total Shops" value={managers.length} loading={isLoading} color="blue" />
                    <StatCard icon={Shield} label="Total Admins" value={admins.length} loading={isLoading} color="indigo" />
                </div>

                <div className='glass-panel rounded-2xl overflow-hidden'>
                    <div className="p-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-lg font-bold text-[var(--color-foreground)]">
                            <Store className="text-[var(--color-primary)]" /> Shops
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap text-sm min-w- font-medium text-[var(--color-foreground)]">
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border border-[var(--color-success)] bg-[var(--color-success)]/10 text-[var(--color-success)] dark:bg-[var(--color-success)]/20 dark:border-[var(--color-success)]"><span className='hidden md:block'>● </span>Active: {managers.filter((m) => m.status === "active").length}</span>
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border border-[var(--color-danger)] bg-[var(--color-danger)]/10 text-[var(--color-danger)] dark:bg-[var(--color-danger)]/20 dark:border-[var(--color-danger)]"><span className='hidden md:block'>● </span>Suspended: {managers.filter((m) => m.status === "suspended").length}</span>
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border border-[var(--color-warning)] bg-[var(--color-warning)]/10 text-[var(--color-warning)] dark:bg-[var(--color-warning)]/20 dark:border-[var(--color-warning)]"><span className='hidden md:block'>● </span>Inactive: {managers.filter((m) => m.status === "inactive").length}</span>
                            </div>
                        </div>
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by Shop, manager, phone, email..."
                                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all placeholder:text-[var(--color-muted-foreground)]"
                            />
                        </div>
                    </div>

                    <div className={`${isLoading && "opacity-60 pointer-events-none"} p-0`}>
                        {managers.length === 0 && !isLoading ? (
                            <div className="py-12 text-center text-[var(--color-muted-foreground)]">
                                {error || "No shops found matching your search."}
                            </div>
                        ) : (
                            <Usertable filtered={filteredManagers} handleDelete={handleDelete} statusBadge={statusBadge} handlestatusupdate={handlestatusupdate} navigate={navigate} isadmin={false} />
                        )
                        }
                    </div>
                </div>

                <div className='glass-panel rounded-2xl overflow-hidden'>
                    <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-2 text-lg font-bold text-[var(--color-foreground)]">
                        <Shield className="text-[var(--color-primary)]" /> Admins
                    </div>
                    <div className={`${isLoading && "opacity-60 pointer-events-none"} p-0`}>
                        <Usertable filtered={admins} handleDelete={handleDelete} statusBadge={statusBadge} handlestatusupdate={handlestatusupdate} navigate={navigate} isadmin={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Usertable = ({ filtered, handlestatusupdate, statusBadge, handleDelete, navigate, isadmin }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                    <tr>
                        <Th>{isadmin === true ? "Name" : "Manager"}</Th>
                        <Th className="hidden md:table-cell">Email</Th>
                        <Th className="hidden md:table-cell">Phone</Th>
                        {isadmin === true && <Th>Address</Th>}
                        {isadmin === false && <Th>Shop</Th>}
                        <Th>Date Added</Th>
                        {isadmin === false && <Th>Status</Th>}
                        {isadmin === false && <Th className="text-right">Actions</Th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                    {filtered.map((m) => (
                        <tr key={m._id} className={`${isYou === m._id && "bg-[var(--color-muted)]"} ${m.status === "active" && !isadmin && "bg-green-500/5 hover:bg-green-500/10"} ${m.status === "inactive" && "bg-yellow-500/5 hover:bg-yellow-500/10"} ${m.status === "suspended" && "bg-red-500/5 hover:bg-red-500/10"} transition-colors group`}>
                            <Td className="font-medium">
                                <div className="text-[var(--color-foreground)] flex items-center gap-2">
                                    {m.name}
                                </div>
                                <div className="text-xs text-[var(--color-muted-foreground)] md:hidden mt-0.5">{m.email}</div>
                                <div className="text-xs text-[var(--color-muted-foreground)] md:hidden">{m.phone}</div>
                            </Td>
                            <Td className="hidden md:table-cell text-[var(--color-muted-foreground)]">{m.email}</Td>
                            <Td className="hidden md:table-cell text-[var(--color-muted-foreground)]">{m.phone}</Td>
                            {isadmin === true && <Td className="text-[var(--color-muted-foreground)]">{m.address}</Td>}
                            {isadmin === false && <Td className="font-medium text-[var(--color-foreground)]">{m.shopname}</Td>}
                            <Td className="text-[var(--color-muted-foreground)]">{new Date(m.createdAt).toLocaleDateString()}</Td>
                            {isadmin === false && <Td>{statusBadge(m.status)}</Td>}
                            {isadmin === false &&
                                <Td>
                                    <div className="flex items-center justify-end gap-2 transition-opacity">
                                        {m.status !== "active" ? (
                                            <button title="Activate" onClick={() => handlestatusupdate(m)} className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                                                <CheckCircle size={16} />
                                            </button>
                                        ) : (
                                            <button title="Suspend" onClick={() => handlestatusupdate(m)} className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                                <Ban size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => navigate('/admin/profile/edit', { state: { data: m } })} title="Edit" className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(m)} title="Delete" className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </Td>}
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-[var(--color-muted-foreground)]">
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

function StatCard({ icon: Icon, label, value, loading }) {
    return (
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className={`p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-[var(--color-muted-foreground)]">{label}</p>
                <p className="text-2xl font-bold text-[var(--color-foreground)] mt-0.5">
                    {loading ? <span className="animate-pulse">...</span> : value}
                </p>
            </div>
        </div>
    );
}

function Th({ children, className = "" }) {
    return (
        <th className={`px-6 py-3 font-semibold text-[var(--color-foreground)] uppercase tracking-wider text-xs ${className}`}>
            {children}
        </th>
    );
}

function Td({ children, className = "" }) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
            {children}
        </td>
    );
}

export default Admindashboard;