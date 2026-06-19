import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { LevelBadge } from '../../components/LevelBadge';
import { StreakFlame } from '../../components/StreakFlame';
import { Card } from '../../components/Card';

export function ProfileScreen() {
  const { progress } = useAppStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>C</Text>
          </View>
          <LevelBadge level={progress.level} rankName={progress.rankName} />
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <StreakFlame streak={progress.currentStreak} />
            <Text style={styles.statLabel}>Current Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{progress.longestStreak}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{progress.streakFreezes}</Text>
            <Text style={styles.statLabel}>Freezes</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Perspective Stats</Text>
        <Card style={styles.perspectiveCard}>
          <View style={styles.pRow}>
            <Text style={styles.pLabel}>Strategist</Text>
            <Text style={styles.pValue}>{progress.perspectiveStats.strategist}</Text>
          </View>
          <View style={styles.pRow}>
            <Text style={styles.pLabel}>Diplomat</Text>
            <Text style={styles.pValue}>{progress.perspectiveStats.diplomat}</Text>
          </View>
          <View style={styles.pRow}>
            <Text style={styles.pLabel}>Maverick</Text>
            <Text style={styles.pValue}>{progress.perspectiveStats.maverick}</Text>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.dark.background,
  },
  container: {
    padding: Theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.dark.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    borderWidth: 2,
    borderColor: Theme.colors.dark.primary,
  },
  avatarText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  statValue: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: 4,
  },
  statLabel: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.xs,
    textAlign: 'center',
  },
  sectionTitle: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.md,
  },
  perspectiveCard: {
    gap: Theme.spacing.md,
  },
  pRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pLabel: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.md,
  },
  pValue: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.bold,
  }
});