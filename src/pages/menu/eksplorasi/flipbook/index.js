import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const Flipbook = () => {

  return (
    <View style={styles.container}>
      <WebView style={styles.webview}
        source={{ uri: 'https://online.flipbuilder.com/lmnrx/jsau/' }}
        // source={{ uri: 'https://wordwall.net/id/embed/3f981ec66d774b988042012956a7747f?themeId=41&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen' }}
        originWhitelist={['*']}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  webview:{
    flex: 1,
  },
});

export default Flipbook;