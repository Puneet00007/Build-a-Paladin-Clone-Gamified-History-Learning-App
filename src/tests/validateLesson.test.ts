import { validateLesson, QuizValidationError } from '../features/quiz/validateLesson';
import { Chapter } from '../types';

describe('Quiz Validation', () => {
  const validChapter: Chapter = {
    id: 'c1',
    title: 'Test Chapter',
    estimatedTimeMin: 5,
    storyCards: [
      {
        id: 'card1',
        narrationText: 'Rome was founded.',
        highlightedTerms: [
          { term: 'Romulus', definition: 'Founder of Rome', modernEquivalent: 'N/A' }
        ]
      },
      {
        id: 'card2',
        narrationText: 'The senate was powerful.',
        choice: {
          prompt: 'What should the senate do?',
          codaCard: { id: 'coda1', narrationText: 'The outcome.' },
          options: [
            {
              id: 'opt1',
              text: 'Option 1',
              perspectiveNudge: 'Diplomat',
              branchCards: [
                { id: 'branch1', narrationText: 'A diplomat approach.', highlightedTerms: [{ term: 'Treaty', definition: 'A pact', modernEquivalent: 'N/A' }] }
              ]
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        sourceCardId: 'card1',
        question: 'What happened?',
        format: 'TrueFalse',
        correctAnswer: true,
        explanation: 'Card 1 says it.'
      },
      {
        id: 'q2',
        sourceCardId: 'Romulus',
        question: 'Who founded Rome?',
        format: 'MultipleChoice',
        options: ['Romulus', 'Remus'],
        correctAnswer: 'Romulus',
        explanation: 'Term definition.'
      },
      {
        id: 'q3',
        sourceCardId: 'Treaty',
        question: 'What is a treaty?',
        format: 'TrueFalse',
        correctAnswer: true,
        explanation: 'Deep in a branch.'
      }
    ]
  };

  it('passes a completely valid lesson', () => {
    expect(() => validateLesson(validChapter)).not.toThrow();
    expect(validateLesson(validChapter)).toBe(true);
  });

  it('fails if a question references an untaught concept', () => {
    const invalidChapter: Chapter = {
      ...validChapter,
      quiz: [
        ...validChapter.quiz,
        {
          id: 'q-bad',
          sourceCardId: 'Julius_Caesar',
          question: 'Who was Caesar?',
          format: 'TrueFalse',
          correctAnswer: true,
          explanation: 'Bad question.'
        }
      ]
    };

    expect(() => validateLesson(invalidChapter)).toThrow(QuizValidationError);
    expect(() => validateLesson(invalidChapter)).toThrow(/Julius_Caesar/);
  });

  it('fails if a question is missing a sourceCardId', () => {
     const invalidChapter: Chapter = {
      ...validChapter,
      quiz: [
        {
          id: 'q-missing',
          sourceCardId: '',
          question: 'What is this?',
          format: 'TrueFalse',
          correctAnswer: true,
          explanation: 'Bad question.'
        }
      ]
    };

    expect(() => validateLesson(invalidChapter)).toThrow(QuizValidationError);
    expect(() => validateLesson(invalidChapter)).toThrow(/missing a sourceCardId/);
  });
});