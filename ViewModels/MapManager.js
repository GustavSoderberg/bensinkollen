import { User } from '../Models/User';
import { GasStation } from '../Models/GasStation'
import { zoomlevel } from '../Views/HomeView'


class MapManager {

    currentUser = User
    listOfGasStations = new Array(GasStation)

    constructor(currentUser) {

        this.currentUser = currentUser
        
    }

    updateSettings(radius, lat, long) {

        this.currentUser.radius = radius
        this.currentUser.lat = lat
        this.currentUser.long = long
        console.log(mapManager.currentUser)

    }

    updateGasStations(station) {

        this.listOfGasStations.push(station)
        console.log(this.listOfGasStations.length)

    }
}



const mapManager = new MapManager(User(5000, 59.868125, 17.659776))

export { mapManager }