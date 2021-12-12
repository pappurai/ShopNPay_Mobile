import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from "react-native";
import CustomTextInput from "../UI/TextInput";
import Button from "../UI/Button";
import { FontDisplay } from "expo-font";
import Axios from "axios";

const Login = ({ navigation }) => {
  //sending the otp
  const [otp, setotp] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [error, seterror] = useState(false);

  const getOTP = () => {
    Axios.get(
      `https://sms6.rmlconnect.net:8443/OtpApi/otpgenerate?username=KuruvilaT&password=Sqxl4Y13&msisdn=${mobileNumber}&msg=Your OTP to access KBPOIL is %25m.It will be valid for 3 minutes.&source=KBPOIL&otplen=4&exptime=600&tagname=test&entityid=1601486162497274041&tempid=1607100000000137652`
    )
      .then((response) => {
        console.log(response);
        setotp(response.data.msisdn);
        console.log(otp);
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("Enter OTP");
  };

  const handleRoute = () => {
    if (mobileNumber.length !== 10) {
      return seterror(true);
    }
    getOTP();
    // history.push({
    //     pathname: "/otp",
    //     state: {
    //         // location state
    //         mobile: mobileNumber,
    //     },
    // });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      keyboardVerticalOffset={20}
      behavior="height"
    >
      <View style={styles.container}>
        <Text style={styles.font}>Enter Your Mobile Number</Text>
      </View>
      <View style={styles.textContainer}>
        <CustomTextInput
          style={styles.text}
          icon="mobile1"
          keyboardType="number-pad"
          placeholder="Mobile Number"
          autoCapitalize="none"
          value={mobileNumber}
          onChangeText={(e) => {
            console.log(e);
            setmobileNumber(e);
            seterror(false);
          }}
        />
      </View>
      {error && (
        <p style={{ color: "red" }}>please enter 10 digits mobile number</p>
      )}
      <View style={styles.service}>
        <Text style={styles.agreement}>
          By continuing you agree the ShopNPay Software and Service Agreement
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Button
          label="Get Pin"
          // onPress={() => navigation.navigate('Enter OTP')}
          onPress={handleRoute}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,

    backgroundColor: "#fff",
    paddingTop: 30,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
    width: "100%",
    marginBottom: 35,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 20,
  },
  container: {
    paddingHorizontal: 23,
    height: 70,
    fontFamily: "open-sans",
    fontWeight: "bold",
  },
  font: {
    fontSize: 25,
  },

  service: {
    paddingHorizontal: 28,
  },
  agreement: {
    color: "grey",
    height: 100,
  },
});
export default Login;
