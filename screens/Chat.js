import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard, Text, ActivityIndicator, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat'
import { auth, database, storage } from '../config/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { colors } from '../config/constants';
import EmojiModal from 'react-native-emoji-modal';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { Audio, RecordingOptionsPresets } from 'expo-av';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AudioBubble from '../components/AudioBubble';
import TextBubble from '../components/TextBubble';


function Chat({ route }) {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);


    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const soundRef = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [recordingStatus, setRecordingStatus] = useState("idle");
    const [transcript, setTranscript] = useState("");
    const recordingRef = useRef(null);
    const statusRef = useRef("");
    const audioRef = useRef(null);
    const urlRef = useRef("");

    async function startRecording() {
        statusRef.current = "";
        recordingRef.current = null;
        setIsRecording(false);
        // setRecording(null);
        setRecordedAudio(null);

        if (isRecording) {
            console.warn("A recording is already in progress");
            return;
          }
        

        try {
          const permissions = await Audio.requestPermissionsAsync();
    
          if (permissions.status === 'granted') {
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
    
            const nrecording = new Audio.Recording();
            console.log("Starting Recording");
            await nrecording.prepareToRecordAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            await nrecording.startAsync();
            recordingRef.current = nrecording;
            statusRef.current = "recording";
            setIsRecording(true);
            } else {
                setErrorMessage('No Permission!');
            }
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }

    async function stopRecording() {
        try {
            console.log("Stopping Recording");
            await recordingRef.current.stopAndUnloadAsync();
            const ruri = recordingRef.current.getURI();
           
            audioRef.current = {
                uri: ruri,
                name: `recording-${Date.now()}.m4a`, // Change the file extension to .m4a
                type: "audio/m4a", // Update the type to M4A
              };
            console.log("stopped recording");
            // resert our states to record again
            setRecording(null);
            recordingRef.current = null;
            setRecordingStatus("stopped");
            statusRef.current = "stopped";
            setIsRecording(false);
            uploadAudio(audioRef.current.uri);
        //   }
        } catch (error) {
          console.error("Failed to stop recording", error);
        }
      }

    const uploadAudio = async(uri) => {
    
        const blob = await new Promise((resolve, reject) => {
            const fetchXHR = new XMLHttpRequest();
            fetchXHR.onload = function () {
              resolve(fetchXHR.response);
            };
            fetchXHR.onerror = function (e) {
              reject(new TypeError('Network request failed'));
            };
            fetchXHR.responseType = 'blob';
            fetchXHR.open('GET', uri, true);
            fetchXHR.send(null);
          }).catch((err) => console.log(err));

        const randomString = uuid.v4();
        urlRef.current = randomString;
        // console.log(urlRef.current);
        const audio = ref(getStorage(), randomString);
        // console.log(audio);
        // console.log(audio);
        // await uploadBytes(audio, blob, {
        //     contentType: 'audio/mp4'
        // });
        await uploadBytes(audio, blob)
        console.log('File uploaded successfully');
        // blob.close();
        const uploadedAudioString = await getDownloadURL(audio);
        // console.log('Download URL:', uploadedAudioString);
        
        
        // const reference = storage().ref(`${url}.wav_transcription.txt`);
        // const path_ = extractPathFromUrl(uploadedAudioString);
        
        // const text = loadTranscript();
        // console.log(text);

        onSend([{
            _id: randomString,
            createdAt: new Date(),
            text: '',
            audio: uploadedAudioString,
            user: {
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: 'https://i.pravatar.cc/300'
            }
        }]);
    };


    // async function loadTranscript () {
    //     // const url = urlRef.current;
    //     // const reference = storage().ref(`${url}.wav_transcription.txt`);
    //     // const u = await reference.getDownloadURL();
    //     // const response = await fetch(u);
    //     // const text = response.text();
    //     // return reference;
    //     const path = urlRef.current + '.wav_transcription.txt';
    //     console.log(path);
    //     const reference = ref(getStorage(), path);
    //     console.log('textRef:', reference);
    //     const u = await getDownloadURL(reference);
    //     console.log(u);
    //     const response = await fetch(u);
    //     console.log('Fetch response:', response);
    //     const textContent = await response.text();
    //     console.log('Raw text content:', textContent);
    //     // JSON.parse might fail if textContent is not valid JSON
        // let json;
        // try {
        //   json = JSON.parse(textContent);
        //   console.log(json);
        // } catch (error) {
        //   console.error('Error parsing JSON:', error);
        //   setTranscript('Error parsing JSON');
        //   return;
        // }
        // // const json = await response.json();
        // const transcriptText = json.results[0].alternatives[0].transcript;
        // console.log(json.results[0])
        // console.log(transcriptText);
        // const text = transcriptText;
    //     console.log(text);
    // }

    // useEffect(() => {
    //     (async () => {
    //       const text = await loadScript();
    //       console.log(text);
    //       setTranscript(text);
    //     })();
    //   }, []);

    // const renderMessageAudio = useMemo(() => (props) => (
    //     const currentMessage = props.currentMessage;

    //     const playSound = async () => {
    //         const { sound } = await Audio.Sound.createAsync({ uri: currentMessage.audio });
    //         await sound.playAsync();
    //       };

    //       return (
    //         <View style={{ padding: 10 }}>
    //           <TouchableOpacity onPress={playSound}>
    //             <Text style={{ color: '#1877F2' }}>Play Audio</Text>
    //           </TouchableOpacity>
    //         </View>
    //       );

    // ), []);

    const renderMessageAudio = (props) => {
        return <AudioBubble {...props} />;
      };

    // const renderMessageText = (props) => {
    //     return <TextBubble {...props} />;
    //   };

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(database, 'chats', route.params.id), (doc) => {
            setMessages(doc.data().messages.map((message) => ({
                ...message,
                createdAt: message.createdAt.toDate(),
                image: message.image ?? '',
                audio: message.audio ?? '',
                script: messages.script ?? '',
            })));
        });

        return () => unsubscribe();
    }, [route.params.id]);

    const onSend = useCallback((m = []) => {
        const messagesWillSend = [{ ...m[0], sent: true, received: false }];
        setDoc(doc(database, 'chats', route.params.id), {
            messages: GiftedChat.append(messages, messagesWillSend),
            lastUpdated: Date.now()
        }, { merge: true });
    }, [route.params.id, messages]);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         await uploadImageAsync(result.assets[0].uri);
    //     }
    // };

    // const uploadImageAsync = async (uri) => {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = () => resolve(xhr.response);
    //         xhr.onerror = () => reject(new TypeError("Network request failed"));
    //         xhr.responseType = "blob";
    //         xhr.open("GET", uri, true);
    //         xhr.send(null);
    //     });
    //     const randomString = uuid.v4();
    //     const fileRef = ref(getStorage(), randomString);
    //     await uploadBytes(fileRef, blob);
    //     blob.close();

    //     const uploadedFileString = await getDownloadURL(fileRef);
    //     onSend([{
    //         _id: randomString,
    //         createdAt: new Date(),
    //         text: '',
    //         image: uploadedFileString,
    //         user: {
    //             _id: auth?.currentUser?.email,
    //             name: auth?.currentUser?.displayName,
    //             avatar: 'https://i.pravatar.cc/300'
    //         }
    //     }]);
    // };

    const renderBubble = useMemo(() => (props) => (
        <Bubble
            {...props}
            // renderMessageText={(props) => {
            //     return (<View><Text>{transcript}</Text></View>)
            // }}
            wrapperStyle={{
                right: { backgroundColor: '#1877F2' },
                left: { backgroundColor: '#F2F7FB' }
            }}
        />
    ), []);

    // const 

    const renderSend = useMemo(() => (props) => (
        <>
            {/* <TouchableOpacity style={styles.addImageIcon} onPress={pickImage}>
                <View>
                    <Ionicons
                        name='attach-outline'
                        size={32}
                        color={colors.teal} />
                </View>
            </TouchableOpacity> */}
            <Send {...props}>
                <View style={{ justifyContent: 'center', height: '100%', marginLeft: 8, marginRight: 4, marginTop: 12 }}>
                    <MaterialCommunityIcons name="send-circle" size={38} color="#1877F2" />
                </View>
                
            </Send>
        </>
    ), []);

    const renderInputToolbarStop = useMemo(() => (props) => (
        <InputToolbar {...props}
            containerStyle={styles.inputToolbar}
            renderActions={renderStop}
            // onPressActionButton={renderButton}
        />
    ), []);

    const renderInputToolbarStart = useMemo(() => (props) => (
        <InputToolbar {...props}
            containerStyle={styles.inputToolbar}
            renderActions={renderStart}
            // onPressActionButton={renderButton}
        />
    ), []);

    const renderStop = useMemo(() => (props) => (
        <>
        <View {...props}>
                    <TouchableOpacity style={styles.emojiIcon} onPress={stopRecording}>
                        <View >
                            <FontAwesome6 name="stop-circle" size={24} color={"#1877F2"} />
                        </View>
                    </TouchableOpacity> 
                   
        </View>
        </>
        
        
    ), [isRecording]);

    const renderStart = useMemo(() => (props) => (
        <View {...props}>
                <TouchableOpacity style={styles.emojiIcon} onPress={startRecording}>
                        <View >
                            
                            <Ionicons
                                    name='mic'
                                    size={32}
                                    color={"#1877F2"} />
                        </View>
                </TouchableOpacity>
        </View>
    ), [isRecording]);
    // const handleEmojiPanel = useCallback(() => {
    //     if (modal) {
    //         setModal(false);
    //     } else {
    //         Keyboard.dismiss();
    //         setModal(true);
    //     }
    // }, [modal]);

    const renderLoading = useMemo(() => () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={"#1877F2"} />
        </View>
    ), []);
       

    return (
        <>
            {isRecording ? (
                <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                imageStyle={{ height: 212, width: 212 }}
                messagesContainerStyle={{ backgroundColor: '#FFFFFF' }}
                textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: 'https://i.pravatar.cc/300'
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderUsernameOnMessage={true}
                renderAvatarOnTop={true}
                renderInputToolbar={renderInputToolbarStop}
                minInputToolbarHeight={56}
                scrollToBottom={true}
                scrollToBottomStyle={styles.scrollToBottomStyle}
                renderLoading={renderLoading}
                renderMessageAudio={renderMessageAudio}
                // renderMessageText={renderMessageText}
            />
            ):(
                <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                imageStyle={{ height: 212, width: 212 }}
                messagesContainerStyle={{ backgroundColor: '#FFFFFF' }}
                textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: 'https://i.pravatar.cc/300'
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                // renderActions={renderActions}
                // onPressActionButton={renderButton}
                renderUsernameOnMessage={true}
                renderAvatarOnTop={true}
                renderInputToolbar={renderInputToolbarStart}
                minInputToolbarHeight={56}
                scrollToBottom={true}
                scrollToBottomStyle={styles.scrollToBottomStyle}
                renderLoading={renderLoading}
                renderMessageAudio={renderMessageAudio}
                // renderMessageText={renderMessageText}
            />
            )}
            
            
            
            {/* {modal &&
                <EmojiModal
                    onPressOutside={handleEmojiPanel}
                    modalStyle={styles.emojiModal}
                    containerStyle={styles.emojiContainerModal}
                    backgroundStyle={styles.emojiBackgroundModal}
                    columns={5}
                    emojiSize={66}
                    activeShortcutColor={colors.primary}
                    onEmojiSelected={(emoji) => {
                        onSend([{
                            _id: uuid.v4(),
                            createdAt: new Date(),
                            text: emoji,
                            user: {
                                _id: auth?.currentUser?.email,
                                name: auth?.currentUser?.displayName,
                                avatar: 'https://i.pravatar.cc/300'
                            }
                        }]);
                    }}
                />
            } */}
        </>
        
    );
}

const styles = StyleSheet.create({
    inputToolbar: {
        bottom: 6,
        // marginLeft: 8,
        // marginRight: 8,
        // borderRadius: 16,
    },
    emojiIcon: {
        marginLeft: 4,
        bottom: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    stopIcon:{
        
    },
    emojiModal: {},
    emojiContainerModal: {
        height: 348,
        width: 396,
    },
    emojiBackgroundModal: {},
    scrollToBottomStyle: {
        borderColor: colors.grey,
        borderWidth: 1,
        width: 56,
        height: 56,
        borderRadius: 28,
        position: 'absolute',
        bottom: 12,
        right: 12
    },
    addImageIcon: {
        bottom: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Chat;