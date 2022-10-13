import { TouchableNativeFeedback } from "react-native"

class GasStation {

    name = String()
    price = Float32Array()

    lat = Float32Array()
    long = Float32Array()

    constructor(name, price, lat, long) {

        this.name = name
        this.price = price
        this.lat = lat
        this.long = long

    }

}