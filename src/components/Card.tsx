import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Theme } from '../theme';

interface CardProps extends ViewProps {
  elevated?: boolean;
}

export function Card({ elevated = false, style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.dark.surface,
    borderRadius: Theme.radii.lg,
    padding: Theme.spacing.lg,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: Theme.colors.dark.surfaceElevated,
    ...Theme.shadows.md,
  },
});
