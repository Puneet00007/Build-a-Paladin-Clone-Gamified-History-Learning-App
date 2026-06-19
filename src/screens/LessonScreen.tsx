import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import { LESSONS_DATA, StoryChoice } from '../data/lessons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ route, navigation }: Props) {
  const { lessonId } = route.params;
  const lesson = LESSONS_DATA[lessonId];

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null);

  if (!lesson) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Lesson not found.</Text>
      </View>
    );
  }

  const handleNextParagraph = () => {
    if (currentParagraphIndex < lesson.paragraphs.length - 1) {
      setCurrentParagraphIndex(prev => prev + 1);
    }
  };

  const handleChoiceSelect = (choice: StoryChoice) => {
    setSelectedChoice(choice);
  };

  const handleFinishLesson = () => {
    navigation.replace('Quiz', { lessonId });
  };

  const isStoryComplete = currentParagraphIndex === lesson.paragraphs.length - 1;
  const showChoices = isStoryComplete && lesson.choice && !selectedChoice;
  const showResult = isStoryComplete && lesson.choice && selectedChoice;
  const canProceedToQuiz = (isStoryComplete && !lesson.choice) || showResult;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>

        <View style={styles.storyBoard}>
          {lesson.paragraphs.slice(0, currentParagraphIndex + 1).map((para, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {para}
            </Text>
          ))}
        </View>

        {!isStoryComplete && (
          <TouchableOpacity style={styles.continueButton} onPress={handleNextParagraph}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        {showChoices && (
          <View style={styles.choiceContainer}>
            <Text style={styles.choiceQuestion}>{lesson.choice!.question}</Text>
            {lesson.choice!.options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.choiceButton}
                onPress={() => handleChoiceSelect(option)}
              >
                <Text style={styles.choiceButtonText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {showResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{selectedChoice!.resultingText}</Text>
          </View>
        )}

        {canProceedToQuiz && (
          <TouchableOpacity style={styles.quizButton} onPress={handleFinishLesson}>
            <Text style={styles.quizButtonText}>Test Your Knowledge</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    ...theme.typography.h3,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    color: theme.colors.primary,
    ...theme.typography.h1,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  storyBoard: {
    marginBottom: theme.spacing.xl,
  },
  paragraph: {
    color: theme.colors.text,
    ...theme.typography.body,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  continueButton: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  continueButtonText: {
    color: theme.colors.primary,
    ...theme.typography.h3,
  },
  choiceContainer: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  choiceQuestion: {
    color: theme.colors.text,
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  choiceButton: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  choiceButtonText: {
    color: theme.colors.text,
    ...theme.typography.body,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: theme.spacing.lg,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  resultText: {
    color: theme.colors.text,
    ...theme.typography.body,
    fontStyle: 'italic',
  },
  quizButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  quizButtonText: {
    color: theme.colors.background,
    ...theme.typography.h2,
  }
});
