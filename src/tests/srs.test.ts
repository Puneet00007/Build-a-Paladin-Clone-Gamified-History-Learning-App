import { calculateNextReview, getRipeCards } from '../features/review/srs';
import { ConceptCard } from '../types';

describe('SRS Engine', () => {
  const mockDate = '2023-10-01T12:00:00.000Z';
  const mockDateObj = new Date(mockDate);

  describe('calculateNextReview', () => {
    it('promotes level and sets next interval for Good performance', () => {
      const { newLevel, nextReviewDate } = calculateNextReview(0, 'Good', mockDate);
      expect(newLevel).toBe(1);

      const nextDate = new Date(nextReviewDate);
      const diffDays = Math.round((nextDate.getTime() - mockDateObj.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(3);
    });

    it('promotes level and expands interval more for Easy performance', () => {
      const { newLevel, nextReviewDate } = calculateNextReview(2, 'Easy', mockDate);
      expect(newLevel).toBe(3);

      const nextDate = new Date(nextReviewDate);
      const diffDays = Math.round((nextDate.getTime() - mockDateObj.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(25);
    });

    it('keeps level but shrinks interval slightly for Hard performance', () => {
      const { newLevel, nextReviewDate } = calculateNextReview(3, 'Hard', mockDate);
      expect(newLevel).toBe(3);

      const nextDate = new Date(nextReviewDate);
      const diffDays = Math.round((nextDate.getTime() - mockDateObj.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(13);
    });

    it('resets level to 0 and interval to 1 day for Failed performance', () => {
      const { newLevel, nextReviewDate } = calculateNextReview(4, 'Failed', mockDate);
      expect(newLevel).toBe(0);

      const nextDate = new Date(nextReviewDate);
      const diffDays = Math.round((nextDate.getTime() - mockDateObj.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(1);
    });

    it('caps max level at 5 but continues expanding intervals for Easy', () => {
      const { newLevel, nextReviewDate } = calculateNextReview(5, 'Easy', mockDate);
      expect(newLevel).toBe(5);

      const nextDate = new Date(nextReviewDate);
      const diffDays = Math.round((nextDate.getTime() - mockDateObj.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(53);
    });
  });

  describe('getRipeCards', () => {
    it('returns cards whose nextReviewDate is in the past or undefined', () => {
      const cards: ConceptCard[] = [
        { id: '1', chapterId: 'c1', term: 'T1', definition: 'D1', masteryLevel: 0 },
        { id: '2', chapterId: 'c1', term: 'T2', definition: 'D2', masteryLevel: 2, nextReviewDate: '2023-09-30T12:00:00.000Z' },
        { id: '3', chapterId: 'c1', term: 'T3', definition: 'D3', masteryLevel: 3, nextReviewDate: '2023-10-02T12:00:00.000Z' },
      ];

      const ripe = getRipeCards(cards, mockDate);
      expect(ripe.length).toBe(2);
      expect(ripe.map(c => c.id)).toContain('1');
      expect(ripe.map(c => c.id)).toContain('2');
    });
  });
});