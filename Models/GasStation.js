// class GasStation {

//     name = String()
//     price = Float32Array()

//     lat = Float32Array()
//     long = Float32Array()

//     constructor(name, price, lat, long) {

//         this.name = name
//         this.price = price
//         this.lat = lat
//         this.long = long

//     }

// }


export const GasStation = (key, name, price, lat, long) => { 
    return { 
        key: key,
        name: name, 
        price: price, 
        lat: lat, 
        long: long 
    } 
}