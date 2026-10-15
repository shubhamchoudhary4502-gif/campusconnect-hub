import React, { useState } from 'react';
import { Menu, X, PlusCircle, BookOpen, Calendar, LayoutDashboard, Code2, FileCheck2 } from 'lucide-react';

export type ActiveNavTab = 'resources' | 'events' | 'rtu-results' | 'dashboard' | 'practice' | 'upload';

interface NavbarProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  savedResourcesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  savedResourcesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveNavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <button
            onClick={() => handleNavClick('resources')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
              CC
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
                CampusConnect
              </span>
            </div>
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('resources')}
              className={`py-1 relative transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'resources'
                  ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                  : ''
              }`}
            >
              Study Resources
            </button>

            <button
              onClick={() => handleNavClick('events')}
              className={`py-1 relative transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'events'
                  ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                  : ''
              }`}
            >
              JECRC Events
            </button>

            <button
              onClick={() => handleNavClick('rtu-results')}
              className={`py-1 relative transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'rtu-results'
                  ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                  : ''
              }`}
            >
              RTU Results
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`py-1 relative transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'dashboard' || activeTab === 'practice'
                  ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                  : ''
              }`}
            >
              Dashboard &amp; Arena
            </button>

            <button
              onClick={() => handleNavClick('upload')}
              className={`py-1 relative transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'upload'
                  ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                  : ''
              }`}
            >
              Upload
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('upload')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Material</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <button
            onClick={() => handleNavClick('resources')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'resources' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>RTU Study Resources Hub</span>
          </button>

          <button
            onClick={() => handleNavClick('events')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'events' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>JECRC Events &amp; Renaissance</span>
          </button>

          <button
            onClick={() => handleNavClick('rtu-results')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'rtu-results' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>RTU Results &amp; Notices</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Student Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('practice')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'practice' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Practice Arena</span>
          </button>

          <button
            onClick={() => handleNavClick('upload')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'upload' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Community Upload Portal</span>
          </button>
        </div>
      )}
    </header>
  );
};
