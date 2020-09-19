import React, {useEffect} from 'react';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <AppNavigator />;
};

export default App;
