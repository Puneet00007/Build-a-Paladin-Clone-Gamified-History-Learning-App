import { Chapter } from '../../types';

export class QuizValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizValidationError';
  }
}

export function validateLesson(chapter: Chapter): boolean {
  if (!chapter.quiz || chapter.quiz.length === 0) {
    return true;
  }

  const validSourceIds = new Set<string>();

  for (const card of chapter.storyCards) {
    validSourceIds.add(card.id);

    if (card.highlightedTerms) {
      for (const term of card.highlightedTerms) {
        validSourceIds.add(term.term);
      }
    }

    if (card.choice) {
      validSourceIds.add(card.choice.codaCard.id);
      if (card.choice.codaCard.highlightedTerms) {
        for (const term of card.choice.codaCard.highlightedTerms) {
          validSourceIds.add(term.term);
        }
      }
      for (const option of card.choice.options) {
        for (const branchCard of option.branchCards) {
          validSourceIds.add(branchCard.id);
          if (branchCard.highlightedTerms) {
            for (const term of branchCard.highlightedTerms) {
              validSourceIds.add(term.term);
            }
          }
        }
      }
    }
  }

  for (const question of chapter.quiz) {
    if (!question.sourceCardId) {
      throw new QuizValidationError(`Question "${question.question}" is missing a sourceCardId.`);
    }

    if (!validSourceIds.has(question.sourceCardId)) {
      throw new QuizValidationError(
        `Question "${question.question}" references sourceCardId "${question.sourceCardId}", which is not taught in this lesson.`
      );
    }
  }

  return true;
}