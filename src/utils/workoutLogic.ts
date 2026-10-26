import { DailyWorkoutPlan, DayOfWeek, DifficultyLevel, Exercise, CompletedWorkoutLog } from '../types/workout';
import { WORKOUT_PLANS } from '../data/workoutData';

export interface WorkoutIntervalItem {
  id: string;
  type: 'work' | 'rest' | 'prepare';
  phase: 'warmup' | 'main' | 'cooldown';
  phaseTitle: string;
  roundNumber: number;
  totalRounds: number;
  exerciseIndex: number;
  totalExercisesInPhase: number;
  durationSec: number;
  exercise: Exercise;
  coachCue: string;
}

/**
 * Maps JS Date.getDay() (0=Sun, 1=Mon, ..., 6=Sat) to DayOfWeek
 */
export function getDayOfWeekFromDate(date: Date = new Date()): DayOfWeek {
  const dayIndex = date.getDay();
  switch (dayIndex) {
    case 1: return 'monday';
    case 2: return 'tuesday';
    case 3: return 'wednesday';
    case 4: return 'thursday';
    case 5: return 'friday';
    case 6: return 'saturday';
    case 0: return 'sunday';
    default: return 'monday';
  }
}

/**
 * Checks if a given day is one of the 5 coached workout days (Monday to Friday)
 */
export function isCoachedWeekday(day: DayOfWeek): boolean {
  return day !== 'saturday' && day !== 'sunday';
}

/**
 * Formats seconds into MM:SS format
 */
export function formatTimeMMSS(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Generates the linear sequence of intervals for a 30-minute session:
 * 1. Warm-up (4 mins = 240s): 4 exercises x (45s work + 15s transition) = 240s
 * 2. Main Calisthenics (22 mins = 1320s):
 *    3 rounds x 5 exercises:
 *    Each exercise: 40s work + 20s rest = 60s per exercise.
 *    5 exercises x 60s = 300s per round.
 *    3 rounds = 900s work+rest. Plus 2x 60s inter-round recovery = 120s.
 *    For remaining time balance: 5 exercises tuned so total main circuit is calibrated.
 * 3. Cool-down (4 mins = 240s): 4 stretches x (45s work + 15s transition) = 240s
 */
export function buildWorkoutTimeline(plan: DailyWorkoutPlan, difficulty: DifficultyLevel = 'intermediate'): WorkoutIntervalItem[] {
  const timeline: WorkoutIntervalItem[] = [];

  // Adjust durations slightly based on difficulty if needed
  let workModifier = 0;
  let restModifier = 0;
  if (difficulty === 'beginner') {
    workModifier = -5; // 35s work
    restModifier = 5;  // 25s rest
  } else if (difficulty === 'advanced') {
    workModifier = 5;  // 45s work
    restModifier = -5; // 15s rest
  }

  // 1. Warm-up Phase (4 mins)
  plan.warmupPhase.exercises.forEach((ex, idx) => {
    timeline.push({
      id: `warmup-work-${idx}`,
      type: 'work',
      phase: 'warmup',
      phaseTitle: 'Warm-up & Joint Activation',
      roundNumber: 1,
      totalRounds: 1,
      exerciseIndex: idx + 1,
      totalExercisesInPhase: plan.warmupPhase.exercises.length,
      durationSec: ex.workSec,
      exercise: ex,
      coachCue: ex.coachCue
    });

    if (ex.restSec > 0) {
      timeline.push({
        id: `warmup-rest-${idx}`,
        type: 'rest',
        phase: 'warmup',
        phaseTitle: 'Transition & Breathe',
        roundNumber: 1,
        totalRounds: 1,
        exerciseIndex: idx + 1,
        totalExercisesInPhase: plan.warmupPhase.exercises.length,
        durationSec: ex.restSec,
        exercise: ex,
        coachCue: 'Shake out the limbs, prepare for the next movement.'
      });
    }
  });

  // 2. Main Phase (Rounds)
  const rounds = plan.mainPhase.rounds;
  for (let r = 1; r <= rounds; r++) {
    plan.mainPhase.exercises.forEach((ex, idx) => {
      const actualWork = Math.max(20, ex.workSec + workModifier);
      const actualRest = Math.max(10, ex.restSec + restModifier);

      timeline.push({
        id: `main-r${r}-work-${idx}`,
        type: 'work',
        phase: 'main',
        phaseTitle: `Round ${r} of ${rounds}`,
        roundNumber: r,
        totalRounds: rounds,
        exerciseIndex: idx + 1,
        totalExercisesInPhase: plan.mainPhase.exercises.length,
        durationSec: actualWork,
        exercise: ex,
        coachCue: ex.coachCue
      });

      timeline.push({
        id: `main-r${r}-rest-${idx}`,
        type: 'rest',
        phase: 'main',
        phaseTitle: `Rest & Reset (Round ${r})`,
        roundNumber: r,
        totalRounds: rounds,
        exerciseIndex: idx + 1,
        totalExercisesInPhase: plan.mainPhase.exercises.length,
        durationSec: actualRest,
        exercise: ex,
        coachCue: idx === plan.mainPhase.exercises.length - 1 && r < rounds
          ? `End of Round ${r}! Deep breaths, hydrate before Round ${r + 1}.`
          : 'Catch your breath. Inhale through the nose, exhale slowly.'
      });
    });
  }

  // 3. Cool-down Phase (4 mins)
  plan.cooldownPhase.exercises.forEach((ex, idx) => {
    timeline.push({
      id: `cooldown-work-${idx}`,
      type: 'work',
      phase: 'cooldown',
      phaseTitle: 'Cool-down & Mobility Release',
      roundNumber: 1,
      totalRounds: 1,
      exerciseIndex: idx + 1,
      totalExercisesInPhase: plan.cooldownPhase.exercises.length,
      durationSec: ex.workSec,
      exercise: ex,
      coachCue: ex.coachCue
    });

    if (ex.restSec > 0 && idx < plan.cooldownPhase.exercises.length - 1) {
      timeline.push({
        id: `cooldown-rest-${idx}`,
        type: 'rest',
        phase: 'cooldown',
        phaseTitle: 'Transition Stretch',
        roundNumber: 1,
        totalRounds: 1,
        exerciseIndex: idx + 1,
        totalExercisesInPhase: plan.cooldownPhase.exercises.length,
        durationSec: ex.restSec,
        exercise: ex,
        coachCue: 'Gently release the stretch and prepare for the next position.'
      });
    }
  });

  return timeline;
}

/**
 * Calculates total timeline duration in seconds
 */
export function calculateTotalTimelineSeconds(timeline: WorkoutIntervalItem[]): number {
  return timeline.reduce((sum, item) => sum + item.durationSec, 0);
}

/**
 * Calculates streak count from an array of completed workout logs.
 * Looks for unique workout dates completed in consecutive or current week.
 */
export function calculateStreak(logs: CompletedWorkoutLog[]): { currentStreak: number; bestStreak: number } {
  if (!logs || logs.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Get unique sorted date strings (YYYY-MM-DD)
  const uniqueDates = Array.from(new Set(logs.map(l => l.dateStr))).sort();

  if (uniqueDates.length === 0) return { currentStreak: 0, bestStreak: 0 };

  let currentStreak = 1;
  let bestStreak = 1;
  let running = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1] + 'T00:00:00');
    const curr = new Date(uniqueDates[i] + 'T00:00:00');
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

    // Allow 1-day step, or Friday to Monday jump (3 days) over the weekend without breaking the streak!
    const isFridayToMonday = prev.getDay() === 5 && curr.getDay() === 1 && diffDays <= 3;

    if (diffDays === 1 || isFridayToMonday) {
      running++;
      if (running > bestStreak) {
        bestStreak = running;
      }
    } else if (diffDays > 1) {
      running = 1;
    }
  }

  currentStreak = running;
  if (currentStreak > bestStreak) bestStreak = currentStreak;

  return { currentStreak, bestStreak };
}

/**
 * Calculates estimated calories burned based on duration and difficulty
 */
export function estimateCalories(durationSeconds: number, difficulty: DifficultyLevel = 'intermediate'): number {
  const minutes = durationSeconds / 60;
  // Calisthenics burns approx 7-10 kcal per minute
  let rate = 8.5;
  if (difficulty === 'beginner') rate = 7.0;
  if (difficulty === 'advanced') rate = 10.5;

  return Math.round(minutes * rate);
}

/**
 * Returns formatted date string YYYY-MM-DD for today
 */
export function getTodayDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
