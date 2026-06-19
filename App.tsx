import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useUserStore } from './src/store/userStore';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const updateStreak = useUserStore((state) => state.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
