import { Exercise, DailyWorkoutPlan, DayOfWeek } from '../types/workout';
import { WORKOUT_PLANS } from '../data/workoutData';
import { translations, Language } from '../i18n/translations';

const SPANISH_EXERCISE_DATA: Record<string, Partial<Exercise>> = {
  // Warmup
  'wu-1': {
    name: 'Círculos de Brazos Dinámicos y Aperturas',
    shortName: 'Círculos Brazos',
    coachCue: 'Comienza con círculos pequeños y ve ampliando hacia arcos controlados para lubricar los hombros.',
    formPoints: [
      'Mantén la columna erguida y activa el abdomen ligeramente',
      'Invierte el sentido del giro a la mitad (22s)',
      'Inhala en la apertura, exhala en el arco frontal'
    ],
    commonMistakes: [
      'Encoger los hombros hacia el cuello',
      'Arquear la zona lumbar'
    ]
  },
  'wu-2': {
    name: 'Giros de Torso con Alcance',
    shortName: 'Giros Torso',
    coachCue: 'Pivota sobre la punta del pie trasero para proteger la rodilla. Deja que los brazos fluyan con el giro.',
    formPoints: [
      'Mantén la cadera estable y rota desde la caja torácica',
      'Mira por encima del hombro trasero en cada giro',
      'Ritmo respiratorio fluido y constante'
    ],
    commonMistakes: [
      'Girar bruscamente con las rodillas bloqueadas',
      'Aguantar la respiración durante las rotaciones'
    ]
  },
  'wu-3': {
    name: 'Sentadillas de Preparación y Apertura de Cadera',
    shortName: 'Sentadillas Prep',
    coachCue: 'Baja profundo, haz una pausa breve y empuja suavemente las rodillas hacia afuera con los codos.',
    formPoints: [
      'Pies al ancho de hombros, puntas hacia afuera 15-20°',
      'Distribuye el peso entre el medio pie y el talón',
      'Mantén el pecho erguido y atlético'
    ],
    commonMistakes: [
      'Despegar los talones del suelo',
      'Colapso de rodillas hacia adentro'
    ]
  },
  'wu-4': {
    name: 'Jumping Jacks Rítmicos',
    shortName: 'Jumping Jacks',
    coachCue: 'Aterriza con suavidad sobre los metatarsos. Prepara tu sistema nervioso para el esfuerzo.',
    formPoints: [
      'Rodillas elásticas y flexionadas en el impacto',
      'Toca suavemente las palmas sobre la cabeza en cada repetición',
      'Ciclo de respiración acompasado'
    ],
    commonMistakes: [
      'Golpear los talones con fuerza en el suelo',
      'Tensar el cuello y elevar trapecios'
    ]
  },
  // Monday Push
  'mon-1': {
    name: 'Flexiones Clásicas a Tempo',
    shortName: 'Flexiones',
    coachCue: 'Atornilla las palmas en el suelo para bloquear la rotación externa. El pecho toca el suelo en cada rep.',
    formPoints: [
      'Línea recta de orejas a talones; sin caderas hundidas',
      'Baja en 2 segundos, pausa de 0.5s abajo y sube explosivo',
      'Bloqueo de codos y protracción escapular arriba'
    ],
    commonMistakes: [
      'Caderas caídas o demasiado levantadas',
      'Bajar la cabeza antes que el pecho'
    ]
  },
  'mon-2': {
    name: 'Flexiones Pike (Press Militar de Hombro)',
    shortName: 'Flexiones Pike',
    coachCue: 'Caderas altas en V invertida. La cabeza se desplaza diagonalmente por delante de las manos.',
    formPoints: [
      'Acerca los pies a las manos para cargar el peso sobre hombros',
      'Baja la frente hacia un triángulo imaginario frente a las manos',
      'Empuja con las palmas llevando la cabeza entre los brazos arriba'
    ],
    commonMistakes: [
      'Convertir el movimiento en flexión normal con cadera baja',
      'Abrir los codos excesivamente hacia los lados'
    ]
  },
  'mon-3': {
    name: 'Flexiones Diamante (Enfoque Tríceps)',
    shortName: 'Flexiones Diamante',
    coachCue: 'Forma un diamante con pulgares e índices bajo el esternón. Aprieta los tríceps al subir.',
    formPoints: [
      'Codos pegados a las costillas durante todo el recorrido',
      'Modifica apoyando rodillas si pierdes la técnica abajo',
      'Exhala con fuerza presionando las palmas entre sí'
    ],
    commonMistakes: [
      'Codos abiertos hacia los lados sobrecargando muñecas',
      'Acortar el rango de movimiento'
    ]
  },
  'mon-4': {
    name: 'Fondos de Tríceps en Apoyo Elevado',
    shortName: 'Fondos en Silla',
    coachCue: 'Mantén la espalda rozando el banco. Desciende hasta que los codos formen un ángulo de 90 grados.',
    formPoints: [
      'Hombros deprimidos lejos de las orejas',
      'Piernas estiradas para mayor dificultad, dobladas para principiantes',
      'Empuja exclusivamente con el talón de las palmas'
    ],
    commonMistakes: [
      'Alejar la cadera del banco hacia adelante',
      'Bajar más de 90 grados forzando la cápsula del hombro'
    ]
  },
  'mon-5': {
    name: 'Retención Isométrica Hollow Body',
    shortName: 'Hollow Body',
    coachCue: 'Pega la zona lumbar firmemente contra el suelo. Si entra una hoja de papel, ¡corrige la postura!',
    formPoints: [
      'Brazos pegados a las orejas, piernas extendidas y juntas',
      'Retroversión pélvica para aplanar la espalda baja',
      'Respira de forma controlada manteniendo el core como hierro'
    ],
    commonMistakes: [
      'Espalda baja arqueada despegada del suelo',
      'Aguantar la respiración por completo'
    ]
  },
  // Tuesday Pull
  'tue-1': {
    name: 'Superman en Suelo y Tirones Escapulares',
    shortName: 'Pulsos Superman',
    coachCue: 'Túmbate boca abajo, eleva pecho y muslos, y lleva los codos hacia las costillas como un jalón dorsal.',
    formPoints: [
      'Aprieta glúteos para proteger la zona lumbar',
      'Inicia con las escápulas: imagina atrapar un lápiz entre ellas',
      'Mantén la contracción máxima por 1 segundo'
    ],
    commonMistakes: [
      'Forzar el cuello mirando al techo',
      'Separar los pies y perder tensión en cadera'
    ]
  },
  'tue-2': {
    name: 'Remo Invertido con Toalla o Marco de Puerta',
    shortName: 'Remos Corporales',
    coachCue: 'Inclínate hacia atrás a 45 grados. Tira del pecho hacia el anclaje guiando con los codos.',
    formPoints: [
      'Mantén una línea de plancha rígida en la cadera',
      'Tira desde el borde exterior de las manos para reclutar dorsales',
      'Controla la bajada en 2 segundos completos'
    ],
    commonMistakes: [
      'Impulsar con la cadera para ganar inercia',
      'Encoger los hombros hacia las orejas'
    ]
  },
  'tue-3': {
    name: 'Serie Escapular Prone Y-T-W',
    shortName: 'Elevaciones Y-T-W',
    coachCue: 'Pulgares apuntando al techo. Contracciones milimétricas para unos hombros a prueba de balas.',
    formPoints: [
      'Y: Brazos a 45° sobre la cabeza, despega pulgares 5 cm del suelo',
      'T: Brazos rectos a 90°, junta escápulas con fuerza',
      'W: Codos pegados a costillas, rota antebrazos hacia arriba'
    ],
    commonMistakes: [
      'Tirones bruscos con inercia en lugar de control muscular',
      'Apnea durante las series'
    ]
  },
  'tue-4': {
    name: 'Plancha Inversa y Puente Posterior',
    shortName: 'Plancha Inversa',
    coachCue: 'Empuja talones y palmas contra el suelo. Eleva caderas hasta formar una rampa recta.',
    formPoints: [
      'Dedos apuntando hacia adelante o ligeramente hacia afuera',
      'Abre el pecho y mira sutilmente hacia arriba',
      'Aprieta glúteos sin descanso para mantener la altura'
    ],
    commonMistakes: [
      'Caderas caídas hacia el suelo',
      'Colapsar el pecho hacia adentro'
    ]
  },
  'tue-5': {
    name: 'Deadbug Funcional y Coordinación',
    shortName: 'Deadbug',
    coachCue: 'Brazo y pierna opuestos se extienden al unísono. La espalda baja permanece pegada al suelo.',
    formPoints: [
      'Inhala al extender brazo y pierna lentamente',
      'Exhala al regresar a la posición inicial de 90 grados',
      'Mantén el talón suspendido a 5 cm del suelo sin tocarlo'
    ],
    commonMistakes: [
      'Arquear la zona lumbar al estirar la pierna',
      'Moverse demasiado rápido perdiendo la tensión cruzada'
    ]
  },
  // Wednesday Legs
  'wed-1': {
    name: 'Sentadillas Profundas a Tempo',
    shortName: 'Sentadillas Tempo',
    coachCue: 'Desciende en 3 segundos rompiendo el paralelo. Aprieta glúteos y bloquea caderas al subir.',
    formPoints: [
      'Las rodillas siguen la dirección del segundo dedo del pie',
      'Pecho alto con brazos al frente para contrapeso',
      'Extensión completa de cadera en cada repetición'
    ],
    commonMistakes: [
      'Quedarse a medias sin alcanzar profundidad paralela',
      'Cargar el peso en las puntas y despegar talones'
    ]
  },
  'wed-2': {
    name: 'Zancadas Inversas Alternas con Potencia',
    shortName: 'Zancadas Inversas',
    coachCue: 'Da un paso atrás formando ángulos de 90/90 grados en las rodillas. La rodilla trasera roza el suelo.',
    formPoints: [
      'La espinilla delantera queda vertical; talón firme en el suelo',
      'Torso ligeramente inclinado al frente para activar el glúteo',
      'Empuja con el talón delantero para erguirte con potencia'
    ],
    commonMistakes: [
      'Golpear la rodilla trasera contra el suelo duro',
      'Bamboleo de la rodilla delantera hacia adentro'
    ]
  },
  'wed-3': {
    name: 'Puente de Glúteos con Pulsos Isométricos',
    shortName: 'Puente de Glúteos',
    coachCue: 'Clava los talones en el suelo. Bascula la pelvis y aprieta glúteos hasta extender la cadera.',
    formPoints: [
      'Pies al ancho de cadera, espinillas verticales arriba',
      'No hiperextiendas la espalda baja para subir más',
      'Pausa de 2 segundos en el punto más alto'
    ],
    commonMistakes: [
      'Empujar con los dedos y sobrecargar isquiotibiales',
      'Arquear la espalda lumbar en vez de activar glúteos'
    ]
  },
  'wed-4': {
    name: 'Sentadilla Isométrica en Pared (Wall Sit)',
    shortName: 'Wall Sit Pared',
    coachCue: 'Muslos paralelos al suelo a 90 grados. Manos fuera de las rodillas, respira hondo.',
    formPoints: [
      'Espalda totalmente plana contra la pared',
      'Tobillos directamente debajo de las rodillas',
      'Respiración nasal serena durante el ardor de cuádriceps'
    ],
    commonMistakes: [
      'Apoyar las manos en las rodillas para quitar peso',
      'Despegar la espalda de la pared'
    ]
  },
  'wed-5': {
    name: 'Elevación de Gemelos en Borde de Escalón',
    shortName: 'Elevación Gemelos',
    coachCue: 'Estiramiento completo abajo, sube sobre los metatarsos hasta la cima y sostén 1 segundo.',
    formPoints: [
      'Apoyo de dedos en la pared solo para equilibrio',
      'Fase de bajada lenta de 2 segundos en cada rep',
      'Evita rebotar al llegar al punto más bajo'
    ],
    commonMistakes: [
      'Rebotar aprovechando el tendón de Aquiles sin control muscular',
      'Girar los tobillos hacia afuera arriba'
    ]
  },
  // Thursday Core
  'thu-1': {
    name: 'Balanceos Hollow Body (Hollow Rocks)',
    shortName: 'Hollow Rocks',
    coachCue: 'Fija la postura de plátano. Balancéate suavemente desde el coxis hasta las escápulas.',
    formPoints: [
      'Espalda baja pegada al suelo en la base de cada balanceo',
      'Puntas de pies estiradas y muslos bien juntos',
      'Brazos pegados firmemente a los lados de la cabeza'
    ],
    commonMistakes: [
      'Doblar rodillas o mover los brazos para ganar inercia',
      'Arquear la espalda durante el movimiento'
    ]
  },
  'thu-2': {
    name: 'Escaladores Cruzados a Alto Tempo',
    shortName: 'Escaladores Cruzados',
    coachCue: 'Lleva la rodilla hacia el codo opuesto en plancha sólida. Empuja el suelo lejos de ti.',
    formPoints: [
      'Manos bajo hombros con dedos abiertos aferrando el suelo',
      'Caderas al nivel de hombros: sin rebotar la cadera arriba',
      'Cadencia constante y respiración acompasada'
    ],
    commonMistakes: [
      'Rebotar las caderas bruscamente arriba y abajo',
      'Dejar caer los hombros entre las escápulas'
    ]
  },
  'thu-3': {
    name: 'Plancha Lateral con Elevación de Cadera',
    shortName: 'Plancha Lateral',
    coachCue: 'Pies alineados o escalonados. Baja la cadera 5 cm y súbela formando un arco superior.',
    formPoints: [
      'Codo justo debajo de la articulación del hombro',
      'Pecho perpendicular al suelo, sin rotar hacia adelante',
      'Aprieta los oblicuos en la parte superior'
    ],
    commonMistakes: [
      'Dejar caer la cadera hacia atrás',
      'Encoger el hombro de apoyo hacia la oreja'
    ]
  },
  'thu-4': {
    name: 'Deadbug Anti-Extensión Estricto',
    shortName: 'Bug Anti-Extensión',
    coachCue: 'Extiende una pierna, quédate a 5 cm del suelo, pausa 2 segundos y regresa con control estricto.',
    formPoints: [
      'Imagina aplastar una esponja con tu zona lumbar',
      'Mueve las extremidades como engranajes de reloj',
      'Exhalación total durante la extensión'
    ],
    commonMistakes: [
      'Acelerar las repeticiones sin mantener tensión',
      'Permitir que la espalda se separe del suelo'
    ]
  },
  'thu-5': {
    name: 'Toques de Hombro en Plancha Anti-Rotación',
    shortName: 'Toques de Hombro',
    coachCue: 'Separa los pies para ganar base. Toca el hombro opuesto con cero balanceo de caderas.',
    formPoints: [
      'Imagina un vaso de agua equilibrado en tu espalda',
      'Transfiere el peso suavemente antes de levantar la mano',
      'Activa glúteos y cuádriceps para anclar la pelvis'
    ],
    commonMistakes: [
      'Balancear las caderas de lado a lado con agresividad',
      'Apresurar los toques con la mano'
    ]
  },
  // Friday HIIT
  'fri-1': {
    name: 'Burpees con Flexión y Pecho al Suelo',
    shortName: 'Burpees Técnicos',
    coachCue: 'Baja a sentadilla, lanza los pies a plancha, haz flexión con pecho al suelo, salta y ¡arriba!',
    formPoints: [
      'Línea de plancha sólida; evita arquear la espalda baja',
      'El pecho toca completamente el suelo en la flexión',
      'Salto vertical explosivo con palmas sobre la cabeza'
    ],
    commonMistakes: [
      'Subir serpenteando la columna',
      'Aterrizar con rodillas rígidas o bloqueadas'
    ]
  },
  'fri-2': {
    name: 'Sentadillas con Salto y Caída Silenciosa',
    shortName: 'Sentadillas Salto',
    coachCue: 'Baja en sentadilla y ¡despega hacia el techo! Absorbe la caída en silencio como un felino.',
    formPoints: [
      'Baja de inmediato a la siguiente sentadilla al aterrizar',
      'Usa el braceo para generar impulso vertical',
      'Rodillas alineadas sobre los pies en la amortiguación'
    ],
    commonMistakes: [
      'Pisar fuerte transmitiendo el impacto a las rodillas',
      'Recortar la profundidad de la sentadilla previa al salto'
    ]
  },
  'fri-3': {
    name: 'Flujo de Flexión a Perro Boca Abajo',
    shortName: 'Flexión a Perro',
    coachCue: 'Empuja desde la flexión, eleva caderas en V y lleva el pecho hacia las espinillas.',
    formPoints: [
      'Estiramiento profundo de pecho y talones en perro boca abajo',
      'Transición suave hacia adelante a plancha para la siguiente flexión',
      'Respiración acompasada y fluida'
    ],
    commonMistakes: [
      'Apresurar la postura sin sentir el estiramiento posterior',
      'Perder la activación del core al regresar al frente'
    ]
  },
  'fri-4': {
    name: 'Sprint de Escaladores en Suelo',
    shortName: 'Sprint Escaladores',
    coachCue: '¡Pistonea esas rodillas! Conduce las piernas como si subieras una cuesta empinada.',
    formPoints: [
      'Muñecas firmemente ancladas debajo de los hombros',
      'Rodillas hacia el centro del pecho entre ambos brazos',
      'Mantén la cadencia alta sin disminuir la velocidad'
    ],
    commonMistakes: [
      'Dejar que los hombros se queden detrás de las muñecas',
      'Elevar las caderas demasiado alto en el aire'
    ]
  },
  'fri-5': {
    name: 'Voltereta Controlada Superman a Hollow',
    shortName: 'Superman a Hollow',
    coachCue: 'Mantén superman boca abajo, gira sobre tu eje a hollow body boca arriba ¡sin tocar extremidades al suelo!',
    formPoints: [
      'Posturas gimnásticas cerradas y tensas tanto en pecho como en espalda',
      'Inicia el giro con la torsión del core y la pelvis',
      'Controla el impulso en lugar de dejarte caer'
    ],
    commonMistakes: [
      'Empujarse con codos o rodillas',
      'Desarmar las posturas entre cada giro'
    ]
  },
  // Cooldown
  'cd-1': {
    name: 'Estiramiento Cobra a Esfinge en Suelo',
    shortName: 'Cobra en Suelo',
    coachCue: 'Abre el pecho hacia adelante por entre las clavículas en vez de forzar las lumbares.',
    formPoints: [
      'Empeines apoyados suavemente en el suelo',
      'Aleja los hombros de las orejas hacia abajo',
      'Inhalaciones y exhalaciones lentas de 4 segundos'
    ],
    commonMistakes: [
      'Tirar la cabeza hacia atrás pellizcando el cuello',
      'Encoger los hombros'
    ]
  },
  'cd-2': {
    name: 'Postura del Niño Extendida con Alcance Dorsal',
    shortName: 'Postura del Niño',
    coachCue: 'Camina las yemas hacia adelante mientras llevas las caderas a los talones. Descomprime la columna.',
    formPoints: [
      'Dedos gordos de pies juntos, rodillas abiertas',
      'Descansa la frente completamente en el suelo',
      'Respira expandiendo la parte posterior de los pulmones'
    ],
    commonMistakes: [
      'Dejar la cadera muy despegada de los talones',
      'Respiración superficial en el pecho'
    ]
  },
  'cd-3': {
    name: 'Extensión Torácica y Liberación de Hombros',
    shortName: 'Apertura Torácica',
    coachCue: 'Entrelaza los dedos detrás de la espalda y rueda los hombros hacia atrás con suavidad.',
    formPoints: [
      'Costillas abajo para no hiperarquear la zona lumbar',
      'Eleva levemente los nudillos para sentir el estiramiento del pecho',
      'Relaja el rostro y baja las pulsaciones'
    ],
    commonMistakes: [
      'Tirones bruscos de brazos hacia arriba',
      'Llevar el mentón hacia adelante'
    ]
  },
  'cd-4': {
    name: 'Plegado y Descompresión Isquiotibial',
    shortName: 'Plegado Consciente',
    coachCue: 'Deja que la gravedad cuelgue tu torso como un péndulo pesado. Señaliza al cuerpo que la recuperación empezó.',
    formPoints: [
      'Microflexión en rodillas para proteger el nervio ciático',
      'Cabeza, cuello y mandíbula completamente sueltos',
      'Exhalaciones audibles por la boca'
    ],
    commonMistakes: [
      'Bloquear las rodillas en hiperextensión',
      'Tirar forzadamente para tocar los pies en lugar de relajarse'
    ]
  }
};

/**
 * Returns a localized exercise object based on active language
 */
export function getLocalizedExercise(exercise: Exercise, lang: Language): Exercise {
  if (lang === 'en') return exercise;
  const esData = SPANISH_EXERCISE_DATA[exercise.id];
  if (!esData) return exercise;

  return {
    ...exercise,
    name: esData.name || exercise.name,
    shortName: esData.shortName || exercise.shortName,
    coachCue: esData.coachCue || exercise.coachCue,
    formPoints: esData.formPoints || exercise.formPoints,
    commonMistakes: esData.commonMistakes || exercise.commonMistakes
  };
}

/**
 * Returns a localized daily workout plan
 */
export function getLocalizedPlan(plan: DailyWorkoutPlan, lang: Language): DailyWorkoutPlan {
  if (lang === 'en') return plan;
  const dayTr = translations.es.days[plan.day];

  return {
    ...plan,
    dayLabel: dayTr.name,
    title: dayTr.title,
    focus: dayTr.focus,
    tagline: dayTr.tagline,
    coachQuote: dayTr.quote,
    coachDailyTip: dayTr.tip,
    warmupPhase: {
      ...plan.warmupPhase,
      title: 'Fase 1: Calentamiento Dinámico y Articular (4m)',
      coachInstruction: 'Activa la estabilidad de hombros y movilidad torácica antes del esfuerzo.',
      exercises: plan.warmupPhase.exercises.map((ex) => getLocalizedExercise(ex, lang))
    },
    mainPhase: {
      ...plan.mainPhase,
      title: 'Fase 2: Circuito Principal de Calistenia (22m • 3 Rondas)',
      coachInstruction: 'Completa 3 rondas completas de 5 movimientos. 40s de trabajo enfocado por 20s de descanso.',
      exercises: plan.mainPhase.exercises.map((ex) => getLocalizedExercise(ex, lang))
    },
    cooldownPhase: {
      ...plan.cooldownPhase,
      title: 'Fase 3: Enfriamiento y Movilidad Restaurativa (4m)',
      coachInstruction: 'Devuelve tu sistema nervioso a la calma y estira las fibras musculares trabajadas.',
      exercises: plan.cooldownPhase.exercises.map((ex) => getLocalizedExercise(ex, lang))
    }
  };
}
