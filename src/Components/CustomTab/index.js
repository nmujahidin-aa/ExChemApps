import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

const CustomTab = ({icon, menu}) => {
  return (
    <View style={styles.bg}>
        <Icon name="home" style={{color: focused ? "#7E370C" : "#fff", fontSize: 20,}} />
        <Text style={{color: focused ? "#7E370C" : "#fff", fontSize: 12,}}>Home</Text>
    </View>
  )
}

export default CustomTab

const styles = StyleSheet.create({
  bg:{
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#000", 
    flex: 1, 
    width: "100%",
  }
})