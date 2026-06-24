import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { Theme } from '../theme';

interface StreakFlameProps {
  streak: number;
  atRisk?: boolean; // If they haven't practiced today
}

export function StreakFlame({ streak, atRisk = false }: StreakFlameProps) {
  const color = atRisk ? Theme.colors.dark.textMuted : Theme.colors.dark.danger;

  return (
    <View style={styles.container}>
      <Flame color={color} size={28} fill={atRisk ? 'transparent' : color} />
      <Text style={[styles.text, { color }]}>{streak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    marginLeft: Theme.spacing.xs,
  },
});
