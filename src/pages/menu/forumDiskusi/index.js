import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ForumDiskusi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ForumDiskusi</Text>
      <View style={styles.chat}>
        
        <View style={styles.textinput}>
          <Icon name="image" size={20} color="#ccc"/>
        </View>
        <Icon name="send" size={20} color="#7E370C" />
      </View>
    </View>
  )
}

export default ForumDiskusi

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#EDE0B3",
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  chat:{
    bottom: 0,
    position: 'absolute',
    height: 60,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderColor: "#ccc",
  },
  textinput:{
    height: "90%",
    backgroundColor: "#f0f0f0",
    width: "90%",
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10,
  },
})