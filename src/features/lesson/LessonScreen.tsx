import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Theme } from '../../theme';
import { FallOfRomePath } from '../../data/rome';
import { StoryCard } from '../../components/StoryCard';
import { ProgressBar } from '../../components/ProgressBar';
import { ChevronRight } from 'lucide-react-native';

// For simplicity, we hardcode the first chapter of Rome for the demo if none provided
export function LessonScreen({ navigation, route }: any) {
  const chapterId = route?.params?.chapterId || FallOfRomePath.chapters[0].id;
  const pathId = route?.params?.pathId || FallOfRomePath.id;

  // Find chapter
  const path = [FallOfRomePath].find(p => p.id === pathId) || FallOfRomePath;
  const chapter = path.chapters.find(c => c.id === chapterId) || path.chapters[0];

  const [cardIndex, setCardIndex] = useState(0);

  const handleNext = () => {
    if (cardIndex < chapter.storyCards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      navigation.navigate('Quiz', { chapterId, pathId });
    }
  };

  const progress = (cardIndex + 1) / chapter.storyCards.length;
  const currentCard = chapter.storyCards[cardIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ProgressBar progress={progress} />
      </View>

      <View style={styles.content}>
        <StoryCard card={currentCard} />
        {currentCard.choice && (
          <View style={styles.choiceBox}>
            <Text style={styles.choicePrompt}>{currentCard.choice.prompt}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.nextArea} onPress={handleNext} activeOpacity={0.7}>
        <Text style={styles.nextText}>Tap to continue</Text>
        <ChevronRight color={Theme.colors.dark.textMuted} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.dark.background,
  },
  header: {
    padding: Theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  choiceBox: {
    padding: Theme.spacing.lg,
  },
  choicePrompt: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
  },
  nextArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.dark.surfaceElevated,
    borderTopLeftRadius: Theme.radii.lg,
    borderTopRightRadius: Theme.radii.lg,
  },
  nextText: {
    color: Theme.colors.dark.textMuted,
    fontSize: Theme.typography.sizes.md,
    marginRight: Theme.spacing.sm,
  }
});