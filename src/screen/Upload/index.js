/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import {launchCamera} from 'react-native-image-picker';

const Upload = ({navigation, route}) => {
  const userData = route.params?.userData;
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://tes-tech.vercel.app/users');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const selectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="arrowleft" size={20} color="#8C8C8C" />
          <Text
            style={styles.headerText}
            onPress={() => navigation.navigate('Home')}>
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
          <TouchableOpacity style={styles.button} onPress={selectPhoto}>
            <FontAwesome
              style={styles.icon}
              name="pluscircleo"
              size={30}
              color="blue"
            />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{uri: selectedImage}} style={styles.image} />
          )}
        </View>
        <Text
          style={styles.next}
          onPress={() =>
            navigation.navigate('Send', {userData, selectedImage})
          }>
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
    marginTop: 15,
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
    marginTop: 20,
  },
  button: {
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 150,
    marginTop: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
  },
});

export default Upload;
