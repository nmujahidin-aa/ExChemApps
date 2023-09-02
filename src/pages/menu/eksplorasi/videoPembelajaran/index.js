import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { FIRESTORE_DB } from '../../../../../FirebaseConfig';
import { collection, onSnapshot} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const VideoListItem = ({ video, onPress }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let videoId = '';

  if (video && video.videoUrl) {
    const videoUrlParts = video.videoUrl.split('v=');
    if (videoUrlParts.length === 2) {
      videoId = videoUrlParts[1];
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <View style={styles.card}>
      <View style={{flexDirection: "row"}}>
        <Image style={[styles.image, {width: windowWidth*0.34, height: windowHeight*0.12}]} source={{uri: video.thumbnail}} />
        <View style={{flex:1,}}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.sumber}>(Sumber: {video.sumber})</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const VideoPembelajaran = () => {
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const videosRef = collection(FIRESTORE_DB, 'Video Pembelajaran'); // Adjust this path as needed
  
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
    navigation.navigate('VideoPembelajaranDetail', { videoId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Video Pembelajaran</Text>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoListItem video={item} onPress={() => handleVideoPress(item.id)} />
        )}
      />
    </View>
  );
}

export default VideoPembelajaran

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  card:{
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  image:{
    borderRadius: 2,
  },
  title:{
    paddingHorizontal: 15,
    fontWeight: "600",
    color: "#000",
    fontSize: 13,
    textAlign: 'left',
  },
  sumber:{
    paddingHorizontal: 15,
    fontSize: 12,
    bottom: 0,
    paddingTop: 20,
    color: "#777",
    fontWeight: "bold",
  }
})