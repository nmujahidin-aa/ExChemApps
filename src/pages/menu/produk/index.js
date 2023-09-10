import { StyleSheet, Text, View, useWindowDimensions, Image, Linking, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Link = [
  {
    title: "chemtropkmk",
    image: require("../../../assets/images/produk/shopee.png"),
    link: "https://shopee/shope/chemtropkmk",
    
  },
  {
    title: "CHEMTRO",
    image: require("../../../assets/images/produk/lazada.png"),
    link: "https://lazada/market/chemtro",
  },
  {
    title: "CHEMTRO",
    image: require("../../../assets/images/produk/tokopedia.png"),
    link: "https://tokopedia/market/chemtro",
    
  },
  {
    title: "Chemtro Pkmk",
    image: require("../../../assets/images/produk/facebook.png"),
    link: "https://www.facebook.com/profile.php?id=100094429196859&mibextid=ZbWKwL",
  },
  {
    title: "chemtro.netlify.app",
    image: require("../../../assets/images/produk/website.png"),
    link: "https://chemtro.netlify.app/",
    
  },
]


const Produk = () => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();

  const renderCard = ({item}) => {
    return (
      <View style={[styles.card, { width: width * 0.9 }]}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.imageCard} source={item.image} />
          <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textLink} onPress={() => Linking.openURL(item.link)}>kunjungi</Text>
          </View>
        </View>
      </View>
    );
  }
  
  
  return (
    <View>
      <Text style={styles.header}>Produk</Text>
      <LinearGradient
      style={[styles.container, { width: width * 0.9, height: height * 0.3 }]}
      colors={["#EBA403", "#7E370C"]}
      start={{ x: 0.4, y: -0.3 }}
      end={{ x: 0.5, y: 1.3 }}
      >
        <Image style={styles.image} source={require('../../../assets/images/hero.png')} />
      </LinearGradient>
      <Text style={styles.text}>Dapatkan produk kami di:</Text>
      <FlatList
        style={{ height: height * 0.52 }}
        data={Link}
        renderItem={renderCard}
      />
    </View>
  )
}

export default Produk

const styles = StyleSheet.create({
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  container:{
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: 205,
    height: 205,
  },
  text:{
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 5,
  },
  card:{
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imageCard:{
    width: 50,
    height: 50,
  },
  textTitle:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    fontStyle: "italic",
  },
  textLink:{
    fontSize: 12,
    color: "#03c",
    fontStyle: "italic",
  },
})