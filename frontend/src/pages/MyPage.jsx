import { css } from "@emotion/css";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import ExpenditureCard from "../components/ExpenditureCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getTransactionAll } from "../apis/Mypage";
import { logout } from "../apis/Login";
import SquareButton from "../components/Button/SquareButton";

function MyPage() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [cardNameList, setSelectedCardNameList] = useState([
    { value: 0, label: "전체" },
  ]);

  const [data, setData] = useState(null);

  const getTransaction = async () => {
    const card = await getTransactionAll();
    setTransaction(card);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  
    getTransaction();

    // 컴포넌트 언마운트 시 차트를 삭제
    return () => {
      chartInstance.current.destroy();
    };
  }, []);

  //결제 내역
  useEffect(() => {
    if (transaction !== null) {
      setSelectedCardNameList(
        transaction.result.cardNameList.map((name, index) => {
          return {
            value: index,
            label: name,
          };
        })
      );

      const newData = {
        labels: transaction.result.categoryList.map(
          (category) => category.name
        ),
        datasets: [
          {
            label: "소비 금액",
            data: transaction.result.categoryList.map(
              (category) => category.balance
            ),
            backgroundColor: [
              "rgba(255, 230, 220, 100)",
              "rgba(244, 255, 190, 100)",
              "rgba(186, 205, 255, 100)",
              "rgba(237, 237, 237, 100)",
              // "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgb(251, 184, 157)",
              "rgb(187, 216, 52)",
              "rgb(116, 151, 246)",
              "rgb(198, 198, 198)",
              // "rgb(54, 162, 235)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      setData(newData);
    }
  }, [transaction]);

  //차트 수정
  useEffect(() => {
    chartInstance.current.data = data;
    chartInstance.current.update();
  }, [data]);

  return (
    <div
      className={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #f6f6f6;
      `}
    >
      {loading ? <></> : <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          background-color: #fff;
          padding: 0 2rem;
          justify-content: center;
          font-size: 2rem;
          color: #888;
      `}>
        <img src="/loading.gif"/>
      </div>}
      <div
        className={css`
          width: 100%;
          padding-top: 2rem;
          justify-content: space-around;
          display: flex;
          float: left;
          font-size: 2.5rem;
          font-weight: bold;
        `}
      >
        My Page
        <div className={css`
          width: 6rem;
          display: flex;
          flex-direction: row-reverse;
        `}>
          <SquareButton
            name={"로그아웃"}
            hoverColor={"gray"}
            onClick={()=> logout()}
          />
        </div>
      </div>
      {/* 도넛 차트 */}
      <div
        className={css`
          position: absolute;
          top: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <canvas
          ref={chartRef}
          width="270"
          height="270"
          className={css`
            width: 260px;
            height: 260px;
          `}
        />
      </div>

      {transaction === null || transaction.result.categoryList.length === 0 ? (
        <>
          <div
            className={css`
              position: absolute;
              top: 10vh;
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
              결제내역이 존재하지 않습니다.
            </p>
          </div>
        </>
      ) : (
        <div
          className={css`
            position: absolute;
            top: 8.5vh;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          `}
        >
          <p
            className={css`
              padding: 10px;
              margin-top: 1rem;
              font-size: 0.8rem;
            `}
          >
            소비패턴을 기반으로 카드를 추천 받으시겠어요?
          </p>
          <button
            className={css`
              display: flex;
              border-radius: 0.5rem;
              border-style: none;
              width: fit-content;
              text-align: center;
              justify-content: center;
              color: #ffffff;
              font-weight: 700;
              font-size: 0.8rem;
              padding: 5px;
              background-color: #555555;
              cursor: pointer;
            `}
            onClick={() => navigate("/recommend")}
          >
            카드 추천 받기
          </button>
        </div>
      )}
      {/* 지출 내역 */}
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 50%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 1.5rem 2rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: flex-start;
            margin-bottom: 0.5rem;
          `}
        >
          <div
            className={css`
              width: 10rem;
            `}
          >
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={cardNameList[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name="color"
              options={cardNameList}
              onChange={(e) => setSelectedCardIndex(e.value)}
            />
          </div>
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 72%;

            overflow-y: scroll;

            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-thumb {
              background: rgb(0, 0, 0, 0.1);
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: rgb(0, 0, 0, 0.4);
            }
          `}
        >
          {/* Props로 데이터 넘겨주기 */}
          <ExpenditureCard
            transactionList={
              transaction !== null
                ? transaction.result.transactionList[selectedCardIndex]
                : []
            }
          />
        </div>
      </div>
      <NavBar isSelected={"User"} />
    </div>
  );
}

export default MyPage;
