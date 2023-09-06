import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import Accordion from 'react-native-collapsible/Accordion';
import data from '../../../data/question/data';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Help extends Component {
  state = {
    activeSections: [],
  };

  _renderHeader = (section) => {
    return (
      <View>
        <View style={{backgroundColor: "#777", width: "100%", height: 0.5, marginVertical: 5,}}/>
        <View style={styles.question}>
          <Text style={styles.questionText}>{section.title}</Text>
          <Icon name="chevron-down"/>
        </View>
        
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pusat Bantuan</Text>
        <View style={[styles.hero, {height: windowHeight*0.17}]}>
          <Text style={styles.text}>Halo, ada yang bisa kami bantu?</Text>
          <Text style={styles.text1}>Silahkan pilih topik bantuan yang diinginkan</Text>
        </View>
        <View style={[styles.card, {width: windowWidth*0.9, height: windowHeight*0.16, marginTop: -windowHeight*0.08}]}>
          
          <TouchableOpacity activeOpacity={0.7} style={styles.menu}>
            <Icon name="info-circle" size={30} color="#B05E27"/>
            <Text style={styles.textMenu}>Tentang Chemtro</Text>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={0.7} style={styles.menu}>
            <Icon name="user" size={30} color="#B05E27"/>
            <Text style={styles.textMenu}>Akun & Profil</Text>
          </TouchableOpacity>
  
          <TouchableOpacity activeOpacity={0.7} style={styles.menu}>
            <Icon name="flask" size={30} color="#B05E27"/>
            <Text style={styles.textMenu}>Fitur Aplikasi</Text>
          </TouchableOpacity>
  
        </View>
        <View style={[styles.faq, {width: windowWidth*0.9}]}>
          <Text style={{color: "#000", fontWeight: "400", paddingVertical: 13,}}>Pertanyaan Populer</Text>
          <View style={styles.card2}>
          <Text>Mungkin kamu juga menanyakan hal yang sama.</Text>
            <Accordion
              sections={data}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              sectionContainerStyle={styles.activeAccordion} 
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Help

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    backgroundColor: "#7E370C",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding:10,
    textAlign: "center",
  },
  hero:{
    backgroundColor: "#7E370C"
  },
  text:{
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  text1:{
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
  },
  card:{
    backgroundColor: "#fff",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  menu:{
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textMenu:{
    textAlign: "center",
    fontSize: 11,
    color: "#000",
    width: 50,
  },
  faq:{
    width: "100%",
    alignSelf: "center",
    borderRadius: 6,
  },
  card2:{
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
  },
  question:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionText:{
    fontSize: 15,
    color: "#000",
    flex: 1,
  },
  content:{
    marginVertical: 3,
    backgroundColor: "#ddd",
    padding: 5,
  },
  activeAccordion: {
    backgroundColor: "#fff", // Ganti dengan warna yang Anda inginkan
  },
})