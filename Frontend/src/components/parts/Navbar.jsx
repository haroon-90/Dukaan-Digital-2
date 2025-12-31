import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const role = user?.role;
    const shopName = user?.shopname;

    return (
        <nav className="sticky top-0 z-50 border-b border-[var(--glass-border)] shadow-[var(--glass-shadow)] transition-transform duration-300">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => window.location.reload()}
                            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
                        >
                            <img
                                className="h-8 md:h-10 w-auto transition-all duration-300 invert-logo"
                                src={Dukaan_Digital}
                                alt="Dukaan Digital"
                            />
                        </div>
                        {/* separator */}
                        <div className='flex h-6 w-px bg-[var(--glass-border)]'></div>
                        <div className="flex flex-col leading-tight">
                            {role === 'admin' ? (
                                <span className="text-[13px] font-bold text-[var(--color-foreground)] max-w-[140px]">
                                    Admin Panel
                                </span>
                            ) : (
                                <span className="text-[13px] font-bold text-[var(--color-foreground)] max-w-[140px]">
                                    {shopName || "Shop Name"}
                                </span>
                            )}
                            <span className="text-[11px] text-[var(--color-muted-foreground)]">
                                {role === 'admin' ? "Platform Management" : "Smart Business Panel"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            onClick={toggleTheme}
                            className="flex p-2 rounded-full bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="hidden md:flex h-6 w-px bg-[var(--color-border)] mx-1"></div>

                        <div className="hidden md:flex items-center gap-3 px-2 py-1 rounded-full hover:bg-[var(--color-muted)]/50 transition-all duration-200">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-[var(--color-foreground)] leading-tight">
                                    {user?.name || 'User'}
                                </span>
                                <span className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                                    {role}
                                </span>
                            </div>
                            <div
                                onClick={role === 'admin' ? () => navigate('/adminprofile') : () => navigate('/profile')}
                                className="cursor-pointer h-9 w-9 rounded-full bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm shadow-sm hover:scale-105 transition-transform">
                                {(user?.name?.[0] || 'U').toUpperCase()}
                            </div>
                        </div>

                        {/* <button
                            onClick={() => { sessionStorage.clear(); navigate('/login') }}
                            title="Logout"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-foreground)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-red-500 transition-all shadow-sm"
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">Logout</span>
                        </button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;