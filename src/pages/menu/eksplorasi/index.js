import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import data from '../../../data/eksplorasi/data';

const renderData = () => {
  <View style={styles.card}>
    <View style={{flex: 1, padding: 20,}}>
    <LinearTextGradient
      style={{ fontWeight: "900", fontSize: 25,}}
      locations={[0, 1]}
      colors={["#0575E6", "#021B79"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <Text>Pre Test</Text>
    </LinearTextGradient>
      <Text style={styles.description}>Ukur kemampuan awalmu dengan mengerjakan  pre-test ini ya!</Text>
    </View>
    <View >
    <LinearGradient
      colors={['#021B79', '#0575E6']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.logo}
    >
      <Image source={require('../../../assets/images/eksplorasi/pretest.png')} style={{width: 45, height: 45,}}/>
    </LinearGradient>
      </View>
  </View>
}

const Eksplorasi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eksplorasi</Text>
      <Text style={styles.desc}>Di menu Eksplorasi, kita akan menguji kemampuan awalmu, memberikan materi dan melihat perkembanganmu!</Text>
    </View>
  )
}

export default Eksplorasi

const styles = StyleSheet.create({
    header:{
      paddingTop: 20,
      fontWeight: "bold",
      backgroundColor: "#7E370C",
      color: "#fff",
      fontSize: 25,
    },
    container:{
      backgroundColor: "#7E370C",
      flex: 1,
      paddingHorizontal: 15,
    },
    desc:{
      color: "#dfdfdf",
      fontSize: 12,
    },

    card:{
      backgroundColor: "#fff",
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    menu:{
      color: "#000",
      fontWeight: "bold",
      fontSize: 16
    },
    logo:{
      padding: 12, 
      borderBottomLeftRadius: 15, 
      borderTopRightRadius: 4, 
      marginTop: -4, 
      marginRight: -4,
      shadowColor: "#000",
    },
    description:{
      color: "#777",
      fontSize: 12,
      fontWeight: "500",
    },
})