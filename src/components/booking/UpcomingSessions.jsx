import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { format, parseISO, isValid } from "date-fns";

function formatEventDate(dateStr) {
  if (!dateStr) return "";
  const d = parseISO(dateStr);
  if (!isValid(d)) return dateStr;
  return format(d, "EEE, MMM d, yyyy");
}

function formatEventTime(dateStr, isAllDay) {
  if (isAllDay || !dateStr) return "All Day";
  const d = parseISO(dateStr);
  if (!isValid(d)) return "";
  return format(d, "h:mm a");
}

export default function UpcomingSessions() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    base44.functions.invoke("getCalendarEvents", {})
      .then((res) => {
        setEvents(res.data?.events || []);
      })
      .catch(() => setError("Could not load upcoming sessions."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
        <span className="font-body text-sm">Loading upcoming sessions…</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-sm text-muted-foreground font-body py-6">{error}</p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground font-body py-6">
        No upcoming sessions scheduled. Check back soon!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-4 hover:border-[#D4AF37]/40 hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-semibold text-foreground text-sm leading-snug mb-2 truncate">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  {formatEventDate(event.start)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  {formatEventTime(event.start, event.isAllDay)}
                  {!event.isAllDay && event.end && ` – ${formatEventTime(event.end, false)}`}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
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
                className="text-[#D4AF37] hover:text-[#c9a030] transition-colors shrink-0 mt-0.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}