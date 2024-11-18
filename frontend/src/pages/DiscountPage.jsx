import { css } from "@emotion/css";
import NavBar from "../components/NavBar";
import { discountAll, discountHistory } from "../apis/Discount";
import { useEffect, useState } from "react";
import DiscountChart from "../components/DiscountChart";
import { useNavigate } from "react-router-dom";

function DiscountPage() {
  const [discount, setDiscount] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [discountData, setDiscountData] = useState();
  const [cards, setCards] = useState();
  const [filteredData, setFilteredData] = useState(false);
  const [filtered, setFiltered] = useState();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const navigate = useNavigate();

  const labels = ["주유", "대형마트", "교통", "생활"];

  const nextMonth = (to) => {
    if (to > 0) {
      if (month === 12) {
        setYear(year + 1);
        setMonth(1);
      } else {
        setMonth(month + 1);
      }
    } else {
      if (month === 1) {
        setYear(year - 1);
        setMonth(12);
      } else {
        setMonth(month - 1);
      }
    }
    setFiltered(false);
  };

  const getDate = () => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    // console.log(currentDate);
    // console.log(currentDate.getFullYear(), currentDate.getMonth());
  };

  const getDiscountInfo = async () => {
    if (year && month !== undefined) {
      const time = {
        year: year,
        month: month,
      };
      // console.log(time);
      const response = await discountHistory(time).then((res) => {
        // console.log(res.result);
        if (res) {
          return res.result;
        }
      });
      setDiscountData(response);
    }
  };

  useEffect(() => {
    if (year && month !== undefined) {
      getDiscountInfo();
    }
  }, [year, month]);

  useEffect(() => {
    getInfo();
    getDate();
  }, []);

  const getInfo = async () => {
    const discountResponse = await discountAll().then((res) => {
      // console.log("[Main Page] discount response : ", res.result);
      if (res) {
        return res.result;
      }
    });
    setDiscount(discountResponse);
  };

  const selectCard = (index) => {
    const selectedCardName = discountData.cardNames[index];
    const filteredInfo = discountData.discountInfos.filter(
      (info) => info.cardName === selectedCardName
    );
    const filteredResult = {
      ...discountData,
      discountInfos: filteredInfo,
    };
    setSelectedCardIndex(index);
    setFilteredData(filteredResult);
    setFiltered(true);
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
      <img
        className={css`
          position: absolute;
          top: 1.3rem;
          right: 1rem;
          cursor: pointer;
        `}
        src="X.svg"
        alt=""
        onClick={() => navigate("/")}
      />
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
        Credit Report
      </div>
      <div
        className={css`
          background-color: black;
          display: flex;
          flex-direction: column;
          width: 17rem;
          padding: 0 2rem;
          height: 8rem;
          border-radius: 1.3rem;
          align-items: center;
          margin-top: 2rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 1.3rem;
          `}
        >
          <div
            className={css`
              color: white;
              font-size: 1.2rem;
            `}
          >
            이번달 받은 혜택
          </div>
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.2rem;
            font-weight: 600;
            height: 60%;
          `}
        >
          총{" "}
          {discount &&
            discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 65%;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 1rem;
          `}
        >
          <img
            src="/LeftArrow.svg"
            alt=""
            onClick={() => nextMonth(-1)}
            className={css`
              cursor: pointer;
            `}
          />
          <div
            className={css`
              color: #6c6c6c;
              font-size: 1.7rem;
              font-weight: 700;
            `}
          >
            {year}. {month}.
          </div>
          <img
            src="/RightArrow.svg"
            alt=""
            onClick={() => nextMonth(1)}
            className={css`
              cursor: pointer;
            `}
          />
        </div>
        <div
          className={css`
            width: 100%;
            display: flex;
          `}
        >
          <div
            className={css`
              --height: 2rem;
              background-color: ${!filtered ? "#979797" : "#f6f6f6"};
              line-height: var(--height);
              height: var(--height);
              padding: 0 1rem;
              margin-right: 0.5rem;
              border-radius: 1rem;
              color: ${!filtered ? "#f6f6f6" : "#979797"};
              box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
              cursor: pointer;
            `}
            onClick={() => setFiltered(false)}
          >
            전체
          </div>
          <div
            className={css`
              width: 75%;
              height: 2.6rem;
              display: flex;
              overflow: scroll;
              ::-webkit-scrollbar {
                display: none;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #979797; /* 스크롤바 색상 */
                border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
              }
            `}
          >
            {discountData &&
              discountData.cardNames.map((card, index) => (
                <div
                  key={index}
                  className={css`
                    --height: 2rem;
                    background-color: ${filtered && selectedCardIndex === index
                      ? "#979797"
                      : "#f6f6f6"};
                    line-height: var(--height);
                    height: var(--height);
                    white-space: nowrap;
                    padding: 0 1rem;
                    margin-right: 0.5rem;
                    border-radius: 1rem;
                    cursor: pointer;
                    color: ${filtered && selectedCardIndex === index
                      ? "#f6f6f6"
                      : "#979797"};
                    box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
                  `}
                  onClick={() => selectCard(index)}
                >
                  {card}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* 누적 막대 차트 */}
      <div
        className={css`
          position: absolute;
          bottom: 20vh;
          display: flex;
          /* height: 30%; */
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        {discountData && discountData.cardNames.length > 0 ? (
          <DiscountChart data={filtered ? filteredData : discountData} />
        ) : (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 40%;
            `}
          >
            <img
              src="/Empty.svg"
              className={css`
                width: 7rem;
              `}
              alt=""
            ></img>
            <p
              className={css`
                color: #6b6b6b;
                font-size: 1.2rem;
                font-weight: 600;
              `}
            >
              혜택 내역이 존재하지 않습니다.
            </p>
          </div>
        )}
      </div>
      <NavBar isSelected={"Home"} />
    </div>
  );
}

export default DiscountPage;
