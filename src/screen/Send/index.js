/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/AntDesign';

const Send = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="arrowleft" size={20} color="#8C8C8C" />
          <Text
            style={styles.headerText}
            onPress={() => navigation.navigate('Upload')}>
            Registrasi Klaim
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>No Polisi :</Text>
          <Text style={styles.rightText}>B 1234 EFG</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Nama Tertanggung :</Text>
          <Text style={styles.rightText}>Fajar</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>No Polis :</Text>
          <Text style={styles.rightText}>v313928302</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Foto Sim</Text>
        </View>
        <Text style={styles.next} onPress={() => navigation.navigate('Send')}>
          Berikutnya
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 10,
  },
  contentText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    backgroundColor: '#AFE1AF',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  leftText: {
    color: 'blue',
    flex: 1,
  },
  rightText: {
    color: 'blue',
    flex: 1,
  },
  inputData: {
    backgroundColor: '#D3D3D3',
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  next: {
    color: 'blue',
    fontSize: 15,
    textAlign: 'right',
  },
});

export default Send;
