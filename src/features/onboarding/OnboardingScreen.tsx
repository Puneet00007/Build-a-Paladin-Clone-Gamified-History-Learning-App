import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { Button } from '../../components/Button';
import { QuizOption } from '../../components/QuizOption';

const QUESTIONS = [
  {
    question: "What interests you most about history?",
    options: ["Grand strategy & battles", "Culture & daily life", "Political intrigue"]
  },
  {
    question: "Which era catches your eye?",
    options: ["Ancient Empires", "The Middle Ages", "Modern Conflicts"]
  }
];

export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const completeOnboarding = useAppStore(state => state.completeOnboarding);

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      completeOnboarding('rome'); // Just pass a default for now
    }
  };

  const currentQ = QUESTIONS[step];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Discover your era</Text>
        <Text style={styles.subtitle}>Question {step + 1} of {QUESTIONS.length}</Text>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          {currentQ.options.map((opt, i) => (
            <QuizOption
              key={i}
              text={opt}
              state={selected === i ? 'selected' : 'default'}
              onPress={() => setSelected(i)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title={step === QUESTIONS.length - 1 ? "Start Learning" : "Next"}
            onPress={handleNext}
            disabled={selected === null}
            style={{ opacity: selected === null ? 0.5 : 1 }}
          />
          <Button
            title="Skip"
            variant="outline"
            onPress={() => completeOnboarding('rome')}
            style={styles.skipButton}
          />
        </View>
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
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.dark.primary,
    marginTop: Theme.spacing.xl,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.dark.textMuted,
    marginBottom: Theme.spacing.xl,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: Theme.typography.sizes.xl,
    color: Theme.colors.dark.textParchment,
    marginBottom: Theme.spacing.xl,
    fontWeight: Theme.typography.weights.bold,
  },
  footer: {
    gap: Theme.spacing.md,
  },
  skipButton: {
    borderWidth: 0,
  }
});