import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const Contact = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.body}>
      <View style={[styles.hero, {height: windowHeight*0.25}]}>
        <Text style={styles.textHero}>Hubungi Kami</Text>
      </View>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  body:{
    flex: 1,
  },
  hero:{
    backgroundColor: "#7E370C",
    justifyContent: "center",
    alignItems: "center",
  },
  textHero:{
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
  },
})