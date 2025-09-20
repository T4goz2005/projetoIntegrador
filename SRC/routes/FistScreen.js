// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import PacientesScreen from "../pages/Pacientes";
import Avaliacoes from "../pages/Avaliacoes";
import ModelosScreen from "../pages/Modelos";
import Home from "../pages/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="PacientesScreen" component={PacientesScreen}></Stack.Screen>
        <Stack.Screen name="ModelosScreen" component={ModelosScreen}></Stack.Screen>
        <Stack.Screen name="AvaliacoesScreen" component={Avaliacoes}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  