import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Code2,
  Flame,
  Play,
  RotateCcw,
  Send,
  Terminal,
  Clock,
  Layers,
  ChevronRight,
  BookMarked,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Building2
} from 'lucide-react';
import type { CodingProblem, StudentProfile, ProblemDifficulty } from '../types/index.ts';
import { calculateAcademicProgress, evaluateCodeSubmission } from '../utils/academic-logic.ts';

interface StudentDashboardProps {
  profile: StudentProfile;
  problems: CodingProblem[];
  onSolveProblem: (problemId: string) => void;
  savedResourcesCount: number;
  onOpenResources: () => void;
  onOpenUpload: () => void;
  onOpenRtuResults?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  problems,
  onSolveProblem,
  savedResourcesCount,
  onOpenResources,
  onOpenUpload,
  onOpenRtuResults
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(problems[0]?.id || 'two-sum');
  const [activeLanguage, setActiveLanguage] = useState<'javascript' | 'python'>('javascript');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | ProblemDifficulty>('All');
  const [userCodeMap, setUserCodeMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    problems.forEach((p) => {
      initialMap[`${p.id}_javascript`] = p.starterCode.javascript;
      initialMap[`${p.id}_python`] = p.starterCode.python;
    });
    return initialMap;
  });

  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [executionResult, setExecutionResult] = useState<{
    status: 'idle' | 'running' | 'success' | 'error';
    feedback: string;
    runtimeMs: number;
    memoryMb: number;
    passedTests: number;
    totalTests: number;
  }>({
    status: 'idle',
    feedback: '',
    runtimeMs: 0,
    memoryMb: 0,
    passedTests: 0,
    totalTests: 0
  });

  const activeProblem = problems.find((p) => p.id === selectedProblemId) || problems[0];
  const currentCode =
    userCodeMap[`${activeProblem.id}_${activeLanguage}`] ?? activeProblem.starterCode[activeLanguage];

  const solvedCount = problems.filter((p) => p.solved).length;
  const metrics = calculateAcademicProgress(
    profile.creditsCompleted,
    profile.totalCredits,
    solvedCount,
    problems.length
  );

  const filteredProblems = problems.filter((p) => {
    if (difficultyFilter === 'All') return true;
    return p.difficulty === difficultyFilter;
  });

  const handleCodeChange = (newCode: string) => {
    setUserCodeMap((prev) => ({
      ...prev,
      [`${activeProblem.id}_${activeLanguage}`]: newCode
    }));
  };

  const handleResetCode = () => {
    setUserCodeMap((prev) => ({
      ...prev,
      [`${activeProblem.id}_${activeLanguage}`]: activeProblem.starterCode[activeLanguage]
    }));
    setExecutionResult({
      status: 'idle',
      feedback: '',
      runtimeMs: 0,
      memoryMb: 0,
      passedTests: 0,
      totalTests: 0
    });
  };

  const handleRunCode = () => {
    setExecutionResult({
      status: 'running',
      feedback: 'Compiling code against test cases...',
      runtimeMs: 0,
      memoryMb: 0,
      passedTests: 0,
      totalTests: activeProblem.testCases.length
    });

    setTimeout(() => {
      const evaluation = evaluateCodeSubmission(activeProblem, currentCode, activeLanguage);
      setExecutionResult({
        status: evaluation.passed ? 'success' : 'error',
        feedback: evaluation.feedback,
        runtimeMs: evaluation.runtimeMs,
        memoryMb: evaluation.memoryMb,
        passedTests: evaluation.passedTestsCount,
        totalTests: evaluation.totalTestsCount
      });
    }, 400);
  };

  const handleSubmitSolution = () => {
    setExecutionResult({
      status: 'running',
      feedback: 'Evaluating entire test suite on sandbox runner...',
      runtimeMs: 0,
      memoryMb: 0,
      passedTests: 0,
      totalTests: activeProblem.testCases.length
    });

    setTimeout(() => {
      const evaluation = evaluateCodeSubmission(activeProblem, currentCode, activeLanguage);
      if (evaluation.passed) {
        setExecutionResult({
          status: 'success',
          feedback: 'Solution Accepted! Passed all test cases. Ready for campus placement coding rounds.',
          runtimeMs: evaluation.runtimeMs,
          memoryMb: evaluation.memoryMb,
          passedTests: evaluation.totalTestsCount,
          totalTests: evaluation.totalTestsCount
        });
        onSolveProblem(activeProblem.id);
      } else {
        setExecutionResult({
          status: 'error',
          feedback: evaluation.feedback,
          runtimeMs: evaluation.runtimeMs,
          memoryMb: evaluation.memoryMb,
          passedTests: evaluation.passedTestsCount,
          totalTests: evaluation.totalTestsCount
        });
      }
    }, 600);
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              JECRC Foundation · Student Academic Profile
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Student Dashboard
            </h1>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              Real-time RTU Kota degree credit tracker, internal evaluation standing, and the competitive Practice Arena for campus placements.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">{profile.name}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-600 font-semibold">{profile.rollNumber}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {profile.major} · {profile.semester}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {profile.college}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Progress Tracker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Degree Credits */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">RTU Degree Credits</span>
            <span className="font-semibold text-indigo-600 tabular-nums">
              {metrics.creditPercentage}%
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {profile.creditsCompleted}
              <span className="text-sm font-normal text-slate-400"> / {profile.totalCredits}</span>
            </span>
            <span className="block text-xs text-slate-500 mt-0.5">Credits Completed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.creditPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Cumulative CGPA (10-point scale) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Academic Standing</span>
            <span className="font-semibold text-emerald-600">First Class (Dist.)</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {profile.cgpa.toFixed(2)}
              <span className="text-sm font-normal text-slate-400"> / 10.00</span>
            </span>
            <span className="block text-xs text-slate-500 mt-0.5">Cumulative CGPA</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Top 5% in JECRC CSE Department
          </p>
        </div>

        {/* Metric 3: Study Streak */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Preparation Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {profile.studyStreakDays} Days
            </span>
            <span className="block text-xs text-slate-500 mt-0.5">Active Campus Streak</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Pre-exam revision &amp; practice consistency
          </p>
        </div>

        {/* Metric 4: Placement Coding Questions Solved */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Placement Prep Solved</span>
            <span className="font-semibold text-indigo-600 tabular-nums">
              {metrics.practicePercentage}%
            </span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {solvedCount}
              <span className="text-sm font-normal text-slate-400"> / {problems.length}</span>
            </span>
            <span className="block text-xs text-slate-500 mt-0.5">Arena Puzzles Cleared</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${metrics.practicePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Practice Arena: Styled like competitive coding platforms (LeetCode / HackerRank) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Practice Arena
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Curated coding problems asked in JECRC on-campus recruitment drives &amp; national hackathons.
            </p>
          </div>

          {/* Quick Problem Difficulty Filters */}
          <div className="flex items-center gap-1.5">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* LeetCode/HackerRank Style Split Workspace */}
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
          {/* Arena Top Toolbar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Problem Selection Selector */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-medium">Problem:</span>
              <select
                value={selectedProblemId}
                onChange={(e) => {
                  setSelectedProblemId(e.target.value);
                  setExecutionResult({
                    status: 'idle',
                    feedback: '',
                    runtimeMs: 0,
                    memoryMb: 0,
                    passedTests: 0,
                    totalTests: 0
                  });
                }}
                className="bg-slate-900 text-slate-200 border border-slate-700 rounded-md px-3 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {filteredProblems.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.solved ? '✓ ' : '○ '} {p.title} ({p.difficulty})
                  </option>
                ))}
              </select>

              {activeProblem.solved && (
                <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                </span>
              )}
            </div>

            {/* Language & Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveLanguage('javascript')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeLanguage === 'javascript'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  JavaScript
                </button>
                <button
                  onClick={() => setActiveLanguage('python')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeLanguage === 'python'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Python 3
                </button>
              </div>

              <button
                onClick={handleResetCode}
                title="Reset code to original starter template"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                aria-label="Reset Code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Code Arena Grid (Split Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Column: Problem Statement & Examples (5 cols) */}
            <div className="lg:col-span-5 p-5 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 overflow-y-auto max-h-[640px] text-slate-300 space-y-5">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {activeProblem.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      activeProblem.difficulty === 'Easy'
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                        : activeProblem.difficulty === 'Medium'
                        ? 'text-amber-400 bg-amber-950/60 border border-amber-800/50'
                        : 'text-rose-400 bg-rose-950/60 border border-rose-800/50'
                    }`}
                  >
                    {activeProblem.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{activeProblem.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Acceptance: {activeProblem.acceptanceRate}</span>
                </div>
              </div>

              {/* Description Body */}
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {activeProblem.description}
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Examples
                </span>
                {activeProblem.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 rounded-lg p-3 border border-slate-800/80 text-xs font-mono space-y-1.5"
                  >
                    <p className="text-slate-400">
                      <strong className="text-slate-300 font-sans">Input:</strong> {ex.input}
                    </p>
                    <p className="text-slate-400">
                      <strong className="text-slate-300 font-sans">Output:</strong>{' '}
                      <span className="text-emerald-400">{ex.output}</span>
                    </p>
                    {ex.explanation && (
                      <p className="text-slate-500 font-sans text-[11px] pt-1">
                        <strong>Explanation:</strong> {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Constraints
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-400">
                  {activeProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Code Editor & Test Console (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950">
              {/* Code Editor Area */}
              <div className="relative flex-1 p-4 bg-slate-950 font-mono text-xs text-slate-100 min-h-[340px]">
                <label htmlFor="code-editor-input" className="sr-only">
                  Code Editor
                </label>
                <textarea
                  id="code-editor-input"
                  value={currentCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full min-h-[320px] bg-transparent text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-indigo-600/50"
                  placeholder="// Write your solution here"
                />
              </div>

              {/* Test Cases & Console Drawer */}
              <div className="border-t border-slate-800 bg-slate-900/90 p-4 space-y-3">
                {/* Test case tabs */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400 font-medium">Testcases:</span>
                    {activeProblem.testCases.map((tc, idx) => (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestCaseIndex(idx)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          activeTestCaseIndex === idx
                            ? 'bg-slate-800 text-white font-medium border border-slate-700'
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Execution Stats */}
                  {executionResult.status !== 'idle' && (
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 tabular-nums">
                      {executionResult.runtimeMs > 0 && (
                        <span>Runtime: {executionResult.runtimeMs} ms</span>
                      )}
                      {executionResult.memoryMb > 0 && (
                        <span>Memory: {executionResult.memoryMb} MB</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Active Test Case Detail */}
                <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800 text-xs font-mono">
                  <div className="text-slate-400">
                    <span className="text-slate-500 font-sans">Input: </span>
                    {activeProblem.testCases[activeTestCaseIndex]?.input}
                  </div>
                  <div className="text-slate-400 mt-1">
                    <span className="text-slate-500 font-sans">Expected: </span>
                    <span className="text-emerald-400">
                      {activeProblem.testCases[activeTestCaseIndex]?.expected}
                    </span>
                  </div>
                </div>

                {/* Execution Result Banner */}
                {executionResult.status !== 'idle' && (
                  <div
                    className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                      executionResult.status === 'success'
                        ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-200'
                        : executionResult.status === 'error'
                        ? 'bg-rose-950/60 border border-rose-800/80 text-rose-200'
                        : 'bg-indigo-950/60 border border-indigo-800/80 text-indigo-200'
                    }`}
                  >
                    {executionResult.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Terminal className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{executionResult.feedback}</p>
                      {executionResult.totalTests > 0 && (
                        <p className="text-[11px] opacity-80 mt-0.5">
                          Test cases passed: {executionResult.passedTests} / {executionResult.totalTests}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={handleRunCode}
                    disabled={executionResult.status === 'running'}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-300" />
                    <span>Run Code</span>
                  </button>

                  <button
                    onClick={handleSubmitSolution}
                    disabled={executionResult.status === 'running'}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
