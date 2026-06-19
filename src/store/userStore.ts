import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  lastLoginDate: string | null;
  unlockedNodes: string[];
  completedLessons: string[];
  addXp: (amount: number) => void;
  updateStreak: () => void;
  unlockNode: (nodeId: string) => void;
  completeLesson: (lessonId: string) => void;
  resetState: () => void;
}

const XP_PER_LEVEL = 500;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      lastLoginDate: null,
      unlockedNodes: ['era_ancient_rome'], // Start with one unlocked
      completedLessons: [],

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
        return { xp: newXp, level: newLevel };
      }),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastLoginDate === today) {
          return state; // Already logged in today
        }

        if (!state.lastLoginDate) {
          return { streak: 1, lastLoginDate: today };
        }

        const lastLogin = new Date(state.lastLoginDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastLoginDate === yesterdayStr) {
           return { streak: state.streak + 1, lastLoginDate: today };
        }

        // Missed a day, reset
        return { streak: 1, lastLoginDate: today };
      }),

      unlockNode: (nodeId) => set((state) => ({
        unlockedNodes: state.unlockedNodes.includes(nodeId)
          ? state.unlockedNodes
          : [...state.unlockedNodes, nodeId]
      })),

      completeLesson: (lessonId) => set((state) => ({
        completedLessons: state.completedLessons.includes(lessonId)
          ? state.completedLessons
          : [...state.completedLessons, lessonId]
      })),

      resetState: () => set({
        xp: 0,
        level: 1,
        streak: 0,
        lastLoginDate: null,
        unlockedNodes: ['era_ancient_rome'],
        completedLessons: [],
      })
    }),
    {
      name: 'paladin-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
