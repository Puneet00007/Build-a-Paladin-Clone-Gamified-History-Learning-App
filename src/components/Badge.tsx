import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'solid' | 'outline';
}

export function Badge({ label, color = Theme.colors.dark.primary, variant = 'solid' }: BadgeProps) {
  const isSolid = variant === 'solid';
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSolid ? color : 'transparent',
          borderColor: color,
          borderWidth: isSolid ? 0 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: isSolid ? '#111' : color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radii.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Theme.typography.sizes.xs,
    fontWeight: Theme.typography.weights.bold,
  },
});
