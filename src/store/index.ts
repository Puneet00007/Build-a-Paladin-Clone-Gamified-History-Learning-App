import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, ConceptCard } from '../types';
import { calculateRankAndLevel, isLocalNewDay, updateStreak } from '../features/game/logic';

interface AppState {
  hasCompletedOnboarding: boolean;
  progress: UserProgress;
  conceptCards: ConceptCard[];

  // Actions
  completeOnboarding: (era: string) => void;
  recordLessonCompletion: (xpEarned: number, chapterId: string, newCards: ConceptCard[]) => void;
  unlockPath: (pathId: string) => void;
  updateConceptMastery: (conceptId: string, newLevel: number, nextReviewDate: string) => void;
  useStreakFreeze: () => void;
  checkAndDailyUpdate: () => void;
}

const initialProgress: UserProgress = {
  xp: 0,
  level: 1,
  rankName: 'Novice Scribe',
  currentStreak: 0,
  longestStreak: 0,
  streakFreezes: 0,
  lastActiveDate: '',
  perspectiveStats: {
    strategist: 0,
    diplomat: 0,
    maverick: 0,
  },
  masteryCoveragePercent: 0,
  unlockedPaths: ['path_rome_fall', 'path_standalone'], // Seeded initially unlocked
  completedChapters: [],
  collectedFigures: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      progress: initialProgress,
      conceptCards: [],

      completeOnboarding: (era) => set((state) => ({
        hasCompletedOnboarding: true,
      })),

      recordLessonCompletion: (xpEarned, chapterId, newCards) => set((state) => {
        const newXp = state.progress.xp + xpEarned;
        const { level, rankName } = calculateRankAndLevel(newXp);

        // Merge new concept cards
        const existingCardIds = new Set(state.conceptCards.map(c => c.id));
        const cardsToAdd = newCards.filter(c => !existingCardIds.has(c.id));

        return {
          progress: {
            ...state.progress,
            xp: newXp,
            level,
            rankName,
            completedChapters: [...new Set([...state.progress.completedChapters, chapterId])],
          },
          conceptCards: [...state.conceptCards, ...cardsToAdd]
        };
      }),

      unlockPath: (pathId) => set((state) => ({
        progress: {
          ...state.progress,
          unlockedPaths: [...new Set([...state.progress.unlockedPaths, pathId])]
        }
      })),

      updateConceptMastery: (conceptId, newLevel, nextReviewDate) => set((state) => ({
        conceptCards: state.conceptCards.map(c =>
          c.id === conceptId ? { ...c, masteryLevel: newLevel, nextReviewDate } : c
        )
      })),

      useStreakFreeze: () => set((state) => ({
        progress: {
          ...state.progress,
          streakFreezes: Math.max(0, state.progress.streakFreezes - 1)
        }
      })),

      checkAndDailyUpdate: () => set((state) => {
        const todayISO = new Date().toISOString();
        if (isLocalNewDay(state.progress.lastActiveDate, todayISO)) {
            // We just let `updateStreak` figure it out next time they complete an action.
            // Or we could proactively process missed days here.
            // For now, we update streak when they actually do something, but we can do it here too:
            const newProgress = updateStreak(state.progress, todayISO);
            return { progress: newProgress };
        }
        return state;
      }),
    }),
    {
      name: 'chronos-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
