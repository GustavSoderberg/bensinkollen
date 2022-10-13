
import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

class MapManager {

    currentLat = String();
    currentLong = String();

    setCurrentPosition(lat,long) {

        this.currentLat = lat;
        this.currentLong = long;

    }

}

class GasStation {

	name = String()
	price = Float32Array()

	lat = String()
	long = String()

	constructor(name, price, lat, long) {
		this.name = name;
		this.price = price;
		this.lat = lat;
		this.long = long;
	}

}

let mapManager = new MapManager;
mapManager.setCurrentPosition(59.357795, 17.985648);

export default function App() {

	const [ pin, setPin ] = React.useState({
		latitude: mapManager.currentLat,
		longitude: mapManager.currentLong
	})
	const [ region, setRegion ] = React.useState({
		latitude: mapManager.currentLat,
		longitude: mapManager.currentLong,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		<View style={{ marginTop: 0, flex: 1 }}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: mapManager.currentLat,
					longitude: mapManager.currentLong,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}}
				provider="google"
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />

					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={100} fillColor={"#EFE"}/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})