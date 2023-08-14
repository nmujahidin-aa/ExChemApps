import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const ChemtroAI = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemtro AI</Text>
      <WebView style={styles.webview}
        source={{ uri: 'https://mediafiles.botpress.cloud/066de083-ae67-432c-8ece-861e60b195b8/webchat/bot.html' }}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDE0B3",
    width: "100%",
    height: "100%",
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  webview:{
    marginTop: -100,
    backgroundColor: "#EDE0B3",
  },
});

export default ChemtroAI;
