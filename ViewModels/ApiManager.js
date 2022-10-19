import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { GasStation } from '../Models/GasStation';
import { mapManager } from './MapManager';


async function getBensinmack() {

    const data = await (await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()

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
    for (let i = 0; i < sep.length; i++){
        for (let l = 0; l < sep[i].length; l++) {
            console.log(sep[i][l]);
       }
       console.log("---------------------")
       console.log("*********************")
       console.log("---------------------")
    }
    console.log(sep.length)

}

export { getBensinmack }

 var listOfGasStations = Array(GasStation)
 var index = 0

 async function fetchStations(stations) {

    stations.forEach(array => {
        
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${array[0] + " " + array[1]}&key=AIzaSyA4fCjf6PWnn1oZBtIsCytzt7mH6m3SKnQ`)
     .then((array) => array.json())
     .then(json => createGasStation(json, array))
     .catch(error => console.log(error))

    });


    // for(var key in dict) {
    //     const index = 0
    //     console.log(key)
    //     console.log(dict[key])

    //     const response = await ( await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${key}&key=AIzaSyA4fCjf6PWnn1oZBtIsCytzt7mH6m3SKnQ`)).json()

    //     console.log(response.results[0].types[5])
    //     console.log(response.results)
    //     response.results.forEach(result => {

    //     result.address_components.forEach(element => {
    //         console.log(element)
    //     });
    //     console.log(result.geometry.location.lat)
    //     console.log(result.geometry.location.lng)
    //     // const gasStation = GasStation(index,)
    //     // index++
        
    //     });
    // }
 }
 export { fetchStations }

 function createGasStation(json, station) {

    //TODO: We shall calculate distance between gas station and user here
    const gasStation = GasStation(index, station[0], station[2], json.results[0].geometry.location.lat, json.results[0].geometry.location.lng)
    index++
    console.log(gasStation)
    
    listOfGasStations.push(gasStation)
    mapManager.updateGasStations(gasStation)


    // if(stations.length == index-1) {
    //     mapManager.updateGasStations(listOfGasStations)
    //     console.log("Hej jag är klar")
    // }
    // else {
    //     console.log("hej jag failade")
    // }

 }
