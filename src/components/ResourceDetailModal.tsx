import React from 'react';
import { X, Download, Bookmark, BookmarkCheck, FileText, Check, Star, Share2 } from 'lucide-react';
import type { StudyResource } from '../types/index.ts';

interface ResourceDetailModalProps {
  resource: StudyResource | null;
  onClose: () => void;
  onDownload: (resource: StudyResource) => void;
  onToggleBookmark: (resourceId: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onDownload,
  onToggleBookmark
}) => {
  if (!resource) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resource-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
              <span className="text-indigo-600 font-semibold">{resource.courseCode}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.category}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.semester}</span>
            </div>
            <h2 id="modal-resource-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {resource.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specifications bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs">
          <div>
            <span className="block text-slate-400">Format</span>
            <span className="font-semibold text-slate-800">{resource.format}</span>
          </div>
          <div>
            <span className="block text-slate-400">File Size</span>
            <span className="font-semibold text-slate-800 tabular-nums">{resource.fileSize}</span>
          </div>
          <div>
            <span className="block text-slate-400">Length</span>
            <span className="font-semibold text-slate-800">{resource.pagesOrFiles}</span>
          </div>
          <div>
            <span className="block text-slate-400">Total Downloads</span>
            <span className="font-semibold text-slate-800 tabular-nums">
              {resource.downloads.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Contributor */}
        <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-y border-slate-100">
          <div>
            Author: <strong className="text-slate-900 font-medium">{resource.author}</strong>
          </div>
          <div>
            Uploaded on: <span className="tabular-nums">{resource.uploadDate}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Resource Overview
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Topics Covered */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Syllabus Topics Covered
          </h3>
          <div className="flex flex-wrap gap-2">
            {resource.topics.map((t) => (
              <span
                key={t}
                className="text-xs text-slate-700 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => onToggleBookmark(resource.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {resource.isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span>Saved in Library</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Bookmark Material</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onDownload(resource);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Package ({resource.fileSize})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
