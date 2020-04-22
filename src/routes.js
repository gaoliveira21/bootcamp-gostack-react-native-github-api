import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: 'Home' }}
          component={Main}
        />
        <Stack.Screen
          name="User"
          options={{ title: 'Users' }}
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
