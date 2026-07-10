import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, Loader2, Calculator, Atom, FlaskConical, Languages, BookOpen, GraduationCap, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { format, parseISO, isValid } from "date-fns";

// ── Config ────────────────────────────────────────────────────────────────────
// To use separate Google Calendars, replace 'primary' with the calendar's ID
// (found in Google Calendar Settings → Integrate calendar → Calendar ID).
// Example: "math@group.calendar.google.com"
const SUBJECTS = [
  { key: "math",            label: "Mathematics",       icon: Calculator,   color: "#D4AF37", calendarId: "primary" },
  { key: "physics",         label: "Physics",           icon: Atom,         color: "#E45C3A", calendarId: "primary" },
  { key: "chemistry",       label: "Chemistry",         icon: FlaskConical, color: "#059669", calendarId: "primary" },
  { key: "french",          label: "French",            icon: Languages,    color: "#8B5CF6", calendarId: "primary" },
  { key: "english_general", label: "English (General)", icon: BookOpen,     color: "#0B8F9F", calendarId: "primary" },
  { key: "english_academic",label: "English (Academic)",icon: GraduationCap,color: "#3B6E8F", calendarId: "primary" },
  { key: "ielts",           label: "IELTS",             icon: FileText,     color: "#C2410C", calendarId: "primary" },
  { key: "celpip",          label: "CELPIP",            icon: FileText,     color: "#0369A1", calendarId: "primary" },
];

// Keywords used to filter events from a shared primary calendar.
// If you use separate calendar IDs above, all events from that calendar will show.
const KEYWORDS = {
  math:             ["math", "algebra", "calculus", "geometry", "trigonometry", "linear algebra", "differential"],
  physics:          ["physics"],
  chemistry:        ["chemistry", "chem"],
  french:           ["french", "français", "francais"],
  english_general:  ["english general", "general english"],
  english_academic: ["english academic", "academic english", "academic writing"],
  ielts:            ["ielts"],
  celpip:           ["celpip"],
};

function formatDate(dateStr) {
  const d = parseISO(dateStr);
  return isValid(d) ? format(d, "EEE, MMM d") : dateStr;
}

function formatTime(dateStr, isAllDay) {
  if (isAllDay || !dateStr) return "All Day";
  const d = parseISO(dateStr);
  return isValid(d) ? format(d, "h:mm a") : "";
}

function EventCard({ event, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-all duration-200"
      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-foreground text-sm leading-snug mb-2 truncate">
            {event.title}
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
              <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color }} />
              {formatDate(event.start)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
              <Clock className="w-3.5 h-3.5 shrink-0" style={{ color }} />
              {formatTime(event.start, event.isAllDay)}
              {!event.isAllDay && event.end && ` – ${formatTime(event.end, false)}`}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                <span className="truncate max-w-[160px]">{event.location}</span>
              </span>
            )}
          </div>
          {event.description && (
            <p className="text-xs text-muted-foreground font-body mt-2 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View event"
            className="transition-colors shrink-0 mt-0.5"
            style={{ color }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function SubjectPanel({ subject, allEvents }) {
  const useSeparateCalendar = subject.calendarId !== "primary";

  // If using a shared primary calendar, filter by keyword
  const events = useSeparateCalendar
    ? allEvents
    : allEvents.filter((e) => {
        const title = (e.title || "").toLowerCase();
        return KEYWORDS[subject.key].some((kw) => title.includes(kw));
      });

  if (events.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground font-body py-8">
        No upcoming {subject.label} sessions scheduled. Check back soon!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} color={subject.color} />
      ))}
    </div>
  );
}

export default function SubjectCalendars() {
  const [activeKey, setActiveKey] = useState("math");
  const [eventsByCalendar, setEventsByCalendar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Deduplicate calendar IDs to avoid redundant fetches
    const uniqueCalendars = [...new Set(SUBJECTS.map((s) => s.calendarId))];

    Promise.all(
      uniqueCalendars.map((calId) =>
        base44.functions.invoke("getCalendarEvents", { calendarId: calId })
          .then((res) => ({ calId, events: res.data?.events || [] }))
      )
    )
      .then((results) => {
        const map = {};
        results.forEach(({ calId, events }) => { map[calId] = events; });
        setEventsByCalendar(map);
      })
      .catch(() => setError("Could not load calendar events."))
      .finally(() => setLoading(false));
  }, []);

  const activeSubject = SUBJECTS.find((s) => s.key === activeKey);
  const activeEvents = eventsByCalendar[activeSubject?.calendarId] || [];

  return (
    <div>
      {/* Subject tabs */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {SUBJECTS.map((s) => {
          const Icon = s.icon;
          const isActive = s.key === activeKey;
          return (
            <button
              key={s.key}
              onClick={() => setActiveKey(s.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 border"
              style={
                isActive
                  ? { background: s.color, color: "#fff", borderColor: s.color }
                  : { background: "transparent", color: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--border))" }
              }
            >
              <Icon className="w-4 h-4" />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      {loading ? (
        <div className="flex items-center justify-center py-10 gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: activeSubject?.color }} />
          <span className="font-body text-sm">Loading sessions…</span>
        </div>
      ) : error ? (
        <p className="text-center text-sm text-muted-foreground font-body py-6">{error}</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <SubjectPanel subject={activeSubject} allEvents={activeEvents} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}