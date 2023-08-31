import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Image, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { CustomTouchable } from '../../../Components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Settings = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const halfCircleHeight = 100;
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;


  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
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

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserData({
            username: userData.username,
            email: user.email,
          });
        }
      }
    } catch (error) {
      console.log('Error refreshing data:', error);
    }

    setIsLoading(false);
    setRefreshing(false);
  };
  


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userDocRef = doc(FIRESTORE_DB, 'Users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setUserData({
                    avatar: userData.avatar,
                    username: userData.username,
                    email: user.email,
                });
                console.log(userData.avatar);
                setIsLoading(false); // Setelah data dimuat, ubah isLoading menjadi false
            }
        }
    };

    fetchUserData();
  }, [refreshing]);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Akun</Text>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#7E370C']} // Customize the loading indicator color
          />
        }
      >
      <View style={[styles.rectangle, { width: screenWidth }]}>
        {isLoading ? (
          <SkeletonPlaceholder borderRadius={4}>
            <View style={{alignItems: 'center'}}>
              <View>
                <Image source={require("../../../assets/images/avatar.png")} style={styles.image}/>
                <Text style={{marginTop: 6, fontSize: 14, lineHeight: 14,}}></Text>
                <Text style={{marginTop: 6, fontSize: 14, lineHeight: 14,}}></Text>
              </View>
            </View>
          </SkeletonPlaceholder>
          ) : (
          <>
          <Image style={styles.image} source={{ uri: userData.avatar || 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' }} />
            <Text style={styles.text}>{userData && userData.username}</Text>
            <Text style={styles.textemail}>{userData && userData.email}</Text>
          </>
        )}
      </View>
      <Svg width={screenWidth} height={halfCircleHeight} viewBox={`0 0 ${screenWidth} ${halfCircleHeight}`} style={styles.halfCircle}>
        <Path
          d={`M0,0 Q${screenWidth / 2},${halfCircleHeight} ${screenWidth},0 Z`}
          fill="#7E370C"
        />
      </Svg>


      <View style={{paddingHorizontal: 10, marginBottom: 100, marginTop: -20,}}>
        <Text style={styles.texttitle}>Akun dan Keamanan</Text>
        <View style={styles.card}>
          <CustomTouchable icon="user-circle" text="Akun" 
          menu={() => navigation.navigate('Account')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="star" text="Akses Premium" 
          menu={() => navigation.navigate('Premium')}
          />
        </View>

        <Text style={styles.texttitle}>Bantuan</Text>
        <View style={styles.card}>
          <CustomTouchable icon="briefcase" text="Bantuan" 
          menu={() => navigation.navigate('Help')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="info-circle" text="Tentang Kami" 
          menu={() => navigation.navigate('About')}
          />
          <View style={{backgroundColor: "#ccc", height: 1.5,}}/>
          <CustomTouchable icon="phone-square" text="Hubungi Kami" 
          menu={() => navigation.navigate('Contact')}
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
    paddingTop: 10,
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
    color: "#747474",
  }
})