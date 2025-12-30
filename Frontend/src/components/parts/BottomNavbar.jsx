import { Home, Package, ShoppingCart, TrendingUp, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNavbar = () => {
    const navItems = [
        { icon: <Package size={22} />, label: 'Products', path: '/products' },
        { icon: <TrendingUp size={22} />, label: 'Sales', path: '/sales' },
        { icon: <Home size={26} />, label: 'Dashboard', path: '/manager', isCenter: true },
        { icon: <ShoppingCart size={22} />, label: 'Purchase', path: '/purchase' },
        { icon: <User size={22} />, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-2 pb-safe md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <nav className="flex items-end justify-between max-w-lg mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        end={item.path === '/manager'} // Only match exact for Dashboard home
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16
                            ${item.isCenter ? '-mt-8' : ''}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`
                                    flex items-center justify-center rounded-2xl transition-all duration-300
                                    ${item.isCenter
                                        ? `h-14 w-14 shadow-lg ${isActive ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]' : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted-foreground)]'}`
                                        : `h-10 w-10 ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)]'}`
                                    }
                                `}>
                                    {item.icon}
                                </div>
                                <span className={`
                                    text-[10px] font-medium transition-colors duration-300
                                    ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)]'}
                                    ${item.isCenter && isActive ? 'font-bold' : ''}
                                `}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default BottomNavbar;
