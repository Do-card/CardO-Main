import { css } from "@emotion/css";
import InfoInput from "../components/InfoInput";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../apis/Login";

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [loginFail, setLoginFail] = useState();

  const handelUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    const form = {
      email: userId,
      password: password,
    };
    const response = await Login(form).then((res) => {
      return res;
    });
    if (response) {
      navigate("/");
    } else {
      setLoginFail(true);
    }
  };

  const onEnterDown = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div
      className={css`
        position: relative;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <div
        className={css`
          height: 40vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          className={css`
            width: 60%;
            margin-top: 5rem;
          `}
          src="/Logo.svg"
          alt=""
        />
      </div>
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 55%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <InfoInput
          title={"User Id"}
          type={"text"}
          placeholder={"아이디 입력"}
          onChange={handelUserIdChange}
          onKeyDown={(e) => onEnterDown(e)}
        />
        <InfoInput
          title={"Password"}
          type={"password"}
          placeholder={"비밀번호 입력"}
          onChange={handelPasswordChange}
          onKeyDown={(e) => onEnterDown(e)}
        />
        {loginFail ? (
          <div
            className={css`
              color: #ec0101;
              font-size: 0.8rem;
              font-weight: 400;
              margin-top: 3rem;
              margin-bottom: 0.5rem;
            `}
          >
            로그인 실패
          </div>
        ) : (
          <div
            className={css`
              margin-top: 3rem;
              margin-bottom: 0.5rem;
            `}
          ></div>
        )}
        <SquareButton
          name={"로그인하기"}
          onClick={() => {
            // console.log("UserId:", userId, "Password:", password);
            login();
          }}
        />
        <div
          className={css`
            margin-top: 1rem;
            color: #959595;
            font-size: 0.8rem;
            cursor: Default;
          `}
        >
          아직 회원이 아니신가요?{" "}
          <span
            className={css`
              text-decoration: underline;
              cursor: pointer;
              &:hover {
                color: #b0ffa3;
              }
            `}
            onClick={() => {
              navigate("/signin");
            }}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
