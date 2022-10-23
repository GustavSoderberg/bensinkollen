import { settings } from '../Models/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GasStation } from '../Models/GasStation';
import { mapManager } from './MapManager';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


async function getBensinmack() {

    //const data = await (await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()
    const data = '{"stockholmslan_Circle_K_OsterakerSodra_Ingmarso__etanol": "15.92","stockholmslan_Circle_K_OsterakerCentralvagen_67_Akersberga__etanol": "15.92"}'
    
    const sep = data.split(",");

    //for (let i = 0; i < sep.length - 1; i++) {
    for (let i = 0; i < sep.length - 1; i++) {
        
        sep[i] = sep[i].replace(/["{}]/g, "");

        sep[i] = sep[i].split("_");

        // Merge Circle and K
        if (sep[i][1] == "Circle") {

            sep[i][1] = sep[i][1] + " " + sep[i][2];

            sep[i].splice(2, 1)
        }

        // Merge addresses
        for (let m = 3; m < sep[i].length; m++) {
            if (!sep[i][m].includes(":")) {
                sep[i][m] = sep[i][m-1] + " " + sep[i][m]
            }

        }
        // Remove duplicate addresses
        sep[i] = [sep[i][0], sep[i][1], sep[i][sep[i].length-2], sep[i][sep[i].length-1]]

        //creates separete arrays for gas type and price, with corresponding index ex. sep[i][3][0][2] is 3rd type of gas & sep[i][3][1][2] is the price for that gas
        const temp = sep[i][3].split(":");
        sep[i][3] = ["typ", "pris"]
        sep[i][3][0] = [temp[0]] //type
        sep[i][3][1] = [temp[1].trim()] //price

        //merges identical locations adding the type of gas to an array
        for (let l = 0; l < i - 1; l++){
            // 0 = type ex. sep[i][3][0]
            // 1 = price ex. sep[i][3][1]
            if (sep[l][2] == sep[i][2]) {
                sep[l][3][0].push(sep[i][3][0][0])
                sep[l][3][1].push(sep[i][3][1][0])
                sep[i] = [""]
                break
            }
        }
    }

    // cleans array (the merge left a lot of empty items in the array) from ~800 to ~250
    var deltaLength = sep.length - 1
    for (let i = 0; i < deltaLength; i++) {
        if (sep[i] == ""){
            sep.splice(i, 1)
            i--
            deltaLength--
        }
    }

    //the last item in the array became weird so it is removed (this is done after the sorting)
    sep.splice(sep.length - 1, 1)

    //for debugging
    console.log(sep.length)

    //turns the items in the array into gasStation object
    const gasStationList = []
    for (let i = 0; i < sep.length; i++) {
        var tempGasList = []
        for (let l = 0; l < sep[i][3][0].length; l++){
            tempGasList.push([sep[i][3][0][l], sep[i][3][1][l]])
        }
        const newGasStation = GasStation(
            sep[i][0],              // Region
            sep[i][1],              // Name
            sep[i][2],              // Address 
            tempGasList,            // gasTypes
            null,                   // logo
            "0",                    // lat
            "0")     
            gasStationList.push(newGasStation)
    }

    // fetchStations(gasStationList)
    // clearAll()

    await AsyncStorage.getItem('@bensinkollen')
      .then(jsonValue => JSON.parse(jsonValue))
      .then(jsonValue => fetchStations(jsonValue))
      .catch(error => console.log(error))

}

export { getBensinmack }

  async function fetchStations(stations) {
    
    stations.forEach(station => {
        
        if(station.lat === "0" ) {

            //ARE U SURE ABOUT UN-COMMENTING THIS?

            // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${station.name}%20${station.address}&key=${settings.ApiKeyGoogle}`)
            // .then(json => json.json())
            // .then(json => {json.status != "ZERO_RESULTS" ? createGasStation(json.results[0].geometry.location.lat, json.results[0].geometry.location.lng, station) : console.log("ApiManager - fetchStations: One Google fetch returned no result")})
            // .catch(error => console.log(error))

        }
        else {

            mapManager.updateGasStation(station)

        }

    });

 }

 export { fetchStations }

 function createGasStation(lat, lng, station) {

    var logo = require('../assets/logos/default_pin.png')
    switch (station.name.toLowerCase()) {
        case 'circle k':
            logo = require('../assets/logos/circlek_pin.png')
            break;
        case 'ingo':
            logo = require('../assets/logos/ingo_pin.png')
            break;
        case 'okq8':
            logo = require('../assets/logos/okq8_pin.png')
            break;
        case 'st1':
            logo = require('../assets/logos/st1_pin.png')
            break;
        case 'tanka':
            logo = require('../assets/logos/tanka_pin.png')
            break;
        case 'preem':
            logo = require('../assets/logos/preem_pin.png')
            break;
        default:
            logo = require('../assets/logos/default_pin.png')
            break;
      }

    //TODO: We shall calculate distance between gas station and user here

    const station1 = GasStation(station.region, station.name, station.address, station.types, logo, lat, lng)
    // station.logo = logo
    // station.lat = lat
    // station.long = lng
    mapManager.updateGasStation(station1)

 }

 const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@bensinkollen', jsonValue)
    } catch (e) {
        console.log("something went wrong writing" + e)
      // saving error
    }
  }

  const getData = async () => {

      const jsonValue = await AsyncStorage.getItem('@bensinkollen')
      .then(jsonValue => JSON.parse(jsonValue))
      .then(jsonValue => fetchStations(jsonValue))
      .catch(error => console.log(error))

  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
        console.log("something went wrong clearing" + e)
    }
  
    console.log('Done.')
  }