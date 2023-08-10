import { StyleSheet, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import InputComponent from '../../../Components/CustomeInput/InputComponent';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../../../../FirebseConfig'
import SweetAlert from 'react-native-sweet-alert';
import Spinner from 'react-native-loading-spinner-overlay';
// Diperlukan jika Anda menggunakan FontAwesome 5 dan belum mengatur secara global di level aplikasi

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;

  const onRegisterPressed = async()=>{
    try{
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // Add user data to Firestore with UID as the document ID
      await setDoc(doc(firestore, 'Users', user.uid), {
        username: username,
        email: user.email,
        uid: user.uid,
        address: "",
        fullname:"",
        phone:"",
        totalPointsPostTest: 0,
        totalPointsPreTest: 0,
      });

      console.log(response);
      navigation.replace("Login");
      SweetAlert.showAlertWithOptions({
        title: "Selamat",
        subTitle: "Pendaftaran Berhasil, Silahkan Login",
        confirmationButtonTitle: "Login",
        style: "success",
        cancellable: false,
      });
    }catch (error){
      setLoading(true);
      if (!email || !password) {
        // Pesan Error
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "Silahkan isi field email dan password",
          confirmButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      } else if(error.code === "auth/email-already-in-use"){
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "Email sudah terdaftar, silahkan gunakan email lain",
          confirmButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      } else if(error.code === "auth/invalid-email"){
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "Masukkan email yang benar",
          confirmButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      } else {
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: error.message,
          confirmButtonTitle: "OK",
          style: "error",
          cancellable: false,
        }); 
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: "#EDE0B3",}}>
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading}/>
        <Image style={styles.image} source={require('../../../assets/images/favicon.png')}/>
        <Text style={styles.p}>Silahkan masuk di sini</Text>
          {/* Text Input Name */}
          <InputComponent value={username} icon={"user"} placeholder="Masukkan Nama" setValue={setUsername}/>
          {/* Text Input Email */}
          <InputComponent value={email} icon={"envelope"} placeholder="Masukkan Email"  setValue={setEmail}/>
          {/* Text Input Email */}
          <InputComponent value={password} icon={"lock"} placeholder="Masukkan Password" secureTextEntry={true} setValue={setPassword}/>
          <TouchableOpacity style={styles.button} onPress={onRegisterPressed}>
            <Text style={styles.btnText}>Daftar</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    image:{
        width: 200,
        height: 200,
        marginTop: 150,
    },
    p:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        paddingTop: 30,
        paddingBottom: 15,
    },
    button:{
      backgroundColor: '#B05E27',
      paddingVertical: 14,
      width: "80%",
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 100,
    },
    btnText:{
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
})