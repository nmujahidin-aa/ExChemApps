import React, {useState, useLayoutEffect} from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { Modal } from '../../../Components/Modal';

const ChemtroAI = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;

  Modal(navigation);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemtro AI</Text>
      {isLoading && (
        <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../../assets/lottie/ai.json')} // Ganti dengan path animasi Anda
          autoPlay
          loop
          style={styles.lottie}
        />
        </View>
      )}
      <WebView
        style={[styles.webview, { display: isLoading ? 'none' : 'flex', width: windowWidth*1.05, }]}
        source={{ uri: 'https://chemtro-ai.netlify.app/' }}
        originWhitelist={['*']}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex:1,
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 220,
    justifyContent: 'center', // Pusat secara vertikal
    alignItems: 'center', // Pusat secara horizontal
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  webview:{
    marginTop: -85,
    backgroundColor: "#fff",
  },
  lottie:{
    width: 200,
    height: 200,
  },
});

export default ChemtroAI;
