import React from "react";

const MODE_LABEL = { online: "Online", "in-person": "In-Person", both: "Online & In-Person" };
const fmtMoney = (n) =>
  (n || 0).toLocaleString("en-CA", { style: "currency", currency: "CAD" });

export default function ServicesList({ services }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="font-heading text-lg font-bold text-foreground">Service Catalog</h3>
        <p className="text-sm text-muted-foreground font-body">Services available for enrollment and payment.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-[0.65rem] uppercase tracking-wider text-muted-foreground font-body font-semibold">
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Instructor</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground font-body">
                    No services configured.
                  </td>
                </tr>
              )}
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-body font-medium text-foreground">{s.name}</p>
                    {s.description && <p className="font-body text-xs text-muted-foreground mt-0.5 max-w-xs">{s.description}</p>}
                  </td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{s.category}</td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{MODE_LABEL[s.mode] || "—"}</td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{s.instructor || "—"}</td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                    {s.price === 0 ? "Custom" : fmtMoney(s.price)}
                    {s.durationMinutes > 0 && <span className="text-xs text-muted-foreground font-body"> /{s.durationMinutes}m</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-body font-semibold px-2.5 py-1 rounded-full border ${s.isActive ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-muted-foreground bg-muted border-border"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}