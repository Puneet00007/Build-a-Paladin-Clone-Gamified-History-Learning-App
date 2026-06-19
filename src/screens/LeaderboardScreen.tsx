import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { theme } from '../theme';
import { LEADERBOARD_DATA, LeaderboardUser } from '../data/leaderboard';
import { useUserStore } from '../store/userStore';
import { Trophy, Medal, Flame } from 'lucide-react-native';

export default function LeaderboardScreen() {
  const { xp, level, streak } = useUserStore();

  const fullLeaderboard = useMemo(() => {
    const currentUser: LeaderboardUser = {
      id: 'current_user',
      name: 'You',
      level: level,
      xp: xp,
      isCurrentUser: true,
    };

    const combined = [...LEADERBOARD_DATA, currentUser];
    return combined.sort((a, b) => b.xp - a.xp);
  }, [xp, level]);

  const renderItem = ({ item, index }: { item: LeaderboardUser; index: number }) => {
    const isTop3 = index < 3;
    let rankColor = theme.colors.textMuted;

    if (index === 0) rankColor = '#FFD700'; // Gold
    if (index === 1) rankColor = '#C0C0C0'; // Silver
    if (index === 2) rankColor = '#CD7F32'; // Bronze

    return (
      <View style={[
        styles.userRow,
        item.isCurrentUser && styles.currentUserRow
      ]}>
        <View style={styles.rankContainer}>
          {isTop3 ? (
             <Medal color={rankColor} size={24} />
          ) : (
            <Text style={styles.rankText}>{index + 1}</Text>
          )}
        </View>

        <View style={styles.avatarContainer}>
           <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, item.isCurrentUser && styles.currentUserName]}>
            {item.name}
          </Text>
          <Text style={styles.userLevel}>Lvl {item.level}</Text>
        </View>

        <View style={styles.xpContainer}>
          <Text style={styles.userXp}>{item.xp} XP</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Trophy color={theme.colors.primary} size={40} style={styles.headerIcon} />
        <Text style={styles.title}>Hall of Fame</Text>
        <Text style={styles.subtitle}>Weekly Global Rankings</Text>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Your Rank</Text>
          <Text style={styles.statValue}>
            #{fullLeaderboard.findIndex(u => u.isCurrentUser) + 1}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Your Streak</Text>
          <View style={styles.streakRow}>
            <Flame color={theme.colors.secondary} size={16} />
            <Text style={styles.statValue}>{streak}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={fullLeaderboard}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerIcon: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    ...theme.typography.h1,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.primary,
    ...theme.typography.body,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceLight,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statLabel: {
    color: theme.colors.textMuted,
    ...theme.typography.caption,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    color: theme.colors.text,
    ...theme.typography.h2,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  currentUserRow: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: theme.colors.primary,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: theme.colors.textMuted,
    ...theme.typography.h3,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: theme.colors.text,
    ...theme.typography.h3,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: theme.colors.text,
    ...theme.typography.body,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  currentUserName: {
    color: theme.colors.primary,
  },
  userLevel: {
    color: theme.colors.textMuted,
    ...theme.typography.caption,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  userXp: {
    color: theme.colors.primary,
    ...theme.typography.body,
    fontWeight: 'bold',
  }
});
