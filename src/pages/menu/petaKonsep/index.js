import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import CustomCarousel from '../../../Components/CustomCarousel'

const PetaKonsep = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Peta Konsep</Text>
      <View style={styles.alert}>
        <Text style={styles.textAlert}>Yuk cari tahu, bagaimana sih peta konsep pembelajaran yang diterapkan oleh Chemtro</Text>
      </View>
      <View style={styles.card}>
        <View style={{ height: height*0.7 }}>
          <CustomCarousel />
        </View>
      </View>
    </View>
  )
}

export default PetaKonsep

const styles = StyleSheet.create({
    header:{
      textAlign: "center",
      fontWeight: "bold",
      paddingVertical: 15,
      backgroundColor: "#7E370C",
      color: "#fff",
    },
    container:{
      backgroundColor: "#EDE0B3",
      flex: 1,
    },
    title:{
      textAlign: "center",
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
      paddingTop: 20,
    },
    image:{
      width: 100,
      alignSelf: "center",
      borderRadius: 10,
    },
    alert:{
      backgroundColor: "#000",
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginTop: 20,
      paddingVertical: 20,
      borderRadius: 5,
      opacity: 1,
    },
    textAlert:{
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    }
    // card:{
    //   backgroundColor: "#fff",
    //   padding: 10,
    // },
})