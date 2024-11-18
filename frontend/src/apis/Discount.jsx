import axios from "./Axios";

export const discountAll = async () => {
  try {
    const response = await axios.get("/discounts/all").then((res) => {
      // console.log("[IN AXIOS] get discount all : ", res.data);
      return res.data;
    });
    return response;
  } catch (error) {}
};

export const discountHistory = async (time) => {
  try {
    // console.log("time", time);
    const response = await axios
      .get(`/discounts?year=${time.year}&month=${time.month}`)
      .then((res) => {
        return res.data;
      });
    // console.log("[IN AXIOS] discount history all", response);
    return response;
  } catch (error) {
    // console.error("discount history all fail : ", error);
  }
};
