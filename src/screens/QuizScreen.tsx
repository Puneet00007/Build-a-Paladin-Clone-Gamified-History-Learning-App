import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../theme';
import { QUIZ_DATA } from '../data/quizzes';
import { useUserStore } from '../store/userStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { lessonId } = route.params;
  const quiz = QUIZ_DATA[lessonId];
  const { addXp, completeLesson } = useUserStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  if (!quiz) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Quiz not found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText}>Return Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);

    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Finish Quiz
      // score is already updated by handleCheckAnswer, so we can just use it directly
      const percentage = score / quiz.questions.length;

      // Calculate XP based on performance
      const earnedXp = Math.floor(quiz.xpReward * percentage);

      addXp(earnedXp);
      completeLesson(lessonId);
      setIsQuizComplete(true);
    }
  };

  if (isQuizComplete) {
    const earnedXp = Math.floor(quiz.xpReward * (score / quiz.questions.length));

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.completeContainer}>
          <Trophy color={theme.colors.primary} size={64} style={styles.trophyIcon} />
          <Text style={styles.completeTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            You scored {score} out of {quiz.questions.length}
          </Text>

          <View style={styles.xpRewardBox}>
            <Text style={styles.xpRewardText}>+{earnedXp} XP</Text>
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.finishButtonText}>Return to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Text>
          <View style={styles.scoreBadge}>
             <Text style={styles.scoreBadgeText}>Score: {score}</Text>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let optionStyle: any = styles.optionButton;
            let textStyle: any = styles.optionText;
            let Icon = null;

            if (isAnswerChecked) {
              if (index === currentQuestion.correctAnswerIndex) {
                optionStyle = [styles.optionButton, styles.optionCorrect];
                textStyle = [styles.optionText, styles.textCorrect];
                Icon = <CheckCircle2 color={theme.colors.success} size={20} />;
              } else if (index === selectedOption) {
                optionStyle = [styles.optionButton, styles.optionIncorrect];
                textStyle = [styles.optionText, styles.textIncorrect];
                Icon = <XCircle color={theme.colors.error} size={20} />;
              } else {
                 optionStyle = [styles.optionButton, styles.optionDisabled];
              }
            } else if (index === selectedOption) {
              optionStyle = [styles.optionButton, styles.optionSelected];
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionSelect(index)}
                activeOpacity={isAnswerChecked ? 1 : 0.7}
              >
                <Text style={textStyle}>{option}</Text>
                {Icon}
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswerChecked && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>
              {selectedOption === currentQuestion.correctAnswerIndex ? "Correct!" : "Incorrect"}
            </Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}

      </ScrollView>

      <View style={styles.footer}>
        {!isAnswerChecked ? (
           <TouchableOpacity
             style={[styles.actionButton, selectedOption === null && styles.actionButtonDisabled]}
             onPress={handleCheckAnswer}
             disabled={selectedOption === null}
           >
             <Text style={styles.actionButtonText}>Check Answer</Text>
           </TouchableOpacity>
        ) : (
           <TouchableOpacity
             style={styles.actionButton}
             onPress={handleNextQuestion}
           >
             <Text style={styles.actionButtonText}>
               {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
             </Text>
           </TouchableOpacity>
        )}
      </View>
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
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.background,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  progressText: {
    color: theme.colors.textMuted,
    ...theme.typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreBadge: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  scoreBadgeText: {
    color: theme.colors.primary,
    ...theme.typography.bodySmall,
    fontWeight: 'bold',
  },
  questionCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  questionText: {
    color: theme.colors.text,
    ...theme.typography.h2,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  optionCorrect: {
    borderColor: theme.colors.success,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  optionIncorrect: {
    borderColor: theme.colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    color: theme.colors.text,
    ...theme.typography.body,
    flex: 1,
  },
  textCorrect: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  textIncorrect: {
    color: theme.colors.error,
    fontWeight: 'bold',
  },
  explanationBox: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  explanationTitle: {
    color: theme.colors.text,
    ...theme.typography.h3,
    marginBottom: theme.spacing.sm,
  },
  explanationText: {
    color: theme.colors.textMuted,
    ...theme.typography.body,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: theme.colors.background,
    ...theme.typography.h2,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  trophyIcon: {
    marginBottom: theme.spacing.lg,
  },
  completeTitle: {
    color: theme.colors.text,
    ...theme.typography.h1,
    marginBottom: theme.spacing.sm,
  },
  scoreText: {
    color: theme.colors.textMuted,
    ...theme.typography.h3,
    marginBottom: theme.spacing.xl,
  },
  xpRewardBox: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.xxl,
  },
  xpRewardText: {
    color: theme.colors.primary,
    ...theme.typography.h2,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
  },
  finishButtonText: {
    color: theme.colors.background,
    ...theme.typography.h3,
  }
});
