import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, 
          title: 'Cari Kata',
          image: require("../../../assets/images/games1.png"),
          link: "https://wordwall.net/embed/e6fbc5b883bc4851941a9dfafd54f681?themeId=2&templateId=10&fontStackId=0' width='500' height='380' frameborder='0' allowfullscreen",
        },
        { id: 2, 
          title: 'Teka teki',
          image: require("../../../assets/images/games2.png"),
          link: "https://wordwall.net/embed/2c68e3fd7b2c42ffbd0152c3b4f45fea?themeId=1&templateId=11&fontStackId=0' width='500' height='380' frameborder='0' allowfullscreen"
         },
      ],
    };
  }

  renderCard = ({ item }) => (
    <TouchableOpacity onPress={()=>{Linking.openURL(item.link)}}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image}></Image>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Permainan</Text>
        </View>
        <View>
          <View style={{margin: 10, paddingBottom: 100,}}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderCard}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2} // Mengatur jumlah kolom menjadi 2
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#7E370C",
    paddingVertical: 5,
  },
  textHeader:{
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  text:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 5,
  },
  card: {
    flex: 1, // Mengatur agar kotak memenuhi setengah lebar layar (2 kolom)
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 150, // Ukuran gambar sesuai kebutuhan Anda
    height: 150, // Ukuran gambar sesuai kebutuhan Anda
    resizeMode: 'cover', // Atur sesuai kebutuhan Anda
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Game;
