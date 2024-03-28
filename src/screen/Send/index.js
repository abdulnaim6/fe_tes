/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/AntDesign';

const Send = ({navigation, route}) => {
  const userData = route.params?.userData;
  const selectedImage = route.params?.selectedImage;

  const postData = async () => {
    try {
      const response = await fetch('https://tes-tech.vercel.app/users', {
        method: 'POST',
        body: JSON.stringify({
          userData,
          selectedImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data berhasil dipost:', data);
      } else {
        console.error('Gagal memposting data');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

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
          <Text style={styles.leftText}>Nama Depan :</Text>
          <Text style={styles.rightText}>{userData?.firstName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Nama Belakang :</Text>
          <Text style={styles.rightText}>{userData?.lastName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Provinsi :</Text>
          <Text style={styles.rightText}>{userData?.provinsi}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Kota :</Text>
          <Text style={styles.rightText}>{userData?.kota}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Kecamatan :</Text>
          <Text style={styles.rightText}>{userData?.kecamatan}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Kelurahan :</Text>
          <Text style={styles.rightText}>{userData?.kelurahan}</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Foto KTP</Text>
          {selectedImage && (
            <Image source={{uri: selectedImage}} style={styles.image} />
          )}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={postData}>
          <Text style={styles.nextText}>Kirim Data</Text>
        </TouchableOpacity>
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
  nextButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  nextText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
  },
});

export default Send;
