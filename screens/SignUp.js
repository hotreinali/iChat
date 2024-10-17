import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { colors } from '../config/constants';
import { doc, setDoc } from 'firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
// const backImage = require("../assets/background.png");

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onHandleSignup = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    updateProfile(cred.user, { displayName: username }).then(() => {
                        setDoc(doc(database, 'users', cred.user.email), {
                            id: cred.user.uid,
                            email: cred.user.email,
                            name: cred.user.displayName,
                            about: 'Available'
                        })
                    })
                    console.log('Signup success: ' + cred.user.email)
                })
                .catch((err) => Alert.alert("Signup error", err.message));
        }
    };
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            {/* <Image source={backImage} style={styles.backImage} /> */}
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up with Email</Text>
                <Text style={{color: '#2F76DB', fontWeight:'bold', paddingBottom: 10}}>Your Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    autoCapitalize="none"
                    keyboardType="name-phone-pad"
                    textContentType="name"
                    autoFocus={true}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
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
                <Text style={{color: '#2F76DB', fontWeight:'bold', paddingBottom: 10}}>Default Language</Text>
                <View>
                    <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    // renderLeftIcon={() => (
                    //     <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'blue' : 'black'}
                    //     name="Safety"
                    //     size={20}
                    //     />
                    // )}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                    <Text style={{ fontWeight: 'bold', color: '#797C7B', fontSize: 18 }}> Sign Up</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: colors.pink, fontWeight: '600', fontSize: 14 }}> Log In</Text>
                    </TouchableOpacity>
                </View>
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
        paddingTop: 48,
        paddingBottom: 48
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
});