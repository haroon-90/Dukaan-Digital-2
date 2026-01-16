import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const shortcuts = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
    //             e.preventDefault();
    //             navigate('/sales/new');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
    //             e.preventDefault();
    //             navigate('/products');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 'd' || e.key === 'D')) {
    //             e.preventDefault();
    //             navigate('/manager');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
    //             e.preventDefault();
    //             navigate('/expenses');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
    //             e.preventDefault();
    //             navigate('/udhaar');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
    //             e.preventDefault();
    //             navigate('/reports');
    //         }
    //     };
    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => document.removeEventListener('keydown', handleKeyDown);
    // }, []);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                navigate('/sales/new');
            }
            if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                navigate('/products');
            }
            if (e.ctrlKey && (e.key === 'd' || e.key === 'D')) {
                e.preventDefault();
                navigate('/manager');
            }
            if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                navigate('/expenses');
            }
            if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
                navigate('/udhaar');
            }
            if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
                e.preventDefault();
                navigate('/reports');
            }
            if (e.ctrlKey && (e.key === 'b' || e.key === 'B')) {
                e.preventDefault();
                navigate('/purchase');
            }
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                navigate('/profile');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
}

export default shortcuts;
