import { Path } from '../types';
import { validateLesson } from '../features/quiz/validateLesson';

export const FallOfRomePath: Path = {
  id: 'path_rome_fall',
  title: 'Fall of the Western Roman Empire',
  era: 'rome',
  region: 'Europe',
  isLocked: false,
  chapters: [
    {
      id: 'ch_rome_1',
      title: 'The Crisis of the Third Century',
      estimatedTimeMin: 4,
      storyCards: [
        {
          id: 'card_rome_1_1',
          narrationText: 'For fifty years, the Roman Empire nearly collapsed under the combined pressures of invasion, civil war, plague, and economic depression.',
          highlightedTerms: [
            {
              term: 'Crisis of the Third Century',
              definition: 'A period in which the Roman Empire nearly collapsed (AD 235–284).',
              modernEquivalent: 'A massive multi-decade global recession combined with constant border conflicts.',
              deepDive: 'It began with the assassination of Emperor Severus Alexander by his own troops, leading to a period where 26 men claimed the title of Emperor, mostly generals commanding their own armies.'
            }
          ]
        },
        {
          id: 'card_rome_1_2',
          narrationText: 'The economy was in ruins. Emperors debased the currency to pay their armies, leading to hyperinflation.',
          highlightedTerms: [
            {
              term: 'Debasement',
              definition: 'Lowering the value of currency by reducing the amount of precious metal in coins.',
              modernEquivalent: 'Modern governments printing excessive amounts of paper money.'
            }
          ]
        },
        {
          id: 'card_rome_1_choice',
          narrationText: 'You are Emperor Diocletian. The empire is too large to rule alone, and generals constantly rebel.',
          choice: {
            prompt: 'How do you stabilize the Empire?',
            options: [
              {
                id: 'opt_diocletian_1',
                text: 'Divide the empire into four regions ruled by co-emperors.',
                perspectiveNudge: 'Strategist',
                branchCards: [
                  {
                    id: 'card_rome_1_branch_1',
                    narrationText: 'You establish the Tetrarchy, dividing power to ensure stability and smooth succession.',
                    highlightedTerms: [
                      {
                        term: 'Tetrarchy',
                        definition: 'Rule by four; Diocletian\'s system dividing the empire into East and West, each with a senior and junior emperor.',
                        modernEquivalent: 'A corporate structure with regional CEOs sharing power.'
                      }
                    ]
                  }
                ]
              },
              {
                id: 'opt_diocletian_2',
                text: 'Centralize all power and crush the generals personally.',
                perspectiveNudge: 'Maverick',
                branchCards: [
                  {
                    id: 'card_rome_1_branch_2',
                    narrationText: 'While bold, history showed one man could no longer physically travel fast enough to stop every threat.',
                  }
                ]
              }
            ],
            codaCard: {
              id: 'card_rome_1_coda',
              narrationText: 'Historically, Diocletian chose the Tetrarchy. It temporarily stabilized the empire but eventually led to more civil wars.'
            }
          }
        }
      ],
      quiz: [
        {
          id: 'q_rome_1_1',
          sourceCardId: 'Crisis of the Third Century',
          format: 'MultipleChoice',
          question: 'What characterized the Crisis of the Third Century?',
          options: ['Unprecedented peace and prosperity', 'Invasion, civil war, and economic depression', 'The transition from Republic to Empire', 'The discovery of the New World'],
          correctAnswer: 'Invasion, civil war, and economic depression',
          explanation: 'The crisis was a 50-year period of severe instability.'
        },
        {
          id: 'q_rome_1_2',
          sourceCardId: 'Debasement',
          format: 'TrueFalse',
          question: 'Emperors solved economic problems by increasing the amount of silver in their coins.',
          correctAnswer: false,
          explanation: 'They DEBASED the currency, reducing the silver content, which caused hyperinflation.'
        },
        {
          id: 'q_rome_1_3',
          sourceCardId: 'Tetrarchy',
          format: 'MultipleChoice',
          question: 'What was Diocletian\'s Tetrarchy?',
          options: ['Rule by a single dictator', 'A democratic senate', 'Rule by four co-emperors', 'A treaty with the Goths'],
          correctAnswer: 'Rule by four co-emperors',
          explanation: 'Diocletian divided the empire to make it easier to manage and defend.'
        }
      ]
    }
  ]
};

// Validate the lesson upon initialization
FallOfRomePath.chapters.forEach(chapter => validateLesson(chapter));
