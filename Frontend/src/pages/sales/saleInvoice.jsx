import dukaanLogo from "../../assets/Dukaan_Digital.svg";
import { QRCodeSVG } from 'qrcode.react';
import { Trash2, Printer, X, Download, Share2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { useRef } from "react";

const SaleInvoice = ({ selected, handleClose, type, handleDelete }) => {
    const isDemo = JSON.parse(localStorage.getItem("user"))?.isdemo;
    if (!selected) return null;
    const invoiceRef = useRef();
    console.log(selected);

    const isPublic = window.location.pathname.includes("invoice");
    const total = type === "sale" ? selected.items.reduce((acc, item) => acc + item.price * item.quantity, 0) : selected.total;

    const baseUrl = window.location.origin;
    const qrCodeUrl = `${baseUrl}/invoice/${type}/${selected?._id}`;

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle:
            (selected?.customerName || selected?.supplierName) +
            "_Invoice_" +
            new Date(selected?.createdAt).toLocaleDateString(),
        styleMedia: "print",
    });

    const downloadReceipt = async () => {
        if (!invoiceRef.current) {
            toast.error("Invoice not found")
            return
        }
        try {
            const receipt = await toPng(invoiceRef.current, {
                quality: 1,
                pixelRatio: 2,
            })
            const link = document.createElement("a")
            link.download =
                (selected?.customerName
                    ? selected.customerName
                    : selected?.supplierName) +
                "_" +
                new Date(selected?.createdAt).toLocaleDateString() +
                "_" + (type === "sale" ? "sale" : "purchase") + "_invoice.png";
            link.href = receipt
            link.click()
        } catch (err) {
            console.error(err)
            toast.error("Failed to download invoice")
        }
    };

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${isPublic ? "max-h-[calc(100vh-2rem)]" : "max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-2rem)]"} overflow-auto relative bg-white w-full max-w-4xl rounded-xl shadow-2xl`}>
                <div ref={invoiceRef} className="invoice-a4 relative z-10 p-2 bg-white">
                    <img
                        src={dukaanLogo}
                        alt="Dukaan Digital"
                        className="absolute inset-0 m-auto w-64 opacity-[0.04] pointer-events-none select-none"
                    />
                    <div className="relative z-10 flex justify-between items-center px-8 py-6 border-b">
                        <div>
                            <h2 className="text-2xl font-bold tracking-wide text-gray-900">
                                {selected.shopname || JSON.parse(localStorage.getItem("user"))?.shopname}
                            </h2>
                            <p className="text-sm text-gray-900">{type === "sale" ? "Sales Invoice" : "Purchase Invoice"}</p>
                        </div>
                        <div className="text-right flex gap-2">
                            <div>
                                <p className="text-sm text-gray-900 font-medium">Invoice Date</p>
                                <p className="text-gray-600">
                                    {new Date(selected?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <QRCodeSVG
                                value={qrCodeUrl}
                                size={70}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"L"}
                            />
                        </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-6 px-8 py-5 border-b">
                        <div>
                            <p className="text-xs uppercase text-gray-900 mb-1">
                                {type === "sale" ? "Billed To" : "Supplier"}
                            </p>
                            <p className="font-semibold text-gray-900">
                                {type === "sale" ? selected.customerName : selected.suppliername || "Walk-in"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs uppercase text-gray-900 mb-1">Invoice ID</p>
                            <p className="font-semibold text-gray-900">
                                #{selected._id.slice(-6).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 px-8 py-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left text-sm text-gray-900">
                                    <th className="py-2">Item</th>
                                    <th className="py-2 text-right">Qty</th>
                                    <th className="py-2 text-right">Rate</th>
                                    <th className="py-2 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selected.items.map((it) => (
                                    <tr key={it._id} className="border-b text-gray-800 last:border-none">
                                        <td className="py-2 font-medium">{it.itemname || it.productName}</td>
                                        <td className="py-2 text-right">{it.quantity}</td>
                                        <td className="py-2 text-right">
                                            Rs {type === "sale" ? it.price.toLocaleString() : it.purchasePrice.toLocaleString()}
                                        </td>
                                        <td className="py-2 text-right font-semibold">
                                            Rs {(type === "sale"
                                                ? it.price * it.quantity
                                                : it.purchasePrice * it.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="relative z-10 flex flex-col items-end gap-4 px-8 py-6 border-t">

                        {type === "sale" && selected.discount && (
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Sub Total
                                </p>
                                <p className="text-xl font-semibold text-gray-800">
                                    Rs {total.toLocaleString()}
                                </p>
                            </div>
                        )}

                        {type === "sale" && selected.discount && (
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Discount
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {(selected.discount ?? 0).toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 1,
                                    })} %
                                </p>
                            </div>
                        )}

                        <div className="text-right pt-2 border-t border-dashed border-gray-300 w-full">
                            <p className="text-sm font-medium text-gray-600">
                                Grand Total
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                Rs{" "}
                                {type === "sale"
                                    ? selected.totalAmount.toLocaleString()
                                    : selected.total.toLocaleString()}
                            </p>
                        </div>

                    </div>

                    <div className="relative z-10 text-center text-xs text-gray-500 py-4 border-t">
                        This is a system generated invoice by Dukaan Digital
                    </div>
                </div>

                <div className="flex justify-center gap-3 px-6 py-4 min-w-[210mm] border-t bg-gray-50">
                    <button
                        onClick={handlePrint}
                        className="px-5 py-2 flex items-center gap-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition"
                    >
                        <Printer size={16} title="Print" /> Print
                    </button>
                    <button
                        onClick={downloadReceipt}
                        className="px-5 py-2 flex items-center gap-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                    >
                        <Download size={16} title="Download" /> Download
                    </button>
                    <button
                        disabled={isDemo}
                        onClick={() => { navigator.clipboard.writeText(qrCodeUrl); toast.success("Invoice link copied to clipboard") }}
                        className="px-5 py-2 flex items-center gap-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition"
                    >
                        <Share2 size={16} title="Share" /> Share
                    </button>
                    <div className={`flex gap-2 ${isPublic ? "hidden" : ""}`}>
                        <button
                            onClick={handleDelete}
                            disabled={isDemo}
                            className="px-5 py-2 flex items-center gap-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                        >
                            <Trash2 size={16} title="Delete" /> Delete
                        </button>
                        <button
                            onClick={handleClose}
                            className="px-5 py-2 flex items-center gap-2 rounded-lg text-gray-600 bg-gray-300 hover:bg-gray-500 hover:text-white transition"
                        >
                            <X size={16} title="Close" /> Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleInvoice;