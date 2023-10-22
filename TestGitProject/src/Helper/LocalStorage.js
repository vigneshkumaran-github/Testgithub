import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocations = async () => {
    try {
      const data = await AsyncStorage.getItem('location_details');
      let jsonval=JSON.parse(data)
      console.log(jsonval,"LOCATION DATA")
      return jsonval;
    } catch {
      return null;
    }
  };