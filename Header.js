import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from './assets/logo.png';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.headerText}>OpFlow Solutions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7db0b7',
  },
});
