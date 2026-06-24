import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Theme } from '../../theme';
import { useAppStore } from '../../store';
import { SkillNode } from '../../components/SkillNode';
import { FallOfRomePath } from '../../data/rome';
import { AncientEgyptPath } from '../../data/egypt';
import { StandalonePath } from '../../data/standalone';

const { width } = Dimensions.get('window');

const ALL_PATHS = [FallOfRomePath, AncientEgyptPath, StandalonePath];

export function LearnScreen({ navigation }: any) {
  const { progress, conceptCards } = useAppStore();

  const handleNodePress = (pathId: string, chapterId: string, isLocked: boolean) => {
    if (isLocked) {
      // In a real app we'd show a modal explaining what to do, but for now do nothing
      return;
    }
    navigation.navigate('Lesson', { pathId, chapterId });
  };

  const getMasteryPercent = (chapterId: string) => {
    const cards = conceptCards.filter(c => c.chapterId === chapterId);
    if (cards.length === 0) return 0;

    // Average mastery level out of 5
    const totalMastery = cards.reduce((sum, c) => sum + c.masteryLevel, 0);
    return (totalMastery / (cards.length * 5));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} maximumZoomScale={2} minimumZoomScale={0.5}>
        <View style={styles.treeCanvas}>
          {/* Extremely simplified "tree" layout for demo purposes */}
          <SkillNode
            id={FallOfRomePath.id}
            title={FallOfRomePath.title}
            eraColor={Theme.colors.era.rome}
            isLocked={false}
            masteryPercent={getMasteryPercent(FallOfRomePath.chapters[0].id)}
            onPress={() => handleNodePress(FallOfRomePath.id, FallOfRomePath.chapters[0].id, false)}
            x={0}
            y={50}
          />

          <SkillNode
            id={StandalonePath.id}
            title={StandalonePath.title}
            eraColor={Theme.colors.era.ww2}
            isLocked={false}
            masteryPercent={getMasteryPercent(StandalonePath.chapters[0].id)}
            onPress={() => handleNodePress(StandalonePath.id, StandalonePath.chapters[0].id, false)}
            x={width * 0.2}
            y={200}
          />

          <SkillNode
            id={AncientEgyptPath.id}
            title={AncientEgyptPath.title}
            eraColor={Theme.colors.era.egypt}
            isLocked={!progress.unlockedPaths.includes(AncientEgyptPath.id)}
            masteryPercent={getMasteryPercent(AncientEgyptPath.chapters[0].id)}
            onPress={() => handleNodePress(AncientEgyptPath.id, AncientEgyptPath.chapters[0].id, !progress.unlockedPaths.includes(AncientEgyptPath.id))}
            x={-(width * 0.2)}
            y={200}
          />
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
    flexGrow: 1,
  },
  treeCanvas: {
    flex: 1,
    height: 1000, // Large panable area
    alignItems: 'center',
    paddingTop: Theme.spacing.xl,
  }
});