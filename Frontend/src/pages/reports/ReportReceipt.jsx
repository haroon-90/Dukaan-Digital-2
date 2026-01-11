import Dukaan_Digital from '../../assets/Dukaan_Digital.svg'

const ReportReceipt = ({ report }) => {
    if (!report) {
        return null;
    }

    // Helper function to format numbers with commas
    const formatNumber = (num) => num?.toLocaleString() || '0';

    // Define the sections of the report to display
    const mainFinancials = [
        // { key: "totalPurchase", label: "Total Purchase", color: "text-green-700" },
        { key: "totalSale", label: "Total Sales", color: "text-blue-700" },
        { key: "totalProfit", label: "Total Profit", color: "text-emerald-600" },
    ];

    const otherMetrics = [
        { key: "totalExpense", label: "Total Expenses", color: "text-red-500" },
        { key: "totalUdhaar", label: "Total Pending Credit", color: "text-orange-500" },
        { key: "totalPaidUdhaar", label: "Total Paid Credit", color: "text-emerald-500" },
        { key: "totalQuantitySold", label: "Total Quantity Sold", color: "text-black" },
        { key: "numberOfSales", label: "Number of Sales", color: "text-black" },
        { key: "numberOfPurchase", label: "Number of Purchases", color: "text-black" },
        { key: "numberOfExpenses", label: "Number of Expenses", color: "text-black" },
        { key: "numberOfUdhaar", label: "Number of Credits", color: "text-black" },
    ];

    return (
        <div className="flex justify-center animate-scale-in">
            <div className="w-full max-w-sm font-mono bg-white text-black border-y-2 border-dashed border-black shadow-lg p-6 print:shadow-none print:w-auto rounded-sm">

                <div className="text-center flex flex-col justify-center pb-4 border-b border-dashed border-black mb-4 print:border-solid">
                    <img className='h-15 mb-4 mx-auto' src={Dukaan_Digital} alt="Dukaan_Digital" />
                    <div className="border-t border-dashed border-black py-2 print:border-solid"></div>
                    <h4 className="text-black mx-auto mb-2 font-bold">{JSON.parse(localStorage.getItem("user"))?.shopname}</h4>
                    <div className="border-t border-dashed border-black py-2 print:border-solid"></div>
                    <h2 className="text-2xl font-bold text-black">{report?.type == "daily" ? "Daily" : "Monthly"} Report</h2>
                    <p className="text-xs text-black mt-1">
                        {report?.period
                            ? (report.type === "daily" ? report.period.slice(0, 10) : report.period.slice(0, 7))
                            : (report.type === "daily" ? new Date().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 7))
                        }
                    </p>
                </div>

                <div className="flex justify-between items-baseline py-1">
                    <span className="text-sm font-medium text-black">Total Purchase:</span>
                    <span className={`text-lg font-semibold text-emerald-600`}>
                        Rs. {formatNumber(report.totalPurchase)}
                    </span>
                </div>

                <div className="border-t border-dashed border-black py-2 print:border-solid"></div>

                <div className="mb-4">
                    {mainFinancials.map(item => (
                        <div key={item.key} className="flex justify-between items-baseline py-1">
                            <span className="text-sm font-medium text-black">{item.label}:</span>
                            <span className={`text-lg font-semibold ${item.color}`}>
                                Rs. {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-black py-2 print:border-solid"></div>

                <div className="mb-4 text-sm text-black">
                    <h3 className="font-semibold text-black mb-2">Other Details</h3>
                    {otherMetrics.map(item => (
                        <div key={item.key} className={`flex justify-between py-1 ${item.color}`}>
                            <span className="text-xs font-normal">{item.label}:</span>
                            <span className="text-sm font-medium">
                                {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-black py-2 print:border-solid"></div>

                <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-black">Net Amount:&nbsp;</span>
                    <span className={`text-2xl font-extrabold ${report.netAmount < 0 ? "text-red-500" : "text-emerald-600"}`}>
                        Rs. {formatNumber(report.netAmount)}
                    </span>
                </div>

                <div className="text-center text-xs urdu-font leading-8 text-black mt-6 pt-4 border-t border-dashed border-black print:border-solid">
                    {report.type == "daily" ? " اس دن " : " اس مہینے "}
                    <span className="underline text-blue-700 mx-1">{report.totalSale.toLocaleString()}</span>
                    کی فروخت ہوئی،
                    <span className="underline text-orange-500 mx-1">{report.totalExpense.toLocaleString()}</span>
                    خرچ ہوا اور
                    {report.totalProfit >= 0 ? (
                        <span className="underline text-emerald-600 mx-1">
                            {report.totalProfit.toLocaleString()}
                        </span>
                    ) : (
                        <span className="underline text-red-500 mx-1">
                            {Math.abs(report.totalProfit).toLocaleString()}
                        </span>
                    )}
                    {report.totalProfit >= 0 ? (
                        <span>
                            منافع
                        </span>
                    ) : (
                        <span >
                            نقصان
                        </span>
                    )}
                    {report.totalProfit >= 0 ? " بچا۔" : " ہوا۔"}
                </div>

                <div className='flex flex-col items-start justify-center mt-4 pt-2 border-y border-dashed border-black print:border-solid'>
                    <h4 className="text-black text-sm mb-2">Contact: {JSON.parse(localStorage.getItem("user"))?.phone}</h4>
                    <h4 className="text-black text-sm mb-2">Address: {JSON.parse(localStorage.getItem("user"))?.address}</h4>
                </div>
                <div className="text-center text-xs text-black mt-6">
                    Generated at : {report.updatedAt ? new Date(report.updatedAt).toLocaleDateString() + " " + new Date(report.updatedAt).toLocaleTimeString() : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}
                </div>
                <div className="text-center text-xs text-black pt-4">
                    Powered by <span className="text-blue-700">Dukaan Digital</span>
                </div>
            </div>
        </div>
    );
};

export default ReportReceipt;