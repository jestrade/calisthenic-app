import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { DifficultyLevel, FitnessGoal } from '../types/workout';
import {
  X,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Sliders,
  Target,
  Globe,
  Scale,
  Ruler,
  LogIn,
  LogOut
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const {
    user,
    userProfile,
    isProfileModalOpen,
    closeProfileModal,
    saveUserProfile,
    signInWithGoogle,
    signOutUser
  } = useAuth();
  const { t, language, setLanguage } = useTranslation();

  const [displayName, setDisplayName] = useState<string>('');
  const [fitnessLevel, setFitnessLevel] = useState<DifficultyLevel>('intermediate');
  const [primaryGoal, setPrimaryGoal] = useState<FitnessGoal>('strength');
  const [preferredLang, setPreferredLang] = useState<'en' | 'es'>(language);
  const [bodyWeight, setBodyWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || user?.displayName || '');
      setFitnessLevel(userProfile.fitnessLevel || 'intermediate');
      setPrimaryGoal(userProfile.primaryGoal || 'strength');
      setPreferredLang(userProfile.preferredLanguage || language);
      setBodyWeight(userProfile.bodyWeightKg ? String(userProfile.bodyWeightKg) : '');
      setHeight(userProfile.heightCm ? String(userProfile.heightCm) : '');
    } else if (user) {
      setDisplayName(user.displayName || 'Calisthenics Athlete');
    }
  }, [userProfile, user, isProfileModalOpen, language]);

  if (!isProfileModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveUserProfile({
        displayName: displayName.trim() || 'Calisthenics Athlete',
        fitnessLevel,
        primaryGoal,
        preferredLanguage: preferredLang,
        bodyWeightKg: bodyWeight ? parseFloat(bodyWeight) : undefined,
        heightCm: height ? parseFloat(height) : undefined
      });

      // Synchronize interface language if changed
      if (preferredLang !== language) {
        setLanguage(preferredLang);
      }

      setIsSavedNotice(true);
      setTimeout(() => {
        setIsSavedNotice(false);
        closeProfileModal();
      }, 1200);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!userProfile?.createdAt;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeProfileModal}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Avatar'}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <User className="w-7 h-7" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                {isEditing ? t.profile.editTitle : t.profile.createTitle}
              </span>
              {user && (
                <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded font-mono">
                  Google Verified
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              {displayName || (user ? user.displayName : t.guestUser)}
            </h2>
            <p className="text-xs text-slate-400 truncate max-w-xs">
              {user?.email || t.authRequiredToSave}
            </p>
          </div>
        </div>

        {/* Unauthenticated Prompt */}
        {!user && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-300 block mb-0.5">
                {t.signInToTrack}
              </span>
              <span className="text-xs text-slate-300 block">
                {t.authRequiredToSave}
              </span>
            </div>
            <button
              onClick={signInWithGoogle}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 whitespace-nowrap min-h-[38px]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.signInWithGoogle}</span>
            </button>
          </div>
        )}

        {/* Profile Creation Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Display Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.profile.displayName}</span>
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              maxLength={80}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Calisthenics Level */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.profile.fitnessLevel}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setFitnessLevel(lvl)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-colors min-h-[38px] ${
                    fitnessLevel === lvl
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.levels[lvl]}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Training Goal */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.profile.primaryGoal}</span>
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value as FitnessGoal)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="strength">{t.goals.strength}</option>
              <option value="endurance">{t.goals.endurance}</option>
              <option value="skills">{t.goals.skills}</option>
              <option value="weight_loss">{t.goals.weight_loss}</option>
              <option value="mobility">{t.goals.mobility}</option>
            </select>
          </div>

          {/* Language Preference */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.profile.preferredLanguage}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreferredLang('en')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-2 min-h-[38px] ${
                  preferredLang === 'en'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>English (US)</span>
              </button>
              <button
                type="button"
                onClick={() => setPreferredLang('es')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-2 min-h-[38px] ${
                  preferredLang === 'es'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>Español (ES)</span>
              </button>
            </div>
          </div>

          {/* Optional Weight & Height */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.profile.bodyWeight}</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="30"
                max="250"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(e.target.value)}
                placeholder="75.0"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.profile.height}</span>
              </label>
              <input
                type="number"
                step="1"
                min="100"
                max="240"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="178"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Feedback Notice */}
          {isSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.profile.profileUpdated}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 min-h-[42px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? t.profile.saveProfile : t.profile.createProfile}</span>
            </button>

            {user && (
              <button
                type="button"
                onClick={async () => {
                  await signOutUser();
                  closeProfileModal();
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 min-h-[42px]"
                title={t.signOut}
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">{t.signOut}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
