export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseCategory = 'push' | 'pull' | 'legs' | 'core' | 'flow' | 'warmup' | 'cooldown';

export type MovementPhase = 'eccentric' | 'pause' | 'concentric' | 'lockout' | 'active';

export interface Exercise {
  id: string;
  name: string;
  nameEs?: string;
  shortName: string;
  shortNameEs?: string;
  category: ExerciseCategory;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipmentNeeded: string;
  equipmentNeededEs?: string;
  workSec: number;
  restSec: number;
  repsTarget: string;
  repsTargetEs?: string;
  coachCue: string;
  coachCueEs?: string;
  formPoints: string[];
  formPointsEs?: string[];
  commonMistakes: string[];
  commonMistakesEs?: string[];
  rigType: 
    | 'pushup'
    | 'diamond_pushup'
    | 'pike_pushup'
    | 'dips'
    | 'squats'
    | 'lunges'
    | 'glute_bridge'
    | 'wall_sit'
    | 'inverted_row'
    | 'superman'
    | 'plank_hold'
    | 'mountain_climbers'
    | 'deadbug'
    | 'hollow_body'
    | 'burpees'
    | 'jumping_jacks'
    | 'arm_circles'
    | 'torso_twist'
    | 'cobra_stretch'
    | 'child_pose';
}

export interface WorkoutPhasePlan {
  phase: 'warmup' | 'main' | 'cooldown';
  title: string;
  durationMinutes: number;
  rounds: number;
  exercises: Exercise[];
  coachInstruction: string;
}

export interface DailyWorkoutPlan {
  day: DayOfWeek;
  dayLabel: string;
  dayNumber: number; // 1 = Monday, 5 = Friday
  title: string;
  focus: string;
  tagline: string;
  targetMusclesSummary: string[];
  coachQuote: string;
  coachDailyTip: string;
  totalMinutes: 30;
  estimatedCalories: number;
  warmupPhase: WorkoutPhasePlan;
  mainPhase: WorkoutPhasePlan;
  cooldownPhase: WorkoutPhasePlan;
}

export interface CompletedWorkoutLog {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: DayOfWeek;
  workoutTitle: string;
  completedAt: string;
  durationSeconds: number;
  caloriesBurned: number;
  difficulty: DifficultyLevel;
}

export type FitnessGoal = 'strength' | 'endurance' | 'skills' | 'weight_loss' | 'mobility';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  fitnessLevel: DifficultyLevel;
  primaryGoal: FitnessGoal;
  preferredLanguage: 'en' | 'es';
  bodyWeightKg?: number;
  heightCm?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserWorkoutProfile {
  completedLogs: CompletedWorkoutLog[];
  currentStreak: number;
  bestStreak: number;
  totalWorkouts: number;
  totalMinutes: number;
  difficulty: DifficultyLevel;
  voiceCoachEnabled: boolean;
  soundFxEnabled: boolean;
}
