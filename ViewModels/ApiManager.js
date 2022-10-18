import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { settings } from '../Models/Settings';
import { GasStation } from '../Models/GasStation';
import { mapManager } from './MapManager';


async function getBensinmack() {

    const data = await (await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()
    console.log(data)
    const sep = data.split(",");


    for (let i = 0; i < sep.length; i++) {
        
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
        const temp = sep[i][3].split(":");
        sep[i][3] = temp[0]
        sep[i].push(temp[1].trim())

        
        //filer:
        //etanol, diesel, 98, 95
        if (sep[i][3] == "etanol"){
            for (let l = 0; l < sep[i].length; l++) {
                console.log(sep[i][l]);
           }
           console.log("---------------------")
           console.log("*********************")
           console.log("---------------------")
        }

        //non filer aka all
        // for (let l = 0; l < sep[i].length; l++) {
        //      console.log(sep[i][l]);
        // }
        // console.log("---------------------")
        // console.log("*********************")
        // console.log("---------------------")r

    }
    console.log(sep.length)

}

export { getBensinmack }


 var listOfGasStations = Array(GasStation)
 var index = 0

 async function fetchStations(stations) {

    stations.forEach(array => {
        
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${array[0]}%20${array[1]}&key=${settings.ApiKeyGoogle}`)
     .then((array) => array.json())
     .then(json => createGasStation(json, array))
     .catch(error => console.log(error))

    });

 }
 export { fetchStations }

 function createGasStation(json, station) {

    var logo = require('../assets/logos/circlek_pin.png')
    switch (station[0]) {
        case 'Circle K':
            logo = require('../assets/logos/circlek_pin.png')
            break;
        case 'OKQ8':
            logo = require('../assets/logos/okq8.png')
            break;
        case 'Preem':
            logo = require('../assets/logos/preem_pin.png')
            break;
        case 'Shell':
            logo = require('../assets/logos/shell.png')
            break;
        case 'ST1':
            logo = require('../assets/logos/okq8.png')
            break;
        default:
            logo = require('../assets/logos/circlek_pin.png')
            break;
      }
      


    //TODO: We shall calculate distance between gas station and user here
    const gasStation = GasStation(index, logo, station[0], station[2], json.results[0].geometry.location.lat, json.results[0].geometry.location.lng)
    index++
    
    listOfGasStations.push(gasStation)
    mapManager.updateGasStations(gasStation)

    

 }

