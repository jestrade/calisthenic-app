import React, { useEffect, useRef, useState } from 'react';
import { Exercise, MovementPhase } from '../types/workout';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface ExerciseKineticGraphicProps {
  exercise: Exercise;
  isCompact?: boolean;
  autoPlay?: boolean;
  showControls?: boolean;
}

export const ExerciseKineticGraphic: React.FC<ExerciseKineticGraphicProps> = ({
  exercise,
  isCompact = false,
  autoPlay = true,
  showControls = true
}) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showMuscles, setShowMuscles] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const [phase, setPhase] = useState<MovementPhase>('eccentric');

  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  // Sync state with refs for smooth 60fps canvas loop
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay, exercise.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localProgress = progressRef.current;

    const render = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isPlaying) {
        // Exercise repetition loop period is ~3.0s at 1x speed
        const cycleDuration = 3.0 / speed;
        localProgress = (localProgress + delta / cycleDuration) % 1.0;
        progressRef.current = localProgress;
        setProgress(localProgress);
      }

      // Determine movement phase
      const p = progressRef.current;
      let currentPhase: MovementPhase = 'eccentric';
      if (p < 0.45) {
        currentPhase = 'eccentric'; // Lowering / reaching
      } else if (p >= 0.45 && p < 0.55) {
        currentPhase = 'pause'; // Peak stretch/contraction
      } else if (p >= 0.55 && p < 0.90) {
        currentPhase = 'concentric'; // Driving / pushing
      } else {
        currentPhase = 'lockout'; // Reset & prepare
      }
      setPhase(currentPhase);

      // Draw onto canvas
      drawExerciseFigure(ctx, canvas.width, canvas.height, exercise.rigType, p, showMuscles);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [exercise.rigType, isPlaying, speed, showMuscles]);

  // Handle manual scrub
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    progressRef.current = val;
    setProgress(val);
  };

  return (
    <div className={`flex flex-col items-center bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl ${isCompact ? 'p-3' : 'p-5'}`}>
      {/* Top Graphic Header */}
      <div className="w-full flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase font-mono">
            {t.movementLab.movementModel}
          </span>
        </div>

        {/* Dynamic Movement Phase Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Phase:</span>
          <span className={`px-2 py-0.5 rounded font-medium ${
            phase === 'eccentric' ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50' :
            phase === 'pause' ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50' :
            phase === 'concentric' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' :
            'bg-slate-800 text-slate-300'
          }`}>
            {phase === 'eccentric' ? t.movementLab.phaseEccentric :
             phase === 'pause' ? t.movementLab.phasePause :
             phase === 'concentric' ? t.movementLab.phaseConcentric : t.movementLab.phaseReset}
          </span>
        </div>
      </div>

      {/* 2D Kinematic Canvas */}
      <div className="relative w-full aspect-video bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={315}
          className="w-full h-full object-contain"
          aria-label={`Kinematic animation demonstration for ${exercise.name}`}
        />

        {/* Overlay Muscle Activation Legend */}
        {showMuscles && (
          <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[11px] font-medium bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              {t.movementLab.primaryActivation}: <span className="text-white font-semibold">{exercise.primaryMuscles[0]}</span>
            </span>
            {exercise.secondaryMuscles[0] && (
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {t.movementLab.secondaryActivation}: {exercise.secondaryMuscles[0]}
              </span>
            )}
          </div>
        )}

        {/* Rep cycle percentage */}
        <div className="absolute top-2 right-3 font-mono text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          {t.movementLab.repCycle}: {Math.round(progress * 100)}%
        </div>
      </div>

      {/* Movement Interactive Controls */}
      {showControls && (
        <div className="w-full mt-3 flex flex-col gap-2">
          {/* Timeline Scrubber */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center shrink-0 min-w-[36px] min-h-[36px]"
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={progress}
              onChange={handleScrub}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label="Scrub movement cycle"
            />

            <button
              onClick={() => {
                progressRef.current = 0;
                setProgress(0);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 min-w-[36px] min-h-[36px]"
              title="Reset to start of rep"
              aria-label="Reset rep to start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Toolbars: Speed & Muscle Toggles */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <span className="px-2 text-[11px] text-slate-400 font-mono">{t.movementLab.speed}:</span>
              {[0.5, 1.0, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    speed === s ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMuscles(!showMuscles)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                showMuscles
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{showMuscles ? t.movementLab.musclesHighlighted : t.movementLab.outlineOnly}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// KINEMATIC CANVAS DRAWING LOGIC FOR EXERCISES
// ==========================================

function drawExerciseFigure(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rigType: string,
  progress: number, // 0 to 1
  showMuscles: boolean
) {
  // Clear canvas
  ctx.clearRect(0, 0, w, h);

  // Draw gym floor grid
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  const floorY = h * 0.78;
  ctx.beginPath();
  ctx.moveTo(20, floorY);
  ctx.lineTo(w - 20, floorY);
  ctx.stroke();

  // Draw perspective floor lines
  for (let x = 40; x < w - 20; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, floorY);
    ctx.lineTo(x - 20, floorY + 30);
    ctx.stroke();
  }
  ctx.restore();

  // Smooth sinusoidal motion curve: 0 -> 1 -> 0
  // t is 0 at start, 1 at peak contraction/depth, 0 at top
  const t = Math.sin(progress * Math.PI);

  const primaryGlow = showMuscles ? 'rgba(245, 158, 11, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  const secondaryGlow = showMuscles ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.7)';
  const boneColor = '#f8fafc';
  const jointColor = '#38bdf8';

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Render specific kinetic rig based on exercise type
  switch (rigType) {
    case 'pushup':
    case 'diamond_pushup': {
      // Push-up kinematic side-view
      // Start: Arms straight, chest high
      // Peak (t=1): Chest low near floor, elbows bent back at 90°
      const handX = w * 0.35;
      const handY = floorY;
      const toeX = w * 0.75;
      const toeY = floorY;

      // Chest descends with t
      const chestY = floorY - 65 + t * 45;
      const chestX = handX + 20;

      // Hip stays in plank line
      const hipX = chestX + 110;
      const hipY = chestY + 15;

      // Shoulder position
      const shoulderX = chestX;
      const shoulderY = chestY - 10;

      // Head
      const headX = shoulderX - 30;
      const headY = shoulderY - 8;

      // Elbow calculation (bends backwards and up)
      const elbowX = handX + 15 - t * 15;
      const elbowY = shoulderY + (handY - shoulderY) * 0.5 - t * 25;

      // 1. Draw Muscles (Chest & Triceps)
      if (showMuscles) {
        // Pectorals glow
        ctx.fillStyle = primaryGlow;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
        ctx.shadowBlur = 12 * t;
        ctx.beginPath();
        ctx.arc(shoulderX + 10, chestY + 5, 14 + t * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Triceps glow on upper arm
        ctx.fillStyle = secondaryGlow;
        ctx.beginPath();
        ctx.arc((shoulderX + elbowX) / 2, (shoulderY + elbowY) / 2, 8 + t * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core plank tension
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(chestX + 20, chestY + 10);
        ctx.lineTo(hipX - 10, hipY);
        ctx.stroke();
      }

      // 2. Draw Torso & Legs (Plank)
      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(toeX, toeY);
      ctx.stroke();

      // 3. Draw Arms
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      // 4. Joints & Head
      drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
      drawJoint(ctx, elbowX, elbowY, jointColor, 5);
      drawJoint(ctx, handX, handY, jointColor, 4);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawJoint(ctx, toeX, toeY, jointColor, 4);

      // Head
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'pike_pushup': {
      // Inverted V shape
      const handX = w * 0.38;
      const handY = floorY;
      const toeX = w * 0.65;
      const toeY = floorY;

      // Hips are high in pike
      const hipX = w * 0.52;
      const hipY = floorY - 140;

      // Head lowers diagonally forward in front of hands
      const headX = handX - 15 - t * 25;
      const headY = floorY - 50 + t * 35;

      const shoulderX = headX + 25;
      const shoulderY = headY + 15;

      const elbowX = handX + 10 - t * 20;
      const elbowY = (shoulderY + handY) / 2 - 25 * t;

      if (showMuscles) {
        // Deltoids glow (Shoulders)
        ctx.fillStyle = primaryGlow;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 15 * t;
        ctx.beginPath();
        ctx.arc(shoulderX, shoulderY, 16 + t * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Torso & Legs
      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(toeX, toeY);
      ctx.stroke();

      // Arms
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 6);
      drawJoint(ctx, elbowX, elbowY, jointColor, 5);
      drawJoint(ctx, handX, handY, jointColor, 4);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawJoint(ctx, toeX, toeY, jointColor, 4);
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'squats': {
      // Squat: Starts standing tall, descends to parallel hips
      const footX = w * 0.5;
      const footY = floorY;

      // Standing hip: floorY - 130. Squatting hip: floorY - 60
      const hipY = floorY - 130 + t * 70;
      const hipX = footX - 35 * t; // Hips push back

      // Knees push forward slightly
      const kneeX = footX + 25 * t;
      const kneeY = floorY - 65 + t * 15;

      // Torso leans slightly forward to balance
      const shoulderX = hipX + 15 + t * 25;
      const shoulderY = hipY - 70;

      const headX = shoulderX + 5;
      const headY = shoulderY - 25;

      // Arms reaching forward for counter-balance
      const handX = shoulderX + 60;
      const handY = shoulderY + 10;

      if (showMuscles) {
        // Quadriceps glow
        ctx.fillStyle = primaryGlow;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowBlur = 14 * t;
        ctx.beginPath();
        ctx.arc((hipX + kneeX) / 2, (hipY + kneeY) / 2, 16 + t * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Glute activation
        ctx.fillStyle = secondaryGlow;
        ctx.beginPath();
        ctx.arc(hipX - 10, hipY + 5, 14 + t * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Torso & Legs
      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      // Arms
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 6);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawJoint(ctx, kneeX, kneeY, jointColor, 6);
      drawJoint(ctx, footX, footY, jointColor, 5);
      drawJoint(ctx, handX, handY, jointColor, 4);
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'lunges': {
      // Reverse Lunge
      const frontFootX = w * 0.58;
      const frontFootY = floorY;
      const rearFootX = w * 0.35;
      const rearFootY = floorY;

      // Hips drop down
      const hipX = w * 0.47;
      const hipY = floorY - 120 + t * 50;

      const frontKneeX = frontFootX - 5;
      const frontKneeY = floorY - 55 + t * 10;

      const rearKneeX = rearFootX + 35;
      const rearKneeY = floorY - 60 + t * 45;

      const shoulderX = hipX;
      const shoulderY = hipY - 70;
      const headX = shoulderX;
      const headY = shoulderY - 25;

      if (showMuscles) {
        ctx.fillStyle = primaryGlow;
        ctx.beginPath();
        ctx.arc((hipX + frontKneeX) / 2, (hipY + frontKneeY) / 2, 14 + t * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      // Front leg
      ctx.lineTo(frontKneeX, frontKneeY);
      ctx.lineTo(frontFootX, frontFootY);
      ctx.stroke();

      // Rear leg
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(rearKneeX, rearKneeY);
      ctx.lineTo(rearFootX, rearFootY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 6);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawJoint(ctx, frontKneeX, frontKneeY, jointColor, 5);
      drawJoint(ctx, rearKneeX, rearKneeY, jointColor, 5);
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'dips': {
      // Bench Dips
      const benchX = w * 0.65;
      const benchY = floorY - 60;

      // Draw bench
      ctx.fillStyle = '#334155';
      ctx.fillRect(benchX, benchY, 70, 60);

      const handX = benchX + 5;
      const handY = benchY;

      // Hips descend close to bench
      const hipX = benchX - 30;
      const hipY = floorY - 70 + t * 35;

      const shoulderX = hipX + 15;
      const shoulderY = hipY - 60;
      const headX = shoulderX;
      const headY = shoulderY - 25;

      const footX = w * 0.3;
      const footY = floorY;

      const elbowX = handX - 5 + t * 15;
      const elbowY = shoulderY + (handY - shoulderY) * 0.5 - t * 10;

      if (showMuscles) {
        ctx.fillStyle = primaryGlow;
        ctx.beginPath();
        ctx.arc((shoulderX + elbowX) / 2, (shoulderY + elbowY) / 2, 12 + t * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      // Arms
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
      drawJoint(ctx, elbowX, elbowY, jointColor, 5);
      drawJoint(ctx, handX, handY, jointColor, 4);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'superman': {
      // Prone Superman on floor
      const hipX = w * 0.5;
      const hipY = floorY - 8;

      // Lifting chest & legs (t increases lift)
      const lift = t * 28;

      const shoulderX = hipX - 60;
      const shoulderY = floorY - 15 - lift;

      const handX = shoulderX - 50;
      const handY = shoulderY - 10;

      const footX = hipX + 90;
      const footY = floorY - 12 - lift * 0.8;

      const headX = shoulderX - 25;
      const headY = shoulderY - 10;

      if (showMuscles) {
        // Lower back & posterior chain glow
        ctx.fillStyle = primaryGlow;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowBlur = 14 * t;
        ctx.beginPath();
        ctx.arc(hipX - 20, hipY - 5, 16 + t * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(handX, handY);
      ctx.lineTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawHead(ctx, headX, headY, 13);
      break;
    }

    case 'mountain_climbers': {
      // Rapid alternating legs in plank
      const handX = w * 0.35;
      const handY = floorY;
      const shoulderX = handX + 15;
      const shoulderY = floorY - 65;
      const headX = shoulderX - 30;
      const headY = shoulderY - 10;

      const hipX = shoulderX + 90;
      const hipY = shoulderY + 5;

      // Alternating legs using sin wave
      const legPhase = Math.sin(progress * Math.PI * 2);
      const knee1X = hipX - 35 - legPhase * 25;
      const knee1Y = floorY - 30;
      const foot1X = knee1X + (legPhase > 0 ? 30 : 60);
      const foot1Y = floorY;

      const knee2X = hipX - 35 + legPhase * 25;
      const knee2Y = floorY - 30;
      const foot2X = knee2X + (legPhase < 0 ? 30 : 60);
      const foot2Y = floorY;

      if (showMuscles) {
        ctx.fillStyle = primaryGlow;
        ctx.beginPath();
        ctx.arc((shoulderX + hipX) / 2, hipY, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Torso & arms
      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(handX, handY);
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      // Leg 1
      ctx.lineTo(knee1X, knee1Y);
      ctx.lineTo(foot1X, foot1Y);
      // Leg 2
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(knee2X, knee2Y);
      ctx.lineTo(foot2X, foot2Y);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
      drawJoint(ctx, handX, handY, jointColor, 4);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawHead(ctx, headX, headY, 14);
      break;
    }

    case 'hollow_body':
    case 'deadbug': {
      // Lying on back
      const hipX = w * 0.5;
      const hipY = floorY - 15;

      const shoulderX = hipX - 60;
      const shoulderY = floorY - 25 - t * 15;

      const headX = shoulderX - 25;
      const headY = shoulderY - 5;

      const handX = shoulderX - 45;
      const handY = shoulderY - 20;

      const footX = hipX + 80;
      const footY = floorY - 20 - t * 20;

      if (showMuscles) {
        // Deep abs & core glow
        ctx.fillStyle = primaryGlow;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 18 * t;
        ctx.beginPath();
        ctx.arc((shoulderX + hipX) / 2, hipY - 5, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(handX, handY);
      ctx.lineTo(shoulderX, shoulderY);
      ctx.lineTo(hipX, hipY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
      drawJoint(ctx, hipX, hipY, jointColor, 6);
      drawHead(ctx, headX, headY, 13);
      break;
    }

    case 'burpees': {
      // Burpee sequence based on progress
      // 0-0.25: Drop to squat
      // 0.25-0.5: Kick to plank & push
      // 0.5-0.75: Snap back to squat
      // 0.75-1.0: Jump up with hands overhead!
      if (progress < 0.25) {
        // Squat drop
        const subT = progress / 0.25;
        drawSquatFigure(ctx, w, floorY, subT, boneColor, jointColor, showMuscles, primaryGlow);
      } else if (progress < 0.55) {
        // Push-up on floor
        const subT = Math.sin(((progress - 0.25) / 0.3) * Math.PI);
        drawPushupFigure(ctx, w, floorY, subT, boneColor, jointColor, showMuscles, primaryGlow);
      } else if (progress < 0.75) {
        // Snap back up
        const subT = 1 - (progress - 0.55) / 0.2;
        drawSquatFigure(ctx, w, floorY, subT, boneColor, jointColor, showMuscles, primaryGlow);
      } else {
        // Jump!
        const subT = Math.sin(((progress - 0.75) / 0.25) * Math.PI);
        const jumpY = subT * 40;
        const centerX = w * 0.5;
        const footY = floorY - jumpY;
        const hipY = footY - 80;
        const shoulderY = hipY - 60;
        const headY = shoulderY - 25;
        const handY = shoulderY - 45;

        if (showMuscles) {
          ctx.fillStyle = primaryGlow;
          ctx.beginPath();
          ctx.arc(centerX, hipY, 16, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = boneColor;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(centerX, footY);
        ctx.lineTo(centerX, hipY);
        ctx.lineTo(centerX, shoulderY);
        // Hands up
        ctx.lineTo(centerX - 25, handY);
        ctx.moveTo(centerX, shoulderY);
        ctx.lineTo(centerX + 25, handY);
        ctx.stroke();

        drawJoint(ctx, centerX, shoulderY, jointColor, 6);
        drawJoint(ctx, centerX, hipY, jointColor, 6);
        drawHead(ctx, centerX, headY, 14);
      }
      break;
    }

    case 'jumping_jacks': {
      // Jacks: abduct and adduct arms & legs
      const centerX = w * 0.5;
      const legSpread = t * 45;
      const armAngle = t * Math.PI * 0.8;

      const hipY = floorY - 90;
      const footL_X = centerX - 15 - legSpread;
      const footR_X = centerX + 15 + legSpread;
      const footY = floorY - (t > 0.1 ? 10 : 0);

      const shoulderY = hipY - 60;
      const headY = shoulderY - 25;

      const handL_X = centerX - 20 - Math.cos(armAngle) * 55;
      const handL_Y = shoulderY - Math.sin(armAngle) * 55;

      const handR_X = centerX + 20 + Math.cos(armAngle) * 55;
      const handR_Y = shoulderY - Math.sin(armAngle) * 55;

      if (showMuscles) {
        ctx.fillStyle = primaryGlow;
        ctx.beginPath();
        ctx.arc(centerX, shoulderY, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = boneColor;
      ctx.lineWidth = 7;
      ctx.beginPath();
      // Legs
      ctx.moveTo(footL_X, footY);
      ctx.lineTo(centerX, hipY);
      ctx.lineTo(footR_X, footY);
      // Spine
      ctx.moveTo(centerX, hipY);
      ctx.lineTo(centerX, shoulderY);
      // Arms
      ctx.moveTo(handL_X, handL_Y);
      ctx.lineTo(centerX, shoulderY);
      ctx.lineTo(handR_X, handR_Y);
      ctx.stroke();

      drawJoint(ctx, centerX, shoulderY, jointColor, 6);
      drawJoint(ctx, centerX, hipY, jointColor, 6);
      drawHead(ctx, centerX, headY, 14);
      break;
    }

    default: {
      // General athletic movement fallback (smooth breathing squat flow)
      drawSquatFigure(ctx, w, floorY, t, boneColor, jointColor, showMuscles, primaryGlow);
      break;
    }
  }
}

function drawJoint(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, radius: number) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHead(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.save();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  // Visor / face direction indicator
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(x + radius * 0.4, y - 1, radius * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSquatFigure(
  ctx: CanvasRenderingContext2D,
  w: number,
  floorY: number,
  t: number,
  boneColor: string,
  jointColor: string,
  showMuscles: boolean,
  primaryGlow: string
) {
  const footX = w * 0.5;
  const footY = floorY;
  const hipY = floorY - 120 + t * 60;
  const hipX = footX - 30 * t;
  const kneeX = footX + 20 * t;
  const kneeY = floorY - 60 + t * 10;
  const shoulderX = hipX + 20;
  const shoulderY = hipY - 60;
  const headX = shoulderX;
  const headY = shoulderY - 25;

  if (showMuscles) {
    ctx.fillStyle = primaryGlow;
    ctx.beginPath();
    ctx.arc((hipX + kneeX) / 2, (hipY + kneeY) / 2, 14 + t * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = boneColor;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.lineTo(hipX, hipY);
  ctx.lineTo(kneeX, kneeY);
  ctx.lineTo(footX, footY);
  ctx.stroke();

  drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
  drawJoint(ctx, hipX, hipY, jointColor, 6);
  drawJoint(ctx, kneeX, kneeY, jointColor, 5);
  drawHead(ctx, headX, headY, 14);
}

function drawPushupFigure(
  ctx: CanvasRenderingContext2D,
  w: number,
  floorY: number,
  t: number,
  boneColor: string,
  jointColor: string,
  showMuscles: boolean,
  primaryGlow: string
) {
  const handX = w * 0.38;
  const handY = floorY;
  const toeX = w * 0.72;
  const toeY = floorY;

  const chestY = floorY - 60 + t * 40;
  const chestX = handX + 20;
  const hipX = chestX + 100;
  const hipY = chestY + 15;
  const shoulderX = chestX;
  const shoulderY = chestY - 10;
  const headX = shoulderX - 25;
  const headY = shoulderY - 8;
  const elbowX = handX + 15 - t * 15;
  const elbowY = shoulderY + (handY - shoulderY) * 0.5 - t * 20;

  if (showMuscles) {
    ctx.fillStyle = primaryGlow;
    ctx.beginPath();
    ctx.arc(shoulderX + 10, chestY + 5, 14 + t * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = boneColor;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.lineTo(hipX, hipY);
  ctx.lineTo(toeX, toeY);
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.lineTo(elbowX, elbowY);
  ctx.lineTo(handX, handY);
  ctx.stroke();

  drawJoint(ctx, shoulderX, shoulderY, jointColor, 5);
  drawJoint(ctx, elbowX, elbowY, jointColor, 5);
  drawJoint(ctx, hipX, hipY, jointColor, 6);
  drawHead(ctx, headX, headY, 14);
}
