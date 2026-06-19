import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { StreakFlame } from '../../components/StreakFlame';
import { getRipeCards } from '../review/srs';
import { Play } from 'lucide-react-native';

export function HomeScreen({ navigation }: any) {
  const { progress, conceptCards, checkAndDailyUpdate } = useAppStore();

  useEffect(() => {
    checkAndDailyUpdate();
  }, [checkAndDailyUpdate]);

  const ripeCardsCount = getRipeCards(conceptCards, new Date().toISOString()).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, Chronicler</Text>
            <Text style={styles.level}>Level {progress.level} • {progress.rankName}</Text>
          </View>
          <StreakFlame streak={progress.currentStreak} atRisk={false} />
        </View>

        <Card elevated style={styles.heroCard}>
          <Text style={styles.heroPretitle}>RECOMMENDED LESSON</Text>
          <Text style={styles.heroTitle}>The Crisis of the Third Century</Text>
          <Text style={styles.heroDesc}>Rome nearly collapsed under the combined pressures of invasion, civil war, plague, and economic depression.</Text>
          <Button
            title="Start Lesson"
            onPress={() => navigation.navigate('Lesson', { pathId: 'path_rome_fall', chapterId: 'ch_rome_1' })}
          />
        </Card>

        <View style={styles.bentoRow}>
          <Card style={[styles.bentoCard, { flex: 1, marginRight: Theme.spacing.md }]}>
            <Text style={styles.bentoValue}>{ripeCardsCount}</Text>
            <Text style={styles.bentoLabel}>Ripe for Review</Text>
            <Button
              title="Review"
              variant="outline"
              style={styles.bentoBtn}
              onPress={() => navigation.navigate('Review')}
            />
          </Card>

          <Card style={[styles.bentoCard, { flex: 1 }]}>
            <Text style={styles.bentoValue}>{progress.xp}</Text>
            <Text style={styles.bentoLabel}>Total XP</Text>
             <Button
              title="Tree"
              variant="outline"
              style={styles.bentoBtn}
              onPress={() => navigation.navigate('Learn')}
            />
          </Card>
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  greeting: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
  },
  level: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
  },
  heroCard: {
    marginBottom: Theme.spacing.lg,
  },
  heroPretitle: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.xs,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.sm,
  },
  heroTitle: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.sm,
  },
  heroDesc: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.md,
    lineHeight: 22,
    marginBottom: Theme.spacing.lg,
  },
  bentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bentoCard: {
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  bentoValue: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
  },
  bentoLabel: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.sm,
    marginBottom: Theme.spacing.md,
  },
  bentoBtn: {
    width: '100%',
    minHeight: 36,
    paddingVertical: 4,
  }
});