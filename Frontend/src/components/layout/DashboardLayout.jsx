import { useState } from 'react'
import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import Sidebar from '../parts/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 overflow-hidden font-sans">
            {/* Navbar is sticky inside its own container or we just place it top */}
            <div className="flex-shrink-0 z-50">
                <Navbar toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`
                        absolute inset-y-0 left-0 z-50 md:static md:translate-x-0 transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        h-full
                    `}
                >
                    <Sidebar toggleSidebar={toggleSidebar} />
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth">
                    <div className="container mx-auto p-1 md:p-2 lg:p-4 max-w-7xl animate-fade-in">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout
