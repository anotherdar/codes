import React, {useEffect, useRef, useState} from 'react';
import {AppState, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';
import {HomeStack, LoginStack} from './src/navigation/Stack';
import {useBiometricsAvailable, useInitialized, useToken} from './src/store';
import {
  STORAGE_KEY_STATE_INITIALIZED,
  getValue,
  removeToken,
} from './src/utils';
import {colors} from './src/theme';
import {useBiometrics} from './src/hooks';

const App = () => {
  const {token, saveToken} = useToken();
  const {saveInitialized} = useInitialized();
  const {isSensorAvailable} = useBiometrics();
  const {saveBiometrics} = useBiometricsAvailable();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        // TODO: try to ask for fingerprint here.
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    /**
     * hide the splash screen of the app
     */
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    /**
     * initialized the app for the first time
     */
    async function initialize() {
      const {initialized} = (await getValue(STORAGE_KEY_STATE_INITIALIZED)) || {
        initialized: false,
      };

      saveInitialized(initialized);
    }
    if (appStateVisible === 'active') {
      initialize();
    }
  }, [saveInitialized, appStateVisible]);

  useEffect(() => {
    if (appStateVisible === 'background') {
      removeToken();
      saveToken(false);
    }
  }, [appStateVisible, saveToken]);

  useEffect(() => {
    async function validateBiometrics() {
      const available = await isSensorAvailable();
      saveBiometrics(available);
    }

    if (appStateVisible === 'active') {
      validateBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStateVisible]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white[500]} barStyle="dark-content" />
      {!token ? <LoginStack /> : <HomeStack />}
    </NavigationContainer>
  );
};

export default App;
