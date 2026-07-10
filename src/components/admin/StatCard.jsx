import React from "react";

export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col">
      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground font-body font-semibold">
        {label}
      </p>
      <p
        className="font-heading text-2xl md:text-[1.7rem] font-bold mt-2 leading-none"
        style={{ color: accent || "hsl(var(--foreground))" }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground font-body mt-2">{sub}</p>}
    </div>
  );
}