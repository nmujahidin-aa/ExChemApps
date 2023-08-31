import { FlatList, ScrollView, StyleSheet, Text, View, Image, Linking, TouchableOpacity, StatusBar, Animated, ActivityIndicator, RefreshControl } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const Link = [
  {
    image: require("../../../assets/images/instagram.png"),
    link: "https://www.instagram.com/chemtro.pkmk/?igshid=MzRlODBiNWFlZA==",
    
  },
  {
    image: require("../../../assets/images/yt.png"),
    link: "https://www.youtube.com/@ChemtroPkmk",
  }
]


const renderImage = ({ item }) => (
  <View style={styles.main}>
    <TouchableOpacity activeOpacity={0.7} onPress={()=>{Linking.openURL(item.link)}}>
      <Image source={item.image} style={{borderRadius: 10, height: 120, width: 340,}}/>
    </TouchableOpacity>
  </View>
);

const MenuComponent = ({ imageSource, text, onPress  }) => {
  const animationRef = useRef();
  return (
    <View style={{paddingTop: 15,}}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.menuContainer}>
        <View style={styles.menuIconContainer}>
          <Image source={imageSource} style={styles.menuIcon} />
        </View>
      </TouchableOpacity>
      <Text style={styles.menuText}>{text}</Text>
    </View>
  );
};


const Home = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


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
          });
        }
      }
    } catch (error) {
      console.log('Error refreshing data:', error);
    }
    
    setIsLoading(false);
    setRefreshing(false);
  };


  useEffect(() => {
    StatusBar.setBackgroundColor('#7E370C'); 
    StatusBar.setBarStyle('light-content');

    const fetchUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Tambahkan penundaan sebelum mengatur username
          setTimeout(() => {
            setUsername(userData.username);
            setAvatar(userData.avatar);
            setIsLoading(false); // Setelah data dimuat, ubah isLoading menjadi false
          }, 2000); // Contoh delay 2 detik
        }
      }
    };
  
    fetchUserData();
    
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemtro</Text>
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
        <View style={styles.row}>
          <View style={{flexDirection: "row",}}>
          {isLoading ? (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  <SkeletonPlaceholder.Item width={40} height={40} borderRadius={50} />
                  <SkeletonPlaceholder.Item marginLeft={10}>
                    <SkeletonPlaceholder.Item width={120} height={10} />
                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
              ) : (
              <>
            <Image style={styles.img} source={{ uri: avatar || 'https://firebasestorage.googleapis.com/v0/b/chemtro-edf06.appspot.com/o/avatar.png?alt=media&token=ce6d872a-b2db-48e0-927c-d642dd072302' }} />

            <View>
              <Text style={styles.text}>Hai, {username}</Text>
              <Text style={styles.text2}>Selamat Datang!</Text>
            </View>  
            </>
            )}       
          </View>
          <View>
            <Icon style={{paddingTop: 4,}} name="bell" size={20} color="#fff" />
          </View>
        </View>

        <View style={styles.main}>
          <FlatList
            horizontal
            data={Link}
            renderItem={renderImage}
          />

          {/* Menu Chemtro*/}
          <View style={styles.card}>
            <Text style={styles.titleCard}>Menu Chemtro</Text>
            <View style={styles.hay}>
              {/* Kearifan Lokal Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/1.png')} 
                text="Kearifan Lokal" 
                onPress={() => navigation.navigate('KearifanLokal')}
              />
              <View style={styles.menuSpacing} />
              {/* Kearifan Lokal End */}

              {/* Kompetensi Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/2.png')} 
                text="Kompetensi" 
                onPress={() => navigation.navigate('Kompetensi')}
              />
              <View style={styles.menuSpacing} />
              {/* Kompetensi End */}

              {/* Peta Konsep Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/3.png')} 
                text="Peta Konsep" 
                onPress={() => navigation.navigate('PetaKonsep')}
              />
              {/* Peta Konsep End */}
            </View>
            <View style={styles.hay}>
              {/* Eksplorasi Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/4.png')} 
                text=" Eksplorasi " 
                onPress={() => navigation.navigate('Eksplorasi')
              }/>
              <View style={styles.menuSpacing} />
              {/* Eksplorasi End */}

              {/* Forum Diskusi Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/5.png')} 
                text=" Forum Diskusi " 
                onPress={() => navigation.navigate('ForumDiskusi')}
              />
              <View style={styles.menuSpacing} />
              {/* Forum Diskusi End */}

              {/* Scan AR Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/6.png')} 
                text=" Scan AR " 
                onPress={() => navigation.navigate('ScanAR')}
              />
              {/* Scan AR End */}
            </View>
          </View>
          {/* End Menu Chemtro */}

          {/* Chemtro AI */}
          <View style={styles.main}>
            <TouchableOpacity activeOpacity={0.7} onPress={()=> navigation.navigate('ChemtroAI')}>
              <Image source={require('../../../assets/images/AI.png')} style={styles.chemtroai}/>
            </TouchableOpacity>
          </View>
          {/* End of Chemtro Ai */}

          {/* Card for menu 2 */}
          <View style={styles.card2}>
            <Text style={styles.titleCard}>Menu Informasi</Text>
            <View style={styles.hay}>
              {/* Info Pengembang Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/7.png')} 
                text="Info Pengembang" 
                onPress={() => navigation.navigate('InfoPengembang')}
              />
              <View style={styles.menuSpacing} />
              {/* Info Pengembang End */}

              {/* Produk Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/8.png')} 
                text=" Produk " 
                onPress={() => navigation.navigate('Produk')}
              />
              <View style={styles.menuSpacing} />
              {/* Produk End */}

              {/* Produk Start */}
              <MenuComponent 
                imageSource={require('../../../assets/images/menu/9.png')} 
                text="Petunjuk Media" 
                onPress={() => navigation.navigate('PetunjukMedia')}
              />
              {/* Produk End */}
            </View>
          </View>
          {/* End of Card menu 2 */}


        </View>

      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#B05E27",
    flex:1,
    position: "relative",
  },
  header:{
    backgroundColor: '#7E370C',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
  },
  main:{
    flex: 1,
    backgroundColor: "#EDE0B3",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  text:{
    color: "#fff",
    fontWeight: 'bold',
    paddingTop: 3,
    fontSize: 13,
  },
  text2:{
    color: "#fff",
    fontSize: 10,
    marginTop: -1,
  },
  img:{
    height: 40,
    width: 40,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 2,
    marginRight: 10,
  },
  card:{
    flex:1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    paddingBottom: 35,
  },
  titleCard:{
    textAlign: "center",
    fontSize: 16,
    color: "#7E370C",
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  rowMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },



  hay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  menuText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: "#7E370C",
  },
  menuSpacing: {
    marginHorizontal: 17,
  },


  chemtroai:{
    marginTop: 15,
    borderRadius: 10, 
    height: 125, 
    width: "100%",
  },

  card2:{
    flex:1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    paddingBottom: 35,
    marginBottom: 100,
  },

  lottieAnimation:{
    width: 30,
    aspectRatio: 2,
    borderRadius: 20,
  },
  
})