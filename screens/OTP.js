import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import OTPInputView from "@twotalltotems/react-native-otp-input"
import Button from '../UI/Button'
// import { TouchableOpacity } from 'react-native-web'

const OTP = ({navigation}) => {
      //setting the timer in resend code
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1
                } else {
                    return prevTimer
                }

            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            keyboardVerticalOffset={20}
            behavior="height"
        >
            <View style={styles.screen}>
                <View style={styles.container} >
                    <Text style={styles.text}>OTP Authentication</Text>
                    <Text style={styles.con}>An authentication code has been sent to your mobile number</Text>
                </View>
                <View style={styles.number}>
                    <TouchableOpacity>
                        <Text  onPress={() => navigation.navigate('Login Screen')} style={styles.wrong}>Wrong Number?</Text>
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
                            backgroundColor: 'white',
                            color: "black",
                            borderColor: "#1A237E",
                            borderWidth: 2,
                            fontSize: 30,
                           



                        }}
                        onCodeFilled={(code) => {
                            console.log(code)
                        }}

                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 20
                        }}>
                        <Text style={{ color: "gray" }}>Did n't received code?</Text>
                        <TouchableOpacity


                            disabled={timer == 0 ? false : true}





                            onPress={() => setTimer(60)}

                        ><Text style={{ color: "blue", marginHorizontal: 10 }}>{`Resend (${timer}s)`} </Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textContainer} >
                    <Button
                        label="Submit"



                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,

        backgroundColor: "#fff",
        paddingTop: 30,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10

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

    number:{
        paddingHorizontal:20,
        marginTop:20,
    
       
    },
    wrong:{
        color:"blue"

    },

    con:{
        color:"grey",
        fontSize:18,
        paddingHorizontal:20,
        fontFamily:"open-sans",
        marginTop: 40
     

    }

})
export default OTP


