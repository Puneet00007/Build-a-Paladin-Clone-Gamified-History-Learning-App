import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import { useUserStore } from '../store/userStore';
import { Flame, Shield, Play, Star } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const { xp, level, streak, unlockedNodes, completedLessons } = useUserStore();
  const navigation = useNavigation<NavigationProp>();

  const XP_PER_LEVEL = 500;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const progressPercentage = (currentLevelXp / XP_PER_LEVEL) * 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Stat Bar */}
      <View style={styles.headerStats}>
        <View style={styles.statBadge}>
          <Shield color={theme.colors.primary} size={20} />
          <Text style={styles.statText}>Lvl {level}</Text>
        </View>
        <View style={styles.statBadge}>
          <Flame color={theme.colors.secondary} size={20} />
          <Text style={styles.statText}>{streak} Day{streak !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Experience</Text>
          <Text style={styles.progressValue}>{currentLevelXp} / {XP_PER_LEVEL} XP</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Daily Challenge */}
      <TouchableOpacity
        style={styles.dailyChallengeCard}
        onPress={() => navigation.navigate('Lesson', { lessonId: 'daily_challenge' })}
      >
        <View style={styles.dailyChallengeHeader}>
          <Star color={theme.colors.background} size={24} fill={theme.colors.background} />
          <Text style={styles.dailyChallengeTitle}>Daily Trial</Text>
        </View>
        <Text style={styles.dailyChallengeDesc}>The Fall of Constantinople</Text>
        <View style={styles.dailyChallengeFooter}>
          <Text style={styles.dailyChallengeReward}>+150 XP</Text>
          <Play color={theme.colors.background} size={20} />
        </View>
      </TouchableOpacity>

      {/* Continue Journey */}
      <Text style={styles.sectionTitle}>Continue Journey</Text>
      <TouchableOpacity
        style={styles.continueCard}
        onPress={() => navigation.navigate('Lesson', { lessonId: 'rome_intro' })}
      >
        <View style={styles.continueInfo}>
          <Text style={styles.continueTitle}>Rise of the Republic</Text>
          <Text style={styles.continueSubtitle}>Ancient Rome</Text>
        </View>
        <View style={styles.playButton}>
          <Play color={theme.colors.primary} size={24} fill={theme.colors.primary} />
        </View>
      </TouchableOpacity>

      {/* Stats Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{completedLessons.length}</Text>
          <Text style={styles.summaryLabel}>Lessons</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{unlockedNodes.length}</Text>
          <Text style={styles.summaryLabel}>Eras</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{xp}</Text>
          <Text style={styles.summaryLabel}>Total XP</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statText: {
    color: theme.colors.text,
    ...theme.typography.h3,
    marginLeft: theme.spacing.sm,
  },
  progressContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  progressTitle: {
    color: theme.colors.textMuted,
    ...theme.typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressValue: {
    color: theme.colors.primary,
    ...theme.typography.bodySmall,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  dailyChallengeCard: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  dailyChallengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dailyChallengeTitle: {
    color: theme.colors.background,
    ...theme.typography.h2,
    marginLeft: theme.spacing.sm,
  },
  dailyChallengeDesc: {
    color: theme.colors.background,
    ...theme.typography.body,
    opacity: 0.9,
    marginBottom: theme.spacing.md,
  },
  dailyChallengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyChallengeReward: {
    color: theme.colors.background,
    ...theme.typography.h3,
  },
  sectionTitle: {
    color: theme.colors.text,
    ...theme.typography.h2,
    marginBottom: theme.spacing.md,
  },
  continueCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    color: theme.colors.text,
    ...theme.typography.h3,
    marginBottom: 4,
  },
  continueSubtitle: {
    color: theme.colors.textMuted,
    ...theme.typography.bodySmall,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryValue: {
    color: theme.colors.primary,
    ...theme.typography.h2,
    marginBottom: 4,
  },
  summaryLabel: {
    color: theme.colors.textMuted,
    ...theme.typography.caption,
    textTransform: 'uppercase',
  },
});
