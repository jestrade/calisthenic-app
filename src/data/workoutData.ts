import { DailyWorkoutPlan, DayOfWeek, Exercise } from '../types/workout';

// Common Warm-up Exercises (4 mins total)
export const WARMUP_EXERCISES: Exercise[] = [
  {
    id: 'wu-1',
    name: 'Dynamic Arm Circles & Chest Openers',
    shortName: 'Arm Circles',
    category: 'warmup',
    primaryMuscles: ['Shoulders', 'Rotator Cuff', 'Pectorals'],
    secondaryMuscles: ['Upper Back'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec continuous',
    coachCue: 'Start with small tight circles, then expand into broad controlled arcs to lubricate shoulder capsules.',
    formPoints: [
      'Maintain erect spine and engage abdomen lightly',
      'Reverse rotation direction at the halfway mark (22s)',
      'Inhale on the opening motion, exhale on the forward arc'
    ],
    commonMistakes: [
      'Shrugging shoulders into the neck',
      'Flaring lower back instead of mobilizing thoracic spine'
    ],
    rigType: 'arm_circles'
  },
  {
    id: 'wu-2',
    name: 'Standing Torso Twists & Reach',
    shortName: 'Torso Twists',
    category: 'warmup',
    primaryMuscles: ['Thoracic Spine', 'Obliques'],
    secondaryMuscles: ['Hip Rotators', 'Core'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec fluid flow',
    coachCue: 'Pivot on your rear toe to protect the knee joint. Let your arms swing freely with rotational momentum.',
    formPoints: [
      'Keep hips relatively square while twisting through the rib cage',
      'Look over your back shoulder with each rotation',
      'Smooth, continuous breathing rhythm'
    ],
    commonMistakes: [
      'Twisting violently with locked knees',
      'Holding breath during rotations'
    ],
    rigType: 'torso_twist'
  },
  {
    id: 'wu-3',
    name: 'Air Squats to Hip Openers',
    shortName: 'Prep Squats',
    category: 'warmup',
    primaryMuscles: ['Hip Flexors', 'Quadriceps', 'Glutes'],
    secondaryMuscles: ['Ankles', 'Groin'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec smooth pace',
    coachCue: 'Sink deep into the squat, pause for a split second, and pry open your knees with your elbows.',
    formPoints: [
      'Feet shoulder-width apart, toes turned outward 15-20°',
      'Keep weight balanced across midfoot and heel',
      'Maintain an upright athletic chest'
    ],
    commonMistakes: [
      'Heels lifting off the ground',
      'Knees caving inward (valgus collapse)'
    ],
    rigType: 'squats'
  },
  {
    id: 'wu-4',
    name: 'Rhythm Jumping Jacks',
    shortName: 'Jumping Jacks',
    category: 'warmup',
    primaryMuscles: ['Calves', 'Cardiovascular System'],
    secondaryMuscles: ['Deltoids', 'Core'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec steady bounce',
    coachCue: 'Land softly on the balls of your feet. Prepare your central nervous system for work.',
    formPoints: [
      'Keep knees soft and springy on impact',
      'Touch hands gently overhead on every rep',
      'Even, rhythmic breath cycle'
    ],
    commonMistakes: [
      'Slapping heels loudly into the floor',
      'Tense neck and elevated traps'
    ],
    rigType: 'jumping_jacks'
  }
];

// Common Cool-down & Mobility Exercises (4 mins total)
export const COOLDOWN_EXERCISES: Exercise[] = [
  {
    id: 'cd-1',
    name: 'Prone Cobra to Sphynx Stretch',
    shortName: 'Cobra Stretch',
    category: 'cooldown',
    primaryMuscles: ['Abdominals', 'Hip Flexors', 'Chest'],
    secondaryMuscles: ['Erector Spinae'],
    equipmentNeeded: 'Mat or Floor',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec deep hold',
    coachCue: 'Pull your chest forward through your collarbones rather than jamming backwards into your lumbar spine.',
    formPoints: [
      'Press tops of feet gently into the ground',
      'Draw shoulder blades down and back away from ears',
      'Long, slow 4-second inhales and 4-second exhales'
    ],
    commonMistakes: [
      'Crunched cervical spine from throwing head back',
      'Shoulders bunched up around ears'
    ],
    rigType: 'cobra_stretch'
  },
  {
    id: 'cd-2',
    name: 'Extended Child’s Pose with Lat Reach',
    shortName: 'Child’s Pose',
    category: 'cooldown',
    primaryMuscles: ['Lats', 'Thoracic Spine', 'Glutes'],
    secondaryMuscles: ['Ankles', 'Shoulders'],
    equipmentNeeded: 'Mat or Floor',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec restorative hold',
    coachCue: 'Creep your fingertips forward as you push your hips back onto your heels. Decompress every vertebra.',
    formPoints: [
      'Big toes touching, knees wide apart',
      'Let your forehead rest completely on the floor',
      'Breathe into the back of your lungs'
    ],
    commonMistakes: [
      'Keeping hips too high off the heels',
      'Shallow breathing in upper chest'
    ],
    rigType: 'child_pose'
  },
  {
    id: 'cd-3',
    name: 'Thoracic Extension & Shoulder Release',
    shortName: 'Thoracic Release',
    category: 'cooldown',
    primaryMuscles: ['Pectorals', 'Anterior Deltoids'],
    secondaryMuscles: ['Biceps', 'Spine'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec gentle stretch',
    coachCue: 'Interlace fingers behind your back or reach wide, gently rolling shoulders open.',
    formPoints: [
      'Keep rib cage pulled down so back doesn’t over-arch',
      'Lift knuckles subtly upward to feel chest stretch',
      'Relax facial muscles and drop heart rate'
    ],
    commonMistakes: [
      'Jerking arms upward forcefully',
      'Jutting chin forward'
    ],
    rigType: 'arm_circles'
  },
  {
    id: 'cd-4',
    name: 'Deep Diaphragmatic Breath & Hamstring Decompression',
    shortName: 'Mindful Fold',
    category: 'cooldown',
    primaryMuscles: ['Hamstrings', 'Lower Back'],
    secondaryMuscles: ['Calves', 'Nervous System'],
    equipmentNeeded: 'None',
    workSec: 45,
    restSec: 15,
    repsTarget: '45 sec full relaxation',
    coachCue: 'Let gravity hang your spine long like a heavy pendulum. Signal your body that recovery begins right now.',
    formPoints: [
      'Micro-bend in knees to protect sciatic nerve',
      'Allow head, neck and jaw to go limp',
      'Long audible exhales through mouth'
    ],
    commonMistakes: [
      'Locking knees hyperextended',
      'Straining to touch toes rather than surrendering to gravity'
    ],
    rigType: 'child_pose'
  }
];

// 5-Day Monday to Friday Calisthenics Master Program
export const WORKOUT_PLANS: Record<DayOfWeek, DailyWorkoutPlan> = {
  monday: {
    day: 'monday',
    dayLabel: 'Monday',
    dayNumber: 1,
    title: 'Push Power & Upper Body Mastery',
    focus: 'Chest, Triceps, Anterior Deltoids & Serratus',
    tagline: 'Build pushing leverage and foundational chest strength without weights.',
    targetMusclesSummary: ['Pectoralis Major', 'Triceps Brachii', 'Front Deltoids', 'Serratus Anterior'],
    coachQuote: 'Every push-up is a moving plank. Control the way down, explode on the press.',
    coachDailyTip: 'Focus on 45-degree elbow flare. Flaring elbows straight out to 90 degrees compromises your rotator cuff.',
    totalMinutes: 30,
    estimatedCalories: 260,
    warmupPhase: {
      phase: 'warmup',
      title: 'Dynamic Joint Prep & Scapular Wake-up',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Activate shoulder stability and thoracic mobility before loaded pushing.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Calisthenics Push Circuit',
      durationMinutes: 22,
      rounds: 3,
      exercises: [
        {
          id: 'mon-1',
          name: 'Classic Tempo Push-Ups',
          shortName: 'Push-Ups',
          category: 'push',
          primaryMuscles: ['Pectorals', 'Triceps'],
          secondaryMuscles: ['Front Shoulders', 'Core'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '10-15 Reps (or 40s)',
          coachCue: 'Screw your hands into the floor to lock external shoulder rotation. Chest touches floor each rep.',
          formPoints: [
            'Straight line from ear down to heel; no sagging hips',
            'Lower over 2 seconds, hold 0.5s at bottom, drive up sharply',
            'Full elbow lockout and scapular protraction at the top'
          ],
          commonMistakes: [
            'Hips sagging or hiking up',
            'Head dropping forward before chest reaches ground'
          ],
          rigType: 'pushup'
        },
        {
          id: 'mon-2',
          name: 'Pike Push-Ups (Shoulder Press)',
          shortName: 'Pike Push-Ups',
          category: 'push',
          primaryMuscles: ['Anterior & Lateral Deltoids'],
          secondaryMuscles: ['Upper Chest', 'Triceps'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '8-12 Reps',
          coachCue: 'Hips high in an inverted V. Head travels diagonally forward of fingertips like a tripod.',
          formPoints: [
            'Walk feet in close to load weight over your shoulders',
            'Lower forehead toward an imaginary triangle in front of hands',
            'Push through the palms and drive head back between arms at top'
          ],
          commonMistakes: [
            'Turning the movement into a regular pushup with flat hips',
            'Elbows flaring excessively outward'
          ],
          rigType: 'pike_pushup'
        },
        {
          id: 'mon-3',
          name: 'Diamond Close-Grip Push-Ups',
          shortName: 'Diamond Push-Ups',
          category: 'push',
          primaryMuscles: ['Triceps Brachii', 'Inner Chest'],
          secondaryMuscles: ['Shoulders', 'Core'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '8-12 Reps',
          coachCue: 'Form a diamond with your thumbs and index fingers under your sternum. Squeeze triceps hard.',
          formPoints: [
            'Keep elbows tucked snug against the ribcage throughout',
            'Modify on knees if form degrades at the bottom',
            'Exhale forcefully as you press your palms together'
          ],
          commonMistakes: [
            'Flaring elbows out sideways putting pressure on wrists',
            'Cutting range of motion short'
          ],
          rigType: 'diamond_pushup'
        },
        {
          id: 'mon-4',
          name: 'Elevated Tricep Dips',
          shortName: 'Tricep Dips',
          category: 'push',
          primaryMuscles: ['Triceps Brachii'],
          secondaryMuscles: ['Lower Pectorals', 'Front Deltoids'],
          equipmentNeeded: 'Chair, Bench or Low Step',
          workSec: 40,
          restSec: 20,
          repsTarget: '12-15 Reps',
          coachCue: 'Keep your back skimming close to the bench. Lower until elbows hit a clean 90-degree angle.',
          formPoints: [
            'Shoulders pulled down away from ears',
            'Straight legs for more resistance, bent knees for beginner assistance',
            'Drive exclusively through the heels of your palms'
          ],
          commonMistakes: [
            'Letting hips drift far forward away from the bench',
            'Dropping past 90 degrees and straining front shoulder capsule'
          ],
          rigType: 'dips'
        },
        {
          id: 'mon-5',
          name: 'Hollow Body Isometric Hold',
          shortName: 'Hollow Body',
          category: 'core',
          primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
          secondaryMuscles: ['Hip Flexors', 'Quadriceps'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '40s Max Solid Hold',
          coachCue: 'Press your lumbar spine flat into the floor. If a sheet of paper could slide under your back, adjust!',
          formPoints: [
            'Arms overhead by ears, legs pointed straight out together',
            'Tuck pelvis into posterior pelvic tilt',
            'Breathe shallowly while keeping core contracted like iron'
          ],
          commonMistakes: [
            'Lower back arching off the floor',
            'Holding breath completely'
          ],
          rigType: 'hollow_body'
        }
      ],
      coachInstruction: 'Perform 3 full rounds of these 5 push progressions. 40 seconds of focused work followed by 20 seconds of rest. Take a full 60 seconds of rest between rounds.'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Chest & Anterior Deltoid Recovery',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Reset your posture, lengthen the chest fibers, and bring your nervous system back to baseline.'
    }
  },

  tuesday: {
    day: 'tuesday',
    dayLabel: 'Tuesday',
    dayNumber: 2,
    title: 'Pull Strength & Posterior Chain',
    focus: 'Lats, Rhomboids, Rear Deltoids & Posterior Spinal Erectors',
    tagline: 'Balance your posture and build a resilient back using leverage and isometric contraction.',
    targetMusclesSummary: ['Latissimus Dorsi', 'Rhomboids', 'Trapezius', 'Biceps', 'Erector Spinae'],
    coachQuote: 'You cannot push what you cannot pull. Initiate every rep by depressing the shoulder blades.',
    coachDailyTip: 'Calisthenics pull without a pull-up bar is all about high-tension scapular retraction and floor pulls.',
    totalMinutes: 30,
    estimatedCalories: 250,
    warmupPhase: {
      phase: 'warmup',
      title: 'Scapular Glides & Thoracic Flow',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Warm up thoracic spine rotation and prepare your shoulder blades for active retraction.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Posterior Tension & Back Circuit',
      durationMinutes: 22,
      rounds: 3,
      exercises: [
        {
          id: 'tue-1',
          name: 'Prone Superman Hold & Scapular Pulls',
          shortName: 'Superman Pulses',
          category: 'pull',
          primaryMuscles: ['Lower Traps', 'Erector Spinae', 'Rhomboids'],
          secondaryMuscles: ['Glutes', 'Rear Deltoids'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '12-15 Pulses (40s)',
          coachCue: 'Lie flat, lift chest and thighs, then pull elbows back toward your pockets like a lat pulldown.',
          formPoints: [
            'Squeeze glutes to protect lower spine',
            'Lead with the shoulder blades; pinch a pencil between them',
            'Hold the peak contraction for 1 full second'
          ],
          commonMistakes: [
            'Cranking neck up to look at ceiling',
            'Letting feet flop apart and disengaging hips'
          ],
          rigType: 'superman'
        },
        {
          id: 'tue-2',
          name: 'Doorframe / Towel Inverted Row',
          shortName: 'Bodyweight Rows',
          category: 'pull',
          primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
          secondaryMuscles: ['Biceps Brachii', 'Forearms'],
          equipmentNeeded: 'Sturdy Doorframe, Table or Bed Sheet Anchor',
          workSec: 40,
          restSec: 20,
          repsTarget: '10-12 Reps',
          coachCue: 'Lean back at a 45-degree angle. Pull your chest toward the anchor by driving elbows backward.',
          formPoints: [
            'Maintain a rock-solid plank line through hips',
            'Drive through the pinky side of your hands to recruit lats',
            'Control the descent over 2 full seconds'
          ],
          commonMistakes: [
            'Snapping hips forward to create momentum',
            'Shrugging shoulders into the neck'
          ],
          rigType: 'inverted_row'
        },
        {
          id: 'tue-3',
          name: 'Prone Y-T-W Scapular Series',
          shortName: 'Y-T-W Raises',
          category: 'pull',
          primaryMuscles: ['Middle & Lower Trapezius', 'Rear Deltoids'],
          secondaryMuscles: ['Rotator Cuff', 'Upper Back'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '5 Reps per letter (40s)',
          coachCue: 'Thumbs pointed up toward the ceiling. Tiny, surgical contractions for bulletproof shoulder health.',
          formPoints: [
            'Y: Arms 45° overhead, lift thumbs 2 inches off floor',
            'T: Arms straight out 90°, pinch shoulder blades',
            'W: Elbows pulled into ribs, rotate forearms upward'
          ],
          commonMistakes: [
            'Using jerky momentum rather than slow muscular control',
            'Holding breath during holds'
          ],
          rigType: 'superman'
        },
        {
          id: 'tue-4',
          name: 'Reverse Plank Glute & Lat Bridge',
          shortName: 'Reverse Plank',
          category: 'pull',
          primaryMuscles: ['Glutes', 'Hamstrings', 'Posterior Delts'],
          secondaryMuscles: ['Triceps', 'Core'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '40s Sustained Hold',
          coachCue: 'Press heels and palms into the ground. Lift hips until your body forms a straight ramp from heels to neck.',
          formPoints: [
            'Fingers point forward or slightly outward to relieve wrists',
            'Open the chest wide and look slightly upward',
            'Squeeze glutes relentlessly to maintain hip height'
          ],
          commonMistakes: [
            'Hips sagging down toward floor',
            'Collapsing the chest inward'
          ],
          rigType: 'glute_bridge'
        },
        {
          id: 'tue-5',
          name: 'Deadbug Core & Lat Coordination',
          shortName: 'Deadbug Flow',
          category: 'core',
          primaryMuscles: ['Transverse Abdominis', 'Lats'],
          secondaryMuscles: ['Hip Flexors', 'Spine'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '12-16 Alternating Reps',
          coachCue: 'Opposite arm and opposite leg extend simultaneously. Keep lower back pinned like concrete.',
          formPoints: [
            'Inhale as you extend arm and leg slowly',
            'Exhale as you return them to 90-degree start position',
            'Hover extended heel 2 inches above floor without touching'
          ],
          commonMistakes: [
            'Arching the lower back as limb extends',
            'Moving too fast and losing contralateral tension'
          ],
          rigType: 'deadbug'
        }
      ],
      coachInstruction: 'Complete 3 rounds of these 5 posterior strength movements. Maintain strict tension over speed.'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Lat Decompression & Spinal Relief',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Lengthen your lats in child’s pose, breathe into the ribs, and decompress the back.'
    }
  },

  wednesday: {
    day: 'wednesday',
    dayLabel: 'Wednesday',
    dayNumber: 3,
    title: 'Legs, Hips & Lower Body Explosion',
    focus: 'Quadriceps, Glutes, Hamstrings, Hip Stabilizers & Calves',
    tagline: 'Develop unshakeable bodyweight lower body horsepower, balance, and knee longevity.',
    targetMusclesSummary: ['Quadriceps Femoris', 'Gluteus Maximus', 'Hamstrings', 'Calves (Gastrocnemius)', 'Hip Abductors'],
    coachQuote: 'Never skip leg day in calisthenics. Your legs are the base of every athletic human movement.',
    coachDailyTip: 'Drive through your full foot tripod: big toe knuckle, pinky toe knuckle, and center of heel.',
    totalMinutes: 30,
    estimatedCalories: 290,
    warmupPhase: {
      phase: 'warmup',
      title: 'Hip Mobility & Ankle Primer',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Unlock ankle dorsiflexion and open hip adductors before loading squats and lunges.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Calisthenics Lower Body Blast',
      durationMinutes: 22,
      rounds: 3,
      exercises: [
        {
          id: 'wed-1',
          name: 'Tempo Deep Air Squats',
          shortName: 'Tempo Squats',
          category: 'legs',
          primaryMuscles: ['Quadriceps', 'Glutes'],
          secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
          equipmentNeeded: 'None',
          workSec: 40,
          restSec: 20,
          repsTarget: '15-20 Reps',
          coachCue: 'Descend over 3 seconds to below parallel. Squeeze glutes and snap hips forward at the top.',
          formPoints: [
            'Knees track over the 2nd and 3rd toes without collapsing',
            'Chest remains tall with arms forward for counterbalance',
            'Full hip lockout at the top of every rep'
          ],
          commonMistakes: [
            'Halving the depth and reversing before parallel',
            'Weight shifting onto toes and lifting heels'
          ],
          rigType: 'squats'
        },
        {
          id: 'wed-2',
          name: 'Alternating Reverse Lunges with Knee Drive',
          shortName: 'Reverse Lunges',
          category: 'legs',
          primaryMuscles: ['Glutes', 'Hamstrings', 'Quadriceps'],
          secondaryMuscles: ['Balance Stabilizers', 'Core'],
          equipmentNeeded: 'None',
          workSec: 40,
          restSec: 20,
          repsTarget: '14-16 Total Reps',
          coachCue: 'Step back into a 90/90 degree knee angle. Hover the back knee 1 inch off the floor.',
          formPoints: [
            'Front shin stays nearly vertical; keep front heel firmly planted',
            'Torso tilted slightly forward to bias glute engagement',
            'Drive through the front heel to stand tall with power'
          ],
          commonMistakes: [
            'Banging rear knee into the hard floor',
            'Front knee wobbling inward'
          ],
          rigType: 'lunges'
        },
        {
          id: 'wed-3',
          name: 'Single-Leg & Glute Bridge Pulses',
          shortName: 'Glute Bridges',
          category: 'legs',
          primaryMuscles: ['Gluteus Maximus', 'Hamstrings'],
          secondaryMuscles: ['Erector Spinae', 'Abdominals'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '15 Reps + 5s hold',
          coachCue: 'Drive your heels through the floor. Tuck your tailbone and squeeze glutes until hips fully extend.',
          formPoints: [
            'Feet hip-width apart, shins vertical at top position',
            'Do not hyperextend your lower back to reach higher',
            'Hold the top contraction for a 2-second pause'
          ],
          commonMistakes: [
            'Pushing with toes and cramping hamstrings',
            'Over-arching lumbar spine instead of using glutes'
          ],
          rigType: 'glute_bridge'
        },
        {
          id: 'wed-4',
          name: 'Isometric Wall Sit or Hover Hold',
          shortName: 'Wall Sit Hold',
          category: 'legs',
          primaryMuscles: ['Quadriceps (Vastus Medialis & Lateralis)'],
          secondaryMuscles: ['Calves', 'Core'],
          equipmentNeeded: 'Wall or Stable Surface',
          workSec: 40,
          restSec: 20,
          repsTarget: '40s Unbroken Hold',
          coachCue: 'Thighs parallel to the floor, 90-degree knee bend. Hands off your knees, breathe deeply.',
          formPoints: [
            'Back completely flat against the wall, head back',
            'Ankles directly underneath knees',
            'Calm nasal breathing through the quad burn'
          ],
          commonMistakes: [
            'Resting hands on knees to push weight off legs',
            'Slumping forward off the wall'
          ],
          rigType: 'wall_sit'
        },
        {
          id: 'wed-5',
          name: 'Elevated Single-Leg Calf Raises',
          shortName: 'Calf Raises',
          category: 'legs',
          primaryMuscles: ['Gastrocnemius', 'Soleus'],
          secondaryMuscles: ['Foot Intrinsic Muscles', 'Tibialis'],
          equipmentNeeded: 'Step edge or Flat Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '20 Reps (10/leg or bilateral)',
          coachCue: 'Full stretch at the bottom, rise all the way up onto your big toe knuckles, hold 1 second.',
          formPoints: [
            'Light fingertip touch on a wall for balance only',
            'Slow 2-second lowering phase on every rep',
            'Avoid bouncing out of the bottom stretch'
          ],
          commonMistakes: [
            'Bouncing rapidly using Achilles tendon recoil rather than muscle',
            'Rolling ankles outward at the top'
          ],
          rigType: 'squats'
        }
      ],
      coachInstruction: 'Power through 3 rounds of this calisthenics leg circuit. Dig deep on the wall sit!'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Quad, Hamstring & Glute Stretch',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Flush metabolic waste from the lower body with gentle hip and quad releases.'
    }
  },

  thursday: {
    day: 'thursday',
    dayLabel: 'Thursday',
    dayNumber: 4,
    title: 'Core Architecture & Bracing',
    focus: 'Rectus Abdominis, Obliques, Transverse Bracing & Hip Flexors',
    tagline: 'Forge the unbreakable midsection required for high-level levers, planches, and posture.',
    targetMusclesSummary: ['Rectus Abdominis', 'Internal & External Obliques', 'Transverse Abdominis', 'Serratus', 'Pelvic Floor'],
    coachQuote: 'True core strength is not doing 500 crunches. It is resisting unwanted extension, rotation, and flexion.',
    coachDailyTip: 'Exhale all your air at the peak of each contraction to engage the deep transverse abdominal wall.',
    totalMinutes: 30,
    estimatedCalories: 240,
    warmupPhase: {
      phase: 'warmup',
      title: 'Spinal Articulation & Deep Core Primer',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Activate the diaphragm, transverse abdominis, and pelvic floor before high-intensity core sets.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Calisthenics 360-Degree Core Crucible',
      durationMinutes: 22,
      rounds: 3,
      exercises: [
        {
          id: 'thu-1',
          name: 'Hollow Body Rockers & Compression',
          shortName: 'Hollow Rocks',
          category: 'core',
          primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
          secondaryMuscles: ['Hip Flexors', 'Quadriceps'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '12-15 Rocks (or 40s hold)',
          coachCue: 'Lock into your banana shape. Rock gently from tailbone to shoulder blades without changing joint angles.',
          formPoints: [
            'Lower back glued to the floor at the bottom of each rock',
            'Point toes hard and squeeze inner thighs together',
            'Arms pinned tightly by your ears'
          ],
          commonMistakes: [
            'Bending knees or waving arms to create momentum',
            'Arching back during the rock'
          ],
          rigType: 'hollow_body'
        },
        {
          id: 'thu-2',
          name: 'Cross-Body High-Tempo Mountain Climbers',
          shortName: 'Mountain Climbers',
          category: 'core',
          primaryMuscles: ['Obliques', 'Rectus Abdominis'],
          secondaryMuscles: ['Shoulders', 'Hip Flexors', 'Cardio'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '40s Rapid Controlled Cadence',
          coachCue: 'Drive knee toward the opposite elbow in a strong plank. Keep your shoulders pushed away from floor.',
          formPoints: [
            'Hands under shoulders with spread fingers gripping the floor',
            'Keep hips level with shoulders—no bouncing butt up into air',
            'Maintain steady rhythmic breathing despite the pace'
          ],
          commonMistakes: [
            'Hips bobbing wildly up and down',
            'Shoulders sinking between shoulder blades'
          ],
          rigType: 'mountain_climbers'
        },
        {
          id: 'thu-3',
          name: 'Side Plank Hip Dips & Rotation',
          shortName: 'Side Plank Dips',
          category: 'core',
          primaryMuscles: ['Internal & External Obliques'],
          secondaryMuscles: ['Quadratus Lumborum', 'Gluteus Medius'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '20s Right Side / 20s Left Side',
          coachCue: 'Stack feet or stagger them. Lower hip 2 inches, then drive upward to create a rainbow arch.',
          formPoints: [
            'Elbow directly beneath the shoulder joint',
            'Chest open perpendicular to floor, avoiding forward roll',
            'Squeeze obliques hard at the peak of the lift'
          ],
          commonMistakes: [
            'Hips sagging back behind the body',
            'Shoulder hiking up into the ear'
          ],
          rigType: 'plank_hold'
        },
        {
          id: 'thu-4',
          name: 'Deadbug Anti-Extension Hold',
          shortName: 'Anti-Extension Bug',
          category: 'core',
          primaryMuscles: ['Transverse Abdominis', 'Deep Core'],
          secondaryMuscles: ['Hip Flexors', 'Erectors'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '14-16 Strict Reps',
          coachCue: 'Extend one leg long, hover 2 inches, pause for 2 seconds, and draw it back in under strict control.',
          formPoints: [
            'Pretend you are crushing a sponge with your lower back',
            'Move limbs like clockwork gears—slow and deliberate',
            'Full exhale on the reach'
          ],
          commonMistakes: [
            'Speeding through repetitions without tension',
            'Allowing spine to lift from floor'
          ],
          rigType: 'deadbug'
        },
        {
          id: 'thu-5',
          name: 'Plank-to-Pike Shoulder Taps',
          shortName: 'Plank Shoulder Taps',
          category: 'core',
          primaryMuscles: ['Core Anti-Rotation', 'Serratus Anterior'],
          secondaryMuscles: ['Deltoids', 'Pectorals'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '20 Total Taps (10/arm)',
          coachCue: 'Widen your feet for stability. Touch opposite shoulder with zero side-to-side hip sway!',
          formPoints: [
            'Imagine a glass of water balanced on your lower back',
            'Shift weight smoothly before lifting the hand',
            'Lock glutes and quads to anchor hips'
          ],
          commonMistakes: [
            'Rocking hips side to side aggressively',
            'Rushing hand touches'
          ],
          rigType: 'pushup'
        }
      ],
      coachInstruction: 'Complete 3 rounds of these 5 core stabilizers. Quality and spinal stability over speed!'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Abdominal Wall Lengthening & Relaxation',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Sink into cobra pose to open up the rectus abdominis and release tension in the lower back.'
    }
  },

  friday: {
    day: 'friday',
    dayLabel: 'Friday',
    dayNumber: 5,
    title: 'Full Body Athletic Flow & HIIT Burn',
    focus: 'Full-Body Integration, Dynamic Conditioning & Calisthenics Stamina',
    tagline: 'Combine pushing, pulling, squatting, and jumping into a high-energy athletic finisher for the week.',
    targetMusclesSummary: ['Full Body Kinetic Chain', 'Cardiovascular System', 'Pectorals', 'Quads', 'Core'],
    coachQuote: 'End the week with empty tanks. Every single muscle has been forged; now let them work as one unified machine.',
    coachDailyTip: 'Pace your breathing right from round one. Smooth inhalations in through your nose, powerful exhalations through mouth.',
    totalMinutes: 30,
    estimatedCalories: 320,
    warmupPhase: {
      phase: 'warmup',
      title: 'Full Kinetic Activation & Pulse Elevation',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Get the heart rate climbing gradually and ensure all prime movers are warm and ready.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Full Body Calisthenics HIIT Finale',
      durationMinutes: 22,
      rounds: 3,
      exercises: [
        {
          id: 'fri-1',
          name: 'Calisthenics Form Burpees (Chest to Floor)',
          shortName: 'Form Burpees',
          category: 'flow',
          primaryMuscles: ['Full Body', 'Cardio', 'Chest'],
          secondaryMuscles: ['Quads', 'Core', 'Triceps'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '10-14 Reps',
          coachCue: 'Squat down, shoot feet back into a pristine plank, perform a clean pushup, snap feet forward, jump up!',
          formPoints: [
            'Solid plank line—no floppy lower back worming',
            'Full chest touch on the push-up portion',
            'Explosive jump with hands reaching overhead at top'
          ],
          commonMistakes: [
            'Worming up with arched spine',
            'Landing with stiff locked knees'
          ],
          rigType: 'burpees'
        },
        {
          id: 'fri-2',
          name: 'Explosive Jump Squats to Soft Landings',
          shortName: 'Jump Squats',
          category: 'legs',
          primaryMuscles: ['Quadriceps', 'Glutes', 'Calves'],
          secondaryMuscles: ['Core', 'Ankles'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '12-16 Reps',
          coachCue: 'Drop into a squat and launch toward the ceiling! Absorb the landing silently like a cat.',
          formPoints: [
            'Sink immediately into the next squat upon landing',
            'Use arms to swing and generate vertical momentum',
            'Keep knees aligned over toes during the landing absorption'
          ],
          commonMistakes: [
            'Heavy stomping landing sending shockwaves to knees',
            'Cutting squat depth before the jump'
          ],
          rigType: 'squats'
        },
        {
          id: 'fri-3',
          name: 'Push-Up to Downward Dog Flow',
          shortName: 'Push to Down-Dog',
          category: 'flow',
          primaryMuscles: ['Pectorals', 'Shoulders', 'Hamstrings'],
          secondaryMuscles: ['Triceps', 'Calves', 'Core'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '10-12 Fluid Reps',
          coachCue: 'Press up from the push-up, then pike your hips up and push your chest back toward your shins.',
          formPoints: [
            'Deep chest stretch and heel sink in downward dog',
            'Smooth transition back forward into plank for the next pushup',
            'Steady, rhythmic breathing flow'
          ],
          commonMistakes: [
            'Rushing through without getting the hamstring stretch in dog',
            'Losing core brace on the forward return'
          ],
          rigType: 'pushup'
        },
        {
          id: 'fri-4',
          name: 'Mountain Climber Sprints',
          shortName: 'Climber Sprints',
          category: 'core',
          primaryMuscles: ['Hip Flexors', 'Abdominals', 'Cardio'],
          secondaryMuscles: ['Shoulders', 'Calves'],
          equipmentNeeded: 'Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '40s Max Effort Sprint',
          coachCue: 'Piston those knees! Drive like you are sprinting up a steep 45-degree hill.',
          formPoints: [
            'Lock wrists firmly under shoulders',
            'Drive knees straight between arms toward chest',
            'Maintain continuous high cadence without slowing down'
          ],
          commonMistakes: [
            'Letting shoulders creep behind wrists',
            'Raising hips high into the air'
          ],
          rigType: 'mountain_climbers'
        },
        {
          id: 'fri-5',
          name: 'Superman to Hollow Body Flips',
          shortName: 'Superman to Hollow',
          category: 'flow',
          primaryMuscles: ['Antagonistic Core', 'Posterior Chain'],
          secondaryMuscles: ['Full Torso Stabilizers'],
          equipmentNeeded: 'Mat or Floor',
          workSec: 40,
          restSec: 20,
          repsTarget: '8-10 Smooth Rolls',
          coachCue: 'Hold superman on belly, roll over smoothly into hollow body on back without touching hands/feet to ground!',
          formPoints: [
            'Tight gymnastic hollow body holds on both front and back',
            'Use rotational core torque to initiate the roll',
            'Control the momentum rather than flopping'
          ],
          commonMistakes: [
            'Using elbows or knees to shove yourself over',
            'Collapsing the limbs between rolls'
          ],
          rigType: 'hollow_body'
        }
      ],
      coachInstruction: 'Give everything you have left for 3 rounds. This is where your functional conditioning leaps forward!'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Full Body Reset & Celebration Stretch',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Congratulations on crushing 5 days! Breathe deeply, express gratitude to your body, and initiate weekend recovery.'
    }
  },

  // Weekend recovery days
  saturday: {
    day: 'saturday',
    dayLabel: 'Saturday',
    dayNumber: 6,
    title: 'Weekend Active Recovery & Joint Care',
    focus: 'Tissue Hydration, Walking & Mobility Flow',
    tagline: 'Your muscles grow during rest, not during workouts. Give your joints time to regenerate.',
    targetMusclesSummary: ['Joint Capsules', 'Fascia', 'Cardiorespiratory Recovery'],
    coachQuote: 'Rest is not laziness. It is the biological catalyst that turns fatigue into supercompensation and strength.',
    coachDailyTip: 'Coach recommends a 30-40 minute brisk nature walk, light foam rolling, and plenty of clean hydration.',
    totalMinutes: 30,
    estimatedCalories: 120,
    warmupPhase: {
      phase: 'warmup',
      title: 'Gentle Joint Awakening',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Light, effortless movement to wake up synovial fluid in the joints.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Restorative Mobility & Deep Breathing Flow',
      durationMinutes: 22,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Enjoy deep stretches, diaphragmatic breathing, and passive spinal decompression.'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Meditation & Nervous System Reset',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Lie still, focus on long exhales, and let your body absorb the week’s work.'
    }
  },

  sunday: {
    day: 'sunday',
    dayLabel: 'Sunday',
    dayNumber: 7,
    title: 'Weekly Reset & Mindset Preparation',
    focus: 'Rest, Nutrition & Monday Readiness',
    tagline: 'Refuel the engine and mentally prepare for tomorrow’s Monday Push session.',
    targetMusclesSummary: ['Central Nervous System', 'Metabolic Recovery'],
    coachQuote: 'Champion athletes win on Sunday by sleeping deep, eating clean, and setting their intentions for Monday.',
    coachDailyTip: 'Prepare your workout area and water bottle tonight so you can jump straight into Monday Push without friction.',
    totalMinutes: 30,
    estimatedCalories: 100,
    warmupPhase: {
      phase: 'warmup',
      title: 'Light Spinal Prep',
      durationMinutes: 4,
      rounds: 1,
      exercises: WARMUP_EXERCISES,
      coachInstruction: 'Keep it gentle and relaxing.'
    },
    mainPhase: {
      phase: 'main',
      title: 'Full Body Myofascial Release',
      durationMinutes: 22,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Loosen tight hips, chest, and ankles for tomorrow.'
    },
    cooldownPhase: {
      phase: 'cooldown',
      title: 'Mental Focus & Deep Rest',
      durationMinutes: 4,
      rounds: 1,
      exercises: COOLDOWN_EXERCISES,
      coachInstruction: 'Rest easy. We kick off Monday Push tomorrow with fresh energy.'
    }
  }
};

export const WEEKDAY_ORDER: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
