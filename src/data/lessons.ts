export interface StoryChoice {
  id: string;
  text: string;
  resultingText: string;
}

export interface LessonContent {
  id: string;
  title: string;
  eraId: string;
  paragraphs: string[];
  choice?: {
    question: string;
    options: StoryChoice[];
  };
}

export const LESSONS_DATA: Record<string, LessonContent> = {
  'rome_intro': {
    id: 'rome_intro',
    title: 'Rise of the Republic',
    eraId: 'era_ancient_rome',
    paragraphs: [
      "According to legend, Rome was founded in 753 BC by Romulus and Remus, twin brothers raised by a she-wolf. However, history tells a more gradual story of Latin tribes settling along the Tiber River.",
      "Initially ruled by kings, the Roman people eventually grew tired of tyrannical rule. In 509 BC, they overthrew the last king, Tarquin the Proud, and established a Republic—a system where citizens elected representatives to govern on their behalf.",
      "At the heart of the Republic was the Senate, a council of wealthy, aristocratic patricians. But the common people, the plebeians, demanded a voice too, leading to centuries of political struggle."
    ],
    choice: {
      question: "If you were a plebeian in early Rome, how would you protest for your rights?",
      options: [
        {
          id: 'strike',
          text: "Go on strike and leave the city.",
          resultingText: "Historically accurate! The plebeians performed 'secessions', literally walking out of Rome and refusing to fight in the army until their demands for political representation were met."
        },
        {
          id: 'revolt',
          text: "Start a violent armed revolt against the Senate.",
          resultingText: "While tempting, early Roman plebeians usually favored peaceful leverage. They knew the patricians needed them for the army and economy, so they used strikes (secessions) rather than full-scale war."
        }
      ]
    }
  },
  'daily_challenge': {
    id: 'daily_challenge',
    title: 'The Fall of Constantinople',
    eraId: 'era_medieval_europe',
    paragraphs: [
      "In 1453, the Byzantine Empire, the last remnant of the Roman Empire, was reduced to a single heavily fortified city: Constantinople.",
      "Mehmed the Conqueror, the young Ottoman Sultan, amassed a massive army and brought enormous cannons, designed by a Hungarian engineer named Orban, to shatter the legendary Theodosian Walls.",
      "The defenders, led by Emperor Constantine XI, fought bravely, stretching a massive chain across the Golden Horn to block the Ottoman fleet."
    ],
    choice: {
      question: "As Mehmed, the chain blocks your ships. What is your move?",
      options: [
        {
          id: 'burn',
          text: "Send fire ships to burn the chain.",
          resultingText: "A standard naval tactic, but the Byzantine defenders were heavily fortified and prepared for naval assaults on the chain."
        },
        {
          id: 'land',
          text: "Roll the ships overland on greased logs.",
          resultingText: "A stroke of genius! Mehmed actually ordered his fleet to be rolled across land on greased logs, bypassing the chain entirely and shocking the defenders."
        }
      ]
    }
  }
};
