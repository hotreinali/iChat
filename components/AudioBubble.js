import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { getApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL} from 'firebase/storage';
import { auth, database, storage } from '../config/firebase';
import { TEST_ID } from 'react-native-gifted-chat';
import { onSnapshot, doc, addDoc, getDoc, getDocs, query, where, collection} from 'firebase/firestore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const AudioBubble = ({ currentMessage }) => {
  const [text, setText] = useState('');
  const [sound, setSound] = React.useState();
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [documentData, setDocumentData] = useState(null);
  const [transText, setTransText] = useState('');

  const getCurrentUserId = () => {
    const user = auth.currentUser;
    return user ? user.email : null;
  };

  const userId = getCurrentUserId();
  // console.log(userId);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, 'users', userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // console.log('Document data:', data);
        setLanguage(data.language);
        // console.log(language);
      } else {
        console.log('No such document!');
      }
    });
    return () => unsubscribe();
  }, [userId]);

  const extractPathFromUrl = (url) => {
    try {
      const pathname = decodeURIComponent(url);
      const pathStartIndex = pathname.indexOf('m/') + 2; // "/o/" is the part that precedes the encoded path in the URL
      const pathEndIndex = pathname.indexOf('?alt=media');
      const path = pathname.substring(pathStartIndex);
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
    // console.log(currentMessage.audio);
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
        // console.log(json.results[0])
        // console.log(transcriptText);
        const text = transcriptText;
        
        
        setText(text);
        try {
          const docRef = await addDoc(collection(database, 'translations'), {
            input: transcriptText
          });
          setDocumentId(docRef.id);
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }

      } catch (error) {
        console.error('Error fetching text file:', error);
      } 
    };

    fetchTextFile();

  };

  const getTranslation = async () => {
    

    // try {
    //   const q = query(collection(database, 'translations'), where('input', '==', text));
    //   const querySnapshot = await getDoc(q);

    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log('Document data:', doc.data());
    //     setDocumentData(doc.data());
    //     // setDocumentId(doc.id); // Capture the document ID for further use
    //   });
    //     console.log(documentData);
    //     setTransText(documentData.translated[language]);
    //     console.log(transText);

    //   if (querySnapshot.empty) {
    //     console.log('No matching documents.');
    //     setDocumentData(null);
    //   }
    // } catch (error) {
    //   console.error('Error fetching document:', error);
    // } 

    try {
      // Create a reference to the document
      const dRef = doc(database, 'translations', documentId); // Replace 'your-document-id' with actual document ID
      // Get the document
      const dSnap = await getDoc(dRef);
      console.log(dRef);
      if (dSnap.exists()) {
        console.log('Document data:', dSnap.data());
        setDocumentData(dSnap.data());
        setTransText(documentData.translated[language])
        // console.log(documentData.translated[language]);
        // console.log(transText);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } 
  };

  const handlePress = () => {
    setTimeout(getTranslation, 5000);
  };


  // useEffect(() => {
  //   getTranslation();
  // }, []);

  React.useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <View>
      {/* <Text>Audio</Text> */}
      {/* <Text>{text}</Text> */}
      <TouchableOpacity onPress={playSound}>
        {/* <Text style={{ color: 'white' }}>Play</Text> */}
        <AntDesign name="playcircleo" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons name="g-translate" size={24} color="black" />
      </TouchableOpacity>
      <Text>{transText}</Text>
    </View>
  );
};

export default AudioBubble;
