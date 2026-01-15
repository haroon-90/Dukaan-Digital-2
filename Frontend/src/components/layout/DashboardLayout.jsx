import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import Sidebar from '../parts/Sidebar'
import BottomNavbar from '../parts/BottomNavbar'
import { Outlet } from 'react-router-dom'
import { useLoading } from "../../components/Context/LoadingContext";
import Shortcuts from './shortcuts';

const DashboardLayout = () => {
    const { isLoading } = useLoading();

    return (
        <div className="flex flex-col h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 overflow-hidden font-sans">
            <Shortcuts />
            <div className="flex-shrink-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                <div>
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-20 md:pb-0">
                    <div className={`container mx-auto p-1 py-2 pb-24 md:p-2 lg:p-4 max-w-7xl animate-fade-in ${isLoading && 'opacity-70'}`}>
                        <Outlet />
                    </div>
                    <div className='hidden md:block'>
                        <Footer />
                    </div>
                    <BottomNavbar />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout
