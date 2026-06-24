export interface Path {
  id: string;
  title: string;
  era: string;
  region: string;
  emblemUrl?: string; // Optional for illustration
  chapters: Chapter[];
  isLocked?: boolean;
  unlockRequirement?: string; // prerequisite path IDs or description
}

export interface Chapter {
  id: string;
  title: string;
  storyCards: StoryCard[];
  quiz: QuizQuestion[];
  estimatedTimeMin: number;
}

export interface StoryCard {
  id: string;
  imageUrl?: string;
  narrationText: string;
  audioUrl?: string;
  highlightedTerms?: HighlightedTerm[];
  choice?: Choice;
}

export interface HighlightedTerm {
  term: string;
  definition: string;
  modernEquivalent: string;
  deepDive?: string;
}

export interface Choice {
  prompt: string;
  options: ChoiceOption[];
  codaCard: Omit<StoryCard, 'choice'>;
}

export interface ChoiceOption {
  id: string;
  text: string;
  perspectiveNudge: 'Strategist' | 'Diplomat' | 'Maverick';
  branchCards: Omit<StoryCard, 'choice'>[];
}

export interface QuizQuestion {
  id: string;
  sourceCardId: string; // Crucial for validation
  format: 'TrueFalse' | 'MultipleChoice' | 'Ordering' | 'MapPin' | 'Match';
  question: string;
  options?: string[]; // For MultipleChoice
  correctAnswer: string | string[] | boolean; // string/string[]/bool based on format
  explanation: string;
}

export interface ConceptCard {
  id: string;
  chapterId: string;
  term: string;
  definition: string;
  masteryLevel: number; // 0-5 Leitner box
  nextReviewDate?: string; // ISO String
}

export interface Figure {
  id: string;
  name: string;
  bio: string;
  keyDates: string;
  quote: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  rankName: string;
  currentStreak: number;
  longestStreak: number;
  streakFreezes: number;
  lastActiveDate: string; // ISO String
  perspectiveStats: {
    strategist: number;
    diplomat: number;
    maverick: number;
  };
  masteryCoveragePercent: number;
  unlockedPaths: string[];
  completedChapters: string[];
  collectedFigures: string[];
}
