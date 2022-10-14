// import { BackHandler } from "react-native"

// class User {

//     name = String()
//     lat = String()
//     long =  String()

//     constructor(name, lat, long) {
//         this.name = name
//         this.lat = lat
//         this.long = long
//     }

// }

// const user = new User("Jonas", 59.360931, 17.959703)

// export default user


export const User = (name, lat, long) => { 
    return { 
        name: name, 
        lat: lat, 
        long: long 
    } 
}