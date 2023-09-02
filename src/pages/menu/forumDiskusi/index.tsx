import {TouchableOpacity, Linking, View, FlatList, useWindowDimensions, StyleSheet, TextInput, Text, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { DocumentData, addDoc, where, getDocs, deleteDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
const groupPath = 'ChatGroups/general';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';


const ForumDiskusi = ({navigation}) => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<any>(null); // Replace 'any' with the correct user data type if available
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;
  const linkRegex = /(?:^|\s)((?:https?:\/\/)[^\s]+)/gi;

  const isDeviceRegistered = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      console.log(deviceId);
      // Replace 'uniqueCodes' with the collection path where device information is stored in Firestore.
      const codesCollectionRef = collection(firestore, 'uniqueCodes');

      // Query the collection to check if the given 'deviceId' exists in the 'device' array field.
      const q = query(codesCollectionRef, where('device', 'array-contains', deviceId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking device registration:', error);
      return false;
    }
  };

  useLayoutEffect(() => {
    const checkDeviceRegistration = async () => {
      const registered = await isDeviceRegistered();
      // if (!registered) {
      //   navigation.replace('LockScreen');
      // }
    };
    checkDeviceRegistration();
  }, []);

  const flatListRef = useRef<FlatList>(null); // Create a ref for FlatList

  // ... Other functions ...
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // Adjust the delay as needed
  
    return () => clearTimeout(timeout);
  }, []);
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
    setShowScrollToBottomButton(false);
  };
  
  
  

  const renderTextWithLinks = (text) => {
    const parts = text.split(linkRegex);
    return parts.map((part, index) => {
      if (linkRegex.test(part)) {
        return (
          <Text key={index} style={{ color: '#2980b9' }} onPress={() => Linking.openURL(part)}>
            {part}
          </Text>
        );
      } else {
        return <Text key={index}>{part}</Text>;
      }
    });
  };
  
  const sendMessage = async () => {
    const msg = message.trim();
    if (msg.length === 0) return;

    const msgCollectionRef = collection(FIRESTORE_DB, `${groupPath}/messages`);

    await addDoc(msgCollectionRef, {
      message: msg,
      sender: user.uid,
      createdAt: serverTimestamp(),
    });

    setMessage('');
  };

  useLayoutEffect(() => {
    const msgCollectionRef = collection(FIRESTORE_DB, `${groupPath}/messages`);
    const q = query(msgCollectionRef, orderBy('createdAt', 'asc'));
  
    const unsubscribe = onSnapshot(q, async (groups: DocumentData) => {
      const messages = await Promise.all(
        groups.docs.map(async (messageDoc) => {
          const messageData = messageDoc.data();
          try {
            const userDocRef = doc(FIRESTORE_DB, 'Users', messageData.sender);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              // Merge messageData and userData
              return { id: messageDoc.id, ...messageData, username: userData.username, avatar: userData.avatar };
            } else {
              return { id: messageDoc.id, ...messageData, username: 'Unknown User', avatar: 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' };
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            // In case of error, you might choose to handle it differently or provide a fallback username.
            return { id: messageDoc.id, ...messageData, username: 'Unknown User' };
          }
        })
      );
      setMessages(messages);
    });
  
    return unsubscribe;
  }, []);
  
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const deleteMessage = async (messageId) => {
    try {
      Alert.alert(
        'Hapus Pesan',
        'Apakah Anda yakin ingin menghapus pesan ini?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Hapus',
            onPress: async () => {
              const msgDocRef = doc(FIRESTORE_DB, `${groupPath}/messages`, messageId);
              await deleteDoc(msgDocRef);
            },
            style: 'destructive', // Warna merah untuk menekankan tindakan penghapusan
          },
        ],
        { cancelable: true } // Pengguna dapat membatalkan alert dengan mengetuk di luar alert
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  
  

  const renderMessage = ({ item, index }: { item: DocumentData; index: number }) => {
    const myMessage = item.sender === auth.currentUser?.uid;
    const currentDate = new Date(item.createdAt?.toDate());
    const prevItem = index > 0 ? messages[index - 1] : null;
    const prevDate = prevItem ? new Date(prevItem.createdAt?.toDate()) : null;
    const isSameDate =
      prevDate &&
      currentDate.getDate() === prevDate.getDate() &&
      currentDate.getMonth() === prevDate.getMonth() &&
      currentDate.getFullYear() === prevDate.getFullYear();
  
    return (
      <View>
        {!isSameDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{currentDate.toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
          </View>
        )}
        <View style={[styles.messageContainer, myMessage ? styles.userMessageContainer : styles.otherMessageContainer]}>
          <View style={{ flexDirection: 'row' }}>
            {myMessage ? null : (
              <Image source={{ uri: item.avatar || 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' }} style={styles.avatar} />
            )}
            <View style={[myMessage ? styles.userMessageContent : styles.otherMessageContent, { marginLeft: 8, marginRight: 8 }]}>
              <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                <Text style={[styles.userName, { color: myMessage ? 'white' : 'black' }]}>{item.username}</Text>
                {myMessage ? (
                  <TouchableOpacity onPress={() => deleteMessage(item.id)} style={styles.deleteButton}>
                    <Icon name={'trash'} size={12} color={'#7E370C'}/>
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text style={[styles.messageText, { color: myMessage ? 'white' : 'black' }]}>{renderTextWithLinks(item.message)}</Text>
              <Text style={[styles.time, { color: myMessage ? 'white' : 'black' }]}>{currentDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            {myMessage ? (
              <Image source={{ uri: item.avatar || 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' }} style={styles.avatar} />
            ) : null}
          </View>
        </View>
      </View>
    );
  };
  
  
  if (!auth.currentUser) {
    return null; // or show a loading screen or a login screen
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? 'height' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? 30 : -30}
      >
        <Text style={styles.header}>Forum Diskusi</Text>
        <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY > 10) {
              setShowScrollToBottomButton(false);
            } else {
              setShowScrollToBottomButton(true);
            }
          }}
        />
        </View>
        {showScrollToBottomButton && (
          <TouchableOpacity
            onPress={scrollToBottom}
            style={[styles.buttonScrollToBottom, { width: width * 0.07, top: height * 0.85, left: width * 0.9, height: width * 0.07, borderRadius: width * 0.07 }]}
          >
            <Icon name={'chevron-down'} size={19} color={'black'} />
          </TouchableOpacity>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Ketik Pesan..."
              placeholderTextColor="#ddd"
              style={styles.messageInput}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Icon style={styles.icon} name="paper-plane" size={20} color="#B05E27" solid={message !== ''} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  messageContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  buttonScrollToBottom:{
    position: 'absolute',
    backgroundColor:'gray',
    alignItems: 'center',
    justifyContent:'center',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  userMessageContent: {
    padding: 10,
    borderRadius: 10,
    minWidth: "40%",
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: "#7E370C",
    backgroundColor: '#B05E27',
  },
  otherMessageContent: {
    padding: 10,
    borderRadius: 10,
    minWidth: "40%",
    maxWidth: '80%',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: "#7E370C",
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  userName: {
    fontSize: 15,
    color: 'black',
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    fontSize: 14,
    color: 'black',
  },
  time: {
    fontSize: 10,
    color: 'black',
    alignSelf: 'flex-end',
  },
  dateContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor:'gray',
    width: '40%',
    borderRadius: 20,
  },
  dateText: {
    fontSize: 10,
    color: 'white',
  },
  title:{
    fontSize: 15,
    color: 'white',
    fontWeight: "bold",
  },
  headerContainer: {
    verticalAlign: "middle",
    backgroundColor: '#7E370C',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff', // Ganti dengan warna latar belakang yang sesuai
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInputContainer: {
    flexDirection: 'row', // Menyusun elemen secara horizontal
    alignItems: 'center', // Menyusun elemen secara vertikal di tengah
  },
  messageInput: {
    flex: 1, // Ini akan membuat TextInput menempati sebanyak mungkin ruang yang tersedia
    color: '#000', // Warna teks
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,

  },
  icon: {
    marginLeft: 10, // Jarak antara TextInput dan tombol
  },

  deleteButton: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForumDiskusi;