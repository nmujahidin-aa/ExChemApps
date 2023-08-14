import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';

const ChemtroAI = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        style={[styles.webview, { display: isLoading ? 'none' : 'flex' }]}
        source={{ uri: 'https://mediafiles.botpress.cloud/d12f06b8-0f4b-4df2-ad9f-e4a515bcd309/webchat/bot.html' }}
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
    marginTop: -80,
    backgroundColor: "#fff",
    flex: 1,
  },
  lottie:{
    width: 200,
    height: 200,
  },
});

export default ChemtroAI;
