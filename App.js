
import React, { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Shopnavigator from './navigation/Shopnavigator';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";


const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Shopnavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
