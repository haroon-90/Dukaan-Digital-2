import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { ShoppingCart, HandCoins, TrendingUp, Banknote, MessageCircleWarning, Eye, EyeOff, CheckCircle2, LayoutDashboard } from "lucide-react";
import { getDashboard } from "../../services/dashboardServices.js";
import Loader from "../loader/loader";
import toast from "react-hot-toast";
import { useLoading } from "../../components/Context/LoadingContext.jsx";

const Card = ({ children, className = "" }) => (
    <div className={`glass-panel rounded-2xl p-0 overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-4 ${className}`}>{children}</div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
    <Card className={`animate-fade-in-up ${colorClass}`} style={{ animationDelay: `${delay}ms` }}>
        <CardContent className="h-full flex flex-col justify-between relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
                <Icon size={60} />
            </div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-md font-medium text-[var(--color-muted-foreground)] mb-1">{title}</p>
                    <h2 className="text-[1em] md:text-xl font-bold tracking-tight text-[var(--color-foreground)]">
                        {value}
                    </h2>
                </div>
            </div>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const { isLoading, setIsLoading } = useLoading();
    const [ishide, setishide] = useState(true);
    const [summary, setsummary] = useState()
    const [salesData, setsalesData] = useState([])
    const [lowStock, setLowStock] = useState([])

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await getDashboard();
            setsummary(res.data.summary);
            setsalesData(res.data.salesData);
            setLowStock(res.data.lowStock);
            setIsLoading(false);
        } catch (err) {
            toast.error("Failed to refresh data!")
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="space-y-2 md:space-y-6 min-h-[calc(100vh-15rem)]">
            {/* Header */}
            <div className="relative flex flex-row flex-wrap justify-between items-center p-4 border border-[var(--color-border)] shadow-sm rounded-2xl bg-[var(--color-surface)] md:gap-4 gap-2">
                <div className="flex items-center gap-3">
                    <LayoutDashboard size={28} className="text-[var(--color-primary)]" />
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold text-[var(--color-foreground)]">Dashboard</h1>
                        <p className="text-[var(--color-muted-foreground)] text-[0.8em] md:text-sm">Overview of your business performance</p>
                    </div>
                </div>

                <div className="absolute top-1 md:top-auto right-1 flex items-center gap-3 w-auto justify-end">
                    <button
                        onClick={() => setishide(!ishide)}
                        className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:border-[var(--color-muted-foreground)] transition-all"
                    >
                        {ishide ? <EyeOff size={18} /> : <Eye size={18} />}
                        <span className="text-sm font-medium hidden md:block">{ishide ? "Hidden" : "Visible"}</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                <StatCard
                    title="Total Sales"
                    value={isLoading ? "*****"
                        : ishide ? "*****" : `₨ ${summary?.sales.toLocaleString() || "---"}`}
                    icon={ShoppingCart}
                    colorClass="bg-blue-500 shadow-blue-500/30 shadow-lg"
                    delay={100}
                />
                <StatCard
                    title="Total Profit"
                    value={isLoading ? "*****"
                        : ishide ? "*****" : `₨ ${summary?.profit.toLocaleString() || "---"}`}
                    icon={TrendingUp}
                    colorClass="bg-emerald-500 shadow-emerald-500/30 shadow-lg"
                    delay={200}
                />
                <StatCard
                    title="Expenses"
                    value={isLoading ? "*****"
                        : ishide ? "*****" : `₨ ${summary?.expenses.toLocaleString() || "---"}`}
                    icon={Banknote}
                    colorClass="bg-rose-500 shadow-rose-500/30 shadow-lg"
                    delay={300}
                />
                <StatCard
                    title="Total Credit"
                    value={isLoading ? "*****"
                        : ishide ? "*****" : `₨ ${summary?.credit.toLocaleString() || "---"}`}
                    icon={HandCoins}
                    colorClass="bg-amber-500 shadow-amber-500/30 shadow-lg"
                    delay={400}
                />
            </div>

            {/* Charts & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 gap-2">
                {/* Sales Chart */}
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-6 text-[var(--color-foreground)]">Sales vs Expenses</h2>
                        {isLoading ? (
                            <Loader />
                        ) : !salesData || salesData.length === 0 ? (
                            <div className="flex items-center justify-center h-[300px] text-[var(--color-muted-foreground)]">
                                No sales data available
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--color-surface)',
                                            borderColor: 'var(--color-border)',
                                            color: 'var(--color-foreground)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemStyle={{ color: 'var(--color-foreground)' }}
                                    />
                                    <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    <Bar dataKey="expenses" fill="var(--color-muted-foreground)" radius={[4, 4, 0, 0]} maxBarSize={50} opacity={0.5} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Low Stock Alerts */}
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircleWarning className="text-amber-500" size={20} />
                            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Low Stock Alerts</h2>
                        </div>

                        {isLoading ?
                            <Loader />
                            :
                            <div className="space-y-3">
                                {lowStock?.length === 0 ? (
                                    <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center gap-3 text-center">
                                        <div className="bg-emerald-500/20 p-3 rounded-full">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <div>
                                            <p className="font-semibold">All items fully stocked!</p>
                                            <p className="text-sm opacity-80">Your inventory is in perfect shape</p>
                                        </div>
                                    </div>
                                ) : (
                                    lowStock?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-red-500/50 transition-colors"
                                        >
                                            <span className="font-medium text-[var(--color-foreground)]">{item.item || "Unknown Item"}</span>
                                            <span className="text-sm font-semibold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-md">
                                                {item.qty || "0"} left
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
