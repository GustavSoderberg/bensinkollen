import { User } from '../Models/User';
import { GasStation } from '../Models/GasStation'
import { apiManager, fetchStations } from './ApiManager'


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
        // console.log(station)

    }

    initialize() {

        // const fetchedStations = Object.assign(apiManager.getBensinmack())
        
        // map
        


        // if (localStorage.getItem("bensinkollen") === null) {

        //     const mapManager = new MapManager(User(59.868125, 17.659776))

            
        //     //create gasStation objects
        //     //fetch google api
        //     //update each station with lat + lng coordinates
        //     //save to this.listOfGasStations

        // }

        // else {

        //     var fromlocal = JSON.parse(localStorage.getItem('bensinkollen'))

        //     const mapManager = new MapManager()

        //     //fetch henriks api
        //     //create gasStation objects
        //     //compare gastype/prices to already existing localstorage stations
        //     //IF there's new/removed stations, update accordingly
        //     //populate mapManager with already existing stations

        // }

    }

    // load() {

    // }
    
    // update() {

    // }

}

const mapManager = new MapManager(User(59.361631, 17.959703))

export { mapManager }