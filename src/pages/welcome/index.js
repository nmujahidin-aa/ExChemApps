import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useRef} from 'react'

const Welcome = ({navigation}) => {
  const animationRef = useRef()
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemtro</Text>
      <Image style={styles.image} source={require('../../assets/images/favicon.png')}/>
      <View style={styles.card}>
        <Text style={styles.h2}>Selamat Datang di Chemtro</Text>
        <Text style={styles.p}>Aplikasi Pembelajaran Kimia Materi Elektrokimia</Text>
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.register}>Daftar</Text>
        </TouchableOpacity>
        <Text style={styles.span}>Dengan masuk atau mendaftar, kamu telah menyetujui{" "}
            <View style={styles.inlineLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                <Text style={styles.link}>ketentuan layanan</Text>
                </TouchableOpacity>
                <Text style={{color: '#fff', fontSize: 12}}>{" "}dan{"  "}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                <Text style={styles.link}>privasi</Text>
                </TouchableOpacity>
            </View>
        </Text>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: "#EDE0B3",
        alignItems: 'center',
    },
    header:{
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 60,
        color: '#7E370C',
    },
    image:{
        width: 180,
        height: 180,
    },
    card:{
        flex:1,
        width: '100%',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#B05E27',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingBottom: 20,
    },
    h2:{
        fontWeight: "bold",
        color: "white",
        fontSize: 35,
        paddingHorizontal: 30,
        paddingTop: 50,
        textAlign: "center",
    },
    p:{
        color: '#fff',
        fontSize: 12,
        fontStyle: 'italic',
        paddingHorizontal: 110,
        textAlign: 'center',
        paddingTop: 30,
    },
    btnLogin:{
        backgroundColor: '#fff',
        paddingVertical: 14,
        marginTop: 50,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    login:{
        color: '#B05E27',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 135,
    },
    btnRegister:{
        backgroundColor: '#B05E27',
        paddingVertical: 12,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    register:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 135,
    },
    span: {
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 35,
        color: '#fff',
        paddingTop: 5,
        flexDirection: 'row', // Added to make the links inline
    },
    inlineLinks: {
        flexDirection: 'row',
    },
    link: {
        color: '#00B2FF',
        fontSize: 12,
    },
})