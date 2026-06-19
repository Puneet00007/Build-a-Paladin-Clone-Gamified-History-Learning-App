import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import { theme } from '../theme';

export type RootStackParamList = {
  MainTabs: undefined;
  Lesson: { lessonId: string };
  Quiz: { lessonId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        }
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ title: 'Story' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Knowledge Check', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
