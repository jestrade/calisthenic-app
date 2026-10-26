import React, { useState, useEffect } from 'react';
import { DailyWorkoutPlan, DifficultyLevel, CompletedWorkoutLog } from '../types/workout';
import { buildWorkoutTimeline, formatTimeMMSS, estimateCalories, getTodayDateString } from '../utils/workoutLogic';
import { coachAudio } from '../utils/coachAudio';
import { ExerciseKineticGraphic } from './ExerciseKineticGraphic';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getLocalizedExercise } from '../utils/localizedWorkout';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  X,
  CheckCircle2,
  Award,
  Flame,
  Clock,
  Sparkles,
  LogIn,
  ShieldAlert,
  Plus,
  Minus
} from 'lucide-react';

interface WorkoutPlayerProps {
  plan: DailyWorkoutPlan;
  difficulty: DifficultyLevel;
  voiceCoachEnabled: boolean;
  soundFxEnabled: boolean;
  onFinish: (log: CompletedWorkoutLog) => void;
  onExit: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  plan,
  difficulty,
  voiceCoachEnabled: initialVoice,
  soundFxEnabled: initialSound,
  onFinish,
  onExit
}) => {
  const { t, language } = useTranslation();
  const { user, signInWithGoogle, saveWorkoutRecord } = useAuth();

  const [timeline] = useState(() => buildWorkoutTimeline(plan, difficulty));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(() => timeline[0]?.durationSec || 40);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(initialVoice);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialSound);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState<number>(0);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const rawItem = timeline[currentIndex] || timeline[0];
  const currentItem = {
    ...rawItem,
    exercise: getLocalizedExercise(rawItem.exercise, language),
    coachCue: getLocalizedExercise(rawItem.exercise, language).coachCue
  };
  const rawNext = currentIndex < timeline.length - 1 ? timeline[currentIndex + 1] : null;
  const nextItem = rawNext ? {
    ...rawNext,
    exercise: getLocalizedExercise(rawNext.exercise, language)
  } : null;

  const totalSessionSeconds = timeline.reduce((acc, it) => acc + it.durationSec, 0);

  // Audio & Voice cues on interval transitions
  useEffect(() => {
    if (!currentItem || isCompleted) return;

    if (soundEnabled) {
      if (currentItem.type === 'work') {
        coachAudio.playWorkChime();
      } else {
        coachAudio.playRestChime();
      }
    }

    if (voiceEnabled) {
      if (currentItem.type === 'work') {
        const spoken = language === 'es'
          ? `Iniciando ${currentItem.exercise.name}. ${currentItem.coachCue}`
          : `Start ${currentItem.exercise.name}. ${currentItem.coachCue}`;
        coachAudio.speakCue(spoken, voiceEnabled, language);
      } else {
        const spoken = language === 'es'
          ? `Descanso de ${currentItem.durationSec} segundos. Siguiente ejercicio: ${nextItem?.exercise.name || 'siguiente serie'}.`
          : `Rest for ${currentItem.durationSec} seconds. Next up is ${nextItem?.exercise.name || 'the next set'}.`;
        coachAudio.speakCue(spoken, voiceEnabled, language);
      }
    }
  }, [currentIndex, isCompleted, language]);

  // Main countdown timer interval
  useEffect(() => {
    if (isPaused || isCompleted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 4 && prev > 1 && soundEnabled) {
          coachAudio.playCountdownTick();
        }

        if (prev <= 1) {
          if (currentIndex < timeline.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            return timeline[nextIdx].durationSec;
          } else {
            triggerCompletion();
            return 0;
          }
        }
        return prev - 1;
      });

      setTotalSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isCompleted, currentIndex, timeline, soundEnabled]);

  const triggerCompletion = () => {
    setIsCompleted(true);
    if (soundEnabled) {
      coachAudio.playVictoryFanfare();
    }
    if (voiceEnabled) {
      const victoryText = language === 'es'
        ? "¡Trabajo sobresaliente! Has completado la sesión de 30 minutos de hoy. Inicia la recuperación."
        : "Outstanding work! You have finished today's 30-minute session. Recovery mode initiated.";
      coachAudio.speakCue(victoryText, voiceEnabled, language);
    }
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleNext = () => {
    if (currentIndex < timeline.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTimeRemaining(timeline[nextIdx].durationSec);
    } else {
      triggerCompletion();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setTimeRemaining(timeline[prevIdx].durationSec);
    }
  };

  const adjustTime = (deltaSec: number) => {
    setTimeRemaining((prev) => Math.max(5, prev + deltaSec));
  };

  const handleSaveAndFinish = async () => {
    const actualSeconds = Math.max(totalSecondsElapsed, 1800);
    const calories = estimateCalories(actualSeconds, difficulty);
    const log: CompletedWorkoutLog = {
      id: `log-${Date.now()}`,
      dateStr: getTodayDateString(),
      dayOfWeek: plan.day,
      workoutTitle: plan.title,
      completedAt: new Date().toISOString(),
      durationSeconds: actualSeconds,
      caloriesBurned: calories,
      difficulty
    };
    await saveWorkoutRecord(log);
    onFinish(log);
  };

  const handleGoogleSignInAndSave = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      // After sign-in, save the log
      await handleSaveAndFinish();
    } catch (err) {
      console.error('Sign-in during save failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Workout Completion Screen
  if (isCompleted) {
    const displayCalories = estimateCalories(Math.max(totalSecondsElapsed, 1800), difficulty);
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest font-mono">
            {t.workoutPlayer.coachedSession30}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2 font-display">
            {t.workoutPlayer.workoutCrushed}
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
            Coach’s note: &ldquo;{plan.coachQuote}&rdquo;
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {t.workoutPlayer.time}
              </span>
              <span className="text-xl font-bold text-white tabular-nums mt-1 font-mono">
                {totalSecondsElapsed > 60 ? formatTimeMMSS(totalSecondsElapsed) : '30:00'}
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-800">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> {t.workoutPlayer.burn}
              </span>
              <span className="text-xl font-bold text-amber-400 tabular-nums mt-1 font-mono">
                ~{displayCalories} kcal
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {t.workoutPlayer.focus}
              </span>
              <span className="text-xs font-semibold text-white mt-2 truncate max-w-[90px]">
                {plan.dayLabel}
              </span>
            </div>
          </div>

          {/* Google Auth Requirement Notice if not logged in */}
          {!user ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left mb-6">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.workoutPlayer.mustSignInToSave}</span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {t.workoutPlayer.signInPromptDesc}
              </p>
              <button
                onClick={handleGoogleSignInAndSave}
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signInWithGoogle} &amp; {t.workoutPlayer.logAndClaim}</span>
              </button>
            </div>
          ) : (
            <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleSaveAndFinish}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.workoutPlayer.logAndClaim}</span>
              </button>
              <button
                onClick={onExit}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
              >
                {t.workoutPlayer.close}
              </button>
            </div>
          )}

          {!user && (
            <button
              onClick={onExit}
              className="text-xs text-slate-400 hover:text-white transition-colors underline"
            >
              {language === 'es' ? 'Descartar sin registrar en Google' : 'Dismiss without saving to Google'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active Workout Player
  const progressPercent = Math.min(100, Math.round((totalSecondsElapsed / totalSessionSeconds) * 100));
  const isWork = currentItem.type === 'work';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-y-auto">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Exit session"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                {plan.dayLabel} &bull; {currentItem.phaseTitle}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md font-display">
              {currentItem.exercise.name}
            </h1>
          </div>
        </div>

        {/* Audio Toggles & Time Elapsed */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 uppercase font-mono block">
              {t.workoutPlayer.sessionTime}
            </span>
            <span className="text-sm font-bold text-slate-200 tabular-nums font-mono">
              {formatTimeMMSS(totalSecondsElapsed)} / {formatTimeMMSS(totalSessionSeconds)}
            </span>
          </div>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg border transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center ${
              voiceEnabled
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={voiceEnabled ? 'Voice coach enabled' : 'Voice coach muted'}
            aria-label="Toggle voice coach"
          >
            {voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center ${
              soundEnabled
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'Timer sounds on' : 'Timer sounds muted'}
            aria-label="Toggle timer sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Global Progress Line */}
      <div className="w-full bg-slate-900 h-1.5">
        <div
          className="bg-amber-500 h-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        {/* Left: Kinetic Graphic */}
        <div className="flex-1 flex flex-col justify-center">
          <ExerciseKineticGraphic
            exercise={currentItem.exercise}
            autoPlay={!isPaused}
            showControls={true}
          />
        </div>

        {/* Right: Timer HUD & Coach Cues */}
        <div className="w-full lg:w-96 flex flex-col justify-between gap-4">
          {/* Big Timer Card */}
          <div
            className={`p-6 rounded-2xl border text-center transition-all ${
              isWork
                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/30 shadow-[0_0_24px_rgba(245,158,11,0.08)]'
                : 'bg-slate-900/80 border-blue-500/30'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isWork
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {isWork ? t.workoutPlayer.workInterval : t.workoutPlayer.restRecover}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {t.workoutPlayer.setOf} {currentItem.exerciseIndex}/{currentItem.totalExercisesInPhase}
              </span>
            </div>

            {/* Huge Seconds Countdown */}
            <div className="py-2">
              <span className="text-6xl sm:text-7xl font-extrabold tabular-nums font-mono tracking-tight text-white">
                {timeRemaining}
              </span>
              <span className="text-sm font-semibold text-slate-400 block mt-1 uppercase">
                {t.workoutPlayer.seconds}
              </span>
            </div>

            {/* Quick time adjusters (+10s, -10s) */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={() => adjustTime(-10)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition-colors flex items-center gap-1"
                aria-label="Subtract 10 seconds"
              >
                <Minus className="w-3 h-3" /> 10s
              </button>
              <button
                onClick={() => adjustTime(10)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition-colors flex items-center gap-1"
                aria-label="Add 10 seconds"
              >
                <Plus className="w-3 h-3" /> 10s
              </button>
            </div>
          </div>

          {/* Coach Advice Card */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> {t.workoutPlayer.coachRealTimeCue}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              &ldquo;{currentItem.coachCue}&rdquo;
            </p>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{t.workoutPlayer.targetCadence}:</span>
              <span className="font-semibold text-white">{currentItem.exercise.repsTarget}</span>
            </div>
          </div>

          {/* Next Up Sneak Peek */}
          {nextItem && (
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  {t.workoutPlayer.upNext}
                </span>
                <span className="text-xs font-semibold text-slate-300">{nextItem.exercise.name}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {nextItem.durationSec}s {nextItem.type}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Sticky Control Bar */}
      <footer className="sticky bottom-0 z-20 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors flex items-center justify-center min-w-[48px] min-h-[48px]"
          aria-label="Previous movement"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        {/* Center Primary Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg min-w-[160px] active:scale-[0.98] ${
            isPaused
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
          }`}
          aria-label={isPaused ? 'Resume workout' : 'Pause workout'}
        >
          {isPaused ? (
            <>
              <Play className="w-5 h-5 fill-slate-950" />
              <span>{t.workoutPlayer.resume}</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5" />
              <span>{t.workoutPlayer.pause}</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Skip Next */}
          <button
            onClick={handleNext}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center min-w-[48px] min-h-[48px]"
            title="Next movement"
            aria-label="Next movement"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Quick Finish button */}
          <button
            onClick={triggerCompletion}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
            title="Complete workout now"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.workoutPlayer.finishNow}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
