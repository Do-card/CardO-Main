import React from "react";
import { css } from "@emotion/css";

function ExpenditureCard({ transactionList = [] }) {
  const displayDate = (dateString) => {
    // 연, 월, 일을 추출
    const month = dateString.slice(4, 6); // '09'
    const date = dateString.slice(6, 8); // '06'

    const formatDate = `${month}-${date}`;
    return formatDate;
  };

  return transactionList.length === 0 ? (
    <div
      className={css`
        display: flex;
        justify-content: center;
        padding: 0.313rem;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <div
          className={css`
            font-weight: 700;
            color: #959595;
            font-size: 1rem;
            padding-top: 0.5rem;
          `}
        >
          결제 내역이 존재하지 않습니다.
        </div>
      </div>
    </div>
  ) : (
    transactionList.map((transaction, key) => (
      <div
        key={key}
        className={css`
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #c6c6c6;
          padding: 0.313rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          `}
        >
          <div
            className={css`
              font-weight: 700;
              color: #959595;
              font-size: 1rem;
            `}
          >
            {transaction.merchantName}
          </div>
          <div
            className={css`
              display: flex;
              justify-content: flex-start;
              width: 10.5rem;
              font-size: 0.9rem;
            `}
          >
            <span
              className={css`
                color: #c6c6c6;
                padding-right: 0.5rem;
              `}
            >
              {displayDate(transaction.transactionDate)}
            </span>
            <span
              className={css`
                font-weight: 600;
                color: ${transaction.colorTitle};
              `}
            >
              {transaction.cardName}
            </span>
          </div>
        </div>
        <div
          className={css`
            text-align: center;
            line-height: 3rem;
            font-size: 1.2rem;
            color: #ee3b24;
          `}
        >
          -{transaction.transactionBalance}
        </div>
      </div>
    ))
  );
}

export default ExpenditureCard;
