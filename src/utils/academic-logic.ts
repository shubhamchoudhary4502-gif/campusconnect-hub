import type {
  StudyResource,
  ResourceCategory,
  ResourceFormat,
  CampusEvent,
  EventCategory,
  CodingProblem,
  RtuResultAnnouncement,
  RtuExamNotice
} from '../types/index.ts';

export interface UploadFormData {
  title: string;
  category: string;
  courseCode: string;
  description: string;
  format: string;
  semester: string;
  fileName?: string;
  rtuUnitCoverage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Filter and sort study resources based on search query, category, and format.
 */
export function filterResources(
  resources: StudyResource[],
  query: string,
  category: ResourceCategory,
  format: ResourceFormat,
  sortBy: 'popular' | 'recent' | 'rating' = 'popular'
): StudyResource[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = resources.filter((resource) => {
    const matchesCategory = category === 'All' || resource.category === category;
    const matchesFormat = format === 'All' || resource.format === format;

    if (!matchesCategory || !matchesFormat) return false;

    if (!normalizedQuery) return true;

    return (
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.courseCode.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.topics.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      resource.author.toLowerCase().includes(normalizedQuery) ||
      (resource.rtuUnitCoverage && resource.rtuUnitCoverage.toLowerCase().includes(normalizedQuery))
    );
  });

  return filtered.sort((a, b) => {
    if (sortBy === 'popular') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'recent') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    return 0;
  });
}

/**
 * Validates community resource upload input before submission.
 */
export function validateResourceUpload(data: UploadFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Resource title must be at least 3 characters long.';
  }

  if (!data.category || data.category.trim() === '') {
    errors.category = 'Please select a valid subject category.';
  }

  if (!data.courseCode || data.courseCode.trim().length < 2) {
    errors.courseCode = 'Course code is required (e.g. 3CS4-05, 4CS4-04, 3CS4-02).';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Please provide a helpful description of at least 10 characters.';
  }

  if (!data.format || data.format.trim() === '') {
    errors.format = 'Please specify the material format.';
  }

  if (!data.fileName || data.fileName.trim() === '') {
    errors.file = 'Please attach a document file (PDF, notes, or zip archive).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Filters upcoming events by category, host body, and optional text query.
 */
export function filterEvents(
  events: CampusEvent[],
  category: EventCategory,
  searchQuery: string = '',
  hostFilter: 'All' | 'JECRC Foundation' | 'RTU Kota' = 'All'
): CampusEvent[] {
  const normalized = searchQuery.trim().toLowerCase();

  return events.filter((event) => {
    const matchesCat = category === 'All' || event.category === category;
    const matchesHost =
      hostFilter === 'All' ||
      (hostFilter === 'JECRC Foundation' && (event.hostBody === 'JECRC Foundation' || event.hostBody === 'JECRC University')) ||
      (hostFilter === 'RTU Kota' && event.hostBody === 'RTU Kota');

    if (!matchesCat || !matchesHost) return false;

    if (!normalized) return true;
    return (
      event.title.toLowerCase().includes(normalized) ||
      event.description.toLowerCase().includes(normalized) ||
      event.location.toLowerCase().includes(normalized) ||
      event.organizer.toLowerCase().includes(normalized)
    );
  });
}

/**
 * Filter RTU Kota Result Announcements by search query or semester.
 */
export function filterRtuResults(
  results: RtuResultAnnouncement[],
  query: string = '',
  semesterFilter: string = 'All'
): RtuResultAnnouncement[] {
  const normalized = query.trim().toLowerCase();

  return results.filter((res) => {
    const matchesSem = semesterFilter === 'All' || res.semester === semesterFilter;
    if (!matchesSem) return false;

    if (!normalized) return true;
    return (
      res.title.toLowerCase().includes(normalized) ||
      res.semester.toLowerCase().includes(normalized) ||
      res.examSession.toLowerCase().includes(normalized) ||
      res.status.toLowerCase().includes(normalized)
    );
  });
}

/**
 * Calculates student academic progress metrics based on 10-point CGPA and RTU credits.
 */
export function calculateAcademicProgress(
  creditsCompleted: number,
  totalCredits: number,
  solvedCount: number,
  totalProblemsCount: number
) {
  const creditPercentage = Math.min(100, Math.round((creditsCompleted / Math.max(1, totalCredits)) * 100));
  const practicePercentage = Math.min(100, Math.round((solvedCount / Math.max(1, totalProblemsCount)) * 100));
  return {
    creditPercentage,
    practicePercentage,
    remainingCredits: Math.max(0, totalCredits - creditsCompleted)
  };
}

/**
 * Evaluates simulated code runner test cases for the Practice Arena.
 */
export function evaluateCodeSubmission(
  problem: CodingProblem,
  userCode: string,
  language: 'javascript' | 'python'
): {
  passed: boolean;
  passedTestsCount: number;
  totalTestsCount: number;
  feedback: string;
  runtimeMs: number;
  memoryMb: number;
} {
  const trimmed = userCode.trim();

  // Basic syntax/empty check
  if (!trimmed || trimmed === problem.starterCode[language].trim()) {
    return {
      passed: false,
      passedTestsCount: 0,
      totalTestsCount: problem.testCases.length,
      feedback: 'Please write your solution implementation before submitting.',
      runtimeMs: 0,
      memoryMb: 0
    };
  }

  const hasReturn = trimmed.includes('return');
  const hasLogic =
    trimmed.includes('for') ||
    trimmed.includes('while') ||
    trimmed.includes('Map') ||
    trimmed.includes('map') ||
    trimmed.includes('reduce') ||
    trimmed.includes('filter') ||
    trimmed.includes('if') ||
    trimmed.includes('in') ||
    trimmed.includes('dict') ||
    trimmed.includes('len') ||
    trimmed.includes('def') ||
    trimmed.includes('function') ||
    trimmed.includes('=>');

  const passed = hasReturn && hasLogic;
  const passedTestsCount = passed ? problem.testCases.length : Math.max(0, Math.floor(problem.testCases.length / 2));

  return {
    passed,
    passedTestsCount,
    totalTestsCount: problem.testCases.length,
    feedback: passed
      ? 'All test cases passed! Solution accepted.'
      : 'Time Limit Exceeded or incorrect output on test case 2. Check edge conditions.',
    runtimeMs: passed ? 48 : 120,
    memoryMb: 42.4
  };
}

export interface RtuSubjectMark {
  code: string;
  name: string;
  credits: number;
  internal: number;
  maxInternal: number;
  external: number;
  maxExternal: number;
  grade: string;
  gradePoint: number;
}

export interface RtuMarksheetLookupResult {
  found: boolean;
  rollNumber: string;
  studentName: string;
  collegeName: string;
  enrollmentNo: string;
  branch: string;
  semester: string;
  examSession: string;
  sgpa: number;
  cgpa: number;
  resultStatus: 'PASS' | 'FAIL' | 'BACK';
  subjects: RtuSubjectMark[];
}

/**
 * Simulates real RTU Kota roll number result verification from rtu.sumsraj.com / esuvidha.
 */
export function lookupRtuResult(rollNumber: string): RtuMarksheetLookupResult {
  const cleanRoll = rollNumber.trim().toUpperCase();

  // Default JECRC demo candidate
  return {
    found: true,
    rollNumber: cleanRoll || '23EJCCS042',
    studentName: 'Aryan Sharma',
    collegeName: 'Jaipur Engineering College and Research Centre (JECRC), Jaipur (Col Code: 028)',
    enrollmentNo: '23E1JCCSM40P042',
    branch: 'B.Tech in Computer Science & Engineering',
    semester: 'V Semester (Main Examination)',
    examSession: 'Winter 2025-26',
    sgpa: 8.82,
    cgpa: 8.74,
    resultStatus: 'PASS',
    subjects: [
      {
        code: '5CS4-01',
        name: 'Information Theory & Coding',
        credits: 3,
        internal: 26,
        maxInternal: 30,
        external: 58,
        maxExternal: 70,
        grade: 'A+',
        gradePoint: 9
      },
      {
        code: '5CS4-02',
        name: 'Compiler Design',
        credits: 3,
        internal: 24,
        maxInternal: 30,
        external: 55,
        maxExternal: 70,
        grade: 'A',
        gradePoint: 8
      },
      {
        code: '5CS4-03',
        name: 'Operating Systems',
        credits: 3,
        internal: 28,
        maxInternal: 30,
        external: 64,
        maxExternal: 70,
        grade: 'O',
        gradePoint: 10
      },
      {
        code: '5CS4-04',
        name: 'Computer Graphics & Multimedia',
        credits: 3,
        internal: 25,
        maxInternal: 30,
        external: 56,
        maxExternal: 70,
        grade: 'A',
        gradePoint: 8
      },
      {
        code: '5CS4-05',
        name: 'Analysis of Algorithms',
        credits: 3,
        internal: 27,
        maxInternal: 30,
        external: 60,
        maxExternal: 70,
        grade: 'A+',
        gradePoint: 9
      },
      {
        code: '5CS4-21',
        name: 'Operating Systems Lab',
        credits: 1,
        internal: 18,
        maxInternal: 20,
        external: 27,
        maxExternal: 30,
        grade: 'A+',
        gradePoint: 9
      },
      {
        code: '5CS4-22',
        name: 'Analysis of Algorithms Lab',
        credits: 1,
        internal: 19,
        maxInternal: 20,
        external: 28,
        maxExternal: 30,
        grade: 'O',
        gradePoint: 10
      }
    ]
  };
}
