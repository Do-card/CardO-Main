import { css } from "@emotion/css";
import { useEffect } from "react";

function Card({ data, setShowModal, isSelected, isRepresentativeSelected }) {
  // console.log(data);

  const _clickArrow = () => {
    if (isSelected) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    console.log("data: ", data);
  }, []);

  return (
    <div
      className={css`
        width: 20.5rem;
        padding: 0.5rem 1.5rem 1rem 1.5rem;
        height: 11rem;
        border-radius: 1rem;
        background-color: ${data.colorBackground};
        color: ${data.colorTitle};
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.15);
        box-sizing: border-box;
        cursor: Default;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom: solid 0.2rem ${data.colorTitle};
          padding: 0.9rem 0;
        `}
      >
        <div
          className={css`
            height: 1.5rem;
            font-size: 1.3rem;
            font-weight: 600;
          `}
        >
          {data.cardName}
        </div>
        {!isRepresentativeSelected ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css`
              cursor: pointer;
            `}
            onClick={_clickArrow}
          >
            <circle cx="15.75" cy="15.75" r="14.75" stroke={data.colorTitle} strokeWidth="2" />
            <path
              d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
              stroke={data.colorTitle}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div
            className={css`
              height: 2rem;
            `}
          ></div>
        )}
      </div>
      <div
        className={css`
          font-size: 1lh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: end;
          width: 100%;
          height: 35%;
        `}
      >
        {data.cardNo.slice(0, 4)} {data.cardNo.slice(4, 8)} {data.cardNo.slice(8, 12)}{" "}
        {data.cardNo.slice(12, 16)}
      </div>
      <div
        className={css`
          font-size: 1.1rem;
          width: 100%;
          text-align: end;
        `}
      >
        CVC {data.cvc}
      </div>
      <div
        className={css`
          font-size: 1.1rem;
          width: 100%;
          text-align: end;
          margin-top: 0.5rem;
        `}
      >
        End Date {data.cardExpiryDate.slice(4, 6)}/{data.cardExpiryDate.slice(2, 4)}
      </div>
    </div>
  );
}

export default Card;
