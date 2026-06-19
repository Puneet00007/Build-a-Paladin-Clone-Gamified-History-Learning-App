import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, GitMerge, Trophy } from 'lucide-react-native';
import { theme } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import SkillTreeScreen from '../screens/SkillTreeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SkillTreeTab"
        component={SkillTreeScreen}
        options={{
          tabBarLabel: 'Eras',
          tabBarIcon: ({ color, size }) => (
            <GitMerge color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaderboardTab"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Ranks',
          tabBarIcon: ({ color, size }) => (
            <Trophy color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
