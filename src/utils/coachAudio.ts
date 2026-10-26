/**
 * Real Coach Audio Engine
 * Provides synthesized acoustic timer beeps via Web Audio API
 * and spoken voice guidance cues via Web Speech Synthesis API.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const coachAudio = {
  /**
   * Short countdown beep (e.g. at 3, 2, 1 seconds)
   */
  playCountdownTick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio context may be restricted
    }
  },

  /**
   * Work interval start bell / chime
   */
  playWorkChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Two-tone rising energetic chime
      [
        { freq: 587.33, delay: 0 },    // D5
        { freq: 880.00, delay: 0.12 }  // A5
      ].forEach(({ freq, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.2, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.35);
      });
    } catch {
      // Audio fallback
    }
  },

  /**
   * Rest interval transition bell
   */
  playRestChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.3); // G4 drop
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Audio fallback
    }
  },

  /**
   * Workout completion victory fanfare
   */
  playVictoryFanfare() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.16 },
        { f: 783.99, d: 0.15, t: 0.32 },
        { f: 1046.50, d: 0.5, t: 0.48 }
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.22, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch {
      // Audio fallback
    }
  },

  /**
   * Spoken coach cue using Web Speech Synthesis
   */
  speakCue(phrase: string, enabled: boolean = true, lang: 'en' | 'es' = 'en') {
    if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      if (lang === 'es') {
        const esVoice = voices.find(v => v.lang.startsWith('es') || v.name.includes('Spanish') || v.name.includes('Español') || v.name.includes('Monica') || v.name.includes('Jorge'));
        if (esVoice) utterance.voice = esVoice;
      } else {
        const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (enVoice) utterance.voice = enVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback
    }
  }
};
