// export class GasStation {

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

export const GasStation = (name, price, lat, long) => { return { name: name, price: price, lat: lat, long: long } }