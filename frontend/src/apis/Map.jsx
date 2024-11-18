import axios from "./Axios";


export const getMarkersNearby = async (data) => {
  try {
    console.log("data", data);
    const response = await axios.post("/markers/nearby", data).then((res) => {
      console.log("[Get Markers Nearby] ", res.data.result);
      return res.data.result;
    });
    return response;
  } catch (error) {
    console.error("[Get Marker Nearby Failed] : ", error);
  }
};
