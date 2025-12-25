import Dukaan_Digital from '../../assets/Dukaan_Digital.svg'

const ReportReceipt = ({ report, period }) => {
    if (!report) {
        return null;
    }

    // Helper function to format numbers with commas
    const formatNumber = (num) => num?.toLocaleString() || '0';

    // Define the sections of the report to display
    const mainFinancials = [
        // { key: "totalPurchase", label: "Total Purchase", color: "text-green-700" },
        { key: "totalSale", label: "Total Sales", color: "text-[var(--color-primary)] dark:text-emerald-400" },
        { key: "totalProfit", label: "Total Profit", color: "text-emerald-600 dark:text-emerald-400" },
    ];

    const otherMetrics = [
        { key: "totalExpense", label: "Total Expenses", color: "text-red-500" },
        { key: "totalUdhaar", label: "Total Pending Credit", color: "text-orange-500" },
        { key: "totalPaidUdhaar", label: "Total Paid Credit", color: "text-emerald-500" },
        { key: "totalQuantitySold", label: "Total Quantity Sold", color: "text-[var(--color-primary)]" },
        { key: "numberOfSales", label: "Number of Sales", color: "text-[var(--color-foreground)]" },
        { key: "numberOfPurchase", label: "Number of Purchases", color: "text-[var(--color-foreground)]" },
        { key: "numberOfExpenses", label: "Number of Expenses", color: "text-[var(--color-foreground)]" },
        { key: "numberOfUdhaar", label: "Number of Credits", color: "text-[var(--color-foreground)]" },
    ];

    return (
        <div className="flex justify-center my-10 animate-scale-in">
            <div className="w-full max-w-sm font-mono bg-[var(--color-background)] text-[var(--color-foreground)] border-y-2 border-dashed border-[var(--color-border)] shadow-lg p-6 print:shadow-none print:w-auto dark:bg-[var(--color-surface)] rounded-sm">

                <div className="text-center flex flex-col justify-center pb-4 border-b border-dashed border-[var(--color-border)] mb-4 print:border-solid">
                    <img className='h-15 mb-4 mx-auto invert-logo' src={Dukaan_Digital} alt="Dukaan_Digital" />
                    <div className="border-t border-dashed border-[var(--color-border)] py-2 print:border-solid"></div>
                    <h4 className="text-[var(--color-foreground)] mx-auto mb-2 font-bold">{JSON.parse(sessionStorage.getItem("user"))?.shopname}</h4>
                    <div className="border-t border-dashed border-[var(--color-border)] py-2 print:border-solid"></div>
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)]">{period.length == 7 ? "Monthly" : "Daily"} Report</h2>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                        {period}
                    </p>
                </div>

                <div className="flex justify-between items-baseline py-1">
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Total Purchase:</span>
                    <span className={`text-lg font-semibold text-emerald-600 dark:text-emerald-400`}>
                        Rs. {formatNumber(report.totalPurchase)}
                    </span>
                </div>

                <div className="border-t border-dashed border-[var(--color-border)] py-2 print:border-solid"></div>

                <div className="mb-4">
                    {mainFinancials.map(item => (
                        <div key={item.key} className="flex justify-between items-baseline py-1">
                            <span className="text-sm font-medium text-[var(--color-foreground)]">{item.label}:</span>
                            <span className={`text-lg font-semibold ${item.color}`}>
                                Rs. {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-[var(--color-border)] py-2 print:border-solid"></div>

                <div className="mb-4 text-sm text-[var(--color-muted-foreground)]">
                    <h3 className="font-semibold text-[var(--color-foreground)] mb-2">Other Details</h3>
                    {otherMetrics.map(item => (
                        <div key={item.key} className={`flex justify-between py-1 ${item.color}`}>
                            <span className="text-xs font-normal">{item.label}:</span>
                            <span className="text-sm font-medium">
                                {formatNumber(report[item.key])}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-[var(--color-border)] py-2 print:border-solid"></div>

                <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-[var(--color-foreground)]">Net Amount:&nbsp;</span>
                    <span className={`text-2xl font-extrabold ${report.netAmount < 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                        Rs. {formatNumber(report.netAmount)}
                    </span>
                </div>

                <div className="text-center text-xs urdu-font leading-8 text-[var(--color-foreground)] mt-6 pt-4 border-t border-dashed border-[var(--color-border)] print:border-solid">
                    {period.length == 7 ? " اس مہینے " : " آج "}
                    <span className="underline text-[var(--color-primary)] mx-1">{report.totalSale}</span>
                    کی فروخت ہوئی،
                    <span className="underline text-orange-500 mx-1">{report.totalExpense}</span>
                    خرچ ہوا اور
                    {report.totalProfit >= 0 ? (
                        <span className="underline text-emerald-600 dark:text-emerald-400 mx-1">
                            {report.totalProfit}
                        </span>
                    ) : (
                        <span className="underline text-red-500 mx-1">
                            {Math.abs(report.totalProfit)}
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

                <div className='flex flex-col items-start justify-center mt-4 pt-2 border-y border-dashed border-[var(--color-border)] print:border-solid'>
                    <h4 className="text-[var(--color-muted-foreground)] text-sm mb-2">Contact: {JSON.parse(sessionStorage.getItem("user"))?.phone}</h4>
                    <h4 className="text-[var(--color-muted-foreground)] text-sm mb-2">Address: {JSON.parse(sessionStorage.getItem("user"))?.address}</h4>
                </div>
                <div className="text-center text-xs text-[var(--color-muted-foreground)] mt-6">
                    Generated at : {new Date().toLocaleDateString()}
                </div>
                <div className="text-center text-xs text-[var(--color-muted-foreground)] pt-4">
                    Thank you!
                </div>
            </div>
        </div>
    );
};

export default ReportReceipt;