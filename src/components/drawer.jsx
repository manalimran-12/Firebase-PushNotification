import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DrawerContent = () => (
  <View style={styles.drawerContent}>
    <Image
      source={require('../../assets/images/logo.png')} // Replace with your project logo path
      style={styles.projectLogo}
    />
    <TouchableOpacity style={styles.drawerItem}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/gpt.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.drawerItemText}>ChatGPT Assistant</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.drawerItem}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/gemni.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.drawerItemText}>Gemini Assistant</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#3A3568',
    padding: 20,
  },
  projectLogo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    marginLeft: -22
  },
  drawerItem: {
    padding: 10,
    marginTop: 10,
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 8,
  },
  iconStyle: {
    width: 45,
    height: 35,
    resizeMode: 'contain',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  }
});

export default DrawerContent;
