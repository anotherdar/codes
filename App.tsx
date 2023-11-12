import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';
import {HomeStack, LoginStack} from './src/navigation/Stack';
import {useToken} from './src/store';
import {getToken} from './src/utils';

const App = () => {
  const {token, saveToken} = useToken();

  React.useEffect(() => {
    /**
     * hide the splash screen of the app
     */
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    /**
     * method to initialize the app and get the auth
     * TODO: this will change in the future as we integrate the fingerprint login
     */
    async function initialize() {
      const {token: localToken} = await getToken();
      saveToken(!!localToken);
    }

    initialize();
  }, [token, saveToken]);

  return (
    <NavigationContainer>
      {!token ? <LoginStack /> : <HomeStack />}
    </NavigationContainer>
  );
};

export default App;
