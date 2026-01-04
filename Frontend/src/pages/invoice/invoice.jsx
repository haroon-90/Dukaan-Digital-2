import SaleInvoice from "../sales/saleInvoice";
import { getsinglesale } from "../../services/saleService";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Invoice = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const type = "sale";
    const invoiceRef = useRef(null);

    const fetchsaleInvoice = async () => {
        const response = await getsinglesale(id);
        console.log(response.data);
        setSelected(response.data);
    };

    useEffect(() => {
        fetchsaleInvoice();
    }, []);

    return (
        <SaleInvoice
            selected={selected}
            type={type}
            invoiceRef={invoiceRef}
        />
    );
};

export default Invoice;
