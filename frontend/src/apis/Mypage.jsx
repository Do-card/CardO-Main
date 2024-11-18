import axios from "./Axios";

export const getTransactionAll = async () => {
  try {
    const response = await axios.get("/transactions").then((res) => {
      return res.data;
    });
    // console.log("[IN AXIOS] mypage get transaction all", response);
    return response;
  } catch (error) {
    // console.error("get transaction all fail : ", error);
  }
};
