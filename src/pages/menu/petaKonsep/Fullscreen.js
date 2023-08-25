import React,{useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
const Fullscreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [visible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
    <ReactNativeZoomableView
      maxZoom={1.5}
      minZoom={0.5}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
      //onZoomAfter={this.logOutZoomState}
      style={{
        padding: 20,
        backgroundColor: '#000',
      }}
    >
      <Image 
        style={{ flex: 1, width: null, height: '100%' }}
        source={image}
        resizeMode="contain" 
      />
    </ReactNativeZoomableView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Fullscreen;