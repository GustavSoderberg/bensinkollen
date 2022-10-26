import React, { useState, useEffect } from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { mapManager } from '../ViewModels/MapManager';
import { settings } from '../Models/Settings';
import { Dropdown } from 'react-native-element-dropdown';

import * as Location from 'expo-location'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GasStation } from '../Models/GasStation';

const data = [
  { label: '1 km', value: '1000' },
  { label: '2 km', value: '2000' },
  { label: '3 km', value: '3000' },
  { label: '4 km', value: '4000' },
  { label: '5 km', value: '5000' },
];

const bgColor = 'rgba(30, 124, 220, 0.65)'
const lineColor = 'rgba(0, 90, 200, 0.65)'

const DropdownComponent = () => {
  const [value, setValue] = useState(3000);
  const [isFocus, setIsFocus] = useState(false);
  const [fetchedStations, setFetchedStations] = useState([]);
  const [locationLat, setLocationLat] = useState(0);
  const [locationLong, setLocationLong] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'white' }]}>
          Search Radius
        </Text>
      );
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationLat(location.coords.latitude)
      setLocationLong(location.coords.longitude)
      mapManager.currentUser.lat = locationLat
      mapManager.currentUser.long = locationLong
      mapManager.setUserCoordinates(location.coords.latitude, location.coords.longitude)

      await new Promise(resolve => setTimeout(resolve, 500));

      setLocationLat(location.coords.latitude)
      setLocationLong(location.coords.longitude)

            
      const station = await mapManager.initialize(3000)
      // await console.log(station)
      setValue(value)

      setFetchedStations(station)
      
    })();
  }, []);

  var text = 'Waiting...!';
  if (errorMsg) {
    text = errorMsg; 
  } else if (locationLat) {
    mapManager.currentUser.lat = locationLat
    mapManager.currentUser.long = locationLong
  }
  return (
    
      <View>
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, !isFocus && {  
          borderBottomStartRadius: !isFocus ? 8 : 0,
          borderBottomEndRadius: !isFocus ? 8 : 0,
        }]}
        placeholderStyle={styles.selectedOption}
        selectedTextStyle={styles.selectedOption}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.itemContainer}
        itemContainerStyle={styles.item}
        itemTextStyle={styles.itemText}
        data={data}
      //search  search
        //maxHeight={300}
        statusBarIsTranslucent={true}
        labelField="label"
        valueField={!isFocus ? value/1000 + " km" : '...'}
        placeholder={!isFocus ? value/1000 + " km" : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={async (item) => {
          setIsFocus(false);
          setValue(item.value);
          const station = await mapManager.initialize(item.value);

          setFetchedStations(station)
          setValue(item.value);
          setIsFocus(false);

        }}
      />
    </View>
      <MapView style={styles.map}
      region={{
        latitude: (locationLat != 0 ? locationLat : 40),
        longitude: (locationLong),
        latitudeDelta: ((settings.LatDelta)),
        longitudeDelta: ((settings.LngDelta)),
      }}
      showsMyLocationButton={false}
      showsCompass={false}
      followsUserLocation={true}
      showsUserLocation={true}
      provider="google"
      >
      
      <Circle center={{ latitude: mapManager.currentUser.lat, longitude: mapManager.currentUser.long }} radius={parseInt(value)} />
      
       {fetchedStations.map(n => (
        <Marker coordinate={{
          latitude: (n.lat),
          longitude: (n.long),
        }}
        key={n.key}
        >
          <Image source={(
          n.name.toLowerCase() == "circle k" ? require('../assets/logos/circlek_pin.png'):
          n.name.toLowerCase() == "ingo" ? require('../assets/logos/ingo_pin.png'):
          n.name.toLowerCase() == "okq8" ? require('../assets/logos/okq8_pin.png'):
          n.name.toLowerCase() == "preem" ? require('../assets/logos/preem_pin.png'):
          n.name.toLowerCase() == "st1" ? require('../assets/logos/st1_pin.png'):
          n.name.toLowerCase() == "tanka" ? require('../assets/logos/tanka_pin.png'):
          require('../assets/logos/default_pin.png'))}
          style={{ width: settings.LogoWidth, height: settings.LogoHeight }} />
          <Callout tooltip={true} style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: bgColor, borderRadius: 8, padding: 4}}>
            <Text style={{ width: 100}}>
              {n.types.map(k => 
              <Text style={{height: 'auto'}} key={uuid.v4()}>
                
                  <Text style={{
                  fontWeight: "bold", alignSelf: 'flex-start', minWidth: '60%', color: '#FFF'}}>{k[0]} - </Text>
                  <Text style={{alignSelf: 'flex-end', color: '#FFF'}}>{k[1] + "\n"}</Text>
                
              </Text>
              )}
            </Text>
          </Callout>
        </Marker>
        )) }
      
      </MapView> 
      </View> 
  );
}; 

export default DropdownComponent;

const styles = StyleSheet.create({
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#212121',
    textAlign: 'center'
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
container: {
position: 'absolute',
zIndex: 90,
paddingHorizontal: 16,
width: '40%',
},

//top label vvv
label: {
  position: 'absolute',
  backgroundColor: 'transparent',
  color: 'white',
  borderRadius: 8,
  left: 16,
  top: 16,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  width: 120,
  },

//dropdown button collapsed vvv
dropdown: {
height: 50,
width: 120,
backgroundColor: bgColor,
borderTopStartRadius: 8,
borderTopEndRadius: 8,
paddingHorizontal: 8,
paddingTop: 14,
top: 14,
color: 'white'
},

//container for items vvv
itemContainer:{
  borderWidth: 0,
  borderTopWidth: 1,
  borderColor: lineColor,
  shadowColor: 'transparent',
  backgroundColor: bgColor,
  marginTop: -2, 
  borderBottomStartRadius: 8,
  borderBottomEndRadius: 8,
  paddingHorizontal: 3,
  paddingBottom: 2,
},

//item in list vvv
item: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  //backgroundColor: bgColor,
  //borderRadius: 5,
  //marginVertical: 1,
  height: 25,
},

//item text in list vvv
itemText: {
  color: 'white',
  height: '100%',
  fontSize: 16,
  //backgroundColor: 'green',
},

//selected text before selecting vvv
selectedOption: {
fontSize: 16,
color: 'white',
},

//arrow icon vvv
iconStyle: {
width: 20,
height: 20,
tintColor: 'white',
},

inputSearchStyle: {
height: 40,
fontSize: 16,
},
});