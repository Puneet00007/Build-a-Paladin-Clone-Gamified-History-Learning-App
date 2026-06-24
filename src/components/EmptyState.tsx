import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import { PackageOpen } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon || <PackageOpen color={Theme.colors.dark.textMuted} size={64} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  title: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
  },
});
