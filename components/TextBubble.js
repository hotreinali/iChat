import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { fetch } from '@react-native-community/netinfo';
// import loadUrl from '../screens/Chat'

const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

const TextBubble = ({ currentMessage }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const extractPathFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathname = decodeURIComponent(urlObj.pathname);
      const pathStartIndex = pathname.indexOf('/o/') + 3; // "/o/" is the part that precedes the encoded path in the URL
      const pathEndIndex = pathname.indexOf('?alt=media');
      const path = pathname.substring(pathStartIndex, pathEndIndex + 1);
      return path;
    } catch (error) {
      console.error('Error extracting path from URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTextFile = async () => {
      try {
        const textRef = ref(storage, currentMessage.audio);
        const u = extractPathFromUrl(textRef);
        // const textRef = loadUrl();
        // console.log(u);
        const url = await getDownloadURL(textRef);
        const response = await fetch(url);
        const textContent = await response.text();
        setText(textContent);
      } catch (error) {
        console.error('Error fetching text file:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTextFile();
  }, [currentMessage.textUri]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 10, backgroundColor: '#e1f5fe', borderRadius: 8 }}>
      <Text>{text}</Text>
    </View>
  );
};

export default TextBubble;
