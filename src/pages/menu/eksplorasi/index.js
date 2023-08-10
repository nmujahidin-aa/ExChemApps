import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Eksplorasi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eksplorasi</Text>

    </View>
  )
}

export default Eksplorasi

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
})