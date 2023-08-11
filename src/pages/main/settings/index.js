import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../../../FirebseConfig'
import { signOut } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { CustomTouchable } from '../../../Components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';

const Settings = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const halfCircleHeight = 100;

  const auth = FIREBASE_AUTH;
  const showConfirmLogout = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin keluar?',
      [
        {text: 'Batal', style: 'cancel'},
        {text: 'Ya', onPress: Logout},
      ]
    );
  };

  const Logout = () => {
    signOut(auth).then(() => navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: "Welcome"}],
      })
    ))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Akun</Text>
      <ScrollView>
      <View style={[styles.rectangle, { width: screenWidth }]}>
        <Image source={require("../../../assets/images/team/idin.jpg")} style={styles.image}/>
        <Text style={styles.text}>Nur Mujahidin Achmad Akbar</Text>
        <Text style={styles.textemail}>nur.mujahidin.2105336@students.um.ac.id</Text>
      </View>
      <Svg width={screenWidth} height={halfCircleHeight} viewBox={`0 0 ${screenWidth} ${halfCircleHeight}`} style={styles.halfCircle}>
        <Path
          d={`M0,0 Q${screenWidth / 2},${halfCircleHeight} ${screenWidth},0 Z`}
          fill="#7E370C"
        />
      </Svg>


      <View style={{paddingHorizontal: 10, marginBottom: 100,}}>
        <Text style={styles.texttitle}>Akun dan Keamanan</Text>
        <View style={styles.card}>
          <CustomTouchable icon="user-circle" text="Akun" 
          // menu={() => navigation.navigate('ForumDiskusi')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="star" text="Akses Premium" 
          // menu={() => navigation.navigate('ForumDiskusi')}
          />
        </View>

        <Text style={styles.texttitle}>Bantuan</Text>
        <View style={styles.card}>
          <CustomTouchable icon="briefcase" text="Bantuan" 
          // menu={() => navigation.navigate('ForumDiskusi')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="info-circle" text="Tentang Kami" 
          // menu={() => navigation.navigate('ForumDiskusi')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="phone-square" text="Hubungi Kami" 
          // menu={() => navigation.navigate('ForumDiskusi')}
          />
        </View>

        <Text style={styles.texttitle}>Perusahaan</Text>
        <View style={styles.card}>
          <CustomTouchable icon="building-o" text="Ketentuan Layanan" 
          menu={() => navigation.navigate('Terms')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="building-o" text="Kebijkan Privasi" 
          menu={() => navigation.navigate('Privacy')}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={showConfirmLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({ 
  container:{
    backgroundColor: "#EDE0B3",
    flex:1,
    position: "relative",
  },
  header:{
    backgroundColor: '#7E370C',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  logout:{
    paddingVertical: 12,
    backgroundColor: "#B05E27",
    borderRadius: 5,
  },
  logoutText:{
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  rectangle: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: '#7E370C',
    justifyContent: "center",
    alignItems: "center",
  },
  halfCircle:{
    marginTop: -0.2,
  },
  profile:{
    marginVertical: 15,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, 
  },
  row:{
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  image:{
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name:{
    flexWrap: "wrap",
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
  card:{
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  text:{
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  textemail:{
    fontWeight: "bold",
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
  },
  texttitle:{
    fontWeight: "bold", 
    paddingHorizontal: 10, 
    marginBottom: 5,
  }
})