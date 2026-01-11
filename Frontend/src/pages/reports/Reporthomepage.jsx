import { useState, useRef } from "react";
// Added getPreviousReports and getPreviousOneReport to imports
import { getReport, getPreviousReports, getPreviousOneReport } from "../../services/reportServices.js";
import ReportReceipt from "./ReportReceipt.jsx";
import toast from "react-hot-toast";
import { BarChart3, Download, FileText, Loader2, Calendar, CalendarDays, History, ChevronRight } from "lucide-react";
import { toPng } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';

const Reporthomepage = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(currentMonth);
  const [selectedType, setSelectedType] = useState("date");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // --- New State for Previous Reports ---
  const [previousReports, setPreviousReports] = useState([]);
  const [loadingPrevList, setLoadingPrevList] = useState(false);
  const [showPrevSection, setShowPrevSection] = useState(false);

  const receiptRef = useRef(null);

  const downloadReceipt = async () => {
    if (!receiptRef.current) {
      toast.error("Receipt not found")
      return
    }
    try {
      const receipt = await toPng(receiptRef.current, {
        quality: 1,
        pixelRatio: 2,
      })
      const link = document.createElement("a")
      link.download = selectedType === "date" ? date : month + "_report.png"
      link.href = receipt
      link.click()
    } catch (err) {
      console.error(err)
      toast.error("Failed to download receipt")
    }
  };

  const downloadReceiptpdf = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: selectedType === "date" ? date : month + "_report.pdf",
    onAfterPrint: () => toast.success("Receipt downloaded successfully"),
    onPrintError: () => toast.error("Failed to download receipt"),
  });

  const handleSubmit = async () => {
    setLoading(true);
    setReport(null);

    try {
      let body = {};
      if (selectedType === "date") {
        body = { date };
      } else {
        body = { month };
      }
      const res = await getReport(body);
      if (res && res.data) {
        setReport(res.data);
        toast.success("Report generated")
      } else {
        toast.error("Failed to generate report")
      }
    } catch (err) {
      console.error(err);
      if (err.status == 404) {
        toast.error("No record found")
      } else {
        toast.error("Failed to generate report")
      }
    }
    setLoading(false);
  };

  // --- New Functions for Previous Reports ---
  const fetchPreviousList = async () => {
    setLoadingPrevList(true);
    setShowPrevSection(true);
    try {
      const res = await getPreviousReports({ limit: 5 });
      if (res && res.data) {
        setPreviousReports(res.data);
      }
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setLoadingPrevList(false);
    }
  };

  const fetchSingleOldReport = async (reportId) => {
    setLoading(true); // Reuse main loader
    setReport(null);
    try {
      const res = await getPreviousOneReport(reportId);
      if (res && res.data) {
        setReport(res.data);
        // Scroll to the report receipt
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } catch (err) {
      toast.error("Failed to fetch report details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center p-6 transition-colors duration-300">
      <div className="glass-panel w-full max-w-lg overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl animate-fade-in-up">
        <div className="md:w-1/3 bg-[var(--color-primary)] rounded-b-3xl md:rounded-bl-3xl md:rounded-tr-none md:rounded-l-3xl flex items-center justify-center p-8">
          <BarChart3 className="h-24 w-24 text-[var(--color-primary-foreground)]" />
        </div>

        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-2 text-center md:text-left">
            Generate Report
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-sm mb-6 text-center md:text-left">
            Select a date or month to view detailed financial reports.
          </p>

          <div className="flex justify-center gap-4 mb-6 bg-[var(--color-surface)] p-1 rounded-full border border-[var(--color-border)]">
            <button
              onClick={() => { setSelectedType("date"); setReport(null) }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${selectedType === "date"
                ? "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                }`}
            >
              <Calendar size={16} /> Date
            </button>
            <button
              onClick={() => { setSelectedType("month"); setReport(null) }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${selectedType === "month"
                ? "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                }`}
            >
              <CalendarDays size={16} /> Month
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              {selectedType === "date" ? "Select Date" : "Select Month"}
            </label>
            {selectedType === "date" ? (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] outline-none"
              />
            ) : (
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] outline-none"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              "Get Report"
            )}
          </button>
        </div>
      </div>

      {/* --- Previous Reports Section --- */}
      <div className="w-full max-w-lg mt-6">
        {!showPrevSection ? (
          <button
            onClick={fetchPreviousList}
            className="w-full flex items-center justify-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors py-4 font-medium"
          >
            <History size={18} /> View Previous Reports
          </button>
        ) : (
          <div className="glass-panel p-6 rounded-3xl animate-fade-in-up max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--color-foreground)] flex items-center gap-2">
                <History size={20} className="text-[var(--color-primary)]" /> Recent Reports
              </h3>
              <button
                onClick={() => setShowPrevSection(false)}
                className="text-xs text-[var(--color-muted-foreground)] hover:underline"
              >
                Hide
              </button>
            </div>

            {loadingPrevList ? (
              <div className="flex flex-col items-center py-8">
                <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
                <p className="text-sm mt-2 text-[var(--color-muted-foreground)]">Fetching records...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {previousReports.length > 0 ? (
                  previousReports.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => fetchSingleOldReport(item._id)}
                      className="group flex items-center justify-between p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-background)] transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <CalendarDays size={20} className="text-[var(--color-primary)]" />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--color-foreground)]">
                            {item.type == 'daily' ? item.period.slice(0, 10) : item.period.slice(0, 7)}
                          </span>
                          <span className="text-xs text-[var(--color-muted-foreground)] capitalize">
                            {item.type || 'Report'}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[var(--color-muted-foreground)] py-4 text-sm">No previous reports found.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {report && (
        <div className="flex flex-col items-center pt-8 gap-4 w-full max-w-lg animate-fade-in-up">
          <div ref={receiptRef}>
            <ReportReceipt
              report={report}
            />
          </div>

          <div className="flex gap-4 w-full mb-10">
            <button
              onClick={downloadReceipt}
              className="flex-1 bg-[var(--color-surface)] hover:bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)] font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <Download size={18} /> PNG
            </button>
            <button
              onClick={downloadReceiptpdf}
              className="flex-1 bg-[var(--color-surface)] hover:bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)] font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText size={18} /> PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reporthomepage;