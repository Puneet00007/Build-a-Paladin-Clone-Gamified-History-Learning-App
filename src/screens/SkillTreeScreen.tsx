import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../theme';
import { useUserStore } from '../store/userStore';
import { ERAS_DATA } from '../data/eras';
import { Shield, Sun, Swords, Castle, Palette, Factory, Lock } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const IconMap: Record<string, any> = {
  Sun, Shield, Swords, Castle, Palette, Factory
};

export default function SkillTreeScreen() {
  const { unlockedNodes, unlockNode, xp } = useUserStore();
  const navigation = useNavigation<NavigationProp>();

  // Group eras by tier
  const tiers = ERAS_DATA.reduce((acc, era) => {
    if (!acc[era.tier]) acc[era.tier] = [];
    acc[era.tier].push(era);
    return acc;
  }, {} as Record<number, typeof ERAS_DATA>);

  const handleNodePress = (era: typeof ERAS_DATA[0], isUnlocked: boolean, canUnlock: boolean) => {
    if (isUnlocked) {
      // Navigate to the first lesson of this era (simplified for prototype)
      navigation.navigate('Lesson', { lessonId: era.lessons[0] });
    } else if (canUnlock) {
      if (xp >= 1000) { // Arbitrary cost for prototype
        Alert.alert(
          "Unlock Era",
          `Do you want to spend 1000 XP to unlock ${era.title}?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Unlock",
              onPress: () => unlockNode(era.id)
            }
          ]
        );
      } else {
        Alert.alert("Not enough XP", `You need 1000 XP to unlock this era. Keep learning!`);
      }
    } else {
      Alert.alert("Locked", "You must unlock prerequisite eras first.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Chronicles</Text>
        <Text style={styles.subtitle}>Unlock eras to expand your knowledge.</Text>
      </View>

      <View style={styles.treeContainer}>
        {Object.keys(tiers).map((tierStr) => {
          const tier = parseInt(tierStr);
          const nodes = tiers[tier];

          return (
            <View key={tier} style={styles.tierRow}>
              {nodes.map(era => {
                const isUnlocked = unlockedNodes.includes(era.id);
                const canUnlock = era.dependencies.every(dep => unlockedNodes.includes(dep));
                const IconComponent = IconMap[era.icon] || Shield;

                return (
                  <TouchableOpacity
                    key={era.id}
                    style={[
                      styles.nodeContainer,
                      isUnlocked ? styles.nodeUnlocked : (canUnlock ? styles.nodeUnlockable : styles.nodeLocked)
                    ]}
                    onPress={() => handleNodePress(era, isUnlocked, canUnlock)}
                  >
                    <View style={[
                      styles.iconCircle,
                      isUnlocked ? styles.iconUnlocked : (canUnlock ? styles.iconUnlockable : styles.iconLocked)
                    ]}>
                      {isUnlocked ? (
                        <IconComponent color={theme.colors.background} size={28} />
                      ) : canUnlock ? (
                        <IconComponent color={theme.colors.primary} size={28} />
                      ) : (
                        <Lock color={theme.colors.textMuted} size={24} />
                      )}
                    </View>
                    <Text style={[
                      styles.nodeTitle,
                      !isUnlocked && !canUnlock && styles.nodeTitleLocked
                    ]}>
                      {era.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textMuted,
    ...theme.typography.body,
    textAlign: 'center',
  },
  treeContainer: {
    alignItems: 'center',
  },
  tierRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    width: '100%',
    flexWrap: 'wrap',
  },
  nodeContainer: {
    alignItems: 'center',
    width: 120,
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  nodeUnlocked: {
    opacity: 1,
  },
  nodeUnlockable: {
    opacity: 0.8,
  },
  nodeLocked: {
    opacity: 0.5,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
  },
  iconUnlocked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  iconUnlockable: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
  },
  iconLocked: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  nodeTitle: {
    color: theme.colors.text,
    ...theme.typography.bodySmall,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nodeTitleLocked: {
    color: theme.colors.textMuted,
  }
});
