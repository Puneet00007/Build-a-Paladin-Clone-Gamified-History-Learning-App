import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import { Shield } from 'lucide-react-native';

interface LevelBadgeProps {
  level: number;
  rankName: string;
}

export function LevelBadge({ level, rankName }: LevelBadgeProps) {
  return (
    <View style={styles.container}>
      <Shield color={Theme.colors.dark.primary} size={24} />
      <View style={styles.textContainer}>
        <Text style={styles.levelText}>Level {level}</Text>
        <Text style={styles.rankText}>{rankName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.dark.surfaceElevated,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radii.lg,
  },
  textContainer: {
    marginLeft: Theme.spacing.sm,
  },
  levelText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
  },
  rankText: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.xs,
  },
});
