import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { TEST_ID } from 'react-native-gifted-chat';

const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

const AudioBubble = ({ currentMessage }) => {
  const [text, setText] = useState('');
  const [sound, setSound] = React.useState();
  const [loading, setLoading] = useState(true);

  const extractPathFromUrl = (url) => {
    try {
      // const urlObj = new URL(url);
      const pathname = decodeURIComponent(url);
      // console.log(pathname);
      const pathStartIndex = pathname.indexOf('m/') + 2; // "/o/" is the part that precedes the encoded path in the URL
      // console.log(pathStartIndex);
      const pathEndIndex = pathname.indexOf('?alt=media');
      const path = pathname.substring(pathStartIndex);
      // console.log(path);
      return path;
    } catch (error) {
      console.error('Error extracting path from URL:', error);
      return null;
    }
  };

  useEffect(() => {
    
  }, []);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: currentMessage.audio },
      { shouldPlay: true }
    );
    console.log(currentMessage.audio);
    setSound(sound);

    const fetchTextFile = async () => {
      try {
        const textRef = ref(storage, currentMessage.audio);
        const u = extractPathFromUrl(textRef);
        const path = u + '.wav_transcription.txt';
        // const textRef = loadUrl();
        // console.log(path);
        const transcriptionFileRef = ref(storage, path);
        const url = await getDownloadURL(transcriptionFileRef);
        const response = await fetch(url);
        const textContent = await response.text();
        let json;
        try {
          json = JSON.parse(textContent);
          console.log(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setTranscript('Error parsing JSON');
          return;
        }
        // const json = await response.json();
        const transcriptText = json.results[0].alternatives[0].transcript;
        console.log(json.results[0])
        console.log(transcriptText);
        const text = transcriptText;
        
        
        setText(text);
      } catch (error) {
        console.error('Error fetching text file:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTextFile();

  };

  React.useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <View>
      <Text>Audio</Text>
      <Text>{text}</Text>
      <TouchableOpacity onPress={playSound}>
        <Text style={{ color: 'white' }}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioBubble;
