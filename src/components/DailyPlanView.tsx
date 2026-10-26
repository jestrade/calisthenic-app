import React, { useState } from 'react';
import { DailyWorkoutPlan, DayOfWeek, DifficultyLevel, Exercise } from '../types/workout';
import { WORKOUT_PLANS, WEEKDAY_ORDER } from '../data/workoutData';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getLocalizedPlan, getLocalizedExercise } from '../utils/localizedWorkout';
import {
  Play,
  Clock,
  Flame,
  ChevronRight,
  Sliders,
  Calendar,
  Info,
  Sparkles,
  LogIn,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface DailyPlanViewProps {
  currentDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  difficulty: DifficultyLevel;
  onChangeDifficulty: (lvl: DifficultyLevel) => void;
  onStartWorkout: (plan: DailyWorkoutPlan) => void;
  onOpenMovementLab: (ex: Exercise) => void;
}

export const DailyPlanView: React.FC<DailyPlanViewProps> = ({
  currentDay,
  onSelectDay,
  difficulty,
  onChangeDifficulty,
  onStartWorkout,
  onOpenMovementLab
}) => {
  const { t, language } = useTranslation();
  const { user, signInWithGoogle, openProfileModal } = useAuth();
  const [selectedPhaseTab, setSelectedPhaseTab] = useState<'main' | 'warmup' | 'cooldown'>('main');

  const rawPlan = WORKOUT_PLANS[currentDay];
  const plan = getLocalizedPlan(rawPlan, language);
  const isWeekend = currentDay === 'saturday' || currentDay === 'sunday';

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Google Authentication Notification Banner if unauthenticated */}
      {!user && (
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                {t.signInToTrack}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.authRequiredToSave}
              </p>
            </div>
          </div>

          <button
            onClick={signInWithGoogle}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shrink-0 shadow-md shadow-amber-500/20 active:scale-[0.98] min-h-[38px] whitespace-nowrap"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInWithGoogle}</span>
          </button>
        </section>
      )}

      {/* 5-Day Monday-to-Friday Horizontal Navigation Bar */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            {t.weeklyConsistency} &bull; Mon - Fri
          </span>
          <span className="text-xs font-medium text-slate-400 hidden sm:inline">
            30 Mins Daily Coaching
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {WEEKDAY_ORDER.map((d) => {
            const rawP = WORKOUT_PLANS[d];
            const p = getLocalizedPlan(rawP, language);
            const isSelected = currentDay === d;
            const dayTr = t.days[d];
            return (
              <button
                key={d}
                onClick={() => onSelectDay(d)}
                className={`py-2.5 px-2 rounded-xl text-left transition-all min-h-[58px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-2 ring-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-bold uppercase tracking-wider font-mono ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                    Day 0{rawP.dayNumber}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </div>
                <div className="truncate">
                  <span className="text-xs sm:text-sm font-bold block truncate">
                    <span className="inline sm:hidden">{dayTr.short}</span>
                    <span className="hidden sm:inline">{dayTr.name}</span>
                  </span>
                  <span className={`text-[10px] block truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {d === 'monday' ? (language === 'es' ? 'Fuerza Empuje' : 'Push Power') :
                     d === 'tuesday' ? (language === 'es' ? 'Tracción' : 'Pull Back') :
                     d === 'wednesday' ? (language === 'es' ? 'Pierna/Cadera' : 'Legs & Hips') :
                     d === 'thursday' ? (language === 'es' ? 'Core Firme' : 'Core Stability') :
                     (language === 'es' ? 'HIIT Final' : 'HIIT Finale')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Weekend Quick Selector */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs px-1 text-slate-500">
          <span>{language === 'es' ? 'Fines de semana dedicados a recuperación activa' : 'Weekends are designated Active Recovery'}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectDay('saturday')}
              className={`px-2.5 py-1 rounded-md transition-colors ${currentDay === 'saturday' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:text-slate-900'}`}
            >
              {t.days.saturday.name}
            </button>
            <span aria-hidden="true">&bull;</span>
            <button
              onClick={() => onSelectDay('sunday')}
              className={`px-2.5 py-1 rounded-md transition-colors ${currentDay === 'sunday' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:text-slate-900'}`}
            >
              {t.days.sunday.name}
            </button>
          </div>
        </div>
      </section>

      {/* Hero Coach Briefing Card */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl">
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                  {plan.dayLabel} &bull; {language === 'es' ? 'Briefing del Coach' : 'Coach Briefing'}
                </span>
                <span className="text-xs text-slate-400 font-mono">&bull; 30 Mins</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 mb-1 font-display tracking-tight">
                {plan.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {plan.tagline}
              </p>

              {/* Coach Quote */}
              <div className="mt-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Coach:</strong> &ldquo;{plan.coachQuote}&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Start Button */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="flex items-center gap-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white tabular-nums font-mono">30 Mins</span>
              </div>
              <span className="text-slate-600">&bull;</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white tabular-nums font-mono">~{plan.estimatedCalories} kcal</span>
              </div>
            </div>

            <button
              onClick={() => onStartWorkout(plan)}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap min-h-[48px]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isWeekend ? (language === 'es' ? 'Iniciar Flujo Movilidad' : 'Start Mobility Flow') : `${t.start30MinShort} (${plan.dayLabel})`}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Routine Configuration Toolbar: Difficulty & Phase Selector */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        {/* Difficulty Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> {t.level}:
          </span>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onChangeDifficulty(lvl)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors min-h-[32px] ${
                  difficulty === lvl
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {t.levels[lvl]}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setSelectedPhaseTab('warmup')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${
              selectedPhaseTab === 'warmup' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.phases.warmup}
          </button>
          <button
            onClick={() => setSelectedPhaseTab('main')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${
              selectedPhaseTab === 'main' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.phases.main}
          </button>
          <button
            onClick={() => setSelectedPhaseTab('cooldown')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors min-h-[32px] ${
              selectedPhaseTab === 'cooldown' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.phases.cooldown}
          </button>
        </div>
      </section>

      {/* 30-Minute Architecture Visual Timeline */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {selectedPhaseTab === 'warmup' && t.phaseTitles.warmupFull}
              {selectedPhaseTab === 'main' && `${t.phaseTitles.mainFull} - ${plan.mainPhase.title}`}
              {selectedPhaseTab === 'cooldown' && t.phaseTitles.cooldownFull}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedPhaseTab === 'warmup' && plan.warmupPhase.coachInstruction}
              {selectedPhaseTab === 'main' && plan.mainPhase.coachInstruction}
              {selectedPhaseTab === 'cooldown' && plan.cooldownPhase.coachInstruction}
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
            {selectedPhaseTab === 'warmup' ? '4 MINS' : selectedPhaseTab === 'main' ? '22 MINS' : '4 MINS'}
          </span>
        </div>

        {/* Exercises Grid for Selected Phase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(selectedPhaseTab === 'warmup'
            ? plan.warmupPhase.exercises
            : selectedPhaseTab === 'main'
            ? plan.mainPhase.exercises
            : plan.cooldownPhase.exercises
          ).map((exercise, index) => {
            const locEx = getLocalizedExercise(exercise, language);
            return (
              <div
                key={exercise.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-mono">
                    <span>{language === 'es' ? 'EJERCICIO' : 'EXERCISE'} {String(index + 1).padStart(2, '0')}</span>
                    <span className="text-slate-700 font-semibold">{locEx.repsTarget}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {locEx.name}
                  </h4>

                  {/* Target Muscles */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 mb-2">
                    <span>{locEx.primaryMuscles.join(', ')}</span>
                    {locEx.secondaryMuscles.length > 0 && (
                      <>
                        <span aria-hidden="true">&bull;</span>
                        <span className="text-slate-500">{locEx.secondaryMuscles[0]}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-normal line-clamp-2 italic mb-3">
                    &ldquo;{locEx.coachCue}&rdquo;
                  </p>
                </div>

                {/* Action: Open Movement Lab */}
                <button
                  onClick={() => onOpenMovementLab(locEx)}
                  className="w-full py-2 px-3 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[36px]"
                >
                  <span>{t.movementLab.inspectMovement}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Coach Daily Form Deep-Dive Spotlight */}
      <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono">
              {language === 'es' ? `Regla de Oro del Coach para el ${plan.dayLabel}` : `Coach’s Gold Standard Form Rule for ${plan.dayLabel}`}
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed">
              {plan.coachDailyTip}
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenMovementLab(plan.mainPhase.exercises[0])}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 whitespace-nowrap min-h-[38px]"
        >
          {language === 'es' ? `Ver Gráfico de ${plan.mainPhase.exercises[0]?.shortName}` : `Watch ${plan.mainPhase.exercises[0]?.shortName} Graphic`}
        </button>
      </section>
    </div>
  );
};
