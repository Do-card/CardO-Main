import axios from "./Axios";

export const getCardAll = async () => {
  try {
    const response = await axios.get("/cards/all").then((res) => {
      return res.data;
    });
    // console.log("[IN AXIOS] mydata get card all", response);
    return response;
  } catch (error) {
    // console.error("get card all fail : ", error);
  }
};

export const sendCompany = async (data) => {
  try {
    // console.log(data);
    const response = await axios.post("/cards/company", data).then((res) => {
      // console.log(res.data);
      return res.data;
    });
    // console.log("[IN AXIOS] send company response", response);
    return response;
  } catch (error) {
    // console.log("send company fail : ", error);
  }
};

export const sendCard = async (data) => {
  try {
    // console.log(data);
    const response = axios.post("/cards/card", data).then((res) => {
      // console.log(res.data);
      return res.data;
    });
    // console.log("[IN AXIOS] send card response", response);
    return response;
  } catch (error) {
    // console.log("send card fail : ", error);
  }
};

export const payment = async (data) => {
  try {
    // console.log(data);
    const response = await axios.post("/transactions", data).then((res) => {
      // console.log(res.data);
      return res.data;
    });
    // console.log("[IN AXIOS] payment response", response);
    return response.result;
  } catch (error) {
    // console.log("payment fail : ", error);
  }
};
