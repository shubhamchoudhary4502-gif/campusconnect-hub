import React, { useState } from 'react';
import { Navbar, ActiveNavTab } from './components/Navbar.tsx';
import { ResourcesHub } from './components/ResourcesHub.tsx';
import { EventsSection } from './components/EventsSection.tsx';
import { RtuResultsSection } from './components/RtuResultsSection.tsx';
import { StudentDashboard } from './components/StudentDashboard.tsx';
import { UploadPortal } from './components/UploadPortal.tsx';
import { ResourceDetailModal } from './components/ResourceDetailModal.tsx';
import { Toast, ToastMessage } from './components/Toast.tsx';
import { Footer } from './components/Footer.tsx';
import {
  initialResources,
  initialEvents,
  initialCodingProblems,
  initialStudentProfile,
  initialRtuResults,
  initialRtuNotices
} from './data/mockData.ts';
import type { StudyResource, CampusEvent, CodingProblem } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('resources');
  const [resources, setResources] = useState<StudyResource[]>(initialResources);
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [problems, setProblems] = useState<CodingProblem[]>(initialCodingProblems);
  const [studentProfile, setStudentProfile] = useState(initialStudentProfile);
  const [rtuResults, setRtuResults] = useState(initialRtuResults);
  const [rtuNotices, setRtuNotices] = useState(initialRtuNotices);
  const [selectedResource, setSelectedResource] = useState<StudyResource | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDownloadResource = (resource: StudyResource) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    );

    addToast(
      'success',
      'Download Initiated',
      `"${resource.title}" (${resource.fileSize}) is downloading to your local device.`
    );
  };

  const handleToggleBookmark = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === resourceId) {
          const nextState = !r.isBookmarked;
          addToast(
            'info',
            nextState ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
            nextState ? 'Quick access available in your library.' : 'Removed from saved collection.'
          );
          return { ...r, isBookmarked: nextState };
        }
        return r;
      })
    );
  };

  const handleToggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextRsvp = !ev.isRsvped;
          const nextSpots = typeof ev.spotsLeft === 'number'
            ? nextRsvp ? Math.max(0, ev.spotsLeft - 1) : ev.spotsLeft + 1
            : undefined;

          addToast(
            'success',
            nextRsvp ? 'Seat Confirmed!' : 'RSVP Cancelled',
            nextRsvp
              ? `You are registered for "${ev.title}". Check your JECRC student email for pass confirmation.`
              : `Your registration for "${ev.title}" has been released.`
          );
          return { ...ev, isRsvped: nextRsvp, spotsLeft: nextSpots };
        }
        return ev;
      })
    );
  };

  const handleAddToCalendar = (event: CampusEvent) => {
    addToast(
      'info',
      'Calendar Event Created',
      `Added "${event.title}" on ${event.date} (${event.time}) to your schedule.`
    );
  };

  const handleSolveProblem = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === problemId && !p.solved) {
          addToast(
            'success',
            'Problem Solved!',
            `Awesome! You cleared "${p.title}". Your arena ranking and placement metrics have updated.`
          );
          return { ...p, solved: true };
        }
        return p;
      })
    );
  };

  const handleResourceCreated = (newResource: StudyResource) => {
    setResources((prev) => [newResource, ...prev]);
    addToast(
      'success',
      'RTU Material Shared',
      `"${newResource.title}" is now published to the RTU Study Resources Hub for JECRC students.`
    );
  };

  const savedResourcesCount = resources.filter((r) => r.isBookmarked).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Banner: JECRC Foundation & RTU Kota Affiliation Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800">
        <span>
          Jaipur Engineering College &amp; Research Centre (JECRC), Jaipur · Affiliated to Rajasthan Technical University (RTU), Kota (Center 028)
        </span>
      </div>

      {/* Global Navigation with 3-Zone contract */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedResourcesCount={savedResourcesCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'resources' && (
          <ResourcesHub
            resources={resources}
            onDownload={handleDownloadResource}
            onToggleBookmark={handleToggleBookmark}
            onSelectResource={setSelectedResource}
            onOpenUpload={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            onToggleRsvp={handleToggleRsvp}
            onAddToCalendar={handleAddToCalendar}
          />
        )}

        {activeTab === 'rtu-results' && (
          <RtuResultsSection
            results={rtuResults}
            notices={rtuNotices}
            defaultRollNo={studentProfile.rollNumber}
          />
        )}

        {(activeTab === 'dashboard' || activeTab === 'practice') && (
          <StudentDashboard
            profile={studentProfile}
            problems={problems}
            onSolveProblem={handleSolveProblem}
            savedResourcesCount={savedResourcesCount}
            onOpenResources={() => setActiveTab('resources')}
            onOpenUpload={() => setActiveTab('upload')}
            onOpenRtuResults={() => setActiveTab('rtu-results')}
          />
        )}

        {activeTab === 'upload' && (
          <UploadPortal
            onResourceCreated={handleResourceCreated}
            onViewResources={() => setActiveTab('resources')}
          />
        )}
      </main>

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onDownload={handleDownloadResource}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Notification Toast Layer */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
