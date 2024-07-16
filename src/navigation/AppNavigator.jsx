import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerLayoutAndroid, View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Home from '../screens/HomeScreen';
import Welcome from '../screens/WelcomeScreen';
import DrawerContent from '../components/drawer';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const drawer = useRef(null);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => <DrawerContent />}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              header: ({ navigation }) => <CustomHeader title="Home Screen" openDrawer={() => drawer.current.openDrawer()} />,
            }}
          />
          <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{
              header: ({ navigation }) => <CustomHeader title="Welcome" openDrawer={() => drawer.current.openDrawer()} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawerLayoutAndroid>
  );
}

const CustomHeader = ({ openDrawer }) => (

  <View style={styles.header}>
    <TouchableOpacity
      style={styles.drawerIconContainer}
      onPress={openDrawer}
    >
      <Image
        source={require('../../assets/images/DrawerIcon.png')} // Replace with your drawer icon path
        style={styles.drawerIcon}
      />
    </TouchableOpacity>
    <Image
      source={require('../../assets/images/logo.png')} 
      style={styles.projectLogo}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3A3568',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    flexDirection: 'row',
    width: '100%',
  },
  drawerIconContainer: {
    position: 'absolute',
    left: 20,
  },
  drawerIcon: {
    width: 20,
    height: 20,
  },
  projectLogo: {
    width: 200,
    height: 150,
    resizeMode: 'contain', 
    marginLeft: 10
  },
});
export default AppNavigator;
