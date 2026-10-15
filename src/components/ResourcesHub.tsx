import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Download,
  Bookmark,
  BookmarkCheck,
  Star,
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import type { StudyResource, ResourceCategory, ResourceFormat } from '../types/index.ts';
import { filterResources } from '../utils/academic-logic.ts';

interface ResourcesHubProps {
  resources: StudyResource[];
  onDownload: (resource: StudyResource) => void;
  onToggleBookmark: (resourceId: string) => void;
  onSelectResource: (resource: StudyResource) => void;
  onOpenUpload: () => void;
}

const CATEGORIES: ResourceCategory[] = [
  'All',
  'Computer Science (RTU)',
  'AI & Data Science (RTU)',
  'Information Technology',
  'Engineering Mathematics',
  'Electronics & Comm (ECE)',
  'Core Engineering (EE/ME/CE)'
];

const FORMATS: ResourceFormat[] = [
  'All',
  'RTU PYQ & Solutions',
  'Faculty Notes',
  'Exam Cheatsheet',
  'Lab Manual & Code'
];

export const ResourcesHub: React.FC<ResourcesHubProps> = ({
  resources,
  onDownload,
  onToggleBookmark,
  onSelectResource,
  onOpenUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All');
  const [selectedFormat, setSelectedFormat] = useState<ResourceFormat>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');

  const filteredResources = useMemo(() => {
    return filterResources(resources, searchQuery, selectedCategory, selectedFormat, sortBy);
  }, [resources, searchQuery, selectedCategory, selectedFormat, sortBy]);

  const totalDownloads = useMemo(() => {
    return resources.reduce((sum, r) => sum + r.downloads, 0);
  }, [resources]);

  return (
    <div className="space-y-8">
      {/* Editorial Header & Academic Mission */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              RTU Kota Syllabus &amp; JECRC Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Study Resources Hub
            </h1>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Curated RTU B.Tech scheme lecture notes, previous years question papers (PYQs) with step-by-step solutions, and lab practical manuals contributed by JECRC faculty and departmental toppers.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600 shrink-0">
            <div>
              <span className="block text-2xl font-bold text-slate-900 tabular-nums">
                {resources.length}
              </span>
              <span className="text-xs text-slate-500">RTU Course Materials</span>
            </div>
            <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
            <div>
              <span className="block text-2xl font-bold text-slate-900 tabular-nums">
                {totalDownloads.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">Total Student Downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Deck */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <label htmlFor="resource-search" className="sr-only">
            Search study materials
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="resource-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by RTU course code (e.g. 3CS4-05, 3CS4-02, 4CS4-04), subject topic, or professor..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Interactive Segmented Filter Tabs (Categories) */}
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Engineering Branches &amp; Domains (RTU Scheme)
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Format & Sort Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          {/* Format Selector */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-slate-400 mr-1.5 font-medium">Material Type:</span>
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                  selectedFormat === fmt
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'recent')}
              className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="popular">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900 tabular-nums">{filteredResources.length}</strong> {filteredResources.length === 1 ? 'material' : 'materials'}
        </span>
        {(selectedCategory !== 'All' || selectedFormat !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormat('All');
              setSearchQuery('');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">No matching RTU course materials found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            Try adjusting your search terms or subject branch, or upload notes from your JECRC lecture classes.
          </p>
          <button
            onClick={onOpenUpload}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            Upload RTU Study Material
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <article
              key={res.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div>
                {/* Zero-Pill Metadata Line with typographic separators */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2.5">
                  <div className="flex items-center gap-1.5 font-medium text-indigo-700">
                    <span className="font-mono font-bold">{res.courseCode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-600">{res.semester}</span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(res.id)}
                    className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors focus:outline-none"
                    aria-label={res.isBookmarked ? 'Remove bookmark' : 'Bookmark resource'}
                  >
                    {res.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Primary Title */}
                <h3
                  onClick={() => onSelectResource(res)}
                  className="text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 cursor-pointer transition-colors"
                >
                  {res.title}
                </h3>

                {/* Unboxed Resource Specifications */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-1.5 tabular-nums">
                  <span className="font-semibold text-slate-700">{res.format}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.pagesOrFiles}</span>
                  <span aria-hidden="true">·</span>
                  <span>{res.fileSize}</span>
                  {res.rtuUnitCoverage && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-indigo-600">{res.rtuUnitCoverage}</span>
                    </>
                  )}
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                {/* Contributor badge */}
                <p className="text-[11px] text-slate-400 mt-2 italic">
                  By {res.author}
                </p>

                {/* Topics Covered */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {res.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200/80 rounded px-2 py-0.5"
                    >
                      {topic}
                    </span>
                  ))}
                  {res.topics.length > 4 && (
                    <span className="text-[11px] text-slate-400 py-0.5">
                      +{res.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions & Social Proof */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500 tabular-nums">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{res.rating.toFixed(1)}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{res.downloads.toLocaleString()} dl</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectResource(res)}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onDownload(res)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
