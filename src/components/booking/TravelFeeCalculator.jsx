import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Car, Clock } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function TravelFeeCalculator({ onResult }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (!address.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("calculateTravelFee", { address: address.trim() });
      setResult(res.data);
      if (onResult) onResult({ address: address.trim(), ...res.data });
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "";
      setError(msg || "Unable to calculate travel fee. It will be confirmed manually after booking.");
      if (onResult) onResult({ address: address.trim(), travelFee: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="student-address" className="font-body text-sm">
          Your Address <span aria-hidden="true" className="text-red-400">*</span>
        </Label>
        <Input
          id="student-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 1234 Granville St, Vancouver, BC V6Z 1M4"
          className="mt-1.5"
          autoComplete="street-address"
        />
      </div>
      <Button
        type="button"
        onClick={calculate}
        disabled={loading || !address.trim()}
        variant="outline"
        className="font-body rounded-full h-10"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Calculating…
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4 mr-2" />
            Calculate Travel Fee
          </>
        )}
      </Button>

      {result && (
        <div className="bg-muted rounded-xl p-4 space-y-2 text-sm font-body">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> Distance (one-way)
            </span>
            <span className="font-medium text-foreground">{result.distanceKm} km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Travel time (one-way)
            </span>
            <span className="font-medium text-foreground">{result.durationMinutes} min</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Estimated travel fee</span>
            <span className="font-heading font-bold text-lg text-[#071A2E]">
              +${result.travelFee}
            </span>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive font-body">{error}</p>
      )}
    </div>
  );
}