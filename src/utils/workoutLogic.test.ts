import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDayOfWeekFromDate,
  isCoachedWeekday,
  formatTimeMMSS,
  buildWorkoutTimeline,
  calculateTotalTimelineSeconds,
  calculateStreak,
  estimateCalories
} from './workoutLogic';
import { WORKOUT_PLANS } from '../data/workoutData';
import { CompletedWorkoutLog } from '../types/workout';

test('getDayOfWeekFromDate maps day correctly', () => {
  // 2026-10-26 is Monday
  const monday = new Date('2026-10-26T10:00:00');
  assert.equal(getDayOfWeekFromDate(monday), 'monday');

  // 2026-10-27 is Tuesday
  const tuesday = new Date('2026-10-27T10:00:00');
  assert.equal(getDayOfWeekFromDate(tuesday), 'tuesday');

  // 2026-10-30 is Friday
  const friday = new Date('2026-10-30T10:00:00');
  assert.equal(getDayOfWeekFromDate(friday), 'friday');

  // 2026-10-31 is Saturday
  const saturday = new Date('2026-10-31T10:00:00');
  assert.equal(getDayOfWeekFromDate(saturday), 'saturday');

  // 2026-11-01 is Sunday
  const sunday = new Date('2026-11-01T10:00:00');
  assert.equal(getDayOfWeekFromDate(sunday), 'sunday');
});

test('isCoachedWeekday validates 5 weekdays vs weekend', () => {
  assert.equal(isCoachedWeekday('monday'), true);
  assert.equal(isCoachedWeekday('tuesday'), true);
  assert.equal(isCoachedWeekday('wednesday'), true);
  assert.equal(isCoachedWeekday('thursday'), true);
  assert.equal(isCoachedWeekday('friday'), true);
  assert.equal(isCoachedWeekday('saturday'), false);
  assert.equal(isCoachedWeekday('sunday'), false);
});

test('formatTimeMMSS formats seconds cleanly', () => {
  assert.equal(formatTimeMMSS(0), '00:00');
  assert.equal(formatTimeMMSS(45), '00:45');
  assert.equal(formatTimeMMSS(60), '01:00');
  assert.equal(formatTimeMMSS(1800), '30:00');
  assert.equal(formatTimeMMSS(125), '02:05');
});

test('buildWorkoutTimeline generates structured phases and exercises', () => {
  const mondayPlan = WORKOUT_PLANS.monday;
  const timeline = buildWorkoutTimeline(mondayPlan, 'intermediate');

  assert.ok(timeline.length > 0, 'Timeline should contain interval items');
  
  // Verify warm-up exists
  const warmupItems = timeline.filter(t => t.phase === 'warmup');
  assert.ok(warmupItems.length > 0, 'Warmup phase exists');

  // Verify main phase exists and contains 3 rounds
  const mainItems = timeline.filter(t => t.phase === 'main');
  assert.ok(mainItems.length > 0, 'Main phase exists');
  const rounds = new Set(mainItems.map(m => m.roundNumber));
  assert.equal(rounds.size, 3, 'Main phase has 3 rounds');

  // Verify cool-down phase exists
  const cooldownItems = timeline.filter(t => t.phase === 'cooldown');
  assert.ok(cooldownItems.length > 0, 'Cooldown phase exists');

  // Verify total duration is in the 25-31 min ballpark
  const totalSec = calculateTotalTimelineSeconds(timeline);
  const totalMin = totalSec / 60;
  assert.ok(totalMin >= 20 && totalMin <= 32, `Total minutes was ${totalMin}, expected ~30 mins`);
});

test('calculateStreak counts consecutive workout days and preserves weekend bridge', () => {
  const logs: CompletedWorkoutLog[] = [
    {
      id: '1',
      dateStr: '2026-10-22', // Thu
      dayOfWeek: 'thursday',
      workoutTitle: 'Core',
      completedAt: '2026-10-22T08:00:00Z',
      durationSeconds: 1800,
      caloriesBurned: 240,
      difficulty: 'intermediate'
    },
    {
      id: '2',
      dateStr: '2026-10-23', // Fri
      dayOfWeek: 'friday',
      workoutTitle: 'HIIT',
      completedAt: '2026-10-23T08:00:00Z',
      durationSeconds: 1800,
      caloriesBurned: 310,
      difficulty: 'intermediate'
    },
    {
      id: '3',
      dateStr: '2026-10-26', // Mon (Weekend bridged!)
      dayOfWeek: 'monday',
      workoutTitle: 'Push',
      completedAt: '2026-10-26T08:00:00Z',
      durationSeconds: 1800,
      caloriesBurned: 260,
      difficulty: 'intermediate'
    }
  ];

  const streak = calculateStreak(logs);
  assert.equal(streak.currentStreak, 3);
  assert.equal(streak.bestStreak, 3);
});

test('estimateCalories produces sensible athletic calorie count', () => {
  // 30 mins (1800s) intermediate
  const cals = estimateCalories(1800, 'intermediate');
  assert.ok(cals >= 200 && cals <= 350, `Calories burned was ${cals}`);

  // Advanced should burn more than beginner
  const adv = estimateCalories(1800, 'advanced');
  const beg = estimateCalories(1800, 'beginner');
  assert.ok(adv > beg, 'Advanced burned more than beginner');
});
