import axios from "./Axios";

export const getRecommends = async () => {
  try {
    const response = await axios.get("/recommends/new").then((res) => {
      // console.log("[IN AXIOS] get card recommends : ", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] get recommendation fail : ", error);
  }
};

export const getRecommendedCards = async (mapRequestDtos) => {
  // console.log("[IN AXIOS] mapRequestDtos ", mapRequestDtos);

  try {
    const response = axios
      .post("/recommends/discount", mapRequestDtos)
      .then((res) => {
        // console.log("resres", res);

        return res.data;
      });
    // console.log("[IN AXIOS] get Cards", response);
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] get card error : ", error);
  }
};
