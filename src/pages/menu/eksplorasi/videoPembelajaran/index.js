import { StyleSheet, Text, View, Image, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'

const VideoPembelajaran = () => {
  const Dimensions = useWindowDimensions;
  return (
    <View>
      <View style={styles.card}>
        <View style={{flexDirection: "row"}}>
          <Image style={[styles.image, {width: useWindowDimensions*0.1}]} source={require('../../../../assets/images/team/idin.jpg')} />
          <View>
            <Text>Hayyyy</Text>
            <Text>Hayyyy</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default VideoPembelajaran

const styles = StyleSheet.create({
  card:{
    backgroundColor: "#fff",
  }
})