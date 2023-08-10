import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as pages from '../pages';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = ({navigation}) => {
  return(
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle:{
      backgroundColor: '#EBA403',
      position: 'absolute',
      // Max Height
      height: 65,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset:{
        width: 10,
        height: 10,
        } 
      }
    }}>
      
      <Tab.Screen name="Home" component={pages.main.Home} options={{
        tabBarIcon: ({focused})=>(
          <View style={styles.bg}>
              <Icon name="home" style={{color: focused ? "#7E370C" : "#fff", fontSize: 20,}} />
              <Text style={{color: focused ? "#7E370C" : "#fff", fontSize: 12,}}>Beranda</Text>
          </View>
        )
      }}/>

      <Tab.Screen name="Friend" component={pages.main.Friend} options={{
        tabBarIcon: ({focused})=>(
          <View style={styles.bg}>
              <Icon name="users" style={{color: focused ? "#7E370C" : "#fff", fontSize: 20,}} />
              <Text style={{color: focused ? "#7E370C" : "#fff", fontSize: 12,}}>Teman</Text>
          </View>
        )
      }}/>

      <Tab.Screen name="Settings" component={pages.main.Settings} options={{
        tabBarIcon: ({focused})=>(
          <View style={styles.bg}>
              <Icon name="gear" style={{color: focused ? "#7E370C" : "#fff", fontSize: 20,}} />
              <Text style={{color: focused ? "#7E370C" : "#fff", fontSize: 12,}}>Pengaturan</Text>
          </View>
        )
      }}/>
    </Tab.Navigator>
  )
}

const Route = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={pages.Splash} />
          <Stack.Screen name="Welcome" component={pages.Welcome} />
          <Stack.Screen name="Terms" component={pages.Terms} />
          <Stack.Screen name="Privacy" component={pages.Privacy} />
          <Stack.Screen name="Login" component={pages.auth.Login} />
          <Stack.Screen name="Register" component={pages.auth.Register} />

          <Stack.Screen name="MainApp" component={MainApp} />

          {/* Menu di Beranda Start */}
          <Stack.Screen name="KearifanLokal" component={pages.menu.KearifanLokal} />
          <Stack.Screen name="Kompetensi" component={pages.menu.Kompetensi} />
          <Stack.Screen name="PetaKonsep" component={pages.menu.PetaKonsep} />
          <Stack.Screen name="Eksplorasi" component={pages.menu.Eksplorasi} />
          <Stack.Screen name="ForumDiskusi" component={pages.menu.ForumDiskusi} />
          <Stack.Screen name="ScanAR" component={pages.menu.ScanAR} />
          <Stack.Screen name="InfoPengembang" component={pages.menu.InfoPengembang} />
          <Stack.Screen name="Produk" component={pages.menu.Produk} />
          <Stack.Screen name="PetunjukMedia" component={pages.menu.PetunjukMedia} />
          <Stack.Screen name="ChemtroAI" component={pages.menu.ChemtroAI} />
          {/* Menu di Beranda End */}
      </Stack.Navigator>
  )
}

export default Route

const focused = true;
const styles = StyleSheet.create({
  bg:{
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: focused ? "#EBA403" : "#fff", 
    flex: 1, 
    width: '100%',
  },
})