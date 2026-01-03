import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <img className="h-8 w-auto invert-logo" src={Dukaan_Digital} alt="Dukaan_Digital" />
                        <p className="text-sm text-[var(--color-muted-foreground)]">Your Digital Business Solution</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-[var(--color-foreground)]">
                        <Link to="/aboutus" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] hidden md:flex transition-colors duration-200 items-center gap-1">
                            About Us
                        </Link>
                        <Link to="/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1">
                            Privacy Policy
                        </Link>
                        <Link to="/termsandconditions" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1">
                            Terms & Conditions
                        </Link>
                        <Link to="/contactus" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1">
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                    <p>&copy; {new Date().getFullYear()} Dukaan Digital. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-500 fill-red-500" /> by <span onClick={() => window.open('https://github.com/haroon-90', '_blank')} className="font-bold text-[var(--color-primary)] cursor-pointer underline"> Haroon</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer