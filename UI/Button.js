import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.tochable, ...style }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tochable: {
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E",
  },
  text: { fontSize: 18, color: "white", fontFamily: "open-sans-bold" },
});

export default Button;
