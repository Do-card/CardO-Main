import axios from "./Axios";

export const getCards = async () => {
  try {
    const response = await axios.get("/cards").then((res) => {
      return res.data;
    });
    // console.log("[IN AXIOS] get Cards", response);
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] get card error : ", error);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("/users").then((res) => {
      return res.data;
    });
    // console.log("[IN AXIOS] get Users", response);
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] get user error : ", error);
  }
};

export const postRepresentiveCard = async (request) => {
  try {
    const response = await axios.post("/cards/representative", request).then((res) => {
      return res.success;
    });
    // console.log("[IN AXIOS] post representativeCard", response);
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] post representativeCard error : ", error);
  }
}

export const getRepresentiveCard = async () => {
  try {
    const response = await axios.get("/cards/representative").then((res) => {
      return res.data;
    });
    // console.log("[IN AXIOS] get representativeCard", response);
    return response;
  } catch (error) {
    // console.error("[IN AXIOS] get representativeCard error : ", error);
  }
}