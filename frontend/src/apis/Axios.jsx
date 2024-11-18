import Axios from "axios";

const DHurl = "http://70.12.246.233:8080";
const DYurl = "http://70.12.247.61:8080/api";
const exurl = "https://j11a107.p.ssafy.io/api";
const url = "https://k11a402.p.ssafy.io/api";

const axios = Axios.create({
  baseURL: url,
});

const renewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return;
  }

  const response = await axios.post("/auth/refresh", { refreshToken });
  if (response.status !== 200) {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // window.location.reload();
    return Promise.reject(response);
  }
  return response.data.result;
};

axios.interceptors.request.use(
  async (request) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (request.url !== "/auth/logout" && request.url.includes("/auth")) {
      return request;
    }

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await renewToken();
      sessionStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      request.headers.Authorization = `Bearer ${newAccessToken}`;
    }
    return request;
  },
  (error) => {
    window.location("/login");
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url !== "/auth/logout" && originalRequest.url.includes("/auth")) {
      return error;
    }

    // Access token 만료 및 401 에러 발생 시 토큰 갱신 시도
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지용 플래그 설정
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await renewToken();
      sessionStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    window.location("/login");
    return error;
  }
);

export default axios;
