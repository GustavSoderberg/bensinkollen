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


    async initialize() {

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

}

const mapManager = new MapManager(User(59.361631, 17.959703))

export { mapManager }