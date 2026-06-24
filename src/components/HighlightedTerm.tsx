import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import { HighlightedTerm as HighlightedTermType } from '../types';
import { Sheet } from './Sheet';
import * as Haptics from 'expo-haptics';

interface Props {
  term: HighlightedTermType;
}

export function HighlightedTerm({ term }: Props) {
  const [sheetVisible, setSheetVisible] = useState(false);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSheetVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text style={styles.text}>{term.term}</Text>
      </TouchableOpacity>

      <Sheet visible={sheetVisible} onClose={() => setSheetVisible(false)}>
        <Text style={styles.termTitle}>{term.term}</Text>
        <Text style={styles.definition}>{term.definition}</Text>

        <View style={styles.modernBox}>
          <Text style={styles.modernLabel}>Modern Equivalent:</Text>
          <Text style={styles.modernText}>{term.modernEquivalent}</Text>
        </View>

        {term.deepDive && (
          <View style={styles.diveBox}>
            <Text style={styles.diveLabel}>Deep Dive</Text>
            <Text style={styles.diveText}>{term.deepDive}</Text>
          </View>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.dark.primary,
    borderStyle: 'dashed', // Note: borderStyle dashed on bottom border only works predictably on newer RN, fallback is solid
    marginHorizontal: 2,
  },
  text: {
    color: Theme.colors.dark.primary,
    fontWeight: Theme.typography.weights.bold,
    fontSize: Theme.typography.sizes.lg,
  },
  termTitle: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.md,
  },
  definition: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.md,
    lineHeight: 24,
    marginBottom: Theme.spacing.xl,
  },
  modernBox: {
    backgroundColor: Theme.colors.dark.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.radii.md,
    marginBottom: Theme.spacing.md,
  },
  modernLabel: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.xs,
    textTransform: 'uppercase',
    marginBottom: Theme.spacing.xs,
    fontWeight: Theme.typography.weights.bold,
  },
  modernText: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.md,
    fontStyle: 'italic',
  },
  diveBox: {
    marginTop: Theme.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: Theme.colors.dark.primary,
    paddingLeft: Theme.spacing.md,
  },
  diveLabel: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.xs,
  },
  diveText: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.sm,
    lineHeight: 20,
  },
});
