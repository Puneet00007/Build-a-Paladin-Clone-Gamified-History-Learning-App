import { UserProgress } from '../../types';

// Constants
export const XP_PER_LESSON = 50;
export const XP_PER_CORRECT_ANSWER = 10;
export const PERFECT_RUN_BONUS = 30;
export const XP_DEEP_DIVE = 5;
export const XP_DAILY_CHALLENGE = 100;

export const RANKS = [
  { name: 'Novice Scribe', minXp: 0, level: 1 },
  { name: 'Apprentice Chronicler', minXp: 500, level: 2 },
  { name: 'Field Historian', minXp: 1500, level: 3 },
  { name: 'Keeper of Annals', minXp: 3500, level: 4 },
  { name: 'Master Archivist', minXp: 7000, level: 5 },
  { name: 'Legendary Chronicler', minXp: 15000, level: 6 },
];

export function calculateRankAndLevel(xp: number): { level: number; rankName: string } {
  let currentRank = RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      currentRank = RANKS[i];
      break;
    }
  }
  return { level: currentRank.level, rankName: currentRank.name };
}

export function calculateLessonXp(
  correctAnswers: number,
  totalQuestions: number,
  deepDivesCompleted: number,
  isReview: boolean,
  masteryLevels: number[]
): number {
  let xp = XP_PER_LESSON;
  xp += correctAnswers * XP_PER_CORRECT_ANSWER;

  if (correctAnswers === totalQuestions && totalQuestions > 0) {
    xp += PERFECT_RUN_BONUS;
  }

  xp += deepDivesCompleted * XP_DEEP_DIVE;

  if (isReview && masteryLevels.length > 0) {
    const avgMastery = masteryLevels.reduce((sum, val) => sum + val, 0) / masteryLevels.length;
    if (avgMastery >= 4) {
      xp = Math.floor(xp * 0.25);
    } else if (avgMastery >= 3) {
      xp = Math.floor(xp * 0.5);
    }
  }

  return xp;
}

export function isLocalNewDay(lastActiveDateISO: string, currentDateISO: string): boolean {
  if (!lastActiveDateISO) return true;
  const lastDate = new Date(lastActiveDateISO);
  const currDate = new Date(currentDateISO);

  return (
    lastDate.getFullYear() !== currDate.getFullYear() ||
    lastDate.getMonth() !== currDate.getMonth() ||
    lastDate.getDate() !== currDate.getDate()
  );
}

export function getDaysDifference(lastActiveDateISO: string, currentDateISO: string): number {
  if (!lastActiveDateISO) return 0;

  const lastDate = new Date(lastActiveDateISO);
  const currDate = new Date(currentDateISO);

  const lastMidnight = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  const currMidnight = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

  const diffTime = Math.abs(currMidnight.getTime() - lastMidnight.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function updateStreak(
  progress: UserProgress,
  currentDateISO: string
): UserProgress {
  const newProgress = { ...progress };

  if (!newProgress.lastActiveDate) {
    newProgress.currentStreak = 1;
    newProgress.longestStreak = 1;
    newProgress.lastActiveDate = currentDateISO;
    return newProgress;
  }

  const daysDiff = getDaysDifference(newProgress.lastActiveDate, currentDateISO);

  if (daysDiff === 0) {
    newProgress.lastActiveDate = currentDateISO;
    return newProgress;
  }

  if (daysDiff === 1) {
    newProgress.currentStreak += 1;
    if (newProgress.currentStreak > newProgress.longestStreak) {
      newProgress.longestStreak = newProgress.currentStreak;
    }
  } else if (daysDiff > 1) {
    const missedDays = daysDiff - 1;

    if (newProgress.streakFreezes >= missedDays) {
      newProgress.streakFreezes -= missedDays;
      newProgress.currentStreak += 1;
      if (newProgress.currentStreak > newProgress.longestStreak) {
        newProgress.longestStreak = newProgress.currentStreak;
      }
    } else {
      newProgress.currentStreak = 1;
    }
  }

  newProgress.lastActiveDate = currentDateISO;
  return newProgress;
}