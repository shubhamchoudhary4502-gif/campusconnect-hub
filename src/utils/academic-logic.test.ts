import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterResources,
  validateResourceUpload,
  filterEvents,
  filterRtuResults,
  lookupRtuResult,
  calculateAcademicProgress,
  evaluateCodeSubmission
} from './academic-logic.ts';
import type { StudyResource, CampusEvent, CodingProblem, RtuResultAnnouncement } from '../types/index.ts';

const mockResources: StudyResource[] = [
  {
    id: 'res-1',
    title: 'RTU Data Structures & Algorithms (3CS4-05) PYQs & Notes',
    category: 'Computer Science (RTU)',
    courseCode: '3CS4-05',
    description: 'Complete RTU syllabus unit 1 to 5 notes with solved question papers from 2021 to 2025.',
    author: 'Prof. Sandeep Gupta (JECRC CSE)',
    format: 'RTU PYQ & Solutions',
    semester: 'III Semester',
    downloads: 4200,
    rating: 4.9,
    uploadDate: '2026-03-01',
    fileSize: '6.8 MB',
    pagesOrFiles: '92 pages',
    topics: ['AVL Trees', 'Dijkstra', 'Hashing', 'RTU PYQs']
  },
  {
    id: 'res-2',
    title: 'Advanced Engineering Mathematics (3CS4-02 / 3IT4-02)',
    category: 'Engineering Mathematics',
    courseCode: '3CS4-02',
    description: 'Laplace transforms, Fourier series, numerical methods and boundary value solutions.',
    author: 'Dr. R.K. Mangal',
    format: 'Faculty Notes',
    semester: 'III Semester',
    downloads: 3800,
    rating: 4.8,
    uploadDate: '2025-11-20',
    fileSize: '5.1 MB',
    pagesOrFiles: '110 pages',
    topics: ['Laplace Transforms', 'Fourier Series', 'Numerical Methods']
  }
];

const mockEvents: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'JECRC Renaissance 2026: National Techno-Cultural Fest',
    category: 'Renaissance & Rhythm',
    date: 'Mar 24, 2026',
    time: '10:00 AM - 10:00 PM IST',
    location: 'JECRC Campus Grounds, Sitapura, Jaipur',
    organizer: 'JECRC Student Council',
    description: 'Northern India premier annual fest featuring 60+ technical and cultural events.',
    hostBody: 'JECRC Foundation'
  },
  {
    id: 'ev-2',
    title: 'RTU Kota B.Tech Odd Semester Main & Back Examination Time Table',
    category: 'RTU Exam & Notice',
    date: 'Nov 18, 2026',
    time: '10:30 AM - 1:30 PM IST',
    location: 'JECRC Examination Center (Center Code 028)',
    organizer: 'Controller of Examinations, RTU Kota',
    description: 'Official centralized time table released on rtu.ac.in for B.Tech III, V, VII Semesters.',
    hostBody: 'RTU Kota',
    isUrgent: true
  }
];

const mockRtuResults: RtuResultAnnouncement[] = [
  {
    id: 'res-ann-1',
    title: 'B.Tech V Sem (Main/Back) Exam 2025-26 Result Declared',
    course: 'B.Tech',
    semester: 'V Semester',
    examSession: 'Winter 2025-26',
    declarationDate: '12-Oct-2026',
    status: 'Revaluation Open',
    revalLastDate: '28-Oct-2026',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-ann-2',
    title: 'B.Tech VII Sem (Main/Back) Exam 2025-26 Result Declared',
    course: 'B.Tech',
    semester: 'VII Semester',
    examSession: 'Winter 2025-26',
    declarationDate: '08-Oct-2026',
    status: 'Declared',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  }
];

test('filterResources returns all resources when filter is All', () => {
  const result = filterResources(mockResources, '', 'All', 'All');
  assert.equal(result.length, 2);
});

test('filterResources filters correctly by RTU subject category', () => {
  const result = filterResources(mockResources, '', 'Computer Science (RTU)', 'All');
  assert.equal(result.length, 1);
  assert.equal(result[0].courseCode, '3CS4-05');
});

test('filterEvents filters by JECRC and RTU host bodies', () => {
  const jecrcOnly = filterEvents(mockEvents, 'All', '', 'JECRC Foundation');
  assert.equal(jecrcOnly.length, 1);
  assert.equal(jecrcOnly[0].category, 'Renaissance & Rhythm');

  const rtuOnly = filterEvents(mockEvents, 'All', '', 'RTU Kota');
  assert.equal(rtuOnly.length, 1);
  assert.equal(rtuOnly[0].category, 'RTU Exam & Notice');
});

test('filterRtuResults filters results by semester and search keyword', () => {
  const sem5 = filterRtuResults(mockRtuResults, '', 'V Semester');
  assert.equal(sem5.length, 1);
  assert.equal(sem5[0].status, 'Revaluation Open');

  const search7 = filterRtuResults(mockRtuResults, 'VII', 'All');
  assert.equal(search7.length, 1);
});

test('lookupRtuResult provides candidate marksheet with subjects, SGPA and status', () => {
  const marksheet = lookupRtuResult('23EJCCS042');
  assert.equal(marksheet.found, true);
  assert.equal(marksheet.studentName, 'Aryan Sharma');
  assert.ok(marksheet.sgpa >= 8.0);
  assert.equal(marksheet.resultStatus, 'PASS');
  assert.ok(marksheet.subjects.length >= 5);
});

test('validateResourceUpload checks for required fields including courseCode', () => {
  const invalid = validateResourceUpload({
    title: '',
    category: '',
    courseCode: '',
    description: '',
    format: '',
    semester: 'V Semester',
    fileName: ''
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.courseCode);
});
