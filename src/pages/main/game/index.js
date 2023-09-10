// import { StyleSheet, Text, TextInput, View , Dimensions, Image} from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Link = [
//   {
//     id:1,
//     link: "https://wordwall.net/id/embed/3f981ec66d774b988042012956a7747f?themeId=41&templateId=46&fontStackId=0' width='500' height='380' frameborder='0' allowfullscreen",
//     title: "WordWall",
//     description: "yaa jadi ini juga sebuah permainan jika diklik bisa muncul mainannya gitu lah pokok e",
//   },
//   {
//     id:2,
//     link: "https://wordwall.net/id/embed/3f981ec66d774b988042012956a7747f?themeId=41&templateId=46&fontStackId=0' width='500' height='380' frameborder='0' allowfullscreen",
//     title: "Tak bisa ber word-word",
//     description: "yaa jadi ini juga sebuah permainan jika diklik bisa muncul mainannya gitu lah pokok e",
//   },
// ]

// const Game = () => {
//   const width = Dimensions.get('window').width;
//   const height = Dimensions.get('window').height;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Teman Chemtro</Text>
//       <View style={styles.hero}>
//         <View style={styles.search}>
//           <TextInput
//             placeholder='Cari teman anda'
//             style={styles.textInput}
//           />
//           <View style={styles.viewIcon}>
//             <Icon name="search" size={18} color="#000"/>
//           </View>
//         </View>
//       </View>
//       <View style={{flexDirection: "row", justifyContent: "space-around"}}>
//         <View style={[styles.card, {width: width*0.45}]}>
//           <View style={{justifyContent: "center", paddingHorizontal: 10,}}> 
//             <Image style={styles.image} source={require('../../../assets/images/team/idin.jpg')}/>
//           </View>
//           <Text style={styles.textCard}>Hayyyyyyy</Text>
//         </View>
//         <View style={[styles.card, {width: width*0.5, maxWidth: width*0.1, }]}>
//           <View style={{justifyContent: "center", paddingHorizontal: 20,}}> 
//             <Image style={styles.image} source={require('../../../assets/images/team/idin.jpg')}/>
//           </View>
//           <Text style={styles.textCard}>Hayyyyyyy</Text>
//         </View>
//         <View style={[styles.card, {width: width*0.5}]}>
//           <View style={{justifyContent: "center", paddingHorizontal: 20,}}> 
//             <Image style={styles.image} source={require('../../../assets/images/team/idin.jpg')}/>
//           </View>
//           <Text style={styles.textCard}>Hayyyyyyy</Text>
//         </View>
//       </View>
//     </View>
//   )
// }

// export default Game

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     backgroundColor: "#EDE0B3",
//   },
//   header:{
//     backgroundColor: '#7E370C',
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 10,
//   },
//   hero:{
//     backgroundColor: "#7E370C",
//   },
//   search:{
//     alignSelf: "center",
//     width: "90%",
//     backgroundColor: "#fff",
//     height: 40,
//     marginTop: 10,
//     marginBottom: 20,
//     borderRadius: 50,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   textInput:{
//     paddingHorizontal: 20,
//   },
//   viewIcon:{
//     backgroundColor: "#ccc",
//     height: 40,
//     width: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopRightRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   card:{
//     backgroundColor: "#fff",
//     height: 100,
//     alignSelf: "center",
//     marginVertical: 10,
//     borderRadius: 6,
//     flexDirection: "row",
//     borderWidth: 0.5,
//     borderColor: "#000",
//   },
//   image:{
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
//   textCard:{
//     textAlignVertical: "center",
//     fontWeight: "bold",
//     color: "#000",
//     fontSize: 20,
//   },
//   icon2:{
//     backgroundColor: "#ie5878",
//     width: 100,
//     height: 25,
//     textAlignVertical: "center",
//     paddingHorizontal: 5,
//     borderRadius: 10,
//     marginTop: 10,
//   },
// })


import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, title: 'Game 1' },
        { id: 2, title: 'Game 2' },
        { id: 3, title: 'Game 3' },
        { id: 4, title: 'Game 4' },
        { id: 5, title: 'Game 5' },
        { id: 6, title: 'Game 6' },
        { id: 7, title: 'Game 7' },
        // Tambahkan data lain sesuai kebutuhan Anda
      ],
    };
  }

  renderCard = ({ item }) => (
    
      <View style={styles.card}>
        <Text>{item.title}</Text>
      </View>
    
  );

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Permainan</Text>
        </View>
        <ScrollView>
          <View style={styles.searchbar}>
            <View style={styles.search}>
            <TextInput
              placeholder='Cari permainan'
              style={styles.textInput}
            />
              <Icon style={styles.icon} name="search" color="#000" size={20}/>
            </View>
          </View>
          <View style={{margin: 10, paddingBottom: 100,}}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderCard}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2} // Mengatur jumlah kolom menjadi 2
            />
          </View>
        </ScrollView>
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
  searchbar:{
    backgroundColor: "#7E370C",
    paddingVertical: 10,
  },
  search:{
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: screenWidth*0.95,
    alignSelf: "center",
    borderRadius: 100,
    flex: 1,
  },
  textInput:{
    paddingHorizontal: 20,
    width: "85%",
  },
  icon:{
    backgroundColor: "#ccc",
    textAlignVertical: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  card: {
    width: screenWidth / 2, // Setengah dari lebar layar
    height: 200, // Sesuaikan tinggi kartu sesuai kebutuhan Anda
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Game;
