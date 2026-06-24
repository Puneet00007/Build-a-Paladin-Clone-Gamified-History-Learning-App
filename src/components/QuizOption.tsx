import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import * as Haptics from 'expo-haptics';

interface QuizOptionProps {
  text: string;
  state: 'default' | 'selected' | 'correct' | 'incorrect';
  onPress: () => void;
  disabled?: boolean;
}

export function QuizOption({ text, state, onPress, disabled = false }: QuizOptionProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        state === 'selected' && styles.selected,
        state === 'correct' && styles.correct,
        state === 'incorrect' && styles.incorrect,
      ]}
    >
      <Text
        style={[
          styles.text,
          state === 'selected' && styles.textSelected,
          (state === 'correct' || state === 'incorrect') && styles.textWhite,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radii.md,
    backgroundColor: Theme.colors.dark.surfaceElevated,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: Theme.spacing.md,
  },
  selected: {
    borderColor: Theme.colors.dark.primary,
  },
  correct: {
    backgroundColor: Theme.colors.dark.success,
    borderColor: Theme.colors.dark.success,
  },
  incorrect: {
    backgroundColor: Theme.colors.dark.danger,
    borderColor: Theme.colors.dark.danger,
  },
  text: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.md,
  },
  textSelected: {
    color: Theme.colors.dark.primary,
    fontWeight: Theme.typography.weights.bold,
  },
  textWhite: {
    color: '#FFF',
    fontWeight: Theme.typography.weights.bold,
  },
});
