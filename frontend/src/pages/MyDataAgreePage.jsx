import { css } from "@emotion/css";
import MydataText from "../components/MydataText";
import { useEffect, useState } from "react";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function MyDataAgreePage() {
  const [selected, setSelected] = useState(false);

  useEffect(() => {}, [setSelected]);

  const navigate = useNavigate();

  const agreeCheck = () => {
    if (!selected) {
      toast("마이데이터 이용에 동의해주세요", {
        style: {
          borderRadius: "10px",
          background: "#000000",
          color: "#fff",
        },
        duration: 2000,
      });
    } else {
      navigate("/company-select");
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
        <div
          className={css`
            margin-top: 1rem;
            color: #959595;
            text-align: left;
          `}
        >
          <div
            className={css`
              font-size: 1.2rem;
              font-weight: 700;
            `}
          >
            마이데이터 서비스 이용 동의
          </div>
          <div
            className={css`
              font-size: 0.7rem;
              font-weight: 400;
              margin-top: 0.5rem;
            `}
          >
            연결하기 전에 신중하게 고민하고 필요한 서비스만 이용해주세요. <br />
            안쓰는 서비스에서는 언제든지 정보를 지울 수 있어요. <br />
            가입한 마이데이터 서비스는{" "}
            <span
              className={css`
                font-weight: 600;
              `}
              onClick={() =>
                window.open("https://www.mydatacenter.or.kr:3441/")
              }
            >
              종합포털
            </span>
            에서 확인해주세요
          </div>
          <div
            className={css`
              margin-top: 1rem;
              font-size: 1rem;
              font-weight: 700;
            `}
          >
            마이데이터 서비스 이용 약관
          </div>
          <div
            className={css`
              margin-top: 0.5rem;
              font-size: 0.7rem;
              font-weight: 400;
              border: solid #dcdcdc;
              border-radius: 0.5rem;
              width: 100%;
              height: 50vh;
              overflow: scroll;
              -ms-overflow-style: none;
              scrollbar-width: none;
              padding: 0.7rem;
              box-sizing: border-box;
            `}
          >
            <MydataText />
          </div>
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            {selected ? (
              <img
                className={css`
                  width: 1rem;
                  margin: 0.5rem;
                  cursor: pointer;
                `}
                src="/Selected.svg"
                alt=""
                onClick={() => {
                  setSelected(false);
                }}
              />
            ) : (
              <img
                className={css`
                  width: 1rem;
                  margin: 0.5rem;
                  cursor: pointer;
                `}
                src="/Unselected.svg"
                alt=""
                onClick={() => {
                  setSelected(true);
                }}
              />
            )}
            <div
              className={css`
                font-size: 0.8rem;
              `}
            >
              마이데이터 이용 약관에 동의합니다.
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <SquareButton
          name={"다음"}
          onClick={() => {
            agreeCheck();
          }}
          marginTop={"1rem"}
        />
      </div>
    </div>
  );
}
export default MyDataAgreePage;
