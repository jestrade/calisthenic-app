export type Language = 'en' | 'es';

export interface TranslationDict {
  brandTitle: string;
  brandSubtitle: string;
  navToday: string;
  navProgram: string;
  navLab: string;
  navLogs: string;
  navProfile: string;
  start30Min: string;
  start30MinShort: string;
  signInWithGoogle: string;
  signInToTrack: string;
  authRequiredToSave: string;
  signedInAs: string;
  signOut: string;
  guestUser: string;
  streakCount: string;
  streakBest: string;
  sessionsCompleted: string;
  minutesOnFloor: string;
  caloriesBurned: string;
  weeklyConsistency: string;
  weeklySubtitle: string;
  completedHistory: string;
  simulateCompleted: string;
  resetHistory: string;
  noWorkoutsLogged: string;
  startTodayToLog: string;
  level: string;
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  goals: {
    strength: string;
    endurance: string;
    skills: string;
    weight_loss: string;
    mobility: string;
  };
  phases: {
    warmup: string;
    main: string;
    cooldown: string;
  };
  phaseTitles: {
    warmupFull: string;
    mainFull: string;
    cooldownFull: string;
  };
  workoutPlayer: {
    workInterval: string;
    restRecover: string;
    seconds: string;
    setOf: string;
    sessionTime: string;
    coachRealTimeCue: string;
    targetCadence: string;
    upNext: string;
    resume: string;
    pause: string;
    finishNow: string;
    workoutCrushed: string;
    coachedSession30: string;
    logAndClaim: string;
    close: string;
    burn: string;
    time: string;
    focus: string;
    mustSignInToSave: string;
    signInPromptDesc: string;
  };
  movementLab: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    perfectForm: string;
    commonMistakes: string;
    coachVerbalCue: string;
    movementModel: string;
    repCycle: string;
    primaryActivation: string;
    secondaryActivation: string;
    speed: string;
    musclesHighlighted: string;
    outlineOnly: string;
    phaseEccentric: string;
    phasePause: string;
    phaseConcentric: string;
    phaseReset: string;
    inspectMovement: string;
  };
  profile: {
    title: string;
    subtitle: string;
    createTitle: string;
    editTitle: string;
    displayName: string;
    email: string;
    fitnessLevel: string;
    primaryGoal: string;
    preferredLanguage: string;
    bodyWeight: string;
    height: string;
    saveProfile: string;
    createProfile: string;
    profileUpdated: string;
    athleteCard: string;
    syncRecords: string;
    cloudRecordsSaved: string;
    googleAccountLinked: string;
  };
  days: {
    monday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    tuesday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    wednesday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    thursday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    friday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    saturday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
    sunday: { name: string; short: string; title: string; focus: string; tagline: string; quote: string; tip: string };
  };
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    brandTitle: "Calisthenics Coach 30",
    brandSubtitle: "Monday to Friday High-Tension Biomechanics",
    navToday: "Today’s Coach",
    navProgram: "5-Day Program",
    navLab: "Movement Lab",
    navLogs: "Streaks & Logs",
    navProfile: "Profile",
    start30Min: "Start 30-Min Workout",
    start30MinShort: "Start 30m",
    signInWithGoogle: "Sign In with Google",
    signInToTrack: "Sign in with Google to track your records & streaks",
    authRequiredToSave: "Sign in with your Google account to sync workout records to the cloud.",
    signedInAs: "Signed in as",
    signOut: "Sign Out",
    guestUser: "Guest Athlete",
    streakCount: "Days Active",
    streakBest: "Best",
    sessionsCompleted: "30-Min Sessions Completed",
    minutesOnFloor: "Minutes On The Floor",
    caloriesBurned: "Estimated Calories (kcal)",
    weeklyConsistency: "Weekly 5-Day Coach Consistency",
    weeklySubtitle: "Complete each daily 30-minute block from Monday through Friday.",
    completedHistory: "Completed Workout History",
    simulateCompleted: "Simulate Completed Workout",
    resetHistory: "Reset",
    noWorkoutsLogged: "No workouts logged yet",
    startTodayToLog: "Start today’s 30-minute session or tap ‘Simulate Completed Workout’ to test your streak.",
    level: "Level",
    levels: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    goals: {
      strength: "Strength & Muscle Density",
      endurance: "Endurance & Work Capacity",
      skills: "Calisthenics Skills (Planche/Lever)",
      weight_loss: "Lean Conditioning & Fat Loss",
      mobility: "Joint Longevity & Mobility"
    },
    phases: {
      warmup: "Warm-up (4m)",
      main: "Main Circuit (22m)",
      cooldown: "Cool-down (4m)"
    },
    phaseTitles: {
      warmupFull: "Phase 1: Dynamic Warm-up & Joint Mobility (4 Minutes)",
      mainFull: "Phase 2: Calisthenics Main Circuit (22 Minutes • 3 Rounds)",
      cooldownFull: "Phase 3: Cool-down, Decompression & Reset (4 Minutes)"
    },
    workoutPlayer: {
      workInterval: "WORK INTERVAL",
      restRecover: "REST & RECOVER",
      seconds: "SECONDS",
      setOf: "Set",
      sessionTime: "SESSION TIME",
      coachRealTimeCue: "Coach’s Real-Time Cue",
      targetCadence: "Target Cadence",
      upNext: "UP NEXT",
      resume: "Resume",
      pause: "Pause",
      finishNow: "Finish Now",
      workoutCrushed: "Workout Crushed!",
      coachedSession30: "30-MINUTE CALISTHENICS COACHED SESSION",
      logAndClaim: "Log Workout & Claim Streak",
      close: "Close",
      burn: "Burn",
      time: "Time",
      focus: "Focus",
      mustSignInToSave: "Google Authentication Required to Save Records",
      signInPromptDesc: "Sign in with your Google account to record this session, maintain your streak, and view your progress across devices."
    },
    movementLab: {
      badge: "Movement Biomechanics Lab",
      title: "Calisthenics Movement & Form Library",
      subtitle: "Master the exact joint angles, muscle engagement patterns, and tempo phases for every exercise in your Monday to Friday routine.",
      searchPlaceholder: "Search exercise or muscle...",
      perfectForm: "Coach’s Perfect Form Keys",
      commonMistakes: "Common Mistakes to Avoid",
      coachVerbalCue: "Coach Verbal Cue",
      movementModel: "Biomechanical Movement Model",
      repCycle: "REP CYCLE",
      primaryActivation: "Primary Activation",
      secondaryActivation: "Secondary",
      speed: "SPEED",
      musclesHighlighted: "Muscles Highlighted",
      outlineOnly: "Outline Only",
      phaseEccentric: "ECCENTRIC (LOWERING)",
      phasePause: "PEAK ISOMETRY",
      phaseConcentric: "CONCENTRIC (DRIVING)",
      phaseReset: "RESET / LOCKOUT",
      inspectMovement: "Inspect Movement Graphic"
    },
    profile: {
      title: "Athlete Profile",
      subtitle: "Manage your physical stats, calisthenics skill level, and training preferences.",
      createTitle: "Create Athlete Profile",
      editTitle: "Edit Profile",
      displayName: "Athlete Name",
      email: "Google Account Email",
      fitnessLevel: "Calisthenics Experience",
      primaryGoal: "Primary Training Goal",
      preferredLanguage: "Interface Language",
      bodyWeight: "Body Weight (kg)",
      height: "Height (cm)",
      saveProfile: "Save Profile",
      createProfile: "Complete Profile Setup",
      profileUpdated: "Profile updated successfully!",
      athleteCard: "Verified Athlete",
      syncRecords: "Syncing records with cloud database...",
      cloudRecordsSaved: "All workout records stored securely in Firestore.",
      googleAccountLinked: "Linked with Google Authentication"
    },
    days: {
      monday: {
        name: "Monday",
        short: "Mon",
        title: "Push Power & Upper Body Mastery",
        focus: "Chest, Triceps, Anterior Deltoids & Serratus",
        tagline: "Build pushing leverage and foundational chest strength without weights.",
        quote: "Every push-up is a moving plank. Control the way down, explode on the press.",
        tip: "Focus on 45-degree elbow flare. Flaring elbows straight out to 90 degrees compromises your rotator cuff."
      },
      tuesday: {
        name: "Tuesday",
        short: "Tue",
        title: "Pull Strength & Posterior Chain",
        focus: "Lats, Rhomboids, Rear Deltoids & Posterior Spinal Erectors",
        tagline: "Balance your posture and build a resilient back using leverage and isometric contraction.",
        quote: "You cannot push what you cannot pull. Initiate every rep by depressing the shoulder blades.",
        tip: "Calisthenics pull without a pull-up bar is all about high-tension scapular retraction and floor pulls."
      },
      wednesday: {
        name: "Wednesday",
        short: "Wed",
        title: "Legs, Hips & Lower Body Explosion",
        focus: "Quadriceps, Glutes, Hamstrings, Hip Stabilizers & Calves",
        tagline: "Develop unshakeable bodyweight lower body horsepower, balance, and knee longevity.",
        quote: "Never skip leg day in calisthenics. Your legs are the base of every athletic human movement.",
        tip: "Drive through your full foot tripod: big toe knuckle, pinky toe knuckle, and center of heel."
      },
      thursday: {
        name: "Thursday",
        short: "Thu",
        title: "Core Architecture & Bracing",
        focus: "Rectus Abdominis, Obliques, Transverse Bracing & Hip Flexors",
        tagline: "Forge the unbreakable midsection required for high-level levers, planches, and posture.",
        quote: "True core strength is not doing 500 crunches. It is resisting unwanted extension, rotation, and flexion.",
        tip: "Exhale all your air at the peak of each contraction to engage the deep transverse abdominal wall."
      },
      friday: {
        name: "Friday",
        short: "Fri",
        title: "Full Body Athletic Flow & HIIT Burn",
        focus: "Full-Body Integration, Dynamic Conditioning & Calisthenics Stamina",
        tagline: "Combine pushing, pulling, squatting, and jumping into a high-energy athletic finisher for the week.",
        quote: "End the week with empty tanks. Every single muscle has been forged; now let them work as one unified machine.",
        tip: "Pace your breathing right from round one. Smooth inhalations in through your nose, powerful exhalations through mouth."
      },
      saturday: {
        name: "Saturday",
        short: "Sat",
        title: "Weekend Active Recovery & Joint Care",
        focus: "Tissue Hydration, Walking & Mobility Flow",
        tagline: "Your muscles grow during rest, not during workouts. Give your joints time to regenerate.",
        quote: "Rest is not laziness. It is the biological catalyst that turns fatigue into supercompensation and strength.",
        tip: "Coach recommends a 30-40 minute brisk nature walk, light foam rolling, and plenty of clean hydration."
      },
      sunday: {
        name: "Sunday",
        short: "Sun",
        title: "Weekly Reset & Mindset Preparation",
        focus: "Rest, Nutrition & Monday Readiness",
        tagline: "Refuel the engine and mentally prepare for tomorrow’s Monday Push session.",
        quote: "Champion athletes win on Sunday by sleeping deep, eating clean, and setting their intentions for Monday.",
        tip: "Prepare your workout area and water bottle tonight so you can jump straight into Monday Push without friction."
      }
    }
  },
  es: {
    brandTitle: "Calisthenics Coach 30",
    brandSubtitle: "Biomecánica de Alta Tensión de Lunes a Viernes",
    navToday: "Entrenador de Hoy",
    navProgram: "Programa 5 Días",
    navLab: "Laboratorio",
    navLogs: "Rachas y Registros",
    navProfile: "Perfil",
    start30Min: "Iniciar Rutina 30m",
    start30MinShort: "Iniciar 30m",
    signInWithGoogle: "Acceder con Google",
    signInToTrack: "Inicia sesión con Google para registrar tus entrenamientos y rachas",
    authRequiredToSave: "Inicia sesión con tu cuenta de Google para sincronizar tus récords en la nube.",
    signedInAs: "Sesión iniciada como",
    signOut: "Cerrar Sesión",
    guestUser: "Atleta Invitado",
    streakCount: "Días Activos",
    streakBest: "Récord",
    sessionsCompleted: "Sesiones de 30m Completadas",
    minutesOnFloor: "Minutos de Entrenamiento",
    caloriesBurned: "Calorías Estimadas (kcal)",
    weeklyConsistency: "Consistencia Semanal de 5 Días",
    weeklySubtitle: "Completa cada bloque diario de 30 minutos de Lunes a Viernes.",
    completedHistory: "Historial de Entrenamientos Completados",
    simulateCompleted: "Simular Entrenamiento Completado",
    resetHistory: "Restablecer",
    noWorkoutsLogged: "Aún no hay entrenamientos registrados",
    startTodayToLog: "Inicia la sesión de 30 minutos de hoy o pulsa 'Simular Entrenamiento' para probar tu racha.",
    level: "Nivel",
    levels: {
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado"
    },
    goals: {
      strength: "Fuerza y Densidad Muscular",
      endurance: "Resistencia y Capacidad de Trabajo",
      skills: "Habilidades de Calistenia (Planchas/Levers)",
      weight_loss: "Definición y Pérdida de Grasa",
      mobility: "Longevidad Articular y Movilidad"
    },
    phases: {
      warmup: "Calentamiento (4m)",
      main: "Circuito Principal (22m)",
      cooldown: "Enfriamiento (4m)"
    },
    phaseTitles: {
      warmupFull: "Fase 1: Calentamiento Dinámico y Movilidad Articular (4 Minutos)",
      mainFull: "Fase 2: Circuito Principal de Calistenia (22 Minutos • 3 Rondas)",
      cooldownFull: "Fase 3: Enfriamiento, Descompresión y Recuperación (4 Minutos)"
    },
    workoutPlayer: {
      workInterval: "INTERVALO DE TRABAJO",
      restRecover: "DESCANSO Y RECUPERACIÓN",
      seconds: "SEGUNDOS",
      setOf: "Serie",
      sessionTime: "TIEMPO DE SESIÓN",
      coachRealTimeCue: "Indicación del Entrenador en Tiempo Real",
      targetCadence: "Cadencia Objetivo",
      upNext: "A CONTINUACIÓN",
      resume: "Reanudar",
      pause: "Pausar",
      finishNow: "Terminar Ahora",
      workoutCrushed: "¡Entrenamiento Conquistado!",
      coachedSession30: "SESIÓN GUIADA DE CALISTENIA DE 30 MINUTOS",
      logAndClaim: "Registrar y Reclamar Racha",
      close: "Cerrar",
      burn: "Gasto",
      time: "Tiempo",
      focus: "Enfoque",
      mustSignInToSave: "Autenticación de Google Requerida para Guardar Registros",
      signInPromptDesc: "Inicia sesión con tu cuenta de Google para registrar esta sesión, mantener tu racha y ver tu progreso en cualquier dispositivo."
    },
    movementLab: {
      badge: "Laboratorio Biomecánico de Movimiento",
      title: "Biblioteca de Movimientos y Técnica de Calistenia",
      subtitle: "Domina los ángulos articulares exactos, patrones de activación muscular y fases de tempo para cada ejercicio de tu rutina de Lunes a Viernes.",
      searchPlaceholder: "Buscar ejercicio o músculo...",
      perfectForm: "Claves de Técnica Perfecta del Coach",
      commonMistakes: "Errores Comunes a Evitar",
      coachVerbalCue: "Indicación Verbal del Entrenador",
      movementModel: "Modelo Biomecánico de Movimiento",
      repCycle: "CICLO DE REP",
      primaryActivation: "Activación Primaria",
      secondaryActivation: "Secundaria",
      speed: "VELOCIDAD",
      musclesHighlighted: "Músculos Iluminados",
      outlineOnly: "Solo Contorno",
      phaseEccentric: "EXCÉNTRICO (BAJADA)",
      phasePause: "ISOMETRÍA MÁXIMA",
      phaseConcentric: "CONCÉNTRICO (EMPUJE)",
      phaseReset: "BLOQUEO / REINICIO",
      inspectMovement: "Inspeccionar Gráfico de Movimiento"
    },
    profile: {
      title: "Perfil del Atleta",
      subtitle: "Gestiona tus estadísticas físicas, nivel de calistenia y preferencias de entrenamiento.",
      createTitle: "Crear Perfil de Atleta",
      editTitle: "Editar Perfil",
      displayName: "Nombre del Atleta",
      email: "Correo de Cuenta de Google",
      fitnessLevel: "Experiencia en Calistenia",
      primaryGoal: "Objetivo Principal",
      preferredLanguage: "Idioma de la Interfaz",
      bodyWeight: "Peso Corporal (kg)",
      height: "Estatura (cm)",
      saveProfile: "Guardar Perfil",
      createProfile: "Completar Creación de Perfil",
      profileUpdated: "¡Perfil actualizado con éxito!",
      athleteCard: "Atleta Verificado",
      syncRecords: "Sincronizando registros con base de datos en la nube...",
      cloudRecordsSaved: "Todos tus récords están seguros en Firestore.",
      googleAccountLinked: "Vinculado con Autenticación de Google"
    },
    days: {
      monday: {
        name: "Lunes",
        short: "Lun",
        title: "Potencia de Empuje y Dominio del Tren Superior",
        focus: "Pectorales, Tríceps, Deltoides Anteriores y Serratos",
        tagline: "Desarrolla fuerza de empuje y pecho esculpido utilizando únicamente palancas corporales.",
        quote: "Cada flexión es una plancha en movimiento. Controla la bajada, explota en la subida.",
        tip: "Mantén los codos en un ángulo de 45 grados respecto al torso. Abrirlos a 90 grados compromete el manguito rotador."
      },
      tuesday: {
        name: "Martes",
        short: "Mar",
        title: "Fuerza de Tracción y Cadena Posterior",
        focus: "Dorsales, Romboides, Deltoides Posteriores y Erectores Espinales",
        tagline: "Equilibra tu postura y forja una espalda resiliente mediante tensión isométrica y tracción.",
        quote: "No puedes empujar lo que no puedes traccionar. Inicia cada repetición deprimiendo las escápulas.",
        tip: "La tracción en calistenia sin barra se basa en la retracción escapular de alta tensión y tirones en suelo."
      },
      wednesday: {
        name: "Miércoles",
        short: "Mié",
        title: "Piernas, Caderas y Explosión de Tren Inferior",
        focus: "Cuádriceps, Glúteos, Isquiotibiales, Estabilizadores y Gemelos",
        tagline: "Construye una base sólida e indestructible, equilibrio y longevidad en las rodillas.",
        quote: "Nunca te saltes el día de pierna en calistenia. Tus piernas son la base de todo movimiento humano atlético.",
        tip: "Empuja a través del trípode del pie: nudillo del dedo gordo, nudillo del dedo meñique y centro del talón."
      },
      thursday: {
        name: "Jueves",
        short: "Jue",
        title: "Arquitectura del Core y Soporte Funcional",
        focus: "Recto Abdominal, Oblicuos, Transverso y Flexores de Cadera",
        tagline: "Forja la zona media inquebrantable requerida para planchas avanzadas, levers y postura óptima.",
        quote: "La verdadera fuerza del core no es hacer 500 abdominales; es resistir la extensión, rotación y flexión indebida.",
        tip: "Exhala todo el aire en el punto máximo de contracción para activar la pared abdominal profunda."
      },
      friday: {
        name: "Viernes",
        short: "Vie",
        title: "Flujo Atlético de Cuerpo Completo y Remate HIIT",
        focus: "Integración de Todo el Cuerpo, Acondicionamiento Dinámico y Resistencia",
        tagline: "Combina empuje, tracción, sentadillas y saltos en un remate de alta energía para cerrar la semana.",
        quote: "Termina la semana vaciando los tanques. Cada músculo ha sido forjado; ahora déjalos trabajar como uno solo.",
        tip: "Regula tu respiración desde la primera ronda: inhalaciones suaves por la nariz y exhalaciones potentes por la boca."
      },
      saturday: {
        name: "Sábado",
        short: "Sáb",
        title: "Recuperación Activa del Fin de Semana y Cuidado Articular",
        focus: "Hidratación de Tejidos, Caminata y Flujo de Movilidad",
        tagline: "Tus músculos crecen durante el descanso, no durante el ejercicio. Dale tiempo a tus articulaciones para regenerarse.",
        quote: "El descanso no es pereza. Es el catalizador biológico que convierte la fatiga en supercompensación y fuerza.",
        tip: "El coach recomienda una caminata de 30-40 minutos, estiramientos suaves y abundante hidratación."
      },
      sunday: {
        name: "Domingo",
        short: "Dom",
        title: "Reinicio Semanal y Preparación Mental",
        focus: "Descanso, Nutrición y Enfoque para el Lunes",
        tagline: "Recarga el motor y prepárate mentalmente para la sesión de empuje de mañana.",
        quote: "Los campeones ganan los domingos durmiendo bien, alimentándose limpio y fijando sus metas para el lunes.",
        tip: "Prepara tu espacio de entrenamiento y tu botella de agua hoy para comenzar el lunes sin fricción."
      }
    }
  }
};
