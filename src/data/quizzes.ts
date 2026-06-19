export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizContent {
  lessonId: string;
  questions: QuizQuestion[];
  xpReward: number;
}

export const QUIZ_DATA: Record<string, QuizContent> = {
  'rome_intro': {
    lessonId: 'rome_intro',
    xpReward: 100,
    questions: [
      {
        id: 'q1',
        question: "In what year was the Roman Republic traditionally founded?",
        options: ["753 BC", "509 BC", "44 BC", "476 AD"],
        correctAnswerIndex: 1,
        explanation: "509 BC marks the overthrow of the last Roman King, Tarquin the Proud, and the beginning of the Republic."
      },
      {
        id: 'q2',
        question: "What was the name of the common people in early Rome?",
        options: ["Patricians", "Senators", "Plebeians", "Equestrians"],
        correctAnswerIndex: 2,
        explanation: "The plebeians were the common citizens who struggled for political representation against the aristocratic patricians."
      }
    ]
  },
  'daily_challenge': {
    lessonId: 'daily_challenge',
    xpReward: 150, // Bonus for daily challenge
    questions: [
      {
        id: 'q1',
        question: "Which Empire fell with the capture of Constantinople in 1453?",
        options: ["The Western Roman Empire", "The Byzantine Empire", "The Holy Roman Empire", "The Ottoman Empire"],
        correctAnswerIndex: 1,
        explanation: "The Byzantine Empire (the eastern remnant of the Roman Empire) fell to the Ottomans in 1453."
      },
      {
        id: 'q2',
        question: "How did Mehmed bypass the chain blocking the Golden Horn?",
        options: ["He broke it with cannons", "He sent divers to cut it", "He rolled ships overland", "He waited for it to rust"],
        correctAnswerIndex: 2,
        explanation: "In a brilliant tactical maneuver, he rolled his fleet overland on greased logs behind the Galata colony."
      }
    ]
  }
};
