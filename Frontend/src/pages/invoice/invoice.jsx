import SaleInvoice from "../sales/saleInvoice";
import { getsinglesale } from "../../services/saleService";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const type = "sale";
    const invoiceRef = useRef(null);

    const fetchsaleInvoice = async () => {
        setLoading(true);
        try {
            const response = await getsinglesale(id);
            if (response.status === 200 && response.data) {
                setSelected(response.data);
            } else {
                setSelected(null);
            }
        } catch (error) {
            setSelected(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchsaleInvoice();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
    }

    if (selected) {
        return (
            <SaleInvoice
                selected={selected}
                type={type}
                invoiceRef={invoiceRef}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
            <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full border border-gray-50 transform transition-all">
                <div className="bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Invoice Not Found</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                    The requested invoice could not be located. It may have been moved or permanently deleted from our records.
                </p>
            </div>
        </div>
    );
};

export default Invoice;
