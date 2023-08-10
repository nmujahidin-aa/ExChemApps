import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Route from "./route";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
  )
}

export default App;