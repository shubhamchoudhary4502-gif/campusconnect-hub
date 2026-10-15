import type {
  StudyResource,
  CampusEvent,
  CodingProblem,
  StudentProfile,
  RtuResultAnnouncement,
  RtuExamNotice
} from '../types/index.ts';

export const initialStudentProfile: StudentProfile = {
  name: 'Aryan Sharma',
  rollNumber: '23EJCCS042',
  enrollmentNo: '23E1JCCSM40P042',
  major: 'B.Tech - Computer Science & Engineering',
  college: 'Jaipur Engineering College & Research Centre (JECRC), Jaipur (Col Code: 028)',
  university: 'Rajasthan Technical University (RTU), Kota',
  semester: 'VI Semester (Spring 2026)',
  cgpa: 8.74,
  creditsCompleted: 92,
  totalCredits: 134,
  studyStreakDays: 18,
  weeklyGoalHours: 26,
  loggedHoursThisWeek: 21.5
};

export const initialResources: StudyResource[] = [
  {
    id: 'res-rtu-dsa',
    title: 'Data Structures & Algorithms (3CS4-05): RTU Unit 1–5 Master Notes & Solved PYQs',
    category: 'Computer Science (RTU)',
    courseCode: '3CS4-05',
    description: 'Complete RTU Kota B.Tech syllabus notes with solved previous year question papers from 2020 to 2025. Covers asymptotic notation, balanced BSTs (AVL, Red-Black), graph algorithms (Dijkstra, Kruskal, Prim), and dynamic programming.',
    author: 'Prof. Sandeep Gupta · Dept. of CSE, JECRC',
    format: 'RTU PYQ & Solutions',
    semester: 'III Semester',
    downloads: 5420,
    rating: 4.9,
    uploadDate: '2026-02-10',
    fileSize: '7.8 MB',
    pagesOrFiles: '124 pages',
    topics: ['AVL Trees', 'Red-Black Trees', 'Dijkstra', 'Graph Traversals', 'RTU Solved Papers'],
    rtuUnitCoverage: 'Full Units 1 to 5',
    isBookmarked: true
  },
  {
    id: 'res-rtu-math',
    title: 'Advanced Engineering Mathematics (3CS4-02 / 3IT4-02): Formula Cheatsheet & RTU Solutions',
    category: 'Engineering Mathematics',
    courseCode: '3CS4-02',
    description: 'High-yield exam preparation notes for RTU Kota examinations. Includes step-by-step solutions for Laplace Transforms, Fourier Transforms, Z-Transforms, Numerical Methods (Newton-Raphson, Runge-Kutta), and complex analysis.',
    author: 'Dr. R.K. Mangal · Faculty of Mathematics, JECRC',
    format: 'Exam Cheatsheet',
    semester: 'III Semester',
    downloads: 6890,
    rating: 5.0,
    uploadDate: '2025-11-15',
    fileSize: '5.2 MB',
    pagesOrFiles: '88 pages',
    topics: ['Laplace Transforms', 'Fourier Series', 'Runge-Kutta', 'Newton Raphson', 'Z-Transforms'],
    rtuUnitCoverage: 'Units 1, 2, 3, 4 & 5',
    isBookmarked: true
  },
  {
    id: 'res-rtu-toc',
    title: 'Theory of Computation (4CS4-04): Automata, Regular Grammars & Turing Machines',
    category: 'Computer Science (RTU)',
    courseCode: '4CS4-04',
    description: 'Comprehensive lecture series notes tailored for RTU semester examinations. DFA/NFA conversions, Arden theorem, Pumping Lemma proofs, CFG simplification, Pushdown Automata, and Turing Machine design.',
    author: 'Prof. Mukesh Agarwal · JECRC Foundation',
    format: 'Faculty Notes',
    semester: 'IV Semester',
    downloads: 4150,
    rating: 4.8,
    uploadDate: '2026-01-18',
    fileSize: '6.4 MB',
    pagesOrFiles: '96 pages',
    topics: ['DFA / NFA', 'Pumping Lemma', 'Context Free Grammar', 'Pushdown Automata', 'Turing Machine'],
    rtuUnitCoverage: 'Complete RTU Syllabus',
    isBookmarked: false
  },
  {
    id: 'res-rtu-dbms',
    title: 'Database Management Systems (4CS4-05): SQL, Normalization & RTU Lab Practical Code',
    category: 'Computer Science (RTU)',
    courseCode: '4CS4-05',
    description: 'Exhaustive notes covering Relational Algebra, ER Models, Normal Forms (1NF through BCNF with mathematical proofs), Concurrency Control, Two-Phase Locking, and RTU DBMS lab query manual (Oracle SQL / PostgreSQL).',
    author: 'Er. Abhishek Dixit · JECRC Database Systems Group',
    format: 'Lab Manual & Code',
    semester: 'IV Semester',
    downloads: 3940,
    rating: 4.9,
    uploadDate: '2026-02-22',
    fileSize: '8.5 MB',
    pagesOrFiles: '110 pages + SQL Scripts',
    topics: ['BCNF & 3NF', 'Two-Phase Locking', 'Transactions (ACID)', 'PL/SQL Triggers', 'ER Diagrams'],
    rtuUnitCoverage: 'Units 1 to 5 + Lab Manual',
    isBookmarked: true
  },
  {
    id: 'res-rtu-os',
    title: 'Operating Systems (5CS4-03): Process Scheduling, Deadlocks & Memory Management',
    category: 'Computer Science (RTU)',
    courseCode: '5CS4-03',
    description: 'Thorough theoretical explanations and solved numericals on Banker deadlock avoidance algorithm, FIFO/LRU/Optimal page replacement, Multi-level feedback queues, semaphore synchronization, and Unix shell programming.',
    author: 'Dr. Neha Singh · JECRC CSE Faculty',
    format: 'Faculty Notes',
    semester: 'V Semester',
    downloads: 4720,
    rating: 4.9,
    uploadDate: '2025-10-25',
    fileSize: '6.1 MB',
    pagesOrFiles: '84 pages',
    topics: ['Bankers Algorithm', 'Page Replacement', 'Semaphores', 'Process Synchronization', 'File Systems'],
    rtuUnitCoverage: 'Units 1, 2, 3, 4 & 5',
    isBookmarked: false
  },
  {
    id: 'res-rtu-cn',
    title: 'Computer Networks (6CS4-01): Protocol Stacks, IP Subnetting & Socket Implementations',
    category: 'Information Technology',
    courseCode: '6CS4-01',
    description: 'Syllabus notes and RTU previous papers coverage on OSI & TCP/IP layers, IPv4/IPv6 CIDR subnet calculations, routing algorithms (Link State, Distance Vector), Congestion control (TCP Reno/Tahoe), and Wireshark traces.',
    author: 'Prof. Manish Sharma · JECRC IT Dept',
    format: 'RTU PYQ & Solutions',
    semester: 'VI Semester',
    downloads: 3120,
    rating: 4.8,
    uploadDate: '2026-03-01',
    fileSize: '7.2 MB',
    pagesOrFiles: '92 pages',
    topics: ['IPv4 Subnetting', 'OSI vs TCP/IP', 'Dijkstra Routing', 'TCP Flow Control', 'DNS & HTTP'],
    rtuUnitCoverage: 'Units 1 to 5',
    isBookmarked: false
  },
  {
    id: 'res-rtu-ai',
    title: 'Artificial Intelligence & Machine Learning (6AI4-04): Search & Neural Architectures',
    category: 'AI & Data Science (RTU)',
    courseCode: '6AI4-04',
    description: 'Specialized notes for RTU AI & Data Science students covering A* search, Alpha-Beta pruning, Decision Trees, SVM, Backpropagation math, and Python Scikit-Learn implementations.',
    author: 'JECRC AI Research Lab',
    format: 'Faculty Notes',
    semester: 'VI Semester',
    downloads: 2890,
    rating: 4.9,
    uploadDate: '2026-02-28',
    fileSize: '5.9 MB',
    pagesOrFiles: '78 pages',
    topics: ['A* Algorithm', 'Alpha-Beta Pruning', 'Backpropagation', 'Decision Trees', 'SVM'],
    rtuUnitCoverage: 'Units 1 to 5',
    isBookmarked: false
  }
];

export const initialEvents: CampusEvent[] = [
  {
    id: 'ev-jecrc-renaissance',
    title: 'JECRC Renaissance 2026: National Techno-Cultural Youth Festival',
    category: 'Renaissance & Rhythm',
    date: 'Mar 24 – 27, 2026',
    time: '9:30 AM – 10:00 PM IST',
    location: 'JECRC Foundation Campus Grounds, Sitapura, Jaipur',
    organizer: 'JECRC Student Council & Cultural Societies',
    description: 'The flagship national festival of JECRC Foundation attracting 10,000+ collegiate participants from across India. Features 60+ competitions across RoboWars, Coding Hackathon, Street Play, Western Group Dance, Battle of the Bands, and Star Celebrity Pro-Night.',
    spotsLeft: 350,
    isUrgent: false,
    isRsvped: true,
    hostBody: 'JECRC Foundation'
  },
  {
    id: 'ev-ju-rhythm',
    title: 'JU Rhythm 2026: "Beats of Imagination" Techno-Cultural-Business Conclave',
    category: 'Renaissance & Rhythm',
    date: 'Apr 03 – 05, 2026',
    time: '10:00 AM – 9:30 PM IST',
    location: 'JECRC University Campus, Ramchandrapura, Jaipur',
    organizer: 'JECRC Youth Council & Directorate of Student Affairs',
    description: 'Inter-university celebration combining national-level coding sprints, robotics battles, startup pitch deck competitions, fashion showcase, and live musical pro-nights.',
    spotsLeft: 220,
    isUrgent: false,
    isRsvped: false,
    hostBody: 'JECRC University'
  },
  {
    id: 'ev-rtu-exam-schedule',
    title: 'RTU Kota B.Tech Odd Semester Main & Back Examination Time Table',
    category: 'RTU Exam & Notice',
    date: 'Nov 18 – Dec 04, 2026',
    time: '10:30 AM – 1:30 PM IST (Morning Shift)',
    location: 'JECRC Main Examination Center (Center Code: 028), Jaipur',
    organizer: 'Controller of Examinations, Rajasthan Technical University (RTU), Kota',
    description: 'Official centralized semester-end examination schedule declared on rtu.ac.in for B.Tech III, V, and VII Semesters (Main and Back candidates). Students must carry RTU Admit Cards and JECRC Student ID.',
    spotsLeft: 0,
    isUrgent: true,
    isRsvped: true,
    hostBody: 'RTU Kota'
  },
  {
    id: 'ev-rtu-form-deadline',
    title: 'RTU Kota Examination Form Submission Deadline (Even Semesters)',
    category: 'RTU Exam & Notice',
    date: 'Nov 08, 2026',
    time: '5:00 PM IST Strict Portal Closing',
    location: 'RTU Kota Online Examination Portal (rtu.sumsraj.com / JECRC Accounts)',
    organizer: 'Office of the Controller of Examination, RTU Kota',
    description: 'Last date for online submission of Examination Forms for B.Tech IV, VI, and VIII Semesters without late fees. Late fee with double charges applicable up to Nov 15.',
    isUrgent: true,
    isRsvped: true,
    hostBody: 'RTU Kota'
  },
  {
    id: 'ev-jecrc-sih',
    title: 'Smart India Hackathon (SIH 2026) Internal JECRC College Hackathon',
    category: 'Hackathon & Coding',
    date: 'Nov 12 – 13, 2026',
    time: '24-Hour Continuous Non-Stop Hackathon (Starts 10:00 AM)',
    location: 'Central Computer Center & Innovation Lab, JECRC Block C',
    organizer: 'J-SID (Self-Innovative Developers Club) & JECRC Incubation Centre',
    description: 'Mandatory internal screening hackathon to shortlist top software and hardware problem statements for nomination to the Ministry of Education SIH 2026 Grand Finale. Mentorship from alumni and faculty experts.',
    spotsLeft: 30,
    isUrgent: false,
    isRsvped: true,
    hostBody: 'JECRC Foundation'
  },
  {
    id: 'ev-xananoids-robotech',
    title: 'Xananoids RoboWars & Autonomous Line Follower Championship',
    category: 'Technical Workshop',
    date: 'Nov 22, 2026',
    time: '11:00 AM – 5:00 PM IST',
    location: 'JECRC Mechanical & Robotics Arena',
    organizer: 'Xananoids Robotics Club (Official JECRC Robotics Team)',
    description: 'Hands-on combat robotics, maze solver bots, and drone obstacle navigation with cash prizes up to INR 50,000. Open to all engineering branches.',
    spotsLeft: 45,
    isUrgent: false,
    isRsvped: false,
    hostBody: 'JECRC Foundation'
  },
  {
    id: 'ev-ecell-illuminate',
    title: 'E-Cell "Illuminate" Entrepreneurship Workshop with IIT Bombay',
    category: 'Technical Workshop',
    date: 'Nov 29, 2026',
    time: '10:00 AM – 4:00 PM IST',
    location: 'JECRC Auditorium, Ground Floor, Central Block',
    organizer: 'JECRC Incubation Centre in association with E-Cell, IIT Bombay',
    description: 'Comprehensive boot camp focusing on business model canvases, venture funding basics, student patent filing, and seed capital pitching opportunities.',
    spotsLeft: 60,
    isUrgent: false,
    isRsvped: false,
    hostBody: 'JECRC Foundation'
  },
  {
    id: 'ev-ashayein-blood',
    title: 'Ashayein Annual Mega Blood Donation Camp (Save Lives Initiative)',
    category: 'JECRC Social & Club',
    date: 'Dec 08, 2026',
    time: '8:30 AM – 6:00 PM IST',
    location: 'JECRC Central Lawn & Medical Wing',
    organizer: 'Ashayein - The Hope (JECRC Social Welfare Club)',
    description: 'One of Rajasthan’s largest student-driven voluntary blood donation drives in association with SMS Hospital Jaipur and Red Cross Society. Targets over 1,500 units of blood collected in a single day.',
    spotsLeft: 500,
    isUrgent: false,
    isRsvped: true,
    hostBody: 'JECRC Foundation'
  }
];

export const initialRtuResults: RtuResultAnnouncement[] = [
  {
    id: 'res-rtu-btech-5',
    title: 'B.Tech V Semester (Main / Back) Examination 2025–26 Result Declared',
    course: 'B.Tech',
    semester: 'V Semester',
    examSession: 'Winter 2025–26 (Held Jan 2026)',
    declarationDate: '12-Oct-2026',
    status: 'Revaluation Open',
    revalLastDate: '28-Oct-2026',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-rtu-btech-7',
    title: 'B.Tech VII Semester (Main / Back) Examination 2025–26 Result Declared',
    course: 'B.Tech',
    semester: 'VII Semester',
    examSession: 'Winter 2025–26 (Held Dec 2025)',
    declarationDate: '06-Oct-2026',
    status: 'Declared',
    revalLastDate: '22-Oct-2026',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-rtu-btech-3',
    title: 'B.Tech III Semester (Main / Back) Examination 2025–26 Result Declared',
    course: 'B.Tech',
    semester: 'III Semester',
    examSession: 'Winter 2025–26',
    declarationDate: '29-Sep-2026',
    status: 'Revaluation Open',
    revalLastDate: '18-Oct-2026',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-rtu-btech-1-nep',
    title: 'B.Tech I Semester (NEP 2020 Scheme) Examination Result 2025–26',
    course: 'B.Tech',
    semester: 'I Semester',
    examSession: 'Session 2025–26',
    declarationDate: '22-Sep-2026',
    status: 'Declared',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-rtu-reval-4',
    title: 'B.Tech IV Semester Revaluation & Updated Result 2025',
    course: 'B.Tech',
    semester: 'IV Semester',
    examSession: 'Summer 2025 Session',
    declarationDate: '15-Sep-2026',
    status: 'Declared',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  },
  {
    id: 'res-rtu-mtech-2',
    title: 'M.Tech II Semester (Main / Back) Examination Result Declared',
    course: 'M.Tech',
    semester: 'II Semester',
    examSession: 'Summer 2025 Session',
    declarationDate: '08-Sep-2026',
    status: 'Declared',
    directPortalUrl: 'https://rtu.sumsraj.com/'
  }
];

export const initialRtuNotices: RtuExamNotice[] = [
  {
    id: 'notice-1',
    noticeNumber: 'RTU/CE/Ex-TimeTable/2026/894',
    title: 'Time Table for B.Tech III & V Semester (Main/Back) Examinations November 2026',
    date: '10-Oct-2026',
    category: 'Time Table',
    isImportant: true,
    pdfUrl: 'https://www.rtu.ac.in/index/'
  },
  {
    id: 'notice-2',
    noticeNumber: 'RTU/CE/Form/2026/742',
    title: 'Notification for filling online Examination Form for B.Tech Even Semesters (IV, VI, VIII)',
    date: '04-Oct-2026',
    category: 'Exam Form',
    isImportant: true,
    pdfUrl: 'https://www.rtu.ac.in/index/'
  },
  {
    id: 'notice-3',
    noticeNumber: 'RTU/Acad/Mercy/2026/512',
    title: 'Special Mercy Attempt Permission for B.Tech Enrolled Students (Batch 2017 & earlier)',
    date: '28-Sep-2026',
    category: 'Mercy Attempt',
    isImportant: false,
    pdfUrl: 'https://www.rtu.ac.in/index/'
  },
  {
    id: 'notice-4',
    noticeNumber: 'RTU/CE/Reval/2026/621',
    title: 'Guidelines and fee structure for Revaluation & Inspection of Answer Books for Winter 2025-26',
    date: '20-Sep-2026',
    category: 'Revaluation',
    isImportant: false,
    pdfUrl: 'https://www.rtu.ac.in/index/'
  }
];

export const initialCodingProblems: CodingProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '54.2%',
    solved: true,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. Frequently asked in JECRC placement coding rounds (TCS Digital, Infosys SP, Cognizant GenC Next).',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []`
    },
    testCases: [
      { id: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { id: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { id: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack & String Parsing',
    acceptanceRate: '41.8%',
    solved: true,
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets in correct order. Common RTU Data Structures (3CS4-05) stack application.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0`
    },
    testCases: [
      { id: 1, input: 's = "()[]{}"', expected: 'true' },
      { id: 2, input: 's = "(]"', expected: 'false' },
      { id: 3, input: 's = "{[]}"', expected: 'true' }
    ]
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    acceptanceRate: '34.9%',
    solved: false,
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const set = new Set();
  
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`
    },
    testCases: [
      { id: 1, input: 's = "abcabcbb"', expected: '3' },
      { id: 2, input: 's = "bbbbb"', expected: '1' },
      { id: 3, input: 's = "pwwkew"', expected: '3' }
    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Sorting & Arrays',
    acceptanceRate: '47.5%',
    solved: false,
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of non-overlapping intervals.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }
  return result;
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals[1:]:
        prev = merged[-1]
        if current[0] <= prev[1]:
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)
    return merged`
    },
    testCases: [
      { id: 1, input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { id: 2, input: 'intervals = [[1,4],[4,5]]', expected: '[[1,5]]' }
    ]
  }
];
