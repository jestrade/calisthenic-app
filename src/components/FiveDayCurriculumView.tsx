import React from 'react';
import { DailyWorkoutPlan, DayOfWeek, Exercise } from '../types/workout';
import { WORKOUT_PLANS, WEEKDAY_ORDER } from '../data/workoutData';
import { useTranslation } from '../i18n/LanguageContext';
import { getLocalizedPlan, getLocalizedExercise } from '../utils/localizedWorkout';
import {
  Calendar,
  CheckCircle,
  Clock,
  Flame,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface FiveDayCurriculumViewProps {
  onSelectDay: (day: DayOfWeek) => void;
  onStartWorkout: (plan: DailyWorkoutPlan) => void;
  onOpenMovementLab: (ex: Exercise) => void;
}

export const FiveDayCurriculumView: React.FC<FiveDayCurriculumViewProps> = ({
  onSelectDay,
  onStartWorkout,
  onOpenMovementLab
}) => {
  const { t, language } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Editorial Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider font-mono mb-1">
          <Layers className="w-4 h-4" />
          {language === 'es' ? 'Progresión Atlética Periodizada' : 'Periodized Athletic Progression'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          {language === 'es' ? 'El Plan Maestro de Lunes a Viernes' : 'The 5-Day Monday to Friday Blueprint'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          {language === 'es'
            ? 'La calistenia exige un alto reclutamiento neuromuscular y resiliencia en los tendones. Al estructurar empuje, tracción, pierna, core y flujo atlético de lunes a viernes en bloques intensos de 30 minutos, desarrollas fuerza sin agotamiento. Los fines de semana se reservan para regenerar tejidos.'
            : 'Calisthenics demands high neurological recruitment and tendon resilience. By scheduling push, pull, legs, core, and athletic flow across Monday through Friday with 30 minutes of high-intensity focus, you build lean strength without burnout. Weekends are reserved for tissue regeneration.'}
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              {language === 'es' ? '30 Minutos de Alto Enfoque' : '30 Minutes Focused'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {language === 'es'
                ? 'Sin tiempo muerto: 4 min de calentamiento, 22 min de circuito intenso y 4 min de enfriamiento.'
                : 'Zero wasted minutes: 4 min warm-up, 22 min high-tension circuit, 4 min reset.'}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              {language === 'es' ? 'Cero Fatiga Redundante' : 'No Redundant Muscle Fatigue'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {language === 'es'
                ? 'Los músculos de empuje descansan mientras los de tracción trabajan. Piernas frescas el miércoles.'
                : 'Push muscles recover while pull muscles work. Hips stay fresh for Wednesday.'}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              {language === 'es' ? 'Supercompensación de Fin de Semana' : 'Weekend Supercompensation'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {language === 'es'
                ? 'Sábado y domingo restauran glucógeno y sanan tejido conectivo para el lunes.'
                : 'Saturday and Sunday restore glycogen and heal connective tissue for Monday.'}
            </span>
          </div>
        </div>
      </div>

      {/* Monday through Friday Day Cards */}
      <div className="flex flex-col gap-4">
        {WEEKDAY_ORDER.map((day) => {
          const rawPlan = WORKOUT_PLANS[day];
          const plan = getLocalizedPlan(rawPlan, language);
          return (
            <div
              key={day}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold font-mono text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded">
                    Day 0{plan.dayNumber} &bull; {plan.dayLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {plan.focus}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  {plan.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Target Movements List */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    {language === 'es' ? 'Ejercicios Clave:' : 'Core Exercises:'}
                  </span>
                  {plan.mainPhase.exercises.map((ex) => {
                    const locEx = getLocalizedExercise(ex, language);
                    return (
                      <button
                        key={ex.id}
                        onClick={() => onOpenMovementLab(locEx)}
                        className="text-xs font-medium text-slate-700 hover:text-amber-600 hover:underline bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md transition-colors"
                        title={t.movementLab.inspectMovement}
                      >
                        {locEx.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions & Metrics */}
              <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <span className="text-xs text-slate-400 font-mono block">ESTIMATED</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    30 Mins &bull; ~{plan.estimatedCalories} kcal
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectDay(day)}
                    className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    {language === 'es' ? 'Ver Rutina' : 'View Plan'}
                  </button>
                  <button
                    onClick={() => onStartWorkout(plan)}
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-amber-500/20 whitespace-nowrap min-h-[40px]"
                  >
                    <span>{language === 'es' ? `Iniciar Día 0${plan.dayNumber}` : `Start Day 0${plan.dayNumber}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekend Rest Protocol Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono block mb-1">
            {language === 'es' ? 'Protocolo de Sábado y Domingo' : 'Saturday & Sunday Protocol'}
          </span>
          <h3 className="text-lg font-bold font-display text-white">
            {language === 'es'
              ? 'Recuperación Activa y Supercompensación del Sistema Nervioso'
              : 'Active Recovery & Nervous System Supercompensation'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'es'
              ? 'Consejo del Coach: La fuerza en calistenia se consolida durante la remodelación del tejido conectivo. Dedica los fines de semana a caminar, hidratarte y estirar. ¡El lunes te espera el empuje!'
              : 'Coach advice: Calisthenics strength is built during connective tissue remodeling. Spend weekends walking outdoors, practicing foam rolling, and hydrating. Monday Push awaits!'}
          </p>
        </div>

        <button
          onClick={() => onSelectDay('saturday')}
          className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors shrink-0 whitespace-nowrap min-h-[40px]"
        >
          {language === 'es' ? 'Ver Rutina de Movilidad de Fin de Semana' : 'View Weekend Mobility Routine'}
        </button>
      </div>
    </div>
  );
};
