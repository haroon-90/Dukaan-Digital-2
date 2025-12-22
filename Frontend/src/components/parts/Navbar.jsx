import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const role = user?.role;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-[var(--glass-border)] transition-transform duration-300">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className={`p-2 rounded-lg text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors focus:outline-none md:hidden ${role === 'admin' ? 'hidden' : 'block'}`}
                        >
                            <Menu size={24} />
                        </button>

                        <div
                            onClick={() => window.location.reload()}
                            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
                        >
                            <img
                                className="h-10 w-auto transition-all duration-300 invert-logo"
                                src={Dukaan_Digital}
                                alt="Dukaan Digital"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="h-6 w-px bg-[var(--color-border)] mx-1"></div>

                        <div className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-[var(--color-muted)]/50 transition-all duration-200">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-[var(--color-foreground)] leading-tight">
                                    {user?.name || 'User'}
                                </span>
                                <span className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                                    {role}
                                </span>
                            </div>
                            <div
                                onClick={role === 'admin' ? () => navigate('/profile') : () => navigate('/adminprofile')}
                                className="cursor-pointer h-9 w-9 rounded-full bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm shadow-sm hover:scale-105 transition-transform">
                                {(user?.name?.[0] || 'U').toUpperCase()}
                            </div>
                        </div>

                        <button
                            onClick={() => { sessionStorage.clear(); navigate('/login') }}
                            title="Logout"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-foreground)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-red-500 transition-all shadow-sm"
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;