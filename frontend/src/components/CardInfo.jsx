import { css } from "@emotion/css";
import Card from "./Card";

function CardInfo({ data, backgroundColor }) {
  // console.log("[CARD INFO]", data);
  return (
    <div
      className={css`
        background-color: ${backgroundColor ? `${backgroundColor}` : "#ffffff"};
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 7rem;
        margin: 0.2rem;
        border-radius: 0.5rem;
        box-sizing: border-box;
      `}
    >
      <div
        className={css`
          width: 16%;
        `}
      >
        <div
          className={css`
            transform: scale(0.38);
          `}
        >
          <Card data={data.card} />
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          width: 50%;
          margin-right: 0.5rem;
        `}
      >
        <div
          className={css`
            font-size: 1rem;
            font-weight: 600;
            color: #555555;
            margin-bottom: 0.7rem;
          `}
        >
          {data.card.cardName}
        </div>
        <div
          className={css`
            padding: 0 1rem;
            border-left: solid 0.15rem #c6c6c6;
            max-height: 3rem;
          `}
        >
          <div
            className={css`
              max-height: 3.8rem;
              overflow: scroll;
              ::-webkit-scrollbar {
                width: 0.2rem;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #d9d9d9; /* 스크롤바 색상 */
                border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
              }
              ::-webkit-scrollbar-corner {
                background-color: transparent; /* 배경색을 투명하게 설정 */
              }
            `}
          >
            {data.card.cardBenefitsInfo.map((benefit, index) => (
              <div
                key={index}
                className={css`
                  color: #555555;
                  display: flex;
                  width: 85%;
                  justify-content: space-between;
                `}
              >
                <div>{benefit.categoryName}</div>
                <div>{benefit.discountRate}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardInfo;
