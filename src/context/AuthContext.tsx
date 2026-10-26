import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { CompletedWorkoutLog, DifficultyLevel, FitnessGoal, UserProfile } from '../types/workout';
import { calculateStreak } from '../utils/workoutLogic';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  records: CompletedWorkoutLog[];
  loading: boolean;
  streak: { currentStreak: number; bestStreak: number };
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  saveUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  saveWorkoutRecord: (log: CompletedWorkoutLog) => Promise<void>;
  clearRecords: () => Promise<void>;
  seedDemoRecord: (log: CompletedWorkoutLog) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_RECORDS = 'calisthenics_coach30_logs';
const LOCAL_STORAGE_PROFILE = 'calisthenics_coach30_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [records, setRecords] = useState<CompletedWorkoutLog[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_RECORDS);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Monitor Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch User Profile from Firestore
        const userDocPath = `users/${currentUser.uid}`;
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // First time Google login! Trigger profile creation modal automatically
            const newProfile: UserProfile = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Calisthenics Athlete',
              photoURL: currentUser.photoURL || '',
              fitnessLevel: 'intermediate',
              primaryGoal: 'strength',
              preferredLanguage: 'en',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            setUserProfile(newProfile);
            // Save initial profile
            await setDoc(docRef, newProfile);
            setIsProfileModalOpen(true);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, userDocPath);
        }

        // Attach listener for user's workout records
        const recordsColPath = `users/${currentUser.uid}/records`;
        try {
          const recordsColRef = collection(db, 'users', currentUser.uid, 'records');
          const q = query(recordsColRef, orderBy('completedAt', 'desc'));

          const unsubRecords = onSnapshot(
            q,
            (snapshot) => {
              const loadedRecords: CompletedWorkoutLog[] = [];
              snapshot.forEach((d) => {
                const data = d.data();
                loadedRecords.push({
                  id: d.id,
                  dateStr: data.dateStr,
                  dayOfWeek: data.dayOfWeek,
                  workoutTitle: data.workoutTitle,
                  completedAt: data.completedAt,
                  durationSeconds: data.durationSeconds,
                  caloriesBurned: data.caloriesBurned,
                  difficulty: data.difficulty
                });
              });
              setRecords(loadedRecords);
              // Cache locally
              if (typeof window !== 'undefined') {
                localStorage.setItem(LOCAL_STORAGE_RECORDS, JSON.stringify(loadedRecords));
              }
            },
            (err) => {
              handleFirestoreError(err, OperationType.LIST, recordsColPath);
            }
          );

          setLoading(false);
          return () => {
            unsubRecords();
          };
        } catch (error) {
          handleFirestoreError(error, OperationType.LIST, recordsColPath);
        }
      } else {
        // Logged out
        setUserProfile(null);
        // Fallback to local storage records
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(LOCAL_STORAGE_RECORDS);
          setRecords(saved ? JSON.parse(saved) : []);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-In via popup
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign-in failed:', err);
      throw err;
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  // Save or update user profile
  const saveUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      // Local fallback
      if (typeof window !== 'undefined') {
        const merged = { ...userProfile, ...data } as UserProfile;
        setUserProfile(merged);
        localStorage.setItem(LOCAL_STORAGE_PROFILE, JSON.stringify(merged));
      }
      return;
    }

    const path = `users/${user.uid}`;
    try {
      const docRef = doc(db, 'users', user.uid);
      const updatedProfile: UserProfile = {
        userId: user.uid,
        email: user.email || '',
        displayName: data.displayName || userProfile?.displayName || user.displayName || 'Calisthenics Athlete',
        photoURL: data.photoURL || userProfile?.photoURL || user.photoURL || '',
        fitnessLevel: (data.fitnessLevel || userProfile?.fitnessLevel || 'intermediate') as DifficultyLevel,
        primaryGoal: (data.primaryGoal || userProfile?.primaryGoal || 'strength') as FitnessGoal,
        preferredLanguage: data.preferredLanguage || userProfile?.preferredLanguage || 'en',
        bodyWeightKg: data.bodyWeightKg ?? userProfile?.bodyWeightKg,
        heightCm: data.heightCm ?? userProfile?.heightCm,
        createdAt: userProfile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(docRef, updatedProfile);
      setUserProfile(updatedProfile);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  // Save workout record
  const saveWorkoutRecord = async (log: CompletedWorkoutLog) => {
    // If user is authenticated, save directly to Firestore
    if (user) {
      const recordId = log.id || `record-${Date.now()}`;
      const path = `users/${user.uid}/records/${recordId}`;
      try {
        const docRef = doc(db, 'users', user.uid, 'records', recordId);
        const payload = {
          recordId,
          userId: user.uid,
          dayOfWeek: log.dayOfWeek,
          workoutTitle: log.workoutTitle,
          dateStr: log.dateStr,
          completedAt: log.completedAt || new Date().toISOString(),
          durationSeconds: log.durationSeconds,
          caloriesBurned: log.caloriesBurned,
          difficulty: log.difficulty
        };
        await setDoc(docRef, payload);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    } else {
      // Local storage fallback for unauthenticated
      const updated = [log, ...records];
      setRecords(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_RECORDS, JSON.stringify(updated));
      }
    }
  };

  // Seed demo record for easy testing
  const seedDemoRecord = async (log: CompletedWorkoutLog) => {
    await saveWorkoutRecord(log);
  };

  // Clear records
  const clearRecords = async () => {
    if (user) {
      for (const rec of records) {
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'records', rec.id));
        } catch {
          // Continue
        }
      }
    }
    setRecords([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_RECORDS);
    }
  };

  const streak = calculateStreak(records);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        records,
        loading,
        streak,
        isProfileModalOpen,
        openProfileModal: () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
        signInWithGoogle,
        signOutUser,
        saveUserProfile,
        saveWorkoutRecord,
        clearRecords,
        seedDemoRecord
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
