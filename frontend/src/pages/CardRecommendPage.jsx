import { css } from "@emotion/css";
import CardInfo from "../components/CardInfo";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getRecommends } from "../apis/Recommend";

function CardRecommendPage() {
  const [cardInfo, setCardInfo] = useState();

  useEffect(() => {
    getRecommendCard();
  }, []);

  const getRecommendCard = async () => {
    const response = await getRecommends().then((res) => {
      if (res) {
        const updatedCardInfo = res.result.map((item) => {
          return {
            ...item,
            card: {
              ...item.card,
              cardNo: "0000000000000000",
              cardExpiryDate: "00000000",
              colorBackground: item.colorBackground,
              colorTitle: item.colorTitle,
              cvc: "000,",
            },
          };
        });
        // console.log("[PAGE] card info : ", updatedCardInfo);
        return updatedCardInfo;
      }
    });
    setCardInfo(response);
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
          width: 100%;
          padding-top: 2rem;
          padding-left: 4rem;
          display: flex;
          float: left;
          font-size: 2.5rem;
          font-weight: bold;
        `}
      >
        Recommends
      </div>

      <div
        className={css`
          margin: 2rem 0;
          font-size: 1.3rem;
          text-align: center;
          color: #555555;
          font-weight: 700;
        `}
      >
        당신의 소비 패턴을 기반으로
        <br />
        추천해드리는 카드입니다.
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 85%;
          height: 62%;
        `}
      >
        {cardInfo &&
          cardInfo.map((info, index) => <CardInfo key={index} data={info} />)}
        <div
          className={css`
            background-color: #b0ffa3;
            width: 100%;
            height: 7rem;
            border-radius: 0.5rem;
            padding: 0.5rem;
            box-sizing: border-box;
          `}
        >
          <div
            className={css`
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-radius: 0.4rem;
              border: solid 0.15rem #ffffff;
              padding: 0 1rem;
              box-sizing: border-box;
            `}
          >
            <div
              className={css`
                font-size: 1.4rem;
                font-weight: 800;
              `}
            >
              이번달 카드값
              <br /> 얼마 나왔어?
            </div>
            <img src="/advertise.svg" alt="" />
          </div>
        </div>
      </div>
      <NavBar isSelected={"User"} />
    </div>
  );
}

export default CardRecommendPage;
