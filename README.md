# iChat

## Overview
This project is a cross-platform mobile application developed with React Native that allows users to send and receive real-time text and voice messages, along with translation capabilities for voice to support multilingual communication.
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
3. Add the following to a new configure file for initiating Firebase
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
4. Start the app using Expo (Require Expo SDK 51)
    ```bash
    #Android Devices
    npx expo start 
    #iOS Devices
    npx expo start --tunnel
    ```
