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
            localstorage = await fetchLatLng(localstorage)
            
            await localstorage.forEach(station => {
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
            // console.log("local storage: " + calcGasStations.length)
            // calcGasStations.forEach(stat =>{
            //     console.log(stat)
            // })

            
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

    //Values
    let lat1 = this.currentUser.lat * 111139;
    let lon1 = this.currentUser.long * 111139;
    let lat2 = station.lat * 111139;
    let lon2 = station.long * 111139;

    //get hypotenusa upphöjt till 2
    var o = Math.pow((lat1 - lat2), 2) + Math.pow((lon1 - lon2), 2) 

    //get length in meter
    // console.log(Math.sqrt(o))
    // console.log('-----------------');
    // calculate the result and return in meters
    return(Math.sqrt(o));

    }
}

const mapManager = new MapManager(User(0, 0))

export { mapManager }