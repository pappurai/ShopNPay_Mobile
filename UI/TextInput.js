import React, { forwardRef } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";

const CustomTextInput = forwardRef(
  ({ icon, error, touched, onChangeText, ...otherProps }, ref) => {
    const validationColor = !touched
      ? "#1A237E"
      : error
      ? "#FF5A5F"
      : "#1A237E";
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 60,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: 1.5,
          padding: 5,
        }}
      >
        <View style={{ padding: 8 }}>
          <Icon name={icon} color={validationColor} size={18} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            selectionColor="#1A237E"
            onChangeText={(text) => onChangeText(text)}
            ref={ref}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({});

export default CustomTextInput;
