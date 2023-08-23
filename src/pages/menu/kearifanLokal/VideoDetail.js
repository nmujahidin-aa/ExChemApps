import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { FIRESTORE_DB } from '../../../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const VideoDetail = ({ route }) => {
  const [video, setVideo] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoId = route.params.videoId;
        const videoRef = doc(FIRESTORE_DB, 'KearifanLokal', videoId); // Adjust the path as needed
        const videoSnapshot = await getDoc(videoRef);

        if (videoSnapshot.exists()) {
          const videoData = videoSnapshot.data();
          setVideo(videoData);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [route.params.videoId]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!video) {
    return (
      <View style={styles.container}>
        <SkeletonPlaceholder>
          <View style={styles.videoContainer}>
            <View style={styles.thumbnail} />
            <View style={styles.titleSkeleton} />
            <View style={styles.descriptionSkeleton} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  const videoUrlParts = video.videoUrl.split('v=');
  const videoId = videoUrlParts.length === 2 ? videoUrlParts[1] : '';

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={220}
        videoId={videoId}
      />
      <ScrollView>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.description}>
        {video.description.length > 100
            ? showFullDescription
                ? video.description
                : `${video.description.slice(0, 100)}... `
            : video.description}
        {video.description.length > 100 && (
            <Text
                style={styles.readMore}
                onPress={toggleDescription}
            >
                {showFullDescription ? ' Lebih sedikit' : 'Lebih banyak'}
            </Text>
        )}
        </Text>
        <Text style={styles.description}>(sumber: {video.sumber})</Text>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading:{
    textAlign: "center",
    paddingTop: 250,
    color: "#000",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginVertical: 10,
    paddingHorizontal: 20,
    color: "#000",
  },
  description: {
    fontSize: 13,
    paddingHorizontal: 20,
    paddingBottom: 20,
    textAlign: "justify",
    color: "#777",
  },
  readMore: {
    color: 'blue',
    fontWeight: "bold",
  },
  titleSkeleton: {
    backgroundColor: '#ddd',
    height: 220,
    marginVertical: 10,
  },
  descriptionSkeleton: {
    backgroundColor: '#ddd',
    height: 10,
    marginVertical: 30,
  },
});

export default VideoDetail;
