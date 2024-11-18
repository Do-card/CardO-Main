import axios from "./Axios";

export const trendAll = async () => {
  try {
    const response = await axios.get("/items/trend").then((res) => {
      // console.log("[IN AXIOS] get discount all : ", res.data);
      return res.data;
    });
    return response;
  } catch (error) {}
};