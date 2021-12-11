import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import OTP from '../screens/OTP'
const Stack = createNativeStackNavigator();
const Shopnavigator =() => {
    return (
        <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
            fontSize: 20,
           
          },
        }}>
         
        <Stack.Screen name="Login Screen" component={Login}
        options={{
          
          headerStyle: {
            backgroundColor: '#1A237E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        
        
        /> 
        <Stack.Screen name="Enter OTP" component={OTP}
          options={{
          
            headerStyle: {
              backgroundColor: '#1A237E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
          /> 
      </Stack.Navigator>
    </NavigationContainer>
    )
}



const styles = StyleSheet.create({})

export default Shopnavigator
