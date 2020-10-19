import React from 'react';
import {useSelector} from 'react-redux';
import AdminNavigator from './navigators/AdminNavigator';
import {ClientNavigator} from './navigators/ClientNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppearanceProvider} from 'react-native-appearance';
const NavigatorSelector = () => {
  const profile = useSelector(state => state.user.profile);
  if (profile.type === 'admin') {
    return <AdminNavigator />;
  }
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <ClientNavigator />
      </AppearanceProvider>
    </SafeAreaProvider>
  );
};

export default NavigatorSelector;
