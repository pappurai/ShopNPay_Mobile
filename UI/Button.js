import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress, style, disabled, labelStyle }) => {
  // console.log(disabled);
  return (
    <TouchableOpacity
      style={{ ...styles.tochable, ...style }}
      activeOpacity={disabled ? 1 : 0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.text, ...labelStyle }}>{label}</Text>
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
