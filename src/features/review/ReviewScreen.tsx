import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { getRipeCards, calculateNextReview } from './srs';
import { Card } from '../../components/Card';
import { calculateLessonXp } from '../game/logic';
import { ConceptCard } from '../../types';

export function ReviewScreen() {
  const { conceptCards, updateConceptMastery, recordLessonCompletion } = useAppStore();
  const ripeCards = getRipeCards(conceptCards, new Date().toISOString());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (ripeCards.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState
          title="All caught up!"
          message="You have no concepts ready for review right now. Check back tomorrow!"
        />
      </SafeAreaView>
    );
  }

  const currentCard = ripeCards[currentIndex];

  const handleRating = (performance: 'Easy' | 'Good' | 'Hard' | 'Failed') => {
    const { newLevel, nextReviewDate } = calculateNextReview(currentCard.masteryLevel, performance, new Date().toISOString());
    updateConceptMastery(currentCard.id, newLevel, nextReviewDate);

    // Tiny XP bump for reviews
    recordLessonCompletion(2, currentCard.chapterId, []);

    if (currentIndex < ripeCards.length - 1) {
      setCurrentIndex(c => c + 1);
      setShowAnswer(false);
    } else {
      // Done with batch!
      // In a real app we'd trigger a success screen
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.counter}>{currentIndex + 1} / {ripeCards.length}</Text>

        <Card elevated style={styles.flashcard}>
          <Text style={styles.term}>{currentCard.term}</Text>

          {showAnswer ? (
            <View style={styles.answerBox}>
              <Text style={styles.definition}>{currentCard.definition}</Text>
            </View>
          ) : (
            <Button title="Show Answer" onPress={() => setShowAnswer(true)} style={styles.showBtn} />
          )}
        </Card>

        {showAnswer && (
          <View style={styles.ratingRow}>
            <Button title="Failed" variant="danger" onPress={() => handleRating('Failed')} style={styles.rateBtn} />
            <Button title="Hard" variant="outline" onPress={() => handleRating('Hard')} style={styles.rateBtn} />
            <Button title="Good" variant="secondary" onPress={() => handleRating('Good')} style={styles.rateBtn} />
            <Button title="Easy" onPress={() => handleRating('Easy')} style={styles.rateBtn} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.dark.background,
  },
  container: {
    flex: 1,
    padding: Theme.spacing.xl,
    justifyContent: 'center',
  },
  counter: {
    color: Theme.colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    fontSize: Theme.typography.sizes.md,
  },
  flashcard: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  term: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  answerBox: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.dark.surface,
    paddingTop: Theme.spacing.xl,
    width: '100%',
  },
  definition: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.lg,
    textAlign: 'center',
    lineHeight: 28,
  },
  showBtn: {
    marginTop: Theme.spacing.xl,
    width: '80%',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing.sm,
  },
  rateBtn: {
    flex: 1,
    paddingHorizontal: 0,
  }
});