import User from '../Models/User'
import GasStation from '../Models/GasStation'


class MapManager {

    currentUser = User()
    listOfGasStations = new Array(GasStation)

    constructor(currentUser) {

        this.currentUser = currentUser
        
    }

}