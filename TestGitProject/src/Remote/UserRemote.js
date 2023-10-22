import axios from "axios";
import { getLocations } from "../Helper/LocalStorage";

export const getUserLocationInfo = async () => {
    try {
       const value = await getLocations();
      //  if (value !== null) {
        // const url="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+value.latitude+"&longitude="+value.longitude
        const url="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+11.0216542+"&longitude="+76.9787984
        const response = await axios.get(url);
        console.log("FROM REMOTE",response)
        return response.data;
    // } 
}catch (err) {
      console.log(err);
      throw err;
    }
  };