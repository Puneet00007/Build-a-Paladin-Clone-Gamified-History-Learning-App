export interface EraNode {
  id: string;
  title: string;
  description: string;
  tier: number;
  dependencies: string[]; // IDs of nodes that must be unlocked first
  icon: string;
  lessons: string[];
}

export const ERAS_DATA: EraNode[] = [
  {
    id: 'era_ancient_egypt',
    title: 'Ancient Egypt',
    description: 'Pharaohs, Pyramids, and the Nile.',
    tier: 1,
    dependencies: [],
    icon: 'Sun',
    lessons: ['egypt_intro', 'egypt_pyramids'],
  },
  {
    id: 'era_ancient_rome',
    title: 'Ancient Rome',
    description: 'The Rise and Fall of the Empire.',
    tier: 1,
    dependencies: [],
    icon: 'Shield',
    lessons: ['rome_intro', 'rome_caesar'],
  },
  {
    id: 'era_feudal_japan',
    title: 'Feudal Japan',
    description: 'Samurai, Shoguns, and Honor.',
    tier: 2,
    dependencies: ['era_ancient_rome'], // Just for demonstration of progression
    icon: 'Swords',
    lessons: ['japan_intro', 'japan_samurai'],
  },
  {
    id: 'era_medieval_europe',
    title: 'Medieval Europe',
    description: 'Knights, Castles, and Crusades.',
    tier: 2,
    dependencies: ['era_ancient_rome'],
    icon: 'Castle',
    lessons: ['medieval_intro', 'medieval_knights'],
  },
  {
    id: 'era_renaissance',
    title: 'The Renaissance',
    description: 'Art, Science, and Rebirth.',
    tier: 3,
    dependencies: ['era_medieval_europe'],
    icon: 'Palette',
    lessons: ['ren_intro', 'ren_da_vinci'],
  },
  {
    id: 'era_industrial_rev',
    title: 'Industrial Revolution',
    description: 'Machines, Factories, and Change.',
    tier: 4,
    dependencies: ['era_renaissance'],
    icon: 'Factory',
    lessons: ['ind_intro', 'ind_inventions'],
  }
];
