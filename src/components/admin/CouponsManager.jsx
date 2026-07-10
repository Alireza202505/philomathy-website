import React, { useState } from "react";
import { Plus, Loader2, Ticket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const TYPES = [
  { value: "percentage", label: "Percentage Discount" },
  { value: "fixed", label: "Fixed Amount Discount" },
  { value: "free_registration", label: "Free Registration" },
  { value: "free_trial", label: "Free Trial" },
];

export default function CouponsManager({ coupons, onCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code: "", discountType: "percentage", value: "", expirationDate: "",
    maxUses: "", minPurchase: "", description: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.code || !form.value) return;
    setSaving(true);
    try {
      const res = await base44.functions.invoke("adminCreateCoupon", form);
      if (res.data && res.data.coupon) {
        toast.success(`Coupon ${form.code.toUpperCase()} created.`);
        onCreated && onCreated();
        setForm({
          code: "", discountType: "percentage", value: "", expirationDate: "",
          maxUses: "", minPurchase: "", description: "",
        });
        setShowForm(false);
      } else if (res.data && res.data.error) {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Could not create coupon.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">Promo Codes</h3>
          <p className="text-sm text-muted-foreground font-body">Create and track discount coupons.</p>
        </div>
        <Button
          onClick={() => setShowForm((s) => !s)}
          className="bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-9"
        >
          <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "New Coupon"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="font-body text-sm">Code *</Label>
            <Input value={form.code} onChange={(e) => update("code", e.target.value.toUpperCase())} placeholder="EARLYBIRD" className="mt-1.5 font-mono uppercase" required />
          </div>
          <div>
            <Label className="font-body text-sm">Discount Type *</Label>
            <Select value={form.discountType} onValueChange={(v) => update("discountType", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-body text-sm">Value * {form.discountType === "percentage" ? "(%)" : "($)"}</Label>
            <Input type="number" min="0" value={form.value} onChange={(e) => update("value", e.target.value)} placeholder="15" className="mt-1.5" required />
          </div>
          <div>
            <Label className="font-body text-sm">Expiration Date</Label>
            <Input type="date" value={form.expirationDate} onChange={(e) => update("expirationDate", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label className="font-body text-sm">Max Uses</Label>
            <Input type="number" min="0" value={form.maxUses} onChange={(e) => update("maxUses", e.target.value)} placeholder="100" className="mt-1.5" />
          </div>
          <div>
            <Label className="font-body text-sm">Min Purchase ($)</Label>
            <Input type="number" min="0" value={form.minPurchase} onChange={(e) => update("minPurchase", e.target.value)} placeholder="0" className="mt-1.5" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <Label className="font-body text-sm">Description</Label>
            <Input value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Early bird seasonal discount" className="mt-1.5" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <Button type="submit" disabled={saving} className="bg-[#071A2E] text-white hover:bg-[#0d2a47] font-body font-semibold rounded-full h-10">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Create Coupon
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.length === 0 && (
          <p className="text-sm text-muted-foreground font-body col-span-full">No coupons yet.</p>
        )}
        {coupons.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-base font-bold text-[#071A2E] tracking-wide">{c.code}</span>
              <Ticket className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <p className="font-body text-sm font-medium text-foreground">
              {c.discountType === "percentage" ? `${c.value}% off` : c.discountType === "fixed" ? `$${c.value} off` : c.discountType.replace("_", " ")}
            </p>
            {c.description && <p className="text-xs text-muted-foreground font-body mt-1">{c.description}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground font-body">
              {c.expirationDate && <span>Expires {new Date(c.expirationDate).toLocaleDateString("en-CA")}</span>}
              {c.maxUses && <span>Used {c.uses || 0}/{c.maxUses}</span>}
              {c.minPurchase ? <span>Min ${c.minPurchase}</span> : null}
              <span className={c.isActive ? "text-emerald-600" : "text-muted-foreground"}>{c.isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}