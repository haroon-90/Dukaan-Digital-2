import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import Sidebar from '../parts/Sidebar'
import BottomNavbar from '../parts/BottomNavbar'
import { Outlet } from 'react-router-dom'
import { useLoading } from "../../components/Context/LoadingContext";
import { CalculatorProvider, useCalculator } from '../Context/CalculatorContext';
import Calculator from '../Calculator/Calculator';
import Shortcuts from './shortcuts';

const DashboardLayoutContent = () => {
    const { isLoading } = useLoading();
    const { isCalculatorOpen, closeCalculator } = useCalculator();

    return (
        <div className="flex flex-col h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 overflow-hidden font-sans">
            <Shortcuts />
            <Calculator isOpen={isCalculatorOpen} onClose={closeCalculator} />

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

const DashboardLayout = () => {
    return (
        <CalculatorProvider>
            <DashboardLayoutContent />
        </CalculatorProvider>
    );
};

export default DashboardLayout
