import { css } from "@emotion/css";
import InfoInput from "../components/InfoInput";
import BirthInput from "../components/BrithInput";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../apis/Login";
import { register } from "../apis/SignIn";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState(new Date("2000-01-01"));
  const [isSamePassword, setIsSamePassword] = useState();
  const [signinFail, setSigninFail] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input === password) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  };
  const handlePasswordCheckChange = (e) => {
    const input = e.target.value;
    setPasswordCheck(input);
    if (input === password) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const signIn = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
      nickName: nickname,
      birthday: birthday,
    };

    console.log(data);
    const response = await register(data).then((res) => {
      return res;
    });
    // console.log(response);
    if (response) {
      if (response.success) {
        login();
      } else {
        setSigninFail(true);
      }
    } else {
      setSigninFail(true);
    }
  };

  const login = async () => {
    const data = {
      email: email,
      password: password,
    };
    const response = await Login(data).then((res) => {
      return res;
    });
    if (response) {
      navigate("/mydata");
    } else {
      // console.log("회원가입 중 로그인 실패!");
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
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 90%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <InfoInput
          title={"Email"}
          type={"email"}
          placeholder={"email@example.com"}
          onChange={handleEmailChange}
        />
        <InfoInput
          title={"Password"}
          type={"password"}
          placeholder={"비밀번호 입력"}
          onChange={handlePasswordChange}
        />
        <InfoInput
          title={"Password Check"}
          type={"password"}
          placeholder={"비밀번호 확인"}
          onChange={handlePasswordCheckChange}
        >
          {passwordCheck > 0 &&
            (isSamePassword ? (
              <div
                className={css`
                  position: absolute;
                  font-size: 0.8rem;
                  color: #02a802;
                `}
              >
                비밀번호가 일치합니다.
              </div>
            ) : (
              <div
                className={css`
                  position: absolute;
                  font-size: 0.8rem;
                  color: #ec0101;
                `}
              >
                비밀번호가 일치하지 않습니다.
              </div>
            ))}
        </InfoInput>
        <InfoInput title={"Name"} type={"text"} placeholder={"이름"} onChange={handleNameChange} />
        <InfoInput
          title={"Nickname"}
          type={"text"}
          placeholder={"닉네임"}
          onChange={handleNickname}
        />
        <BirthInput
          title={"Birthday"}
          type={"date"}
          value={birthday}
          placeholder={"생년월일"}
          onChange={handleBirthday}
        />
        {signinFail ? (
          <div
            className={css`
              color: #ec0101;
              font-size: 0.8rem;
              font-weight: 400;
              margin-top: 3rem;
              margin-bottom: 0.5rem;
            `}
          >
            회원가입 실패
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
          name={"완료"}
          onClick={() => {
            signIn();
            // navigate("/mydata");
          }}
        />
      </div>
    </div>
  );
}
export default SignInPage;
