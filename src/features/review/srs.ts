import { ConceptCard } from '../../types';

export const INTERVALS = [1, 3, 7, 14, 30];

export type ReviewPerformance = 'Easy' | 'Good' | 'Hard' | 'Failed';

export function calculateNextReview(
  currentLevel: number,
  performance: ReviewPerformance,
  currentDateISO: string
): { newLevel: number; nextReviewDate: string } {
  let nextLevel = currentLevel;
  let intervalMultiplier = 1;

  switch (performance) {
    case 'Easy':
      nextLevel = Math.min(5, currentLevel + 1);
      intervalMultiplier = 1.75;
      break;
    case 'Good':
      nextLevel = Math.min(5, currentLevel + 1);
      intervalMultiplier = 1.15;
      break;
    case 'Hard':
      nextLevel = Math.max(1, currentLevel);
      intervalMultiplier = 0.9;
      break;
    case 'Failed':
      nextLevel = 0;
      intervalMultiplier = 1;
      break;
  }

  let baseIntervalDays = INTERVALS[Math.min(nextLevel, INTERVALS.length - 1)];

  if (performance === 'Failed') {
    baseIntervalDays = 1;
  } else if (nextLevel === 5) {
      baseIntervalDays = 30 * intervalMultiplier;
  } else {
      baseIntervalDays = baseIntervalDays * intervalMultiplier;
  }

  const nextDate = new Date(currentDateISO);
  nextDate.setDate(nextDate.getDate() + Math.max(1, Math.round(baseIntervalDays)));

  return {
    newLevel: nextLevel,
    nextReviewDate: nextDate.toISOString()
  };
}

export function getRipeCards(cards: ConceptCard[], currentDateISO: string): ConceptCard[] {
  const now = new Date(currentDateISO).getTime();
  return cards.filter(card => {
    if (!card.nextReviewDate) return true;
    return new Date(card.nextReviewDate).getTime() <= now;
  });
}