import { FlatList, ScrollView, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native'
import React, {useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

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
  const animationRef = useRef()
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
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemtro</Text>
      <ScrollView style={{flex:1}}>

        <View style={styles.row}>
          <View style={{flexDirection: "row",}}>
            <Image source={require("../../../assets/images/foto.png")} style={styles.img}/>
            <View>
              <Text style={styles.text}>Hai, Sobat Chemtro</Text>
              <Text style={styles.text2}>Selamat Datang!</Text>
            </View>         
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
    fontSize: 24,
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
    width: 350,
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
})