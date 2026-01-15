import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import Sidebar from '../parts/Sidebar'
import BottomNavbar from '../parts/BottomNavbar'
import { Outlet } from 'react-router-dom'
import Shortcuts from './shortcuts';

const DemoLayout = () => {
    localStorage.setItem("user", JSON.stringify({
        name: "Demo Name",
        email: "demoemail@demo.com",
        shopname: "Demo Shop",
        role: "Manager",
        id: "123",
        address: "Demo address",
        phone: "1234567890",
        createdAt: "2024-01-01T00:00:00.000Z",
        isdemo: true
    }))
    localStorage.setItem("token", "demo")

    return (
        <div className="flex flex-col h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 overflow-hidden font-sans">
            <Shortcuts />
            <div className="flex-shrink-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                <div className={`hidden md:block absolute inset-y-0 left-0 z-50 md:static md:translate-x-0 transform transition-transform duration-300 ease-in-out h-full`}>
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-20 md:pb-0">
                    <div className="container mx-auto p-1 py-2 pb-24 md:p-2 lg:p-4 max-w-7xl animate-fade-in">
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

export default DemoLayout
