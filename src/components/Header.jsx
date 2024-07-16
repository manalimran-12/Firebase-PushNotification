import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, DrawerLayoutAndroid } from 'react-native';
import DrawerContent from '../components/drawer'; 

const Header = ({ title }) => {
  const drawer = useRef(null);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => <DrawerContent />}
    >
      <ImageBackground
        source={require('../../assets/images/Pattern.png')}
        style={styles.header}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity
          style={styles.drawerIconContainer}
          onPress={() => drawer.current.openDrawer()}
        >
          <Image
            source={require('../../assets/images/DrawerIcon.png')} // Replace with your drawer icon path
            style={styles.drawerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </ImageBackground>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3A3568',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    flexDirection: 'row',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerIconContainer: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  drawerIcon: {
    width: 20,
    height: 20,
  },
});

export default Header;
