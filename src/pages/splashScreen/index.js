import { StyleSheet, Text, Image, View } from 'react-native'
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(()=> {
            navigation.replace('Welcome')
        }, 2000);
    });
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.images} source={require('../../assets/images/favicon.png')}/>
        <Text style={styles.tagline} >Electrochemistry Apps</Text>
        <Text style={styles.text}>Develop By: Chemtro</Text>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDE0B3',
      },
    images: {
        height: 150,
        width: 150,
    },
    text:{
        fontSize: 10,
        color: '#000',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
    },
    tagline:{
        fontSize: 17,
        color: '#7E370C',
        fontWeight: 'bold',
        paddingTop: 20,
        alignItems: 'center',
    }
})