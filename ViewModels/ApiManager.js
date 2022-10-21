import { settings } from '../Models/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GasStation } from '../Models/GasStation';
import { mapManager } from './MapManager';


async function getBensinmack() {

    //const data = await (await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()
    const data = '{"stockholmslan_Circle_K_OsterakerSodra_Ingmarso__etanol": "15.92","stockholmslan_Circle_K_OsterakerCentralvagen_67_Akersberga__etanol": "15.92"}'
    
    const sep = data.split(",");
    const macs = []
    var nameFound = false
    var ammount = 0
    var arraylength = sep.length - 1


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

        // Split type of gas and price

        //const temp = sep[i][3].split(":");
        //sep[i][3] = temp[0] //bensintyp
        //sep[i].push(temp[1].trim()) //pris

        const temp = sep[i][3].split(":");
        sep[i][3] = ["typ", "pris"]
        sep[i][3][0] = [temp[0]] //typ
        sep[i][3][1] = [temp[1].trim()] //pris

        for (let l = 0; l < i - 1; l++){
            // 0 = typ ex. sep[i][3][0]
            // 1 = pris ex. sep[i][3][1]
            if (sep[l][2] == sep[i][2]) {
                sep[l][3][0].push(sep[i][3][0][0])
                sep[l][3][1].push(sep[i][3][1][0])
                sep[i] = [""]
                break
            }
        }
    }
    var deltaLength = sep.length - 1
    for (let i = 0; i < deltaLength; i++) {
        if (sep[i] == ""){
            sep.splice(i, 1)
            i--
            deltaLength--
        }
    }


    sep.splice(sep.length - 1, 1)
    // for (let i = 0; i < sep.length; i++){
    //     for (let l = 0; l < sep[i].length; l++) {
    //         console.log(sep[i][l]);
    //    }
    //    console.log("---------------------")
    //    console.log("*********************")
    //    console.log("---------------------")
    // }
    console.log(sep.length)

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

    fetchStations(gasStationList)
    // clearAll()
    // storeData(gasStationList)
    // getData(gasStationList)

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

    station.lat = lat
    station.long = lng
    
    mapManager.updateGasStation(station)

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