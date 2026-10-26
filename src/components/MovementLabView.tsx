import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { WORKOUT_PLANS } from '../data/workoutData';
import { ExerciseKineticGraphic } from './ExerciseKineticGraphic';
import { useTranslation } from '../i18n/LanguageContext';
import { getLocalizedExercise } from '../utils/localizedWorkout';
import { Search, ShieldCheck, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

export const MovementLabView: React.FC = () => {
  const { t, language } = useTranslation();

  const allExercises: Exercise[] = React.useMemo(() => {
    const map = new Map<string, Exercise>();
    Object.values(WORKOUT_PLANS).forEach((plan) => {
      [...plan.warmupPhase.exercises, ...plan.mainPhase.exercises, ...plan.cooldownPhase.exercises].forEach((ex) => {
        if (!map.has(ex.id)) {
          map.set(ex.id, ex);
        }
      });
    });
    return Array.from(map.values());
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExerciseRaw, setSelectedExerciseRaw] = useState<Exercise>(() => allExercises[0]);

  const selectedExercise = getLocalizedExercise(selectedExerciseRaw, language);

  const filteredExercises = allExercises.filter((ex) => {
    const locEx = getLocalizedExercise(ex, language);
    const matchesCat = activeCategory === 'all' || locEx.category === activeCategory;
    const matchesSearch =
      locEx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locEx.primaryMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider font-mono mb-1">
          <Activity className="w-4 h-4" /> {t.movementLab.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          {t.movementLab.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          {t.movementLab.subtitle}
        </p>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {['all', 'push', 'pull', 'legs', 'core', 'flow', 'warmup'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors min-h-[32px] whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {cat === 'all' ? (language === 'es' ? 'Todos' : 'All') :
                 cat === 'push' ? (language === 'es' ? 'Empuje' : 'Push') :
                 cat === 'pull' ? (language === 'es' ? 'Tracción' : 'Pull') :
                 cat === 'legs' ? (language === 'es' ? 'Pierna' : 'Legs') :
                 cat === 'core' ? 'Core' :
                 cat === 'flow' ? (language === 'es' ? 'HIIT/Flujo' : 'Flow') :
                 (language === 'es' ? 'Calentamiento' : 'Warm-up')}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.movementLab.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2-Column Split: Biomechanical Rig on Left, Exercise Picker on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Focused Interactive Rig */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                  {selectedExercise.category} {language === 'es' ? 'Análisis de Movimiento' : 'Movement Analysis'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedExercise.name}
                </h3>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">
                {selectedExercise.repsTarget}
              </span>
            </div>

            {/* Kinetic Animation Rig */}
            <ExerciseKineticGraphic exercise={selectedExercise} autoPlay={true} showControls={true} />

            {/* Detailed Form Guidance */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" /> {t.movementLab.perfectForm}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedExercise.formPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" /> {t.movementLab.commonMistakes}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedExercise.commonMistakes.map((fault, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                      <span>{fault}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verbal Coach Cue */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-amber-900 font-semibold mb-0.5">
                  {t.movementLab.coachVerbalCue}
                </strong>
                &ldquo;{selectedExercise.coachCue}&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Exercise Selector Grid */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono px-1">
            {language === 'es' ? 'Movimientos en la Biblioteca' : 'Library Movements'} ({filteredExercises.length})
          </span>

          <div className="flex flex-col gap-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredExercises.map((ex) => {
              const locEx = getLocalizedExercise(ex, language);
              const isSelected = selectedExerciseRaw.id === ex.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExerciseRaw(ex)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-mono uppercase font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                        {locEx.category}
                      </span>
                    </div>
                    <span className="text-sm font-bold block truncate">
                      {locEx.name}
                    </span>
                    <span className={`text-xs block truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {locEx.primaryMuscles.join(', ')}
                    </span>
                  </div>

                  <span className={`text-xs font-mono font-semibold shrink-0 px-2 py-1 rounded ${
                    isSelected ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {locEx.workSec}s
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
