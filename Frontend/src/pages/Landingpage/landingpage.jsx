import { LineChart, Book, Boxes } from 'lucide-react';
import LOGO from "../../assets/Dukaan_Digital.svg";
import dashboard from "../../assets/dashboard.png";
import Footer from '../../components/parts/Footer';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    localStorage.setItem('theme', 'light');
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <img src={LOGO} alt="Dukaan Digital" className="h-10 w-auto" />
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/aboutus" className="hover:text-blue-600 transition">Features</Link>
                    <Link to="/aboutus" className="hover:text-blue-600 transition">Mission</Link>
                    <Link to="/aboutus" className="hover:text-blue-600 transition">About Us</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">Log in</button>
                    <button onClick={() => navigate('/contactus')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95">
                        Get Started
                    </button>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-16 pb-24 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                                #1 Digital Shop Manager
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 leading-[1.1]">
                                Transform your shop into a <b>Digital Business</b>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                                Manage your <b>sales</b>, track <b>inventory</b>, and handle <b>Credit</b> records with the simplest shop management platform designed for local businesses.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-2xl shadow-blue-300 active:scale-95">
                                    Start Your Free Trial
                                </button>
                                <a href="#overview" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition active:scale-95">
                                    Watch Overview
                                </a>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div id="overview" className="relative mx-auto max-w-5xl">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2rem] blur-2xl opacity-20"></div>
                            <div className="relative bg-white rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-200 overflow-hidden">
                                <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <img
                                    src={dashboard}
                                    alt="Dukaan Digital Dashboard"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Background Accents */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full opacity-40 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px]"></div>
                    </div>
                </section>

                {/* Quick Features Section */}
                <section id="features" className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Everything you need to grow</h2>
                            <p className="text-slate-600">Simple tools designed to solve complex business problems.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition">
                                    <Book size={20} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Digital Udhaar Book</h3>
                                <p className="text-slate-600 leading-relaxed">Replace your manual registers. Track customer credit and send automatic SMS reminders for payments.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition">
                                    <Boxes size={20} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Inventory Tracking</h3>
                                <p className="text-slate-600 leading-relaxed">Get real-time updates on your stock levels. Know exactly what’s selling and what needs to be restocked.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition group">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition">
                                    <LineChart size={20} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Daily Sales Reports</h3>
                                <p className="text-slate-600 leading-relaxed">View your daily, weekly, and monthly profits at a glance with beautiful, easy-to-read charts.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust/Stats Section */}
                <section className="py-20 bg-slate-900 text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            <div>
                                <div className="text-5xl font-black text-blue-400 mb-2">10k+</div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-bold">Active Shops</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-blue-400 mb-2">100%</div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-bold">Secure Data</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-blue-400 mb-2">24/7</div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-bold">Urdu Support</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-blue-400 mb-2">Free</div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-bold">Setup Cost</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className=" bg-white border-t border-slate-200">
                <Footer />
            </footer>
        </div>
    );
};

export default LandingPage;