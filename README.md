
<h1 align="center">
iChat
<br>
<img width="230" alt="Screen Shot 2024-11-07 at 7 49 52 PM" src="https://github.com/user-attachments/assets/edc62f4c-bf33-489e-b0cc-380344fdcd71">
</h1>

<p align="center">
  <a href="#Overview">Overview</a> •
  <a href="#Installation">Installation</a> •
  <a href="#Credits">Credits</a> 
</p>


## Overview
#### Open Source Attribution
This application is built upon the foundation of an existing [open-source project](https://github.com/Ctere1/react-native-chat). I have also committed the code in a separate branch called 'prebuilt-work'. I have customized and extended its features to create a messaging and translation experience tailored to my specific project goals.

#### Introduction
This project is a cross-platform mobile application developed with React Native that allows users to send and receive real-time text and voice messages, along with translation capabilities for voice to support multilingual communication.
##### Key Features:
- **Real-Time Messaging**: Supports sending and receiving of text and voice messages with real-time updates in chat windows.
- **Message Translation**: Users can translate voice messages into their default language selected when they register, supporting a multilingual experience.


## Installation

1. Clone this repository
    ```bash
    git clone https://github.com/hotreinali/iChat.git
    cd iChat
    ```
2. Install the dependencies
    ```bash
    npm install
    ```
3. Add the following to the configure file called firebase.js for initiating Firebase (ignore this step if it is already there)
    ```js
    const firebaseConfig = {
    apiKey: "AIzaSyCrivI_qGtQihspW-2Ie8MDmJRfkZrF_Ys",
    authDomain: "ichat-78b1c.firebaseapp.com",
    projectId: "ichat-78b1c",
    storageBucket: "ichat-78b1c.appspot.com",
    messagingSenderId: "98030838138",
    appId: "1:98030838138:web:159b4c765367036516b6c3",
    measurementId: "G-N8580QDST7"
    };
    ```
4. Start the app using Expo Go (Require Expo SDK 51)
    ```bash
    #Android Devices
    npx expo start 
    #iOS Devices
    npx expo start --tunnel
    ```
*Note: Please be aware that this app has not been deployed, Expo Go is required to use this app.*

## Credits
This software uses the following packages:
- React Native
- Firebase
- Expo
- react-native-gifted-chat
- react-native-emoji-modal
