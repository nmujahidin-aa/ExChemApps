import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {FIRESTORE_DB} from '../../../../FirebaseConfig';
import { collection, onSnapshot} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const VideoListItem = ({ video, onPress }) => {
  let videoId = '';

  if (video && video.videoUrl) {
    const videoUrlParts = video.videoUrl.split('v=');
    if (videoUrlParts.length === 2) {
      videoId = videoUrlParts[1];
    }
  }

  return (
    
      <View style={styles.videoContainer}>
          <Image
            style={[
              styles.thumbnail,
              { aspectRatio: 16 / 9 }, // Set aspect ratio to 16:9
            ]}
            source={{ uri: video.imageUrl }} // Ubah 'imageUrl' sesuai dengan properti yang mengandung URL gambar
          />
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Text style={styles.title}>{video.title}</Text>
          </TouchableOpacity>
      </View>
    
  );
};


const KearifanLokal = () => {
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const videosRef = collection(FIRESTORE_DB, 'KearifanLokal'); // Adjust this path as needed
  
    const unsubscribe = onSnapshot(videosRef, (snapshot) => {
      const videos = [];
      snapshot.forEach((doc) => {
        const videoData = doc.data();
        videos.push({ id: doc.id, ...videoData });
      });
      setVideoList(videos);
    });
  
    return () => {
      unsubscribe(); // Unsubscribe when the component is unmounted
    };
  }, []);  

  const handleVideoPress = (videoId) => {
    navigation.navigate('VideoDetail', { videoId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kearifan Lokal</Text>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoListItem video={item} onPress={() => handleVideoPress(item.id)} />
        )}
      />
    </View>
  );
};

export default KearifanLokal

const styles = StyleSheet.create({
    header:{
      textAlign: "center",
      fontWeight: "bold",
      paddingVertical: 15,
      backgroundColor: "#7E370C",
      color: "#fff",
    },
    container:{
      backgroundColor: "#EDE0B3",
      flex: 1,
    },
    videoContainer:{
      marginBottom: 7,
      marginHorizontal: 10,
      marginTop: 10,
      backgroundColor: "#fff",
      paddingBottom: 5,
      borderRadius: 5,
      padding: 5,
    },
    thumbnail:{
      width: '100%',
      borderRadius: 5,
    },
    title:{
      color: "#fff",
      fontSize: 15,
      fontWeight: "bold",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#7E370C",
      marginTop: 5,
      textAlign: "center",
      borderRadius: 5,
    },
    description:{
      color: "#777",
      fontSize: 12,
      paddingHorizontal: 10,
    },
    descriptionLoad:{
      borderRadius: 10,
      paddingHorizontal: 10,
      marginTop: 10,
    }
});