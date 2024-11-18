import axios from "./Axios";

export const register = async (data) => {
  try {
    // console.log(data);
    const response = await axios.post("/auth/register", data).then((res) => {
    //   console.log(res.data);
      return res.data;
    });
    // console.log("[IN AXIOS] register response : ", response);
    return response;
  } catch (error) {
    // console.error("register failed : ", error);
  }
};
