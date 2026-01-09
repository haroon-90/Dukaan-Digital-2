import { LayoutDashboard, Package, ShoppingCart, User, HandCoins } from "lucide-react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const navItems = [
    { icon: Package, label: "Products", path: "/products" },
    { icon: ShoppingCart, label: "Sales", path: "/sales" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/manager", center: true },
    { icon: HandCoins, label: "Credit", path: "/udhaar" },
    { icon: User, label: "Profile", path: "/profile" },
]

export default function BottomNavbar() {
    return (
        <div className="fixed md:hidden bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
            <div
                className="flex items-end justify-between rounded-t-2xl px-4 pt-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] backdrop-blur-xl"
            >
                {navItems.map((item) => (
                    <NavLink key={item.label} to={item.path} end>
                        {({ isActive }) => (
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                animate={{
                                    y: isActive && item.center ? -1 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                className="relative flex flex-col items-center gap-1"
                            >
                                <div
                                    className={`flex items-center justify-center transition-all
                                    ${item.center ? "w-14 h-14 rounded-2xl" : "w-11 h-11 rounded-full"}
                                    ${isActive
                                            ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg"
                                            : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                                        }
                                    `}
                                >
                                    <item.icon size={item.center ? 32 : 22} />
                                </div>

                                <span
                                    className={`text-[11px] font-medium transition-colors
                                    ${isActive
                                            ? "text-[var(--color-primary)] font-bold"
                                            : "text-[var(--color-muted-foreground)]"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
