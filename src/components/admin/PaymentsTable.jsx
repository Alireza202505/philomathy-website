import React, { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const STATUS_STYLES = {
  paid: "text-emerald-700 bg-emerald-50 border-emerald-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  refunded: "text-blue-700 bg-blue-50 border-blue-200",
  failed: "text-red-700 bg-red-50 border-red-200",
  canceled: "text-muted-foreground bg-muted border-border",
};

const fmtMoney = (n) =>
  (n || 0).toLocaleString("en-CA", { style: "currency", currency: "CAD" });

export default function PaymentsTable({ enrollments }) {
  const [q, setQ] = useState("");
  const [provider, setProvider] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return enrollments
      .filter((e) => {
        const matchQ =
          !q ||
          [e.studentName, e.studentEmail, e.serviceName, e.instructor, e.invoiceNumber, e.transactionId]
            .some((v) => (v || "").toLowerCase().includes(q.toLowerCase()));
        const matchP = provider === "all" || e.provider === provider;
        const matchS = status === "all" || e.status === status;
        return matchQ && matchP && matchS;
      })
      .sort((a, b) => (b.paidDate || b.created_date || "").localeCompare(a.paidDate || a.created_date || ""));
  }, [enrollments, q, provider, status]);

  const exportCSV = () => {
    const headers = [
      "Invoice", "Student", "Email", "Service", "Tutor", "Mode",
      "Provider", "Method", "Subtotal", "Discount", "Tax", "Total",
      "Status", "Transaction ID", "Paid Date",
    ];
    const lines = rows.map((r) => [
      r.invoiceNumber, r.studentName, r.studentEmail, r.serviceName, r.instructor, r.mode,
      r.provider, r.paymentMethod, r.subtotal, r.discount, r.tax, r.total,
      r.status, r.transactionId, r.paidDate,
    ]);
    const csv = [headers, ...lines]
      .map((cols) => cols.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "philomathy-payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search student, service, tutor, invoice…"
            className="pl-9"
          />
        </div>
        <Select value={provider} onValueChange={setProvider}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Provider" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={exportCSV}
          className="font-body rounded-full h-9 shrink-0"
        >
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-[0.65rem] uppercase tracking-wider text-muted-foreground font-body font-semibold">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground font-body">
                    No payments match your filters.
                  </td>
                </tr>
              )}
              {rows.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.invoiceNumber || "—"}</td>
                  <td className="px-4 py-3">
                    <p className="font-body font-medium text-foreground">{e.studentName}</p>
                    <p className="font-body text-xs text-muted-foreground">{e.studentEmail}</p>
                  </td>
                  <td className="px-4 py-3 font-body text-foreground">{e.serviceName}</td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{e.instructor || "—"}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                    {e.paidDate ? new Date(e.paidDate).toLocaleDateString("en-CA") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="font-body text-xs font-semibold px-2 py-1 rounded-md"
                      style={{
                        color: e.provider === "stripe" ? "#635BFF" : "#0070BA",
                        background: e.provider === "stripe" ? "rgba(99,91,255,0.1)" : "rgba(0,112,186,0.1)",
                      }}
                    >
                      {e.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-foreground">{fmtMoney(e.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-body font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[e.status] || ""}`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-body mt-3">
        {rows.length} payment{rows.length === 1 ? "" : "s"} shown.
      </p>
    </div>
  );
}