/**
 * 
 * MapManager
 * 
 * This class functions as a viewModel to the MapView, sorts and update station prices, calculating distances etc.
 * 
 * @authors
 * Hampus B
 * Karol Ö
 * Oscar K
 * Gustav S
 * 
 */

import { User } from '../Models/User';
import { storeData, getData, clearAll } from './StorageManager'
import { getBensinmack, fetchLatLng } from './ApiManager'

var counter = 0
class MapManager {

    currentUser = User
    listOfGasStations = []
    calcGasStations = []

    constructor(currentUser) {

        this.currentUser = currentUser
        
    }

    setUserCoordinates(lat, lng) {

        this.currentUser.lat = lat
        this.currentUser.long = lng

    }

    async initialize(radius) {

        console.log("MapManager - initialize()")
        const henrikhjelm = await getBensinmack()

        // storeData(updatedList)
        // clearAll()

        var localstorage = await getData()

        
        if (localstorage === "empty") {

            const stations = await fetchLatLng(henrikhjelm)

            this.listOfGasStations = []
            this.listOfGasStations = stations
            storeData(this.listOfGasStations)
            
            this.calcGasStations = []
            this.listOfGasStations.forEach(station => {
                const result = this.calculate(station)
                if ( result <= radius ) {
                    this.calcGasStations.push(station)
                }
            });
            // console.log("fetched just now: " + calcGasStations)
            return(this.calcGasStations)

        } else {

            const updatedStations = []
            var mergedStorage = []
            mergedStorage = await this.merge(localstorage, henrikhjelm)
            
            await mergedStorage.forEach(station => {
                const uStation = this.compare(station, henrikhjelm)
                updatedStations.push(uStation)
                

            });
            this.listOfGasStations = []
            this.listOfGasStations = updatedStations
            storeData(this.listOfGasStations)

            this.calcGasStations = []

            this.listOfGasStations.forEach(station => {
                const result = this.calculate(station)
                if ( result <= radius ) {
                    this.calcGasStations.push(station)
                    
                }
            });
            return(this.calcGasStations)
        }

    }

    async merge(localstorage, henrik) {

        var counter = 0

        console.log("Comparing fetched stations with your localstorage")
        
        localstorage.forEach(lStation => {
            for (let i = 0; i < henrik.length; i++) {
                
                if (henrik[i].address == lStation.address) {

                    henrik.splice(i, 1);
                    counter++

                }
                
            }
            

        });
        
        console.log(`${counter} matches were found already existing in your localstorage`)
        const fetchGoogle = await fetchLatLng(henrik)
        const mergedStations = localstorage.concat(fetchGoogle)

        return mergedStations

    }

    compare(station, henrik) {
        
        henrik.forEach(result => {
            if (result.address == station.address) {
                
                station.types.forEach(type => {
                        
                        switch (type[0].toLowerCase()) {
                            case '95':
                                result.types.forEach(price => { if (type[0] === price[0] && type[1] !== price[1]) { const old = type[1]; type[1] = price[1]; console.log(`Updated ${station.name} ${station.address}${type[0]}: ${old} => ${price[1]}`) }})
                                break;
                            case '98':
                                result.types.forEach(price => { if (type[0] === price[0] && type[1] !== price[1]) { const old = type[1]; type[1] = price[1]; console.log(`Updated ${station.name} ${station.address}${type[0]}: ${old} => ${price[1]}`) }})
                                break;
                            case 'diesel':
                                result.types.forEach(price => { if (type[0] === price[0] && type[1] !== price[1]) { const old = type[1]; type[1] = price[1]; console.log(`Updated ${station.name} ${station.address}${type[0]}: ${old} => ${price[1]}`) }})
                                break;
                            case 'etanol':
                                result.types.forEach(price => { if (type[0] === price[0] && type[1] !== price[1]) { const old = type[1]; type[1] = price[1]; console.log(`Updated ${station.name} ${station.address}${type[0]}: ${old} => ${price[1]}`) }})
                                break;
                            case 'fordonsgas':
                                result.types.forEach(price => { if (type[0] === price[0] && type[1] !== price[1]) { const old = type[1]; type[1] = price[1]; console.log(`Updated ${station.name} ${station.address}${type[0]}: ${old} => ${price[1]}`) }})
                                break;
                            default:
                                console.log(`Unknown gas type found: ${type[0]}`)
                                break;
                          }

                });

                this.break;
            }

        });
        return station

    }

    calculate(station) {

    //Values
    let lat1 = this.currentUser.lat * 111139;
    let lon1 = this.currentUser.long * 111139;
    let lat2 = station.lat * 111139;
    let lon2 = station.long * 111139;

    //get hypotenusa upphöjt till 2
    var o = Math.pow((lat1 - lat2), 2) + Math.pow((lon1 - lon2), 2) 

    //for debugging
    //get length in meter
    // console.log(Math.sqrt(o))
    // console.log('-----------------');
    // calculate the result and return in meters
    return(Math.sqrt(o));

    }

    navigate(lat, lng) {

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        
            
        Linking.openURL(url);

    }
}

const mapManager = new MapManager(User(0, 0))

export { mapManager }