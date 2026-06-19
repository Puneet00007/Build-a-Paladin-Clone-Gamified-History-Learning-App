export interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  xp: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { id: 'u1', name: 'Alexios', level: 14, xp: 7250 },
  { id: 'u2', name: 'Marcus', level: 12, xp: 6100 },
  { id: 'u3', name: 'Cleopatra77', level: 11, xp: 5800 },
  { id: 'u4', name: 'Leonidas', level: 9, xp: 4950 },
  { id: 'u5', name: 'JoanOfArc', level: 8, xp: 4200 },
  { id: 'u6', name: 'Saladin', level: 7, xp: 3800 },
  { id: 'u7', name: 'SunTzu', level: 5, xp: 2900 },
  { id: 'u8', name: 'Boudica', level: 4, xp: 2100 },
];
