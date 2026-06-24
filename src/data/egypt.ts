import { Path } from '../types';
import { validateLesson } from '../features/quiz/validateLesson';

export const AncientEgyptPath: Path = {
  id: 'path_egypt_builders',
  title: 'Builders of the Pyramids',
  era: 'egypt',
  region: 'Africa',
  isLocked: true, // Needs to be unlocked
  unlockRequirement: 'Master "Fall of Rome" to unlock',
  chapters: [
    {
      id: 'ch_egypt_1',
      title: 'The Unification of Two Lands',
      estimatedTimeMin: 3,
      storyCards: [
        {
          id: 'card_egypt_1_1',
          narrationText: 'Before the Pharaohs, Egypt was divided into two distinct regions: Upper Egypt in the south, and Lower Egypt in the north delta.',
          highlightedTerms: [
            {
              term: 'Upper and Lower Egypt',
              definition: 'The two historic regions of Egypt, named for the flow of the Nile (south to north).',
              modernEquivalent: 'North and South Korea, before a theoretical reunification.'
            }
          ]
        },
        {
          id: 'card_egypt_1_2',
          narrationText: 'Around 3100 BC, a king named Narmer unified the two lands, wearing a double crown to symbolize his rule over both.',
          highlightedTerms: [
            {
              term: 'Narmer',
              definition: 'The ancient Egyptian king credited with unifying Upper and Lower Egypt.',
              modernEquivalent: 'George Washington, as a founding unifier.'
            },
            {
              term: 'Pschent',
              definition: 'The Double Crown of Egypt, combining the White Crown of Upper Egypt and the Red Crown of Lower Egypt.',
              modernEquivalent: 'A merged corporate logo after a major acquisition.'
            }
          ]
        }
      ],
      quiz: [
        {
          id: 'q_egypt_1_1',
          sourceCardId: 'Upper and Lower Egypt',
          format: 'TrueFalse',
          question: 'Upper Egypt was located in the northern delta.',
          correctAnswer: false,
          explanation: 'Upper Egypt was in the south, named for the higher elevation where the Nile originates.'
        },
        {
          id: 'q_egypt_1_2',
          sourceCardId: 'Narmer',
          format: 'MultipleChoice',
          question: 'Who unified Upper and Lower Egypt?',
          options: ['Ramses', 'Cleopatra', 'Narmer', 'Tutankhamun'],
          correctAnswer: 'Narmer',
          explanation: 'King Narmer is credited with the unification around 3100 BC.'
        },
        {
          id: 'q_egypt_1_3',
          sourceCardId: 'Pschent',
          format: 'TrueFalse',
          question: 'The Pschent was the double crown symbolizing unified rule.',
          correctAnswer: true,
          explanation: 'It combined the White and Red crowns.'
        }
      ]
    }
  ]
};

// Validate the lesson upon initialization
AncientEgyptPath.chapters.forEach(chapter => validateLesson(chapter));
