import axios from "./Axios";

export const Login = async (form) => {
  try {
    const response = await axios.post("/auth/login", form);
    const accessToken = response.data.result.accessToken;
    const refreshToken = response.data.result.refreshToken;

    if (accessToken && refreshToken) {
      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const token = JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken });

      await sendTokenToApp(token);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 로그아웃
export const logout = async () => {
  await axios.post("/auth/logout");
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.reload();
};

const sendTokenToApp = async (token) => {
  console.log(token);
  await window.ReactNativeWebView?.postMessage(token);
};
