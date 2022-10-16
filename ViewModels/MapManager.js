import { User } from '../Models/User';
import { GasStation } from '../Models/GasStation'


class MapManager {

    currentUser = User
    listOfGasStations = new Array(GasStation)

    constructor(currentUser, listOfGasStations) {

        this.currentUser = currentUser
        this.listOfGasStations = listOfGasStations
        
    }
}

const gasStation = GasStation(1, "CircleK", 20, 59.361631, 17.9604703)
const gasStation1 = GasStation(2, "Preem", 23, 59.360631, 17.957703)
const gasStation2 = GasStation(3, "ST1", 20, 59.361631, 17.958703)
const gasStation3 = GasStation(4, "Gulf", 23, 59.360631, 17.961703)

const mapManager = new MapManager(User("Jonas", 59.360931, 17.959703 ), Array(
  gasStation, 
  gasStation1, 
  gasStation2, 
  gasStation3
  ))

export { mapManager }