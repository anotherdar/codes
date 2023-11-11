import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';
import {LoginStack} from './src/navigation/Stack';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
};

export default App;
