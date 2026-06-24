import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Theme } from '../theme';
import { Lock } from 'lucide-react-native';
import { MasteryRing } from './MasteryRing';
import * as Haptics from 'expo-haptics';

interface SkillNodeProps {
  id: string;
  title: string;
  eraColor: string;
  isLocked: boolean;
  masteryPercent: number; // 0 to 1
  onPress: () => void;
  x?: number;
  y?: number;
}

export function SkillNode({ title, eraColor, isLocked, masteryPercent, onPress, x = 0, y = 0 }: SkillNodeProps) {
  const handlePress = () => {
    Haptics.impactAsync(isLocked ? Haptics.ImpactFeedbackStyle.Rigid : Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.container, { transform: [{ translateX: x }, { translateY: y }] }]}
    >
      <MasteryRing progress={masteryPercent} size={80} strokeWidth={8} color={eraColor} backgroundColor={Theme.colors.dark.surface}>
        <View style={[styles.innerCircle, { backgroundColor: isLocked ? Theme.colors.dark.surface : eraColor }]}>
          {isLocked ? (
             <Lock color={Theme.colors.dark.textMuted} size={24} />
          ) : (
            <Text style={styles.initialText}>{title.substring(0, 1)}</Text>
          )}
        </View>
      </MasteryRing>
      <Text style={[styles.title, isLocked && styles.titleLocked]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: '#fff',
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
  },
  title: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
    textAlign: 'center',
    maxWidth: 100,
  },
  titleLocked: {
    color: Theme.colors.dark.textMuted,
  },
});
