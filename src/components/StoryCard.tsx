import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../theme';
import { StoryCard as StoryCardType } from '../types';
import { Card } from './Card';

interface Props {
  card: StoryCardType;
}

export function StoryCard({ card }: Props) {
  return (
    <Card elevated style={styles.container}>
      {card.imageUrl && (
        <Image source={{ uri: card.imageUrl }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text style={styles.text}>{card.narrationText}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Theme.spacing.md,
    padding: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: Theme.spacing.xl,
  },
  text: {
    color: Theme.colors.dark.textParchment,
    fontSize: Theme.typography.sizes.lg,
    lineHeight: 28,
  },
});
