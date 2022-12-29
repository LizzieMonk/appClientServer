
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';

import { AppRegistry, SafeAreaView } from 'react-native';
import { name as appName } from './app.json';

import { ThemeProvider } from './providers/ThemeProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false,}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);