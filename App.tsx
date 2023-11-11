import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={{flexGrow: 1, padding: 10, backgroundColor: 'white'}}>
        <Text style={{fontSize: 36, color: 'red'}}>Test</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
