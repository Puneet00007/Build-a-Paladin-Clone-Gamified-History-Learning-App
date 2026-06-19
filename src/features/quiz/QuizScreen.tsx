import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { FallOfRomePath } from '../../data/rome';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { QuizOption } from '../../components/QuizOption';
import { calculateLessonXp } from '../game/logic';
import { ConceptCard } from '../../types';

export function QuizScreen({ navigation, route }: any) {
  const chapterId = route?.params?.chapterId || FallOfRomePath.chapters[0].id;
  const pathId = route?.params?.pathId || FallOfRomePath.id;
  const path = [FallOfRomePath].find(p => p.id === pathId) || FallOfRomePath;
  const chapter = path.chapters.find(c => c.id === chapterId) || path.chapters[0];

  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const recordLessonCompletion = useAppStore(state => state.recordLessonCompletion);

  const currentQ = chapter.quiz[qIndex];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);
    if (opt === currentQ.correctAnswer.toString()) {
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (qIndex < chapter.quiz.length - 1) {
      setQIndex(qIndex + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const xp = calculateLessonXp(correctCount, chapter.quiz.length, 0, false, []);

    // Create new concept cards for SRS
    const newCards: ConceptCard[] = chapter.quiz.map(q => ({
      id: `${chapterId}_${q.sourceCardId}`,
      chapterId,
      term: q.sourceCardId,
      definition: q.explanation, // Fallback
      masteryLevel: 1, // Start at level 1
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
    }));

    recordLessonCompletion(xp, chapterId, newCards);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <Text style={styles.title}>Lesson Complete!</Text>
        <Text style={styles.score}>{correctCount} / {chapter.quiz.length} Correct</Text>
        <Button title="Return Home" onPress={() => navigation.navigate('Home')} style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  const options = currentQ.format === 'TrueFalse'
    ? ['true', 'false']
    : currentQ.options || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ProgressBar progress={(qIndex) / chapter.quiz.length} />
      </View>

      <View style={styles.container}>
        <Text style={styles.question}>{currentQ.question}</Text>

        {options.map((opt, i) => {
          let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
          if (isAnswered) {
            if (opt === currentQ.correctAnswer.toString()) state = 'correct';
            else if (opt === selectedOpt) state = 'incorrect';
          } else if (opt === selectedOpt) {
            state = 'selected';
          }

          return (
            <QuizOption
              key={i}
              text={opt}
              state={state}
              disabled={isAnswered}
              onPress={() => handleSelect(opt)}
            />
          );
        })}

        {isAnswered && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>{currentQ.explanation}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          title={qIndex === chapter.quiz.length - 1 ? "Finish" : "Next"}
          disabled={!isAnswered}
          style={{ opacity: !isAnswered ? 0.5 : 1 }}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.dark.background },
  center: { justifyContent: 'center', alignItems: 'center' },
  header: { padding: Theme.spacing.lg },
  container: { flex: 1, padding: Theme.spacing.xl },
  question: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    marginBottom: Theme.spacing.xl,
  },
  feedbackBox: {
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.dark.surface,
    borderRadius: Theme.radii.md,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.dark.primary,
  },
  feedbackText: { color: Theme.colors.dark.textMuted, fontSize: Theme.typography.sizes.sm, lineHeight: 20 },
  footer: { padding: Theme.spacing.xl },
  title: { color: Theme.colors.dark.primary, fontSize: Theme.typography.sizes.xxl, fontWeight: Theme.typography.weights.bold, marginBottom: 16 },
  score: { color: Theme.colors.dark.textParchment, fontSize: Theme.typography.sizes.lg }
});