import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  Search,
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Download,
  Building,
  GraduationCap,
  FileSpreadsheet,
  FileText,
  Printer,
  Clock
} from 'lucide-react';
import type { RtuResultAnnouncement, RtuExamNotice } from '../types/index.ts';
import { filterRtuResults, lookupRtuResult, RtuMarksheetLookupResult } from '../utils/academic-logic.ts';

interface RtuResultsSectionProps {
  results: RtuResultAnnouncement[];
  notices: RtuExamNotice[];
  defaultRollNo?: string;
}

export const RtuResultsSection: React.FC<RtuResultsSectionProps> = ({
  results,
  notices,
  defaultRollNo = '23EJCCS042'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [rollInput, setRollInput] = useState(defaultRollNo);
  const [activeMarksheet, setActiveMarksheet] = useState<RtuMarksheetLookupResult | null>(null);
  const [isSearchingRoll, setIsSearchingRoll] = useState(false);

  const filteredResults = useMemo(() => {
    return filterRtuResults(results, searchQuery, selectedSemester);
  }, [results, searchQuery, selectedSemester]);

  const handleLookupRoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollInput.trim()) return;

    setIsSearchingRoll(true);
    setTimeout(() => {
      const res = lookupRtuResult(rollInput.trim());
      setActiveMarksheet(res);
      setIsSearchingRoll(false);
    }, 350);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              Rajasthan Technical University (RTU), Kota
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Examination Results &amp; Notices
            </h1>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Official result declarations, revaluation schedules, and time table notices published on <span className="font-semibold text-slate-800">rtu.ac.in</span> and the <span className="font-semibold text-slate-800">rtu.sumsraj.com</span> portal for affiliated college candidates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.rtu.ac.in/index/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <span>Visit rtu.ac.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://rtu.sumsraj.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors"
            >
              <span>Official Result Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Online Marksheet Verification Simulator */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Online Grade Sheet &amp; Marksheet Lookup
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify your semester marks, subject-wise internal/external scores, and SGPA using your RTU Kota Roll Number.
            </p>
          </div>

          <form onSubmit={handleLookupRoll} className="flex items-center gap-2">
            <label htmlFor="rtu-roll-input" className="sr-only">
              Enter RTU Roll Number
            </label>
            <input
              id="rtu-roll-input"
              type="text"
              value={rollInput}
              onChange={(e) => setRollInput(e.target.value)}
              placeholder="e.g. 23EJCCS042"
              className="px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg uppercase text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 w-40 sm:w-48"
            />
            <button
              type="submit"
              disabled={isSearchingRoll}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSearchingRoll ? 'Verifying...' : 'Check Marksheet'}
            </button>
          </form>
        </div>

        {/* Display Verified Marksheet */}
        {activeMarksheet && (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-5 animate-in fade-in duration-200">
            {/* Marksheet Heading */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
                  <GraduationCap className="w-4 h-4" />
                  <span>Rajasthan Technical University, Kota</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">Provisional Statement of Grades</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeMarksheet.studentName}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span>Roll No: <strong className="font-mono text-slate-900">{activeMarksheet.rollNumber}</strong></span>
                  <span>Enrollment: <strong className="font-mono text-slate-900">{activeMarksheet.enrollmentNo}</strong></span>
                  <span>Branch: <strong className="text-slate-900">{activeMarksheet.branch}</strong></span>
                </div>
                <p className="text-[11px] text-slate-500 pt-0.5">
                  Institution: <strong className="text-slate-700">{activeMarksheet.collegeName}</strong>
                </p>
              </div>

              {/* Status & SGPA Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  RESULT: {activeMarksheet.resultStatus}
                </span>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Semester SGPA</span>
                  <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
                    {activeMarksheet.sgpa.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-600 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Subject Code</th>
                    <th className="py-2.5 px-3">Course Title</th>
                    <th className="py-2.5 px-3 text-center">Credits</th>
                    <th className="py-2.5 px-3 text-center">Internal (Max)</th>
                    <th className="py-2.5 px-3 text-center">External (Max)</th>
                    <th className="py-2.5 px-3 text-center">Grade</th>
                    <th className="py-2.5 px-3 text-center">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {activeMarksheet.subjects.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-semibold text-indigo-700">{sub.code}</td>
                      <td className="py-2 px-3 font-sans text-slate-800 font-medium">{sub.name}</td>
                      <td className="py-2 px-3 text-center text-slate-600 tabular-nums">{sub.credits}</td>
                      <td className="py-2 px-3 text-center text-slate-600 tabular-nums">
                        {sub.internal} / {sub.maxInternal}
                      </td>
                      <td className="py-2 px-3 text-center text-slate-600 tabular-nums">
                        {sub.external} / {sub.maxExternal}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className="font-semibold text-emerald-700 font-sans">{sub.grade}</span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold text-slate-900 tabular-nums">{sub.gradePoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Print & Download Actions */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>* Certified computerized transcript based on RTU Examination Cell database.</span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Grid: Left Column (Results Feed) & Right Column (Official RTU Notices) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Result Declarations (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Latest Declared RTU Results
            </h2>

            {/* Semester filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {['All', 'V Semester', 'VII Semester', 'III Semester', 'I Semester'].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap ${
                    selectedSemester === sem
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-indigo-700">{result.course}</span>
                      <span aria-hidden="true">·</span>
                      <span>{result.semester}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">Declared: {result.declarationDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {result.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                      result.status === 'Revaluation Open'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {result.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-500 text-[11px]">
                    {result.revalLastDate ? (
                      <span className="text-amber-800">Reval Deadline: <strong>{result.revalLastDate}</strong></span>
                    ) : (
                      <span>Session: {result.examSession}</span>
                    )}
                  </span>

                  <a
                    href={result.directPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Check on sumsraj.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Official RTU Circulars & Time Tables (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Official RTU Circulars &amp; Orders
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 space-y-1.5 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-indigo-600 font-medium">{notice.noticeNumber}</span>
                  <span className="tabular-nums">{notice.date}</span>
                </div>

                <h3 className="text-xs font-semibold text-slate-900 leading-snug">
                  {notice.title}
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {notice.category}
                  </span>

                  <a
                    href={notice.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <Download className="w-3 h-3" />
                    <span>View Circular</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Help & Helpline card */}
          <div className="bg-slate-100/80 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">RTU Examination Helpdesk</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              For revaluation discrepancies, mercy attempts, or name corrections in marksheets, contact JECRC Examination Cell (Ground Floor, Block A) or email RTU Controller of Examinations at <span className="font-mono text-slate-800">coe@rtu.ac.in</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
