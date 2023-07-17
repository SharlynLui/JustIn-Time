import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Pantry from "./screens/Pantry";
import About from "./screens/About";
import Add from "./screens/Add";
import Freezer from "./screens/Freezer";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Pantry" component={Pantry} />
        <Stack.Screen name="Freezer" component={Freezer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
