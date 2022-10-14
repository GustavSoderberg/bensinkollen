import user from '../Models/User'
import GasStation from '../Models/GasStation'


// class MapManager {

//     currentUser = User
//     // listOfGasStations = new Array(GasStation)

//     constructor(currentUser) {

//         this.currentUser = currentUser
        
//     }
// }

//  export { MapManager}


export const MapManager = (currentUser, listOfGasStations) => { 
    return { 
        currentUser: currentUser, 
        listOfGasStations: listOfGasStations 
    }
}