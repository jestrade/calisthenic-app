# Calisthenics Coach 30

A coached, 30-minute bodyweight training app for Monday through Friday. Each day
has a structured warm-up, main circuit and cool-down, with animated movement
graphics, form cues, interval timers and spoken coaching. The interface is
available in English and Spanish.

## Features

- **5-day curriculum**: a different focus each weekday, plus an active-recovery plan for the weekend.

  | Day       | Focus                                    |
  | --------- | ---------------------------------------- |
  | Monday    | Push Power & Upper Body Mastery          |
  | Tuesday   | Pull Strength & Posterior Chain          |
  | Wednesday | Legs, Hips & Lower Body Explosion        |
  | Thursday  | Core Architecture & Bracing              |
  | Friday    | Full Body Athletic Flow & HIIT Burn      |
  | Weekend   | Active Recovery & Joint Care             |

- **Guided workout player**: work and rest intervals, countdown beeps (Web Audio API) and voice cues (Web Speech Synthesis).
- **Movement Lab**: animated SVG graphics for every exercise, with primary and secondary muscles, form points and common mistakes.
- **Difficulty levels**: beginner, intermediate and advanced. Each level adjusts the interval timing.
- **Progress tracking**: completed sessions, current and best streaks, and estimated calories burned.
- **Accounts**: Google sign-in through Firebase Authentication. Athlete profiles and workout records are stored in Cloud Firestore.
- **English and Spanish**: the app picks a language from the browser and lets you switch it.

## Tech stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/) with [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for animation, [Lucide](https://lucide.dev/) for icons
- [Firebase](https://firebase.google.com/) (Auth + Firestore)
- `canvas-confetti` for the workout-complete celebration

## Getting started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh/); a `bun.lock` is included)
- A Firebase project with Google sign-in and Firestore enabled

### Installation

```bash
git clone https://github.com/jestrade/calisthenic-app.git
cd calisthenic-app
npm install        # or: bun install
```

### Configuration

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

   | Variable         | Description                                            |
   | ---------------- | ------------------------------------------------------ |
   | `GEMINI_API_KEY` | Gemini API key (injected automatically in AI Studio)   |
   | `APP_URL`        | URL where the app is hosted                            |

2. Put your Firebase web app config in `firebase-applet-config.json`, including the
   `firestoreDatabaseId` of your Firestore database.

3. Deploy the security rules in `firestore.rules` to your Firestore database, for
   example with the Firebase CLI:

   ```bash
   firebase deploy --only firestore:rules
   ```

### Run

```bash
npm run dev        # dev server on http://localhost:3000
```

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Vite dev server on port 3000     |
| `npm run build`   | Build for production into `dist/`          |
| `npm run preview` | Preview the production build               |
| `npm run lint`    | Type-check the project (`tsc --noEmit`)    |
| `npm run clean`   | Remove build output                        |

### Tests

Unit tests use the built-in `node:test` runner. Run them with `tsx`:

```bash
npx tsx --test src/utils/*.test.ts
```

## Project structure

```
src/
├── App.tsx                 # Main shell: tabs, day and difficulty selection
├── components/
│   ├── DailyPlanView.tsx         # Today's workout overview
│   ├── FiveDayCurriculumView.tsx # Weekly program
│   ├── MovementLabView.tsx       # Exercise library
│   ├── MovementLabModal.tsx      # Exercise detail
│   ├── ExerciseKineticGraphic.tsx# Animated SVG movement graphics
│   ├── WorkoutPlayer.tsx         # Guided interval player
│   ├── ProgressTrackerView.tsx   # Streaks and history
│   └── ProfileModal.tsx          # Athlete profile setup
├── context/AuthContext.tsx # Firebase auth, profile and records
├── data/workoutData.ts     # Exercise and daily plan definitions
├── i18n/                   # Translations and language context
├── lib/firebase.ts         # Firebase initialization
├── types/workout.ts        # Domain types
└── utils/                  # Timeline, streak, calorie logic, coach audio, localization
```

## Data model

Firestore rules (`firestore.rules`) deny everything by default. Signed-in users
can only reach their own data:

- `users/{userId}`: athlete profile (display name, fitness level, primary goal, preferred language)
- `users/{userId}/records/{recordId}`: completed workout records (day, title, date, duration, calories, difficulty)
