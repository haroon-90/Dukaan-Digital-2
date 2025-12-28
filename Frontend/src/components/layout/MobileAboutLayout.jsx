import About from "../../pages/about/AboutUs.jsx"
import Footer from "../parts/Footer.jsx"

export default function MobileAboutLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300 overflow-hidden font-sans">
            <About />
            <Footer />
        </div>
    )
}