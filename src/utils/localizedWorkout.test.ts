import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalizedExercise, getLocalizedPlan } from './localizedWorkout';
import { WORKOUT_PLANS } from '../data/workoutData';
import { translations } from '../i18n/translations';

test('translations dictionary contains complete en and es keys', () => {
  assert.ok(translations.en.brandTitle);
  assert.ok(translations.es.brandTitle);
  assert.equal(translations.en.days.monday.name, 'Monday');
  assert.equal(translations.es.days.monday.name, 'Lunes');
  assert.equal(translations.es.days.friday.name, 'Viernes');
});

test('getLocalizedPlan returns Spanish plan when lang is es', () => {
  const monPlan = WORKOUT_PLANS.monday;
  const esPlan = getLocalizedPlan(monPlan, 'es');

  assert.equal(esPlan.dayLabel, 'Lunes');
  assert.ok(esPlan.title.includes('Potencia') || esPlan.title.includes('Empuje'));
  assert.ok(esPlan.mainPhase.exercises[0].name.includes('Flexiones'));

  const enPlan = getLocalizedPlan(monPlan, 'en');
  assert.equal(enPlan.dayLabel, 'Monday');
  assert.ok(enPlan.mainPhase.exercises[0].name.includes('Push-Ups'));
});

test('getLocalizedExercise translates pushup cues into Spanish', () => {
  const rawEx = WORKOUT_PLANS.monday.mainPhase.exercises[0];
  const esEx = getLocalizedExercise(rawEx, 'es');

  assert.equal(esEx.name, 'Flexiones Clásicas a Tempo');
  assert.ok(esEx.coachCue.includes('Atornilla las palmas'));
});
