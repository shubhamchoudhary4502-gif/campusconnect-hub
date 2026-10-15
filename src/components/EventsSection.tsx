import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  CheckCircle,
  BellRing,
  AlertTriangle,
  CalendarPlus,
  Compass,
  Sparkles,
  Building2,
  ExternalLink
} from 'lucide-react';
import type { CampusEvent, EventCategory } from '../types/index.ts';
import { filterEvents } from '../utils/academic-logic.ts';

interface EventsSectionProps {
  events: CampusEvent[];
  onToggleRsvp: (eventId: string) => void;
  onAddToCalendar: (event: CampusEvent) => void;
}

const EVENT_CATEGORIES: EventCategory[] = [
  'All',
  'Renaissance & Rhythm',
  'RTU Exam & Notice',
  'Technical Workshop',
  'Hackathon & Coding',
  'JECRC Social & Club'
];

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onToggleRsvp,
  onAddToCalendar
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [selectedHost, setSelectedHost] = useState<'All' | 'JECRC Foundation' | 'RTU Kota'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return filterEvents(events, selectedCategory, searchQuery, selectedHost);
  }, [events, selectedCategory, searchQuery, selectedHost]);

  const rtuExamsCount = useMemo(() => {
    return events.filter((e) => e.category === 'RTU Exam & Notice').length;
  }, [events]);

  const jecrcFestsCount = useMemo(() => {
    return events.filter((e) => e.hostBody === 'JECRC Foundation' || e.hostBody === 'JECRC University').length;
  }, [events]);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              JECRC Foundation Events &amp; RTU Kota Examination Milestones
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Events, Hackathons &amp; Exam Dates
            </h1>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Complete calendar featuring national fests (<span className="font-semibold text-slate-800">Renaissance</span>, <span className="font-semibold text-slate-800">JU Rhythm</span>), official <span className="font-semibold text-slate-800">RTU Kota Examination Time Tables</span>, student club hackathons, and robotics tournaments.
            </p>
          </div>

          {/* Quick Count Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-600 shrink-0">
            <div>
              <span className="block text-2xl font-bold text-slate-900 tabular-nums">
                {jecrcFestsCount}
              </span>
              <span className="text-xs text-slate-500">JECRC Campus Events</span>
            </div>
            <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
            <div>
              <span className="block text-2xl font-bold text-slate-900 tabular-nums">
                {rtuExamsCount}
              </span>
              <span className="text-xs text-slate-500">RTU Exam Deadlines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Host Institution Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Institution Filter:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
              {(['All', 'JECRC Foundation', 'RTU Kota'] as const).map((host) => (
                <button
                  key={host}
                  onClick={() => setSelectedHost(host)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedHost === host
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {host === 'All' ? 'All Portals' : host}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <label htmlFor="event-search" className="sr-only">
              Search events
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="event-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Renaissance, SIH, RTU dates..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-none">
            {EVENT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category === 'All' ? 'All Event Types' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline List of Events */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">No events found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            There are no campus notices matching your current filter. Check back for fresh circulars from JECRC Council or RTU Examination Cell.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl border p-5 sm:p-6 transition-all duration-200 hover:shadow-xs ${
                event.isUrgent
                  ? 'border-amber-200 bg-linear-to-r from-amber-50/30 to-white'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                {/* Left zone: Date anchor & info */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1">
                  {/* Visual Date Badge (clean tabular date block) */}
                  <div className="shrink-0 w-16 sm:w-20 rounded-lg bg-slate-100 border border-slate-200 p-2.5 text-center">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {event.date.split(' ')[0]}
                    </span>
                    <span className="block text-2xl font-extrabold text-slate-900 tabular-nums">
                      {event.date.split(' ')[1]?.replace(',', '') || '24'}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      2026
                    </span>
                  </div>

                  {/* Main Event Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-indigo-700">{event.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">{event.hostBody}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.organizer}</span>
                      {event.isUrgent && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            CRITICAL RTU KOTA DEADLINE
                          </span>
                        </>
                      )}
                    </div>

                    {/* Event Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {event.title}
                    </h3>

                    {/* Logistics Row */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="tabular-nums">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.location}</span>
                      </div>
                      {typeof event.spotsLeft === 'number' && event.spotsLeft > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="tabular-nums">{event.spotsLeft} delegate slots left</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pt-1">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Right zone: Interactive Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                  <button
                    onClick={() => onToggleRsvp(event.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      event.isRsvped
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                    }`}
                  >
                    {event.isRsvped ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Registered · Attending</span>
                      </>
                    ) : (
                      <>
                        <BellRing className="w-4 h-4" />
                        <span>RSVP / Register</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onAddToCalendar(event)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors py-1 px-2"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
