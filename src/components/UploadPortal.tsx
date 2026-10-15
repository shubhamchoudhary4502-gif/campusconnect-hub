import React, { useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  FileCheck,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import type { StudyResource, ResourceCategory, ResourceFormat } from '../types/index.ts';
import { validateResourceUpload } from '../utils/academic-logic.ts';

interface UploadPortalProps {
  onResourceCreated: (resource: StudyResource) => void;
  onViewResources: () => void;
}

export const UploadPortal: React.FC<UploadPortalProps> = ({
  onResourceCreated,
  onViewResources
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Computer Science (RTU)');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState<string>('Faculty Notes');
  const [semester, setSemester] = useState('V Semester');
  const [rtuUnitCoverage, setRtuUnitCoverage] = useState('Units 1 to 5 (Full Syllabus)');
  const [topicsString, setTopicsString] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResource, setSubmittedResource] = useState<StudyResource | null>(null);

  const handleSimulateFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
      if (errors.file) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.file;
          return updated;
        });
      }
    }
  };

  const handleQuickAttachDemoFile = () => {
    setFileName('RTU_3CS4_05_DSA_Unit1to5_SolvedNotes.pdf');
    setFileSize('4.8 MB');
    if (errors.file) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.file;
        return updated;
      });
    }
  };

  const handleRemoveFile = () => {
    setFileName('');
    setFileSize('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateResourceUpload({
      title,
      category,
      courseCode,
      description,
      format,
      semester,
      fileName,
      rtuUnitCoverage
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const topics = topicsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newResource: StudyResource = {
      id: `res-user-${Date.now()}`,
      title: title.trim(),
      category: category as Exclude<ResourceCategory, 'All'>,
      courseCode: courseCode.trim().toUpperCase(),
      description: description.trim(),
      author: 'Aryan Sharma (JECRC Student Contributor)',
      format: format as Exclude<ResourceFormat, 'All'>,
      semester: semester.trim(),
      downloads: 1,
      rating: 5.0,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: fileSize || '3.2 MB',
      pagesOrFiles: '34 pages',
      topics: topics.length > 0 ? topics : ['RTU PYQ', 'Exam Prep', 'Lecture Notes'],
      rtuUnitCoverage: rtuUnitCoverage.trim(),
      isBookmarked: false
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedResource(newResource);
      onResourceCreated(newResource);
    }, 450);
  };

  if (submittedResource) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              RTU Course Material Published!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              &quot;{submittedResource.title}&quot; has been verified for the RTU Kota scheme and added to the CampusConnect repository for JECRC students.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-1.5 font-mono">
            <div className="text-slate-600">
              <strong className="text-slate-900 font-sans">RTU Course:</strong> {submittedResource.courseCode} · {submittedResource.category}
            </div>
            <div className="text-slate-600">
              <strong className="text-slate-900 font-sans">Coverage:</strong> {submittedResource.rtuUnitCoverage}
            </div>
            <div className="text-slate-600">
              <strong className="text-slate-900 font-sans">Format:</strong> {submittedResource.format} ({submittedResource.fileSize})
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmittedResource(null);
                setTitle('');
                setCourseCode('');
                setDescription('');
                setTopicsString('');
                setFileName('');
                setFileSize('');
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Upload Another Resource
            </button>
            <button
              onClick={onViewResources}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Explore in Resources Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
          JECRC Foundation Academic Exchange
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Community Upload Portal
        </h1>
        <p className="text-base text-slate-600 mt-2 leading-relaxed">
          Contribute handwritten lecture notes, RTU previous year solved papers, and lab manuals to help your classmates ace mid-terms and RTU end-term examinations.
        </p>
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label htmlFor="resource-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Resource Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="resource-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            placeholder="e.g. RTU Compiler Design (5CS4-02): Solved PYQs and Complete Unit 1-5 Lecture Notes"
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
              errors.title
                ? 'border-rose-400 ring-1 ring-rose-400'
                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.title}
            </p>
          )}
        </div>

        {/* 2-Column Grid: Subject & Course Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="resource-category" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Department / Scheme <span className="text-rose-500">*</span>
            </label>
            <select
              id="resource-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Computer Science (RTU)">Computer Science (RTU)</option>
              <option value="AI & Data Science (RTU)">AI &amp; Data Science (RTU)</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Engineering Mathematics">Engineering Mathematics</option>
              <option value="Electronics & Comm (ECE)">Electronics &amp; Comm (ECE)</option>
              <option value="Core Engineering (EE/ME/CE)">Core Engineering (EE/ME/CE)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="resource-course-code" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              RTU Course Code <span className="text-rose-500">*</span>
            </label>
            <input
              id="resource-course-code"
              type="text"
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value);
                if (errors.courseCode) setErrors((prev) => ({ ...prev, courseCode: '' }));
              }}
              placeholder="e.g. 3CS4-05, 4CS4-04, 5CS4-03"
              className={`w-full px-3.5 py-2 text-sm font-mono bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                errors.courseCode
                  ? 'border-rose-400 ring-1 ring-rose-400'
                  : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.courseCode && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.courseCode}
              </p>
            )}
          </div>
        </div>

        {/* 2-Column Grid: Format & Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="resource-format" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Material Format <span className="text-rose-500">*</span>
            </label>
            <select
              id="resource-format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="RTU PYQ & Solutions">RTU Solved PYQs (Last 5 Years)</option>
              <option value="Faculty Notes">JECRC Faculty Lecture Notes</option>
              <option value="Exam Cheatsheet">Quick Revision / Formula Cheatsheet</option>
              <option value="Lab Manual & Code">Lab Practical Manual &amp; Source Code</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="resource-semester" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Semester
            </label>
            <select
              id="resource-semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="I Semester">I Semester (NEP 2020)</option>
              <option value="II Semester">II Semester (NEP 2020)</option>
              <option value="III Semester">III Semester</option>
              <option value="IV Semester">IV Semester</option>
              <option value="V Semester">V Semester</option>
              <option value="VI Semester">VI Semester</option>
              <option value="VII Semester">VII Semester</option>
              <option value="VIII Semester">VIII Semester</option>
            </select>
          </div>
        </div>

        {/* RTU Unit Coverage */}
        <div className="space-y-1.5">
          <label htmlFor="resource-unit-coverage" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            RTU Syllabus Unit Coverage
          </label>
          <input
            id="resource-unit-coverage"
            type="text"
            value={rtuUnitCoverage}
            onChange={(e) => setRtuUnitCoverage(e.target.value)}
            placeholder="e.g. Full Units 1 to 5, or Units 1 & 2 (Mid-Term I)"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="resource-description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Description &amp; Syllabus Coverage <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="resource-description"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
            }}
            placeholder="Highlight key theorems, derivation questions, RTU repeated questions, and exam tips..."
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all leading-relaxed ${
              errors.description
                ? 'border-rose-400 ring-1 ring-rose-400'
                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Topics / Keywords */}
        <div className="space-y-1.5">
          <label htmlFor="resource-topics" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Key Topics (comma separated)
          </label>
          <input
            id="resource-topics"
            type="text"
            value={topicsString}
            onChange={(e) => setTopicsString(e.target.value)}
            placeholder="e.g. Red-Black Trees, Dijkstra Algorithm, RTU 2024 Question, Big-O"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* File Upload Zone */}
        <div className="space-y-1.5">
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Document File Attachment <span className="text-rose-500">*</span>
          </span>

          {fileName ? (
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-900 font-mono">{fileName}</p>
                  <p className="text-slate-500 tabular-nums">{fileSize || '4.8 MB'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                aria-label="Remove attached file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center transition-colors">
                <input
                  id="file-upload-input"
                  type="file"
                  onChange={handleSimulateFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.zip,.md,.txt,.py,.js,.ts,.cpp,.c"
                  aria-label="Upload document file"
                />
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 pointer-events-none" />
                <p className="text-xs font-semibold text-slate-800 pointer-events-none">
                  Click to browse or drag and drop your RTU notes or question papers here
                </p>
                <p className="text-[11px] text-slate-500 mt-1 pointer-events-none">
                  Supports PDF, Scanned Notes, Markdown, or ZIP archives up to 25 MB
                </p>
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={handleQuickAttachDemoFile}
                  className="text-xs text-indigo-600 hover:text-indigo-800 underline font-medium"
                >
                  Or attach sample RTU solved question paper (demo)
                </button>
              </div>
            </div>
          )}

          {errors.file && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.file}
            </p>
          )}
        </div>

        {/* Academic Integrity Notice */}
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-slate-600 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            By uploading, you affirm that this document contains original study notes, authorized previous year examination questions, or open educational references adhering to the JECRC and RTU Kota Academic Honor Policy.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing RTU Material...' : 'Publish RTU Material'}
          </button>
        </div>
      </form>
    </div>
  );
};
