import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import InputComponent from '../../../Components/CustomeInput/InputComponent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {FIREBASE_AUTH} from '../../../../FirebseConfig'
import SweetAlert from 'react-native-sweet-alert';
import Spinner from 'react-native-loading-spinner-overlay';

// Diperlukan jika Anda menggunakan FontAwesome 5 dan belum mengatur secara global di level aplikasi

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const onLoginPressed = async () => {
    if (!email || !password) {
      SweetAlert.showAlertWithOptions({
        title: "Gagal",
        subTitle: "Tolong isi field email dan password",
        style: "error",
        cancellable: false,
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.reset({
        index: 0,
        routes: [{name: "MainApp"}],
      });
      SweetAlert.showAlertWithOptions({
        title: "Sukses",
        subTitle: "Login Berhasil",
        confirmationButtonTitle: "OK",
        style: "success",
        cancellable: false,
      });
    }catch(error){
      setLoading(true);
      if (error.code === 'auth/invalid-email') {
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "Masukkan Email yang valid",
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
      else if (error.code === 'auth/user-not-found') {
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "User tidak ditemukan",
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
      else if (error.code === 'auth/wrong-password') {
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: "Email atau Password yang anda inputkan salah",
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
      else if (error.code === 'auth/network-request-failed') {
        SweetAlert.showAlertWithOptions({
          title: "Tidak ada sambungan",
          subTitle: "Sepertinya perangkat kamu tidak terhubung ke internet ya.",
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
      else if (error.code === 'auth/too-many-requests') {
        SweetAlert.showAlertWithOptions({
          title: "Terlalu banyak upaya login",
          subTitle: "Silahkan melakukan reset password, untuk menghindari penyalahgunaan akun anda.(hubungi official chemtro: @chemtro.pkmk)",
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
      else{
        SweetAlert.showAlertWithOptions({
          title: "Gagal",
          subTitle: error.message,
          confirmationButtonTitle: "OK",
          style: "error",
          cancellable: false,
        });
      }
    }
    finally {
      setLoading(false);
    }
  }

  

  return (
    <ScrollView style={{flex: 1, backgroundColor: "#EDE0B3",}}>
      <View style={styles.container}>
      <Spinner visible={loading}/>
      <Image style={styles.image} source={require('../../../assets/images/favicon.png')}/>
      <Text style={styles.p}>Silahkan masuk di sini</Text>
      <KeyboardAvoidingView behavior='padding's>
        {/* Text Input Email */}
        <InputComponent value={email} icon={"envelope"} placeholder="Masukkan Email" setValue={setEmail}/>
        {/* Text Input Email */}
        <InputComponent value={password} icon={"lock"} placeholder="Masukkan Password" secureTextEntry={true} setValue={setPassword}/>
        <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
          <Text style={styles.btnText}>Masuk</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

export default Login

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