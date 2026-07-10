import React, { useState } from "react";

// GeoGebra apps: each has a material ID from geogebra.org
const GEOGEBRA_APPS = [
  {
    label: "Classic Graphing",
    id: "classic",
    description: "Full-featured graphing, geometry, algebra & calculus tools.",
    src: "https://www.geogebra.org/classic?embed",
  },
  {
    label: "Geometry",
    id: "geometry",
    description: "Interactive geometric constructions and proofs.",
    src: "https://www.geogebra.org/geometry?embed",
  },
  {
    label: "3D Calculator",
    id: "3d",
    description: "Visualize 3D surfaces, curves and solids.",
    src: "https://www.geogebra.org/3d?embed",
  },
];

export default function GeoGebraEmbed() {
  const [active, setActive] = useState("classic");
  const current = GEOGEBRA_APPS.find((a) => a.id === active);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {GEOGEBRA_APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => setActive(app.id)}
            className={`px-5 py-2 rounded-full font-body text-sm font-medium border transition-all duration-200 ${
              active === app.id
                ? "bg-[#D4AF37] text-[#071A2E] border-[#D4AF37] shadow-md"
                : "border-border text-muted-foreground hover:border-[#D4AF37]/50 hover:text-foreground bg-card"
            }`}
          >
            {app.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-muted-foreground font-body text-sm mb-4">{current.description}</p>

      {/* Embed */}
      <div className="w-full rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height: "560px" }}>
        <iframe
          key={active}
          src={current.src}
          title={current.label}
          className="w-full h-full"
          allowFullScreen
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}