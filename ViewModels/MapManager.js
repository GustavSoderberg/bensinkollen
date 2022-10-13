import User from '../Models/User'
import GasStation from '../Models/GasStation'


// export class MapManager {

//     currentUser = User()
//     listOfGasStations = new Array(GasStation)

//     constructor(currentUser) {

//         this.currentUser = currentUser
        
//     }

// }

export const MapManager = (currentUser, listOfGasStations) => { return { currentUser: currentUser, listOfGasStations: listOfGasStations } }