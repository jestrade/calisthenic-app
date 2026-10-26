import React from 'react';
import { CompletedWorkoutLog } from '../types/workout';
import { formatTimeMMSS, getTodayDateString } from '../utils/workoutLogic';
import { WEEKDAY_ORDER, WORKOUT_PLANS } from '../data/workoutData';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  Flame,
  Clock,
  Calendar,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  LogIn,
  ShieldCheck,
  User,
  Sliders
} from 'lucide-react';

export const ProgressTrackerView: React.FC = () => {
  const { t, language } = useTranslation();
  const {
    user,
    userProfile,
    records,
    streak,
    signInWithGoogle,
    clearRecords,
    seedDemoRecord,
    openProfileModal
  } = useAuth();

  const totalMinutes = Math.round(
    records.reduce((acc, log) => acc + log.durationSeconds, 0) / 60
  );
  const totalCalories = records.reduce((acc, log) => acc + log.caloriesBurned, 0);

  const completedDaySet = new Set(records.map((l) => l.dayOfWeek));

  const handleSeedDemo = () => {
    const demoLog: CompletedWorkoutLog = {
      id: `record-${Date.now()}`,
      dateStr: getTodayDateString(),
      dayOfWeek: 'monday',
      workoutTitle: WORKOUT_PLANS.monday.title,
      completedAt: new Date().toISOString(),
      durationSeconds: 1800,
      caloriesBurned: 260,
      difficulty: 'intermediate'
    };
    seedDemoRecord(demoLog);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Athlete Status & Profile Card */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Avatar'}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-400/60 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-13 h-13 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {userProfile?.displayName || user?.displayName || t.guestUser}
              </h3>
              {user && (
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {t.profile.athleteCard}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">
              {user ? (
                <span>{user.email} &bull; {t.profile.cloudRecordsSaved}</span>
              ) : (
                <span className="text-amber-700 font-medium">{t.signInToTrack}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {user ? (
            <button
              onClick={openProfileModal}
              className="w-full sm:w-auto py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 min-h-[38px]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.profile.editTitle}</span>
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 min-h-[38px] whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.signInWithGoogle}</span>
            </button>
          )}
        </div>
      </section>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
              {language === 'es' ? 'RACHA' : 'STREAK'}
            </span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
            {streak.currentStreak}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            {t.streakCount} ({t.streakBest}: {streak.bestStreak})
          </span>
        </div>

        {/* Total Workouts */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-blue-500 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
              {language === 'es' ? 'SESIONES' : 'SESSIONS'}
            </span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
            {records.length}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            {t.sessionsCompleted}
          </span>
        </div>

        {/* Total Minutes */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-500 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
              {language === 'es' ? 'TIEMPO' : 'TIME'}
            </span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
            {totalMinutes}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            {t.minutesOnFloor}
          </span>
        </div>

        {/* Calories Burned */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-rose-500 mb-2">
            <Zap className="w-5 h-5" />
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
              {language === 'es' ? 'ENERGÍA' : 'ENERGY'}
            </span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
            {totalCalories}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            {t.caloriesBurned}
          </span>
        </div>
      </div>

      {/* Monday through Friday Weekly Consistency Tracker */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {t.weeklyConsistency}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.weeklySubtitle}
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            {completedDaySet.size}/5 {language === 'es' ? 'DÍAS' : 'DAYS'}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {WEEKDAY_ORDER.map((d) => {
            const isDone = completedDaySet.has(d);
            const plan = WORKOUT_PLANS[d];
            const dayTr = t.days[d];
            return (
              <div
                key={d}
                className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {dayTr.short}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 truncate max-w-full">
                  {d === 'monday' ? (language === 'es' ? 'Empuje' : 'Push') :
                   d === 'tuesday' ? (language === 'es' ? 'Tracción' : 'Pull') :
                   d === 'wednesday' ? (language === 'es' ? 'Pierna' : 'Legs') :
                   d === 'thursday' ? (language === 'es' ? 'Core' : 'Core') : 'HIIT'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout History Log */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 font-display">
            {t.completedHistory}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedDemo}
              className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
              title="Add a sample completed session"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.simulateCompleted}</span>
            </button>
            {records.length > 0 && (
              <button
                onClick={clearRecords}
                className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-colors flex items-center gap-1"
                title="Reset log history"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetHistory}</span>
              </button>
            )}
          </div>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
            <Activity className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">{t.noWorkoutsLogged}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.startTodayToLog}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {records.slice().reverse().map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {log.workoutTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                      <span className="capitalize">{log.dayOfWeek}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span>{log.dateStr}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span className="capitalize">{t.levels[log.difficulty] || log.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-slate-900 block tabular-nums">
                    {formatTimeMMSS(log.durationSeconds)}
                  </span>
                  <span className="text-xs text-amber-600 tabular-nums">
                    ~{log.caloriesBurned} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
