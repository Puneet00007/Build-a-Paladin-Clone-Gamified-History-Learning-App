import { calculateRankAndLevel, calculateLessonXp, updateStreak } from '../features/game/logic';
import { UserProgress } from '../types';

describe('Game Logic', () => {
  describe('calculateRankAndLevel', () => {
    it('returns level 1 for 0 XP', () => {
      expect(calculateRankAndLevel(0)).toEqual({ level: 1, rankName: 'Novice Scribe' });
    });
    it('returns level 2 for 500 XP', () => {
      expect(calculateRankAndLevel(500)).toEqual({ level: 2, rankName: 'Apprentice Chronicler' });
    });
    it('returns level 6 for 15000+ XP', () => {
      expect(calculateRankAndLevel(20000)).toEqual({ level: 6, rankName: 'Legendary Chronicler' });
    });
  });

  describe('calculateLessonXp', () => {
    it('calculates XP for a perfect run', () => {
      expect(calculateLessonXp(3, 3, 0, false, [])).toBe(110);
    });

    it('calculates XP for an imperfect run with deep dives', () => {
      expect(calculateLessonXp(2, 3, 2, false, [])).toBe(80);
    });

    it('applies anti-grind penalty when reviewing highly mastered content', () => {
      expect(calculateLessonXp(3, 3, 0, true, [5, 4, 5])).toBe(Math.floor(110 * 0.25));
    });

    it('applies light anti-grind penalty when reviewing somewhat mastered content', () => {
      expect(calculateLessonXp(3, 3, 0, true, [3, 3, 3])).toBe(Math.floor(110 * 0.5));
    });

    it('does not apply anti-grind penalty when reviewing hard content', () => {
      expect(calculateLessonXp(3, 3, 0, true, [1, 2, 0])).toBe(110);
    });
  });

  describe('Streaks', () => {
    const baseProgress: UserProgress = {
      xp: 0,
      level: 1,
      rankName: 'Novice Scribe',
      currentStreak: 1,
      longestStreak: 1,
      streakFreezes: 0,
      lastActiveDate: '2023-01-01T12:00:00Z',
      perspectiveStats: { strategist: 0, diplomat: 0, maverick: 0 },
      masteryCoveragePercent: 0,
      unlockedPaths: [],
      completedChapters: [],
      collectedFigures: []
    };

    it('increments streak on consecutive day', () => {
      const result = updateStreak(baseProgress, '2023-01-02T12:00:00Z');
      expect(result.currentStreak).toBe(2);
      expect(result.longestStreak).toBe(2);
    });

    it('does nothing on same day', () => {
      const p = updateStreak(baseProgress, '2023-01-01T12:00:00Z');
      const result = updateStreak(p, '2023-01-01T23:59:00Z');
      expect(result.currentStreak).toBe(p.currentStreak);
    });

    it('breaks streak when a day is missed', () => {
      const p = { ...baseProgress, currentStreak: 5, longestStreak: 5, lastActiveDate: '2023-01-01T12:00:00Z' };
      const result = updateStreak(p, '2023-01-03T12:00:00Z');
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(5);
    });

    it('consumes streak freeze to save streak', () => {
      const p = { ...baseProgress, currentStreak: 5, longestStreak: 5, streakFreezes: 1, lastActiveDate: '2023-01-01T12:00:00Z' };
      const result = updateStreak(p, '2023-01-03T12:00:00Z');
      expect(result.streakFreezes).toBe(0);
      expect(result.currentStreak).toBe(6);
      expect(result.longestStreak).toBe(6);
    });

    it('breaks streak if not enough freezes', () => {
      const p = { ...baseProgress, currentStreak: 5, longestStreak: 5, streakFreezes: 1, lastActiveDate: '2023-01-01T12:00:00Z' };
      const result = updateStreak(p, '2023-01-04T12:00:00Z');
      expect(result.streakFreezes).toBe(1);
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(5);
    });
  });
});