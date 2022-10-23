import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@bensinkollen', jsonValue)
      console.log(`Successfully saved ${value.length} stations to localstorage`)
    } catch (e) {
        console.log("something went wrong writing" + e)
      // saving error
    }
  }

  const getData = async () => {

      try {
        var jsonValue = await AsyncStorage.getItem('@bensinkollen')
        
        if (jsonValue != null) {
          jsonValue = JSON.parse(jsonValue)
          console.log(`Successfully read ${jsonValue.length} stations from localstorage`)
          return jsonValue
        } else {
          console.log(`Local storage is empty`)
          return "empty"
        }
      } catch (e) {
        console.log("something went wrong reading" + e)
      }

  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
        console.log("something went wrong clearing" + e)
    }
  
    console.log('Done.')
  }

  export { storeData, getData, clearAll }