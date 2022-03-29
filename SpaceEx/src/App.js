import * as React from 'react';
import {useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import LaunchDetailsScreen from './pages/LaunchDetailsScreen';

import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    // primary: 'rgb(255, 45, 85)',
    background: '#1a0331',
    card: '#050b1c',
    text: '#fff',
    // border: 'rgb(199, 199, 0)',
    // notification: 'rgb(255, 69, 58)',
  },
};
function App() {
  useEffect(() => {
    // console.log(DefaultTheme);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'SpaceX Extractor'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{title: 'SpaceEx | Launch Pad Details'}}
          />
          <Stack.Screen
            name="LaunchDetails"
            component={LaunchDetailsScreen}
            options={({route}) => ({
              title: `SpaceEx | ${route.params?.name} `,
              launchInfoData: route.params?.launchInfoData,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
