import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ActiveNavTab } from './Navbar.tsx';

interface FooterProps {
  onSelectTab: (tab: ActiveNavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                CC
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                CampusConnect · JECRC Foundation
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The centralized academic portal for Jaipur Engineering College and Research Centre (JECRC), affiliated with Rajasthan Technical University (RTU), Kota.
            </p>
            <p className="text-[11px] text-slate-400">
              JECRC College Code: <strong className="text-slate-600 font-mono">028</strong> · RTU Affiliated Center
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-900">
              Platform Modules
            </span>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="hover:text-slate-900 transition-colors"
                >
                  RTU Study Resources Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('events')}
                  className="hover:text-slate-900 transition-colors"
                >
                  JECRC Events &amp; Renaissance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('rtu-results')}
                  className="hover:text-slate-900 transition-colors"
                >
                  RTU Results &amp; Marksheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Student Dashboard &amp; Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('upload')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Community Upload Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Official University Portals */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-900">
              Official University Portals
            </span>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a
                  href="https://www.rtu.ac.in/index/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>RTU Kota Main Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://rtu.sumsraj.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>RTU SUMS Examination Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://jecrcfoundation.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>JECRC Foundation Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://jecrcrenaissance.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>Renaissance Youth Fest Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CampusConnect · JECRC Foundation &amp; RTU Kota Hub.</p>
          <p>Built for collegiate academic collaboration and competitive programming.</p>
        </div>
      </div>
    </footer>
  );
};
