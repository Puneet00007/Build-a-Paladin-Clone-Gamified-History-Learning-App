import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Theme } from '../../theme';
import { EmptyState } from '../../components/EmptyState';
import { Swords } from 'lucide-react-native';

export function ChallengeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <EmptyState
        title="Daily Challenge"
        message="Gauntlets and Leagues are currently under construction. Prepare your weapons for the upcoming async battles!"
        icon={<Swords color={Theme.colors.dark.primary} size={64} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.dark.background,
  }
});