import { User } from '../Models/User';
import { storeData, getData, clearAll } from './StorageManager'
import { getBensinmack, fetchLatLng } from './ApiManager'

var counter = 0
class MapManager {

    currentUser = User
    listOfGasStations = []

    constructor(currentUser) {

        this.currentUser = currentUser
        
    }


    async initialize(radius) {

        console.log("MapManager - initialize()")
        const henrikhjelm = await getBensinmack()
        const calcGasStations = []

        // storeData(updatedList)
        // clearAll()

        var localstorage = await getData()
        if (localstorage === "empty") {

            const stations = await fetchLatLng(henrikhjelm)

            this.listOfGasStations = []
            this.listOfGasStations = stations
            storeData(this.listOfGasStations)
            
            this.listOfGasStations.forEach(station => {
                const result = this.calculate(station)
                if ( result <= radius ) {
                    calcGasStations.push(station)
                }
            });


            return(calcGasStations)

        } else {

            const updatedStations = []
            localstorage = await fetchLatLng(localstorage)
            
            await localstorage.forEach(station => {
                const uStation = this.compare(station, henrikhjelm)
                updatedStations.push(uStation)

            });

            this.listOfGasStations = []
            this.listOfGasStations = updatedStations
            storeData(this.listOfGasStations)

            this.listOfGasStations.forEach(station => {
                const result = this.calculate(station)
                if ( result <= radius ) {
                    calcGasStations.push(station)
                }
            });
            return(this.calcGasStations)
        }

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

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lat1 = this.currentUser.lat * Math.PI / 180;
    lon1 =  this.currentUser.long  * Math.PI / 180;
    lat2 = station.lat * Math.PI / 180;
    lon2 = station.long * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    console.log((c * r)/1000);
    // calculate the result and return in meters
    return((c * r)/1000);

    }
}

const mapManager = new MapManager(User(59.361631, 17.959703))

export { mapManager }