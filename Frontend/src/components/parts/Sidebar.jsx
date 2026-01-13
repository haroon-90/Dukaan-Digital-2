import { useNavigate, useLocation } from "react-router-dom";
import {
    User,
    Package,
    ShoppingCart,
    ReceiptText,
    HandCoins,
    LayoutDashboard,
    ShoppingBag,
    Banknote
} from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            label: "Dashboard",
            path: "/manager",
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: "Products",
            path: "/products",
            icon: <Package size={20} />,
        },
        {
            label: "Sales",
            path: "/sales",
            icon: <ShoppingCart size={20} />,
        },
        {
            label: "Purchase",
            path: "/purchase",
            icon: <ShoppingBag size={20} />,
        },
        {
            label: "Expenses",
            path: "/expenses",
            icon: <Banknote size={20} />,
        },
        {
            label: "Credits",
            path: "/udhaar",
            icon: <HandCoins size={20} />,
        },
        {
            label: "Reports",
            path: "/reports",
            icon: <ReceiptText size={20} />,
        },
    ];

    const isActive = (path) => {
        if (path == '/') {
            return location.pathname === path;
        }
        return location.pathname.includes(path);
    };

    return (
        <aside className="group md:w-20 md:hover:w-46 w-64 h-full border-r border-[var(--color-border)] flex flex-col p-4 transition-all duration-300 z-40">
            <nav className="flex-1 space-y-1">
                {menuItems.map((item, index) => {
                    const active = isActive(item.path);
                    return (
                        <div key={index}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`
                                    relative flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-200 outline-none
                                    ${active
                                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md"
                                        : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]"
                                    }
                                `}
                            >
                                <span className={`flex-shrink-0 ${active ? 'text-white' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className={`${active ? 'text-white' : ''} md:group-hover:opacity-100 md:opacity-0 opacity-100 whitespace-nowrap transition-opacity duration-200 font-medium`}>
                                    {item.label}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                <button
                    onClick={() => navigate("/profile")}
                    className={`
                            relative flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-200 outline-none
                            ${isActive("/profile")
                            ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md"
                            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]"
                        }
                    `}
                >
                    <User className={`flex-shrink-0 ${isActive("/profile") ? 'text-white' : ''}`} size={20} />
                    <span className="md:group-hover:opacity-100 md:opacity-0 opacity-100 whitespace-nowrap transition-opacity duration-200 font-medium">
                        Profile
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;