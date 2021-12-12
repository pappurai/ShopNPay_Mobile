import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Button from "../UI/Button";
// import RNOtpVerify from "react-native-otp-verify";
// import { TouchableOpacity } from 'react-native-web'
import OtpAutocomplete from "react-native-otp-autocomplete";

import Axios from "axios";
// import { log } from "react-native-reanimated";

const OTP = ({ navigation, route }) => {
  ////

  //   console.log(getHash);
  //   getHash();
  //   useEffect(() => {
  //     // getHash();
  //     // startListeningForOtp();

  //     return () => OtpAutocomplete.removeListener();
  //   }, [startListeningForOtp]);
  /////
  //setting the timer in resend code
  const [timer, setTimer] = useState(60);
  const { mobileNumber } = route.params;
  const [otp, setotp] = useState("");
  const [error, seterror] = useState(null);
  const getOTP = () => {
    Axios.get(
      `https://sms6.rmlconnect.net:8443/OtpApi/otpgenerate?username=KuruvilaT&password=Sqxl4Y13&msisdn=${mobileNumber}&msg=Your OTP to access KBPOIL is %25m.It will be valid for 3 minutes.&source=KBPOIL&otplen=4&exptime=600&tagname=test&entityid=1601486162497274041&tempid=1607100000000137652`
    )
      .then((response) => {
        console.log(response);
        // setotp(response.data.msisdn);
        // console.log(otp);
      })
      .catch((err) => {
        console.log(err);
      });
    // navigation.navigate("Enter OTP", {
    //   mobileNumber,
    // });
  };
  const handleSubmit = async () => {
    if (otp.length !== 4) {
      return seterror("please enter the otp");
    }
    try {
      const result = await Axios.get(
        `https://sms6.rmlconnect.net:8443/OtpApi/checkotp?username=KuruvilaT&password=Sqxl4Y13&msisdn=${mobileNumber}&otp=${otp}&entityid=1601486162497274041&tempid=1607100000000137652`
      );
      console.log(result.data);
      if (result.data == 101) {
        navigation.navigate("Home");
      } else {
        seterror("invalid OTP");
        console.log("invalid OTP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      keyboardVerticalOffset={20}
      behavior="height"
    >
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.text}>OTP Authentication</Text>
          <Text style={styles.con}>
            An authentication code has been sent to your mobile number{" "}
            {mobileNumber}
          </Text>
        </View>
        <View style={styles.number}>
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("Login Screen")}
              style={styles.wrong}
            >
              Wrong Number?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 50,
            paddingHorizontal: 20,
          }}
        >
          <OTPInputView
            pinCount={4}
            style={{
              width: "100%",
              height: 50,
            }}
            codeInputFieldStyle={{
              width: 65,
              height: 65,
              borderRadius: 5,
              backgroundColor: "white",
              color: "black",
              borderColor: "#1A237E",
              borderWidth: 2,
              fontSize: 30,
            }}
            onCodeChanged={(value) => setotp(value)}
            onCodeFilled={(code) => {
              console.log(code);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "gray" }}>Did n't received code?</Text>
            <Button
              disabled={timer == 0 ? false : true}
              onPress={() => {
                setTimer(60);
                getOTP();
              }}
              label={`Resend (${timer}s)`}
              style={{
                marginLeft: 10,
                backgroundColor: null,
                height: 20,
              }}
              labelStyle={{
                color: `${timer == 0 ? "blue" : "gray"}`,
                fontSize: 14,
              }}
            >
              {/* <Text style={{ color: "blue", marginHorizontal: 10 }}> */}

              {/* </Text> */}
            </Button>
          </View>
        </View>
        <View style={styles.textContainer}>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button label="Submit" onPress={handleSubmit} />
        </View>
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

  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  text: {
    fontSize: 20,
    fontFamily: "open-sans",
    fontWeight: "bold",
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 80,
    width: "100%",
    marginTop: 100,
  },

  number: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  wrong: {
    color: "blue",
  },

  con: {
    color: "grey",
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: "open-sans",
    marginTop: 40,
  },
});
export default OTP;
