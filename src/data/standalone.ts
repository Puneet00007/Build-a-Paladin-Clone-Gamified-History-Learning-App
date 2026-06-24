import { Path } from '../types';
import { validateLesson } from '../features/quiz/validateLesson';

export const StandalonePath: Path = {
  id: 'path_standalone',
  title: 'Pivotal Moments',
  era: 'ww2',
  region: 'Global',
  isLocked: false,
  chapters: [
    {
      id: 'ch_standalone_1',
      title: 'The Enigma Machine',
      estimatedTimeMin: 4,
      storyCards: [
        {
          id: 'card_enigma_1',
          narrationText: 'During WWII, the German military used the Enigma machine to encrypt their most secret communications.',
          highlightedTerms: [
            {
              term: 'Enigma Machine',
              definition: 'An encryption device developed and used in the early-to-mid 20th century to protect commercial, diplomatic and military communication.',
              modernEquivalent: 'End-to-end military grade digital encryption.'
            }
          ]
        },
        {
          id: 'card_enigma_2',
          narrationText: 'At Bletchley Park, Alan Turing and his team developed the Bombe, an electromechanical device to decipher Enigma messages.',
          highlightedTerms: [
            {
              term: 'Alan Turing',
              definition: 'English mathematician and pioneer of theoretical computer science and artificial intelligence.',
              modernEquivalent: 'A founding father of modern computing.'
            }
          ]
        }
      ],
      quiz: [
        {
          id: 'q_enigma_1',
          sourceCardId: 'Enigma Machine',
          format: 'TrueFalse',
          question: 'The Enigma machine was used by the Allies to encrypt messages.',
          correctAnswer: false,
          explanation: 'It was primarily used by the German military.'
        },
        {
          id: 'q_enigma_2',
          sourceCardId: 'Alan Turing',
          format: 'MultipleChoice',
          question: 'Who helped develop the Bombe to decipher Enigma?',
          options: ['Albert Einstein', 'Alan Turing', 'Nikola Tesla', 'Thomas Edison'],
          correctAnswer: 'Alan Turing',
          explanation: 'Alan Turing was a key figure at Bletchley Park.'
        }
      ]
    }
  ]
};

// Validate the lesson upon initialization
StandalonePath.chapters.forEach(chapter => validateLesson(chapter));