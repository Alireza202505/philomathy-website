import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AcademicBackground from "@/components/shared/AcademicBackground";

const NAVY = "#071A2E";
const GOLD = "#D4AF37";
const TEAL = "#0B4F57";

const TABS = [
  { id: "tvm", label: "Time Value of Money" },
  { id: "loan", label: "Loan Amortization" },
  { id: "compound", label: "Compound Interest" },
  { id: "npv", label: "NPV / IRR" },
  { id: "simple", label: "Simple Interest" },
];

function KeypadButton({ children, onClick, variant = "default" }) {
  const styles = {
    default: `bg-white text-[${NAVY}] hover:bg-[${NAVY}] hover:text-white border border-border`,
    gold: `bg-[${GOLD}] text-[${NAVY}] hover:bg-[#e0bc45] border border-[#e0bc45]`,
    teal: `bg-[${TEAL}] text-white hover:bg-[#0d6166] border border-[${TEAL}]`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-lg font-mono font-semibold text-sm transition-all duration-150 active:scale-95 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

function ResultRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2.5 px-4 ${highlight ? "bg-[#D4AF37]/8" : ""}`}>
      <span className="font-body text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono font-bold text-sm ${highlight ? "text-[#D4AF37]" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

function FormulaBox({ formula, show }) {
  if (!show) return null;
  return (
    <div className="mt-4 bg-[#071A2E]/5 border border-[#071A2E]/10 rounded-xl p-4">
      <p className="text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-body font-semibold mb-2">Formula Used</p>
      <p className="font-mono text-xs text-foreground leading-relaxed">{formula}</p>
    </div>
  );
}

// ── TVM ──
function TVMCalculator() {
  const [N, setN] = useState("");
  const [I, setI] = useState("");
  const [PV, setPV] = useState("");
  const [PMT, setPMT] = useState("");
  const [FV, setFV] = useState("");
  const [solveFor, setSolveFor] = useState("FV");
  const [beginEnd, setBeginEnd] = useState("end");
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState(null);
  const [formula, setFormula] = useState("");

  const compute = () => {
    const n = parseFloat(N) || 0;
    const i = (parseFloat(I) || 0) / 100;
    const pv = parseFloat(PV) || 0;
    const pmt = parseFloat(PMT) || 0;
    const fv = parseFloat(FV) || 0;
    const b = beginEnd === "begin" ? 1 : 0;
    const annFactor = i === 0 ? n : ((1 - Math.pow(1 + i, -n)) / i) * Math.pow(1 + i, b);
    const compoundFactor = Math.pow(1 + i, n);

    let val = 0;
    let f = "";

    if (solveFor === "FV") {
      val = -pv * compoundFactor - pmt * (i === 0 ? n : annFactor / (Math.pow(1 + i, b)));
      f = "FV = -PV×(1+i)ⁿ - PMT×[((1-(1+i)⁻ⁿ)/i]×(1+i)ᵇ";
    } else if (solveFor === "PV") {
      val = -fv / compoundFactor - pmt * annFactor;
      f = "PV = -FV/(1+i)ⁿ - PMT×[(1-(1+i)⁻ⁿ)/i]×(1+i)ᵇ";
    } else if (solveFor === "PMT") {
      val = i === 0 ? -(fv + pv) / n : -(fv / compoundFactor + pv) / annFactor;
      f = "PMT = -(FV/(1+i)ⁿ + PV) / [((1-(1+i)⁻ⁿ)/i)×(1+i)ᵇ]";
    } else if (solveFor === "N") {
      if (i <= 0) { val = NaN; f = "Requires i > 0"; }
      else {
        val = Math.log((-fv - pmt * (1 + i) / i) / (pv - pmt * (1 + i) / i * Math.pow(1 + i, b))) / Math.log(1 + i);
        f = "N = ln[(FV + PMT(1+i)/i) / (PV - PMT(1+i)ᵇ/i)] / ln(1+i)";
      }
    } else if (solveFor === "I") {
      // Newton's method
      let guess = 0.1;
      for (let iter = 0; iter < 100; iter++) {
        const cf = Math.pow(1 + guess, n);
        const af = ((1 - Math.pow(1 + guess, -n)) / guess) * Math.pow(1 + guess, b);
        const f_val = -pv * cf - pmt * af - fv;
        const df_val = -pv * n * Math.pow(1 + guess, n - 1) - pmt * (n * Math.pow(1 + guess, -n - 1 + b) / guess - af / guess * b);
        if (Math.abs(df_val) < 1e-12) break;
        const newGuess = guess - f_val / df_val;
        if (Math.abs(newGuess - guess) < 1e-10) { guess = newGuess; break; }
        guess = newGuess;
      }
      val = guess * 100;
      f = "Solved iteratively (Newton's method)";
    }
    setResult(val);
    setFormula(f);
  };

  const reset = () => { setN(""); setI(""); setPV(""); setPMT(""); setFV(""); setResult(null); setFormula(""); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Label className="font-body text-sm mb-3 block">Solve For</Label>
        <Select value={solveFor} onValueChange={setSolveFor}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="N">N (Number of periods)</SelectItem>
            <SelectItem value="I">I% (Interest rate per period)</SelectItem>
            <SelectItem value="PV">PV (Present Value)</SelectItem>
            <SelectItem value="PMT">PMT (Payment)</SelectItem>
            <SelectItem value="FV">FV (Future Value)</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div><Label className="font-body text-sm">N (periods)</Label><Input type="number" value={N} onChange={e => setN(e.target.value)} disabled={solveFor === "N"} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">I% (per period)</Label><Input type="number" value={I} onChange={e => setI(e.target.value)} disabled={solveFor === "I"} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">PV</Label><Input type="number" value={PV} onChange={e => setPV(e.target.value)} disabled={solveFor === "PV"} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">PMT</Label><Input type="number" value={PMT} onChange={e => setPMT(e.target.value)} disabled={solveFor === "PMT"} className="mt-1.5 font-mono" /></div>
          <div className="col-span-2"><Label className="font-body text-sm">FV</Label><Input type="number" value={FV} onChange={e => setFV(e.target.value)} disabled={solveFor === "FV"} className="mt-1.5 font-mono" /></div>
        </div>

        <div className="mt-5">
          <Label className="font-body text-sm mb-2 block">Payment Timing</Label>
          <RadioGroup value={beginEnd} onValueChange={setBeginEnd} className="flex gap-5">
            <div className="flex items-center gap-2"><RadioGroupItem value="end" id="tvm-end" /><Label htmlFor="tvm-end" className="font-body text-sm cursor-pointer">End of period</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="begin" id="tvm-begin" /><Label htmlFor="tvm-begin" className="font-body text-sm cursor-pointer">Beginning of period</Label></div>
          </RadioGroup>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-body font-semibold text-sm text-foreground">Result</span>
        </div>
        <div className="divide-y divide-border">
          {result !== null && (
            <ResultRow label={`${solveFor} =`} value={isNaN(result) ? "Cannot solve" : (solveFor === "I" ? `${result.toFixed(4)}%` : result.toFixed(2))} highlight />
          )}
          {result === null && <div className="px-4 py-8 text-center text-sm text-muted-foreground font-body">Enter values and press Calculate.</div>}
        </div>
        <FormulaBox formula={formula} show={showSteps && result !== null} />
      </div>
    </div>
  );
}

// ── Loan Amortization ──
function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState(null);

  const compute = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;
    if (P <= 0 || n <= 0) return;

    const monthly = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;

    const schedule = [];
    let balance = P;
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = monthly - interest;
      balance -= principalPaid;
      if (i <= 360) schedule.push({ period: i, payment: monthly, interest, principal: principalPaid, balance: Math.max(0, balance) });
    }

    setResult({ monthly, totalPaid, totalInterest, schedule, P, r, n });
  };

  const reset = () => { setPrincipal(""); setRate(""); setYears(""); setResult(null); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="space-y-4">
          <div><Label className="font-body text-sm">Loan Principal ($)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Annual Interest Rate (%)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Loan Term (years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="mt-1.5 font-mono" /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-body font-semibold text-sm text-foreground">Result</span>
        </div>
        {result ? (
          <div>
            <div className="divide-y divide-border">
              <ResultRow label="Monthly Payment" value={`$${result.monthly.toFixed(2)}`} highlight />
              <ResultRow label="Total Paid" value={`$${result.totalPaid.toFixed(2)}`} />
              <ResultRow label="Total Interest" value={`$${result.totalInterest.toFixed(2)}`} />
            </div>
            <FormulaBox formula={`PMT = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)  where r = ${(result.r * 100).toFixed(4)}%/mo, n = ${result.n} months`} show={showSteps} />
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground font-body">Enter loan details and press Calculate.</div>
        )}
      </div>

      {result && (
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="font-body font-semibold text-sm text-foreground">Amortization Schedule</span>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm font-body">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">#</th>
                  <th className="text-right px-4 py-2 font-semibold text-muted-foreground">Payment</th>
                  <th className="text-right px-4 py-2 font-semibold text-muted-foreground">Interest</th>
                  <th className="text-right px-4 py-2 font-semibold text-muted-foreground">Principal</th>
                  <th className="text-right px-4 py-2 font-semibold text-muted-foreground">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.period} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-2 font-mono text-foreground">{row.period}</td>
                    <td className="px-4 py-2 font-mono text-right text-foreground">${row.payment.toFixed(2)}</td>
                    <td className="px-4 py-2 font-mono text-right text-muted-foreground">${row.interest.toFixed(2)}</td>
                    <td className="px-4 py-2 font-mono text-right text-foreground">${row.principal.toFixed(2)}</td>
                    <td className="px-4 py-2 font-mono text-right text-foreground">${row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Compound Interest ──
function CompoundCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [freq, setFreq] = useState("12");
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState(null);

  const FREQ_OPTIONS = [
    { value: "1", label: "Annually" },
    { value: "2", label: "Semi-annually" },
    { value: "4", label: "Quarterly" },
    { value: "12", label: "Monthly" },
    { value: "365", label: "Daily" },
  ];

  const compute = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseInt(freq);
    const amount = P * Math.pow(1 + r / n, n * t);
    const interest = amount - P;
    setResult({ amount, interest, P, r, t, n });
  };

  const reset = () => { setPrincipal(""); setRate(""); setYears(""); setResult(null); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="space-y-4">
          <div><Label className="font-body text-sm">Principal ($)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Annual Rate (%)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Time (years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div>
            <Label className="font-body text-sm">Compounding Frequency</Label>
            <Select value={freq} onValueChange={setFreq}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FREQ_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-body font-semibold text-sm text-foreground">Result</span>
        </div>
        {result ? (
          <div>
            <div className="divide-y divide-border">
              <ResultRow label="Final Amount" value={`$${result.amount.toFixed(2)}`} highlight />
              <ResultRow label="Interest Earned" value={`$${result.interest.toFixed(2)}`} />
            </div>
            <FormulaBox formula={`A = P(1 + r/n)^(n×t)  where P=${result.P}, r=${(result.r * 100).toFixed(2)}%, n=${result.n}, t=${result.t}`} show={showSteps} />
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground font-body">Enter values and press Calculate.</div>
        )}
      </div>
    </div>
  );
}

// ── NPV / IRR ──
function NPVCalculator() {
  const [rate, setRate] = useState("");
  const [flows, setFlows] = useState(["", ""]);
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState(null);

  const compute = () => {
    const r = (parseFloat(rate) || 0) / 100;
    const cashFlows = flows.map(f => parseFloat(f) || 0);
    let npv = cashFlows[0];
    for (let t = 1; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + r, t);
    }

    // IRR via Newton's method
    let irr = 0.1;
    for (let iter = 0; iter < 100; iter++) {
      let f_val = 0, df_val = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        f_val += cashFlows[t] / Math.pow(1 + irr, t);
        if (t > 0) df_val += -t * cashFlows[t] / Math.pow(1 + irr, t + 1);
      }
      if (Math.abs(df_val) < 1e-12) break;
      const newIrr = irr - f_val / df_val;
      if (Math.abs(newIrr - irr) < 1e-10) { irr = newIrr; break; }
      irr = newIrr;
    }

    setResult({ npv, irr: irr * 100, r });
  };

  const reset = () => { setRate(""); setFlows(["", ""]); setResult(null); };

  const updateFlow = (idx, val) => {
    const next = [...flows];
    next[idx] = val;
    setFlows(next);
  };
  const addFlow = () => setFlows([...flows, ""]);
  const removeFlow = (idx) => setFlows(flows.filter((_, i) => i !== idx));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="mb-4">
          <Label className="font-body text-sm">Discount Rate (%)</Label>
          <Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="mt-1.5 font-mono" />
        </div>
        <Label className="font-body text-sm mb-2 block">Cash Flows (Period 0 = initial investment)</Label>
        <div className="space-y-2">
          {flows.map((flow, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground w-8 shrink-0">t={idx}</span>
              <Input type="number" value={flow} onChange={e => updateFlow(idx, e.target.value)} className="font-mono" />
              {flows.length > 2 && (
                <button onClick={() => removeFlow(idx)} className="text-muted-foreground hover:text-destructive px-2" aria-label="Remove row">
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button onClick={addFlow} variant="outline" className="mt-3 font-body text-sm rounded-full h-9">+ Add Cash Flow</Button>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-body font-semibold text-sm text-foreground">Result</span>
        </div>
        {result ? (
          <div>
            <div className="divide-y divide-border">
              <ResultRow label="NPV" value={`$${result.npv.toFixed(2)}`} highlight />
              <ResultRow label="IRR" value={`${result.irr.toFixed(2)}%`} />
            </div>
            <FormulaBox formula={`NPV = Σ CFₜ / (1+r)ᵗ  |  IRR: NPV = 0, solve for r`} show={showSteps} />
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground font-body">Enter cash flows and press Calculate.</div>
        )}
      </div>
    </div>
  );
}

// ── Simple Interest ──
function SimpleCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [showSteps, setShowSteps] = useState(true);
  const [result, setResult] = useState(null);

  const compute = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const interest = P * r * t;
    const total = P + interest;
    setResult({ interest, total, P, r, t });
  };

  const reset = () => { setPrincipal(""); setRate(""); setTime(""); setResult(null); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="space-y-4">
          <div><Label className="font-body text-sm">Principal ($)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Annual Rate (%)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="mt-1.5 font-mono" /></div>
          <div><Label className="font-body text-sm">Time (years)</Label><Input type="number" value={time} onChange={e => setTime(e.target.value)} className="mt-1.5 font-mono" /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-body font-semibold text-sm text-foreground">Result</span>
        </div>
        {result ? (
          <div>
            <div className="divide-y divide-border">
              <ResultRow label="Interest" value={`$${result.interest.toFixed(2)}`} highlight />
              <ResultRow label="Total Amount" value={`$${result.total.toFixed(2)}`} />
            </div>
            <FormulaBox formula={`I = P × r × t  where P=${result.P}, r=${(result.r * 100).toFixed(2)}%, t=${result.t}`} show={showSteps} />
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground font-body">Enter values and press Calculate.</div>
        )}
      </div>
    </div>
  );
}

export default function FinancialCalculator() {
  const [tab, setTab] = useState("tvm");

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative bg-[#071A2E] pt-32 md:pt-36 pb-16 px-5 sm:px-8 overflow-hidden">
        <AcademicBackground variant="dark" density={10} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">Interactive Tool</p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Financial Calculator</h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Time value of money, loan amortization, compound interest, NPV/IRR, and simple interest — with live results and step-by-step formulas.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                tab === t.id
                  ? "bg-[#071A2E] text-white"
                  : "bg-muted text-muted-foreground hover:bg-[#071A2E]/10 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {tab === "tvm" && <TVMCalculator />}
          {tab === "loan" && <LoanCalculator />}
          {tab === "compound" && <CompoundCalculator />}
          {tab === "npv" && <NPVCalculator />}
          {tab === "simple" && <SimpleCalculator />}
        </motion.div>
      </div>
    </div>
  );
}