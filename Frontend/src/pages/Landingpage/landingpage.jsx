import { LineChart, Book, Boxes, Moon, Sun, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import LOGO from "../../assets/Dukaan_Digital.svg";
import dashboard from "../../assets/dashboard.png";
import Footer from '../../components/parts/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../components/Context/ThemeContext';
import grid from '../../assets/grid.svg'

const LandingPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary/20 selection:text-primary font-sans">
            {/* Navigation */}
            <nav className="fixed w-full z-50 border-b border-border bg-background/80 backdrop-blur-lg transition-colors duration-300">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src={LOGO} alt="Dukaan Digital" className="h-12 w-auto invert-logo transition-all duration-300" />
                    </div>

                    <div className="hidden md:flex items-center border border-border rounded-full">
                        {[
                            { name: 'Features', to: '#features' },
                            { name: 'Benefits', to: '#benefits' },
                            { name: 'About Us', to: '/aboutus' }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="px-4 py-2 text-sm hover:font-bold rounded-full hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-200 active:scale-95"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center border border-border rounded-full">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-200 active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button onClick={() => navigate('/contactus')} className="hidden md:flex bg-primary text-primary-foreground px-4 md:px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95">
                            Get Started
                        </button>
                        <button onClick={() => navigate('/login')} className="text-sm font-semibold text-primary-foreground md:text-muted-foreground hover:bg-primary bg-primary md:bg-transparent hover:text-primary-foreground px-6 py-2 rounded-full transition-colors">
                            Log in
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-6">
                {/* Hero Section */}
                <section className="relative pb-20 pt-10 overflow-hidden">

                    <div className="container mx-auto max-w-6xl text-center">
                        <div className="relative overflow-hidden">
                            {/* Background Grid */}
                            <div className="absolute inset-0 z-1">
                                <img
                                    src={grid}
                                    alt="grid_background"
                                    className="w-full h-full object-cover opacity-15"
                                />
                            </div>

                            {/* Content */}
                            <div className="px-2 relative z-10 flex flex-col items-center text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 mt-8 text-xs font-bold tracking-wide text-primary uppercase bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    #1 Shop Management Platform
                                </div>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-foreground">
                                    Smart choice for shopkeepers, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
                                        Dukaan Digital
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                                    The all-in-one solution for modern shopkeepers. Manage inventory, track credits, and visualize sales, all from one beautiful dashboard.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                                    <button
                                        onClick={() => navigate('/contactus')}
                                        className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl active:scale-95 flex items-center gap-2"
                                    >
                                        Start Free Trial <ArrowRight size={20} />
                                    </button>

                                    <button
                                        onClick={() => navigate('/demo')}
                                        className="w-full sm:w-auto bg-surface text-foreground border border-border px-8 py-4 rounded-xl font-bold text-lg hover:bg-muted transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        View Demo <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Mockup */}
                        <div className="relative mx-auto px-2 max-w-5xl perspective-1000 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative bg-surface rounded-xl shadow-2xl border border-border overflow-hidden ring-1 ring-white/10 dark:ring-white/5 transform transition-transform duration-500 hover:scale-[1.01]">
                                <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                    </div>
                                    <div className="ml-4 w-60 h-4 bg-muted rounded-full opacity-50"></div>
                                </div>
                                <img
                                    src={dashboard}
                                    alt="Dukaan Digital Dashboard"
                                    className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="py-10 border-y border-border bg-muted/30">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Empowering local businesses for a digital future</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xl font-black text-foreground">TechShop</span>
                            <span className="text-xl font-black text-foreground">MartExpress</span>
                            <span className="text-xl font-black text-foreground">LocalStore</span>
                            <span className="text-xl font-black text-foreground">FreshGoods</span>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-12 bg-background relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Built for speed, <br />designed for growth.</h2>
                            <p className="text-xl text-muted-foreground">Everything you need to run your business efficiently, without the clutter.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Book className="w-6 h-6" />,
                                    title: "Digital Udhaar Book",
                                    desc: "Replace manual registers. Effortlessly track customer credit, manage outstanding balances, and maintain a clear digital record of all transactions."
                                },
                                {
                                    icon: <Boxes className="w-6 h-6" />,
                                    title: "Smart Inventory",
                                    desc: "Real-time stock tracking. Know exactly when to restock with low-inventory alerts. Never run out of stock again."
                                },
                                {
                                    icon: <LineChart className="w-6 h-6" />,
                                    title: "Analytics & Insights",
                                    desc: "Visualize your growth. Daily profit reports, sales trends, and top-selling products at a glance."
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className="group p-8 rounded-3xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits / Split Sections */}
                <section id="benefits" className="py-6 bg-muted/20">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
                            <div className="flex-1 order-2 md:order-1">
                                <div className="inline-block p-3 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-6">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Secure & Reliable Data</h3>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    Your business data is precious. We use bank-grade encryption and automated cloud backups to ensure you never lose a single record. Access your data from any device, anywhere.
                                </p>
                                <ul className="space-y-4">
                                    {['End-to-end encryption', 'Secure cloud backups', 'Multi-device sync'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                                            <CheckCircle2 size={20} className="text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 order-1 md:order-2 w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-surface aspect-square max-w-md mx-auto md:max-w-none flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                                    <ShieldCheck size={120} className="text-primary/20 animate-pulse" />
                                    {/* Abstract representation */}
                                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-5 md:p-6 bg-background/90 backdrop-blur-md rounded-xl border border-border shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground">Backup Complete</div>
                                                <div className="text-xs text-muted-foreground">Just now</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1 w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-surface aspect-square max-w-md mx-auto md:max-w-none flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent"></div>
                                    <Zap size={120} className="text-amber-500/20 animate-pulse" />
                                    <div className="absolute top-6 left-6 right-6 md:top-10 md:left-10 md:right-10 p-5 md:p-6 bg-background/90 backdrop-blur-md rounded-xl border border-border shadow-lg">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Today's Sales</div>
                                                <div className="text-xl md:text-2xl font-black text-foreground">RS 25,500</div>
                                            </div>
                                            <div className="text-green-500 text-sm font-bold">+12%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="inline-block p-3 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mb-6">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Lightning Fast Operations</h3>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    Time is money. Our interface is designed for speed, allowing you to record sales and check inventory in seconds. No loading screens, no lag.
                                </p>
                                <button onClick={() => navigate('/aboutus')} className="text-primary font-bold hover:text-primary/80 flex items-center gap-2 group">
                                    Learn about our technology <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="bg-primary rounded-[2.5rem] p-10 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
                            {/* Decorative circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Ready to modernize your business?</h2>
                            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">
                                Join thousands of shopkeepers who have simplified their daily operations with Dukaan Digital.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                                <button onClick={() => navigate('/contactus')} className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-lg active:scale-95">
                                    Get Started for Free
                                </button>
                                <button onClick={() => navigate('/contactus')} className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition active:scale-95">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-surface border-t border-border">
                <Footer />
            </footer>
        </div>
    );
};

export default LandingPage;