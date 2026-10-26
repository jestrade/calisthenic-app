import React from 'react';
import { Exercise } from '../types/workout';
import { ExerciseKineticGraphic } from './ExerciseKineticGraphic';
import { useTranslation } from '../i18n/LanguageContext';
import { getLocalizedExercise } from '../utils/localizedWorkout';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MovementLabModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const MovementLabModal: React.FC<MovementLabModalProps> = ({ exercise: rawExercise, onClose }) => {
  const { t, language } = useTranslation();
  if (!rawExercise) return null;

  const exercise = getLocalizedExercise(rawExercise, language);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
            <span>{t.movementLab.badge}</span>
            <span>&bull;</span>
            <span className="capitalize">{exercise.category} {language === 'es' ? 'Progresión' : 'Progression'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            {exercise.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2">
            <span>{language === 'es' ? 'Primarios' : 'Primary'}: <strong className="text-slate-200">{exercise.primaryMuscles.join(', ')}</strong></span>
            <span aria-hidden="true">&bull;</span>
            <span>{language === 'es' ? 'Secundarios' : 'Secondary'}: <strong className="text-slate-200">{exercise.secondaryMuscles.join(', ')}</strong></span>
            <span aria-hidden="true">&bull;</span>
            <span>{language === 'es' ? 'Equipo' : 'Equipment'}: <strong className="text-slate-200">{exercise.equipmentNeeded}</strong></span>
          </div>
        </div>

        {/* Kinetic Graphic with Controls */}
        <div className="mb-6">
          <ExerciseKineticGraphic exercise={exercise} autoPlay={true} showControls={true} />
        </div>

        {/* Form Breakdown & Mistakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Form Checkpoints */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
              <CheckCircle className="w-4 h-4" /> {t.movementLab.perfectForm}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {exercise.formPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Form Mistakes to Avoid */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-4 h-4" /> {t.movementLab.commonMistakes}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {exercise.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coach Cue Summary */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300">
            <span className="font-bold text-amber-300 block mb-0.5">
              {t.movementLab.coachVerbalCue}
            </span>
            &ldquo;{exercise.coachCue}&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
};
