/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Home = ({navigation}) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    biodata: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
  });

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('biodata', data.biodata);
      formData.append('provinsi', data.provinsi);
      formData.append('kota', data.kota);
      formData.append('kecamatan', data.kecamatan);
      formData.append('kelurahan', data.kelurahan);

      const response = await axios.post(
        `https://tes-tech.vercel.app/users`,
        formData,
      );
      console.log('Response:', response.data);
      Alert.alert('Success', 'Data has been submitted successfully.');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json',
        );
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        setLoading(false);
        Alert.alert(
          'Error',
          'Failed to fetch provinces data. Please try again later.',
        );
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchRegencies = async () => {
      try {
        const response = await axios.get(
          `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${data.provinsi}.json`,
        );
        setRegencies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching regencies:', error);
        setLoading(false);
        Alert.alert(
          'Error',
          'Failed to fetch regencies data. Please try again later.',
        );
      }
    };

    if (data.provinsi) {
      fetchRegencies();
    }
  }, [data.provinsi]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${data.kota}.json`,
        );
        setDistricts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setLoading(false);
        Alert.alert(
          'Error',
          'Failed to fetch districts data. Please try again later.',
        );
      }
    };

    if (data.kota) {
      fetchDistricts();
    }
  }, [data.kota]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await axios.get(
          `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${data.kecamatan}.json`,
        );
        setVillages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching villages:', error);
        setLoading(false);
        Alert.alert(
          'Error',
          'Failed to fetch villages data. Please try again later.',
        );
      }
    };

    if (data.kecamatan) {
      fetchVillages();
    }
  }, [data.kecamatan]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="arrowleft" size={20} color="#8C8C8C" />
          <Text style={styles.headerText}>Registrasi Klaim</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={styles.contentText}>Registrasi</Text>
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Nama Depan</Text>
          <TextInput
            placeholder="Nama Depan"
            value={data.firstName}
            onChangeText={text => setData({...data, firstName: text})}
          />
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Nama Belakang</Text>
          <TextInput
            placeholder="Nama Belakang"
            value={data.lastName}
            onChangeText={text => setData({...data, lastName: text})}
          />
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>biodata</Text>
          <TextInput
            placeholder="Biodata"
            multiline={true}
            numberOfLines={4}
            value={data.biodata}
            onChangeText={text => setData({...data, biodata: text})}
          />
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Provinsi</Text>
          <Picker
            selectedValue={data.provinsi}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, provinsi: itemValue})
            }>
            {provinces.map(province => (
              <Picker.Item
                key={province.id}
                label={province.name}
                value={province.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Kota</Text>
          <Picker
            selectedValue={data.kota}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, kota: itemValue})
            }>
            {regencies.map(regency => (
              <Picker.Item
                key={regency.id}
                label={regency.name}
                value={regency.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Kecamatan</Text>
          <Picker
            selectedValue={data.kecamatan}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, kecamatan: itemValue})
            }>
            {districts.map(district => (
              <Picker.Item
                key={district.id}
                label={district.name}
                value={district.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputData}>
          <Text style={{color: 'blue'}}>Kelurahan</Text>
          <Picker
            selectedValue={data.kelurahan}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              setData({...data, kelurahan: itemValue})
            }>
            {villages.map(village => (
              <Picker.Item
                key={village.id}
                label={village.name}
                value={village.id}
              />
            ))}
          </Picker>
        </View>
        <Text
          style={styles.next}
          onPress={() =>
            navigation.navigate('Upload', {
              userData: {
                firstName: data.firstName,
                lastName: data.lastName,
                provinsi: provinces.find(item => item.id === data.provinsi)
                  ?.name,
                kota: regencies.find(item => item.id === data.kota)?.name,
                kecamatan: districts.find(item => item.id === data.kecamatan)
                  ?.name,
                kelurahan: villages.find(item => item.id === data.kelurahan)
                  ?.name,
              },
            })
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
  },
  contentText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    backgroundColor: '#AFE1AF',
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

export default Home;
