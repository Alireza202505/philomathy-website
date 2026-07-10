import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sigma, RotateCcw, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AcademicBackground from "@/components/shared/AcademicBackground";

const TABS = [
  { id: "onevar", label: "1-Variable Stats" },
  { id: "twovar", label: "Regression" },
  { id: "distributions", label: "Distributions" },
];

function ResultRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2.5 px-4 ${highlight ? "bg-[#D4AF37]/8" : ""}`}>
      <span className="font-body text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: label }} />
      <span className={`font-mono font-bold text-sm ${highlight ? "text-[#D4AF37]" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

function StatsTable({ rows }) {
  return (
    <div className="bg-card border border-border rounded-2xl">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Sigma className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-body font-semibold text-sm text-foreground">Results</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r, i) => (
          <ResultRow key={i} label={r.label} value={r.value} highlight={r.highlight} />
        ))}
      </div>
    </div>
  );
}

// ── 1-Variable Stats ──
function OneVarStats() {
  const [data, setData] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(true);

  const compute = () => {
    const values = data.map(d => parseFloat(d)).filter(v => !isNaN(v));
    if (values.length === 0) return;
    const n = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...values].sort((a, b) => a - b);
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
    const freqMap = {};
    values.forEach(v => freqMap[v] = (freqMap[v] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freqMap));
    const modes = Object.keys(freqMap).filter(k => freqMap[k] === maxFreq).map(Number);
    const mode = maxFreq === 1 ? "None" : modes.join(", ");
    const min = sorted[0];
    const max = sorted[n - 1];
    const variancePop = values.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const stdPop = Math.sqrt(variancePop);
    const varianceSample = n > 1 ? values.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1) : 0;
    const stdSample = Math.sqrt(varianceSample);
    const q1 = sorted[Math.floor(n * 0.25)] || sorted[0];
    const q3 = sorted[Math.floor(n * 0.75)] || sorted[n - 1];
    const iqr = q3 - q1;
    setResult({ n, sum, mean, median, mode, min, max, variancePop, stdPop, varianceSample, stdSample, q1, q3, iqr });
  };

  const reset = () => { setData(["", "", "", "", ""]); setResult(null); };
  const updateCell = (idx, val) => { const next = [...data]; next[idx] = val; setData(next); };
  const addRow = () => setData([...data, ""]);
  const removeRow = (idx) => setData(data.filter((_, i) => i !== idx));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Label className="font-body text-sm mb-2 block">Data List (L1)</Label>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {data.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground w-6 shrink-0">{idx + 1}</span>
              <Input type="number" value={val} onChange={e => updateCell(idx, e.target.value)} className="font-mono" />
              {data.length > 1 && (
                <button onClick={() => removeRow(idx)} className="text-muted-foreground hover:text-destructive px-1" aria-label="Remove row">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button onClick={addRow} variant="outline" className="mt-3 font-body text-sm rounded-full h-9"><Plus className="w-4 h-4 mr-1" />Add Row</Button>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div>
        {result ? (
          <>
            <StatsTable rows={[
              { label: "n (count)", value: result.n },
              { label: "Σx (sum)", value: result.sum.toFixed(4) },
              { label: "x̄ (mean)", value: result.mean.toFixed(4), highlight: true },
              { label: "Median", value: result.median.toFixed(4) },
              { label: "Mode", value: typeof result.mode === "string" ? result.mode : result.mode },
              { label: "min", value: result.min.toFixed(4) },
              { label: "max", value: result.max.toFixed(4) },
              { label: "Q1", value: result.q1.toFixed(4) },
              { label: "Q3", value: result.q3.toFixed(4) },
              { label: "IQR", value: result.iqr.toFixed(4) },
              { label: "σ (pop. std dev)", value: result.stdPop.toFixed(4) },
              { label: "σ² (pop. variance)", value: result.variancePop.toFixed(4) },
              { label: "s (sample std dev)", value: result.stdSample.toFixed(4), highlight: true },
              { label: "s² (sample variance)", value: result.varianceSample.toFixed(4) },
            ]} />
            {showSteps && (
              <div className="mt-4 bg-[#071A2E]/5 border border-[#071A2E]/10 rounded-xl p-4">
                <p className="text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-body font-semibold mb-2">Formulas</p>
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  x̄ = Σx / n = {result.sum.toFixed(4)} / {result.n}<br />
                  σ = √[Σ(xᵢ - x̄)² / n]<br />
                  s = √[Σ(xᵢ - x̄)² / (n-1)]
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl px-4 py-12 text-center text-sm text-muted-foreground font-body">
            Enter data values and press Calculate.
          </div>
        )}
      </div>
    </div>
  );
}

// ── 2-Variable / Regression ──
function TwoVarStats() {
  const [pairs, setPairs] = useState([{ x: "", y: "" }, { x: "", y: "" }, { x: "", y: "" }]);
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(true);

  const compute = () => {
    const valid = pairs.filter(p => p.x !== "" && p.y !== "").map(p => ({ x: parseFloat(p.x), y: parseFloat(p.y) }));
    if (valid.length < 2) return;
    const n = valid.length;
    const sumX = valid.reduce((a, b) => a + b.x, 0);
    const sumY = valid.reduce((a, b) => a + b.y, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;
    const sumXY = valid.reduce((a, b) => a + b.x * b.y, 0);
    const sumX2 = valid.reduce((a, b) => a + b.x ** 2, 0);
    const sumY2 = valid.reduce((a, b) => a + b.y ** 2, 0);
    const ssXX = sumX2 - n * meanX ** 2;
    const ssYY = sumY2 - n * meanY ** 2;
    const ssXY = sumXY - n * meanX * meanY;
    const b = ssXY / ssXX;
    const a = meanY - b * meanX;
    const r = ssXY / Math.sqrt(ssXX * ssYY);
    const r2 = r ** 2;
    setResult({ n, meanX, meanY, a, b, r, r2, sumX, sumY, sumXY, sumX2, ssXX, ssYY, ssXY });
  };

  const reset = () => { setPairs([{ x: "", y: "" }, { x: "", y: "" }, { x: "", y: "" }]); setResult(null); };
  const updatePair = (idx, field, val) => { const next = [...pairs]; next[idx][field] = val; setPairs(next); };
  const addRow = () => setPairs([...pairs, { x: "", y: "" }]);
  const removeRow = (idx) => setPairs(pairs.filter((_, i) => i !== idx));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Label className="font-body text-sm mb-2 block">Paired Data</Label>
        <div className="flex gap-2 mb-2 px-1">
          <span className="font-mono text-xs text-muted-foreground w-6 shrink-0" />
          <span className="font-mono text-xs text-muted-foreground flex-1 text-center">L1 (x)</span>
          <span className="font-mono text-xs text-muted-foreground flex-1 text-center">L2 (y)</span>
          <span className="w-8 shrink-0" />
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {pairs.map((pair, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground w-6 shrink-0">{idx + 1}</span>
              <Input type="number" value={pair.x} onChange={e => updatePair(idx, "x", e.target.value)} className="font-mono" />
              <Input type="number" value={pair.y} onChange={e => updatePair(idx, "y", e.target.value)} className="font-mono" />
              {pairs.length > 2 && (
                <button onClick={() => removeRow(idx)} className="text-muted-foreground hover:text-destructive px-1" aria-label="Remove row">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button onClick={addRow} variant="outline" className="mt-3 font-body text-sm rounded-full h-9"><Plus className="w-4 h-4 mr-1" />Add Row</Button>
        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div>
        {result ? (
          <>
            <StatsTable rows={[
              { label: "n", value: result.n },
              { label: "Σx", value: result.sumX.toFixed(4) },
              { label: "Σy", value: result.sumY.toFixed(4) },
              { label: "x̄", value: result.meanX.toFixed(4) },
              { label: "ȳ", value: result.meanY.toFixed(4) },
              { label: "b (slope)", value: result.b.toFixed(6), highlight: true },
              { label: "a (intercept)", value: result.a.toFixed(6), highlight: true },
              { label: "r (correlation)", value: result.r.toFixed(6), highlight: true },
              { label: "r² (coef. of determination)", value: result.r2.toFixed(6) },
            ]} />
            {showSteps && (
              <div className="mt-4 bg-[#071A2E]/5 border border-[#071A2E]/10 rounded-xl p-4">
                <p className="text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-body font-semibold mb-2">Formulas</p>
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  Regression: y = {result.a.toFixed(4)} + {result.b.toFixed(4)}x<br />
                  b = SSxy / SSxx = {result.ssXY.toFixed(4)} / {result.ssXX.toFixed(4)}<br />
                  r = SSxy / √(SSxx × SSyy)<br />
                  r² = {result.r2.toFixed(6)}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl px-4 py-12 text-center text-sm text-muted-foreground font-body">
            Enter paired (x, y) data and press Calculate.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Distributions ──
function Distributions() {
  const [type, setType] = useState("normal");
  const [mean, setMean] = useState("0");
  const [sd, setSd] = useState("1");
  const [x, setX] = useState("");
  const [direction, setDirection] = useState("less");
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(true);

  const erf = (x) => {
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const compute = () => {
    if (type === "normal") {
      const mu = parseFloat(mean) || 0;
      const sigma = parseFloat(sd) || 1;
      const xval = parseFloat(x) || 0;
      const z = (xval - mu) / sigma;
      const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
      const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
      let prob = cdf;
      if (direction === "greater") prob = 1 - cdf;
      setResult({ type: "normal", prob, cdf, pdf, z, mu, sigma, xval, direction });
    } else {
      const nval = parseInt(n) || 0;
      const pval = parseFloat(p) || 0;
      const kval = parseInt(k) || 0;
      const binomCoeff = (n, k) => {
        if (k < 0 || k > n) return 0;
        let res = 1;
        for (let i = 0; i < k; i++) res = res * (n - i) / (i + 1);
        return res;
      };
      const pmf = binomCoeff(nval, kval) * Math.pow(pval, kval) * Math.pow(1 - pval, nval - kval);
      let cdfBinom = 0;
      for (let i = 0; i <= kval; i++) {
        cdfBinom += binomCoeff(nval, i) * Math.pow(pval, i) * Math.pow(1 - pval, nval - i);
      }
      setResult({ type: "binomial", pmf, cdf: cdfBinom, n: nval, p: pval, k: kval });
    }
  };

  const reset = () => { setMean("0"); setSd("1"); setX(""); setN(""); setP(""); setK(""); setResult(null); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="flex gap-2 mb-5">
          <button onClick={() => setType("normal")} className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${type === "normal" ? "bg-[#071A2E] text-white" : "bg-muted text-muted-foreground hover:bg-[#071A2E]/10"}`}>Normal</button>
          <button onClick={() => setType("binomial")} className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${type === "binomial" ? "bg-[#071A2E] text-white" : "bg-muted text-muted-foreground hover:bg-[#071A2E]/10"}`}>Binomial</button>
        </div>

        {type === "normal" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="font-body text-sm">Mean (μ)</Label><Input type="number" value={mean} onChange={e => setMean(e.target.value)} className="mt-1.5 font-mono" /></div>
              <div><Label className="font-body text-sm">Std Dev (σ)</Label><Input type="number" value={sd} onChange={e => setSd(e.target.value)} className="mt-1.5 font-mono" /></div>
            </div>
            <div><Label className="font-body text-sm">x value</Label><Input type="number" value={x} onChange={e => setX(e.target.value)} className="mt-1.5 font-mono" /></div>
            <div>
              <Label className="font-body text-sm mb-2 block">Direction</Label>
              <div className="flex gap-3">
                <button onClick={() => setDirection("less")} className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${direction === "less" ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "bg-muted text-muted-foreground"}`}>P(X ≤ x)</button>
                <button onClick={() => setDirection("greater")} className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${direction === "greater" ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "bg-muted text-muted-foreground"}`}>P(X ≥ x)</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label className="font-body text-sm">n (trials)</Label><Input type="number" value={n} onChange={e => setN(e.target.value)} className="mt-1.5 font-mono" /></div>
              <div><Label className="font-body text-sm">p (prob)</Label><Input type="number" step="0.01" value={p} onChange={e => setP(e.target.value)} className="mt-1.5 font-mono" /></div>
              <div><Label className="font-body text-sm">k (successes)</Label><Input type="number" value={k} onChange={e => setK(e.target.value)} className="mt-1.5 font-mono" /></div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button onClick={compute} className="flex-1 bg-[#D4AF37] text-[#071A2E] hover:bg-[#e0bc45] font-body font-semibold rounded-full h-11">Calculate</Button>
          <Button onClick={reset} variant="outline" className="font-body rounded-full h-11 px-4"><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button onClick={() => setShowSteps(!showSteps)} variant="ghost" className="font-body rounded-full h-11 px-4 text-sm">{showSteps ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}Steps</Button>
        </div>
      </div>

      <div>
        {result ? (
          <>
            <StatsTable rows={
              result.type === "normal" ? [
                { label: "z-score", value: result.z.toFixed(6) },
                { label: `P(X ${result.direction === "less" ? "≤" : "≥"} ${result.xval})`, value: result.prob.toFixed(6), highlight: true },
                { label: "PDF f(x)", value: result.pdf.toFixed(6) },
                { label: "CDF", value: result.cdf.toFixed(6) },
              ] : [
                { label: `P(X = ${result.k})`, value: result.pmf.toFixed(6), highlight: true },
                { label: `P(X ≤ ${result.k})`, value: result.cdf.toFixed(6) },
                { label: `P(X > ${result.k})`, value: (1 - result.cdf).toFixed(6) },
              ]
            } />
            {showSteps && (
              <div className="mt-4 bg-[#071A2E]/5 border border-[#071A2E]/10 rounded-xl p-4">
                <p className="text-[0.6rem] uppercase tracking-wider text-[#D4AF37] font-body font-semibold mb-2">Formulas</p>
                {result.type === "normal" ? (
                  <p className="font-mono text-xs text-foreground leading-relaxed">
                    z = (x - μ) / σ = ({result.xval} - {result.mu}) / {result.sigma} = {result.z.toFixed(4)}<br />
                    P = 0.5 × [1 + erf(z / √2)]
                  </p>
                ) : (
                  <p className="font-mono text-xs text-foreground leading-relaxed">
                    P(X = k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ<br />
                    C({result.n}, {result.k}) × {result.p}^{result.k} × {1 - result.p}^{result.n - result.k}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl px-4 py-12 text-center text-sm text-muted-foreground font-body">
            Enter parameters and press Calculate.
          </div>
        )}
      </div>
    </div>
  );
}

export default function StatisticalCalculator() {
  const [tab, setTab] = useState("onevar");

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
            <Sigma className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF37] font-body font-semibold mb-4">Interactive Tool</p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Statistical Calculator</h1>
          <p className="text-white/60 font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            1-variable statistics, linear regression, and probability distributions — with standard notation and step-by-step formulas.
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
          {tab === "onevar" && <OneVarStats />}
          {tab === "twovar" && <TwoVarStats />}
          {tab === "distributions" && <Distributions />}
        </motion.div>
      </div>
    </div>
  );
}