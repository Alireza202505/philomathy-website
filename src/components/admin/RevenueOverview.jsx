import React, { useMemo } from "react";
import { isToday, isThisMonth, isThisYear, parseISO, isAfter, subDays } from "date-fns";
import StatCard from "./StatCard";

export default function RevenueOverview({ enrollments }) {
  const stats = useMemo(() => {
    const paid = enrollments.filter((e) => e.status === "paid");
    const refunded = enrollments.filter((e) => e.status === "refunded");

    const byDate = (arr, fn) =>
      arr.filter((e) => e.paidDate && fn(parseISO(e.paidDate)));
    const sum = (arr) => arr.reduce((s, e) => s + (e.total || 0), 0);

    const todayPaid = byDate(paid, isToday);
    const monthPaid = byDate(paid, isThisMonth);
    const yearPaid = byDate(paid, isThisYear);
    const todayRef = byDate(refunded, isToday);
    const monthRef = byDate(refunded, isThisMonth);
    const yearRef = byDate(refunded, isThisYear);

    const stripeRev =
      sum(paid.filter((e) => e.provider === "stripe")) -
      sum(refunded.filter((e) => e.provider === "stripe"));
    const paypalRev =
      sum(paid.filter((e) => e.provider === "paypal")) -
      sum(refunded.filter((e) => e.provider === "paypal"));

    const cutoff = subDays(new Date(), 30);
    const recentEmails = new Set(
      paid
        .filter((e) => e.paidDate && isAfter(parseISO(e.paidDate), cutoff))
        .map((e) => e.studentEmail)
        .filter(Boolean)
    );

    return {
      today: sum(todayPaid) - sum(todayRef),
      month: sum(monthPaid) - sum(monthRef),
      year: sum(yearPaid) - sum(yearRef),
      pending: enrollments.filter((e) => e.status === "pending").length,
      completed: paid.length,
      refunds: refunded.length,
      refundedTotal: sum(refunded),
      stripe: stripeRev,
      paypal: paypalRev,
      newStudents: recentEmails.size,
    };
  }, [enrollments]);

  const fmt = (n) =>
    (n || 0).toLocaleString("en-CA", { style: "currency", currency: "CAD" });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <StatCard label="Today's Revenue" value={fmt(stats.today)} accent="#D4AF37" />
      <StatCard label="Monthly Revenue" value={fmt(stats.month)} accent="#071A2E" />
      <StatCard label="Annual Revenue" value={fmt(stats.year)} accent="#071A2E" />
      <StatCard label="New Students (30d)" value={stats.newStudents} accent="#0B8F9F" />
      <StatCard label="Pending Payments" value={stats.pending} sub="awaiting confirmation" />
      <StatCard label="Completed Payments" value={stats.completed} accent="#059669" />
      <StatCard label="Refunds" value={stats.refunds} sub={`${fmt(stats.refundedTotal)} refunded`} />
      <StatCard label="Stripe Revenue" value={fmt(stats.stripe)} accent="#635BFF" />
      <StatCard label="PayPal Revenue" value={fmt(stats.paypal)} accent="#0070BA" />
    </div>
  );
}