import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { colors } from "../config/constants";
// const backImage = require("../assets/background.png");

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login success"))
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            {/* <Image source={backImage} style={styles.backImage} /> */}
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Log in to iChat</Text>
                <Text style={styles.subtitle}>Welcome back! Sign in using email to continue us.</Text>
                <Text style={{color: '#2F76DB', fontWeight:'bold', paddingBottom: 10}}>Your Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={{color: '#2F76DB', fontWeight:'bold', paddingBottom: 10}}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: '#1877F2', fontWeight: '600', fontSize: 14 }}>Have no existing account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
                        <Text style={{ color: '#1877F2', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' }}> Sign Up Here</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{ fontWeight: 'bold', color: '#797C7B', fontSize: 18 }}> Log In</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "center",
        paddingBottom: 24,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#797C7B',
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#F3F6F6',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
    },
});
