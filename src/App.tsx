/**
 * Calisthenics Coach 30 - 5-Day Movement Mastery
 * Structured 30-minute coached calisthenics routines with biomechanical movement graphics.
 * Features i18n (Spanish & English), Google Authentication, and Athlete Profile Creation.
 */

import React, { useState, useEffect } from 'react';
import { DayOfWeek, DifficultyLevel, DailyWorkoutPlan, Exercise, CompletedWorkoutLog } from './types/workout';
import { WORKOUT_PLANS } from './data/workoutData';
import { getDayOfWeekFromDate, getTodayDateString } from './utils/workoutLogic';
import { DailyPlanView } from './components/DailyPlanView';
import { FiveDayCurriculumView } from './components/FiveDayCurriculumView';
import { MovementLabView } from './components/MovementLabView';
import { ProgressTrackerView } from './components/ProgressTrackerView';
import { MovementLabModal } from './components/MovementLabModal';
import { ProfileModal } from './components/ProfileModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  Play,
  Flame,
  Globe,
  LogIn,
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

function MainApp() {
  const { t, language, setLanguage } = useTranslation();
  const {
    user,
    userProfile,
    records,
    streak,
    signInWithGoogle,
    openProfileModal,
    saveWorkoutRecord
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'today' | 'curriculum' | 'movement_lab' | 'progress'>('today');

  const [currentDay, setCurrentDay] = useState<DayOfWeek>(() => {
    const today = getDayOfWeekFromDate(new Date());
    return (today === 'saturday' || today === 'sunday') ? 'monday' : today;
  });

  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => {
    return userProfile?.fitnessLevel || 'intermediate';
  });

  useEffect(() => {
    if (userProfile?.fitnessLevel) {
      setDifficulty(userProfile.fitnessLevel);
    }
  }, [userProfile]);

  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState<DailyWorkoutPlan | null>(null);
  const [labModalExercise, setLabModalExercise] = useState<Exercise | null>(null);

  // Check for ?autostart=1 query param (mandated for verification testing)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setActiveWorkoutPlan(WORKOUT_PLANS[currentDay]);
      }
    }
  }, [currentDay]);

  const handleFinishWorkout = async (newLog: CompletedWorkoutLog) => {
    await saveWorkoutRecord(newLog);
    setActiveWorkoutPlan(null);
    setActiveTab('progress');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* 
        TOP BAR CONTRACT:
        [Brand title, one line] — [4-5 nav links, single-line] — [1 primary action]
        Separated by gap-8.
      */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              setActiveTab('today');
              setActiveWorkoutPlan(null);
            }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-600 transition-colors flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm">
              30
            </div>
            <span className="font-display">{t.brandTitle}</span>
          </button>

          {/* Zone 2: 4-5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('today')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'today' ? 'text-slate-950 border-b-2 border-slate-900 font-bold' : ''
              }`}
            >
              {t.navToday}
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'curriculum' ? 'text-slate-950 border-b-2 border-slate-900 font-bold' : ''
              }`}
            >
              {t.navProgram}
            </button>
            <button
              onClick={() => setActiveTab('movement_lab')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'movement_lab' ? 'text-slate-950 border-b-2 border-slate-900 font-bold' : ''
              }`}
            >
              {t.navLab}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'progress' ? 'text-slate-950 border-b-2 border-slate-900 font-bold' : ''
              }`}
            >
              {t.navLogs}
            </button>
            <button
              onClick={openProfileModal}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
            >
              <span>{t.navProfile}</span>
              {user && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </button>
          </nav>

          {/* Zone 3: Language toggle, User Account & Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher (EN / ES) */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
                  language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
                  language === 'es' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
            </div>

            {/* Google Authentication Trigger / Athlete Pill */}
            {user ? (
              <button
                onClick={openProfileModal}
                className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors min-h-[38px]"
                title={user.email || 'Profile'}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="hidden lg:inline text-xs font-bold text-slate-800 truncate max-w-[100px]">
                  {userProfile?.displayName || user.displayName?.split(' ')[0] || 'Athlete'}
                </span>
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap min-h-[38px]"
                title={t.signInToTrack}
              >
                <LogIn className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.signInWithGoogle}</span>
              </button>
            )}

            {/* Streak Badge */}
            {streak.currentStreak > 0 && (
              <span className="hidden xl:flex items-center gap-1 text-xs font-bold text-amber-600 font-mono bg-amber-50 px-2 py-1 rounded-md">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                {streak.currentStreak}d
              </span>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => setActiveWorkoutPlan(WORKOUT_PLANS[currentDay])}
              className="px-3 sm:px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-sm shadow-amber-500/20 active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5 min-h-[38px]"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">{t.start30Min}</span>
              <span className="sm:hidden">{t.start30MinShort}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-white px-2 py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-2 py-1 font-bold whitespace-nowrap ${
              activeTab === 'today' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
            }`}
          >
            {t.navToday}
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-2 py-1 font-bold whitespace-nowrap ${
              activeTab === 'curriculum' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
            }`}
          >
            {t.navProgram}
          </button>
          <button
            onClick={() => setActiveTab('movement_lab')}
            className={`px-2 py-1 font-bold whitespace-nowrap ${
              activeTab === 'movement_lab' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
            }`}
          >
            {t.navLab}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-2 py-1 font-bold whitespace-nowrap ${
              activeTab === 'progress' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
            }`}
          >
            {t.navLogs}
          </button>
          <button
            onClick={openProfileModal}
            className="px-2 py-1 font-bold text-slate-500 whitespace-nowrap"
          >
            {t.navProfile}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'today' && (
          <DailyPlanView
            currentDay={currentDay}
            onSelectDay={setCurrentDay}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            onStartWorkout={(plan) => setActiveWorkoutPlan(plan)}
            onOpenMovementLab={(exercise) => setLabModalExercise(exercise)}
          />
        )}

        {activeTab === 'curriculum' && (
          <FiveDayCurriculumView
            onSelectDay={(day) => {
              setCurrentDay(day);
              setActiveTab('today');
            }}
            onStartWorkout={(plan) => setActiveWorkoutPlan(plan)}
            onOpenMovementLab={(exercise) => setLabModalExercise(exercise)}
          />
        )}

        {activeTab === 'movement_lab' && (
          <MovementLabView />
        )}

        {activeTab === 'progress' && (
          <ProgressTrackerView />
        )}
      </main>

      {/* Movement Lab Inspection Modal */}
      <MovementLabModal
        exercise={labModalExercise}
        onClose={() => setLabModalExercise(null)}
      />

      {/* Profile Creation / Editing Modal */}
      <ProfileModal />

      {/* Active 30-Minute Workout Player Overlay */}
      {activeWorkoutPlan && (
        <WorkoutPlayer
          plan={activeWorkoutPlan}
          difficulty={difficulty}
          voiceCoachEnabled={true}
          soundFxEnabled={true}
          onFinish={handleFinishWorkout}
          onExit={() => setActiveWorkoutPlan(null)}
        />
      )}

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{t.brandTitle}</span>
            <span aria-hidden="true">&bull;</span>
            <span>{t.brandSubtitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>30 Mins Daily</span>
            <span aria-hidden="true">&bull;</span>
            <span>Google Auth &amp; Cloud Tracking</span>
            <span aria-hidden="true">&bull;</span>
            <span>Active Recovery Weekends</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
