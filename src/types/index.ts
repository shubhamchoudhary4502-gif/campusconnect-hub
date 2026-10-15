export type ResourceCategory =
  | 'All'
  | 'Computer Science (RTU)'
  | 'AI & Data Science (RTU)'
  | 'Information Technology'
  | 'Engineering Mathematics'
  | 'Electronics & Comm (ECE)'
  | 'Core Engineering (EE/ME/CE)';

export type ResourceFormat =
  | 'All'
  | 'RTU PYQ & Solutions'
  | 'Faculty Notes'
  | 'Exam Cheatsheet'
  | 'Lab Manual & Code';

export interface StudyResource {
  id: string;
  title: string;
  category: Exclude<ResourceCategory, 'All'>;
  courseCode: string; // RTU Course Code e.g. 3CS4-05, 3CS4-02
  description: string;
  author: string;
  format: Exclude<ResourceFormat, 'All'>;
  semester: string;
  downloads: number;
  rating: number;
  uploadDate: string;
  fileSize: string;
  pagesOrFiles: string;
  topics: string[];
  isBookmarked?: boolean;
  rtuUnitCoverage?: string; // e.g. "Units 1, 2, 3 & 4"
}

export type EventCategory =
  | 'All'
  | 'Renaissance & Rhythm'
  | 'Technical Workshop'
  | 'RTU Exam & Notice'
  | 'Hackathon & Coding'
  | 'JECRC Social & Club';

export interface CampusEvent {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  spotsLeft?: number;
  isUrgent?: boolean;
  isRsvped?: boolean;
  calendarLink?: string;
  hostBody: 'JECRC Foundation' | 'JECRC University' | 'RTU Kota';
  registrationUrl?: string;
}

export interface RtuResultAnnouncement {
  id: string;
  title: string;
  course: string; // e.g. "B.Tech"
  semester: string; // e.g. "V Semester", "VII Semester"
  examSession: string; // e.g. "Main / Back Exam 2025-26"
  declarationDate: string;
  status: 'Declared' | 'Revaluation Open' | 'Declared (Mercy)';
  revalLastDate?: string;
  directPortalUrl: string;
}

export interface RtuExamNotice {
  id: string;
  noticeNumber: string;
  title: string;
  date: string;
  category: 'Time Table' | 'Exam Form' | 'Mercy Attempt' | 'Revaluation' | 'Admit Card';
  isImportant?: boolean;
  pdfUrl?: string;
}

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  id: number;
  input: string;
  expected: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  category: string;
  acceptanceRate: string;
  solved: boolean;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
  };
  testCases: TestCase[];
}

export interface StudentProfile {
  name: string;
  rollNumber: string; // e.g. "23EJCCS042" (RTU Kota format)
  enrollmentNo: string; // e.g. "23E1JCCSM40P042"
  major: string;
  college: string; // "Jaipur Engineering College and Research Centre (JECRC)"
  university: string; // "Rajasthan Technical University (RTU), Kota"
  semester: string;
  cgpa: number; // e.g. 8.74
  creditsCompleted: number;
  totalCredits: number;
  studyStreakDays: number;
  weeklyGoalHours: number;
  loggedHoursThisWeek: number;
}
