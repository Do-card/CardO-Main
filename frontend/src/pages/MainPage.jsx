import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import CardModal from "../components/CardModal";
import { getCards, getUser } from "../apis/Main";
import { useNavigate } from "react-router-dom";
import { discountAll } from "../apis/Discount";

function MainPage() {
  const [isSelected, setIsSelected] = useState(10000);
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const [cards, setCards] = useState();
  const [discount, setDiscount] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const _addCard = () => {
    navigate("/company-select");
  };

  const _showCard = (key) => {
    setSelectedIndex(key);
    // console.log(index);
    if (key === isSelected) {
      setIsSelected(10000);
    } else {
      if (startIndex <= key) {
        setIsSelected(key);
      }
    }
  };

  useEffect(() => {
    // console.log("startIndex", startIndex);
    if (startIndex > isSelected) {
      setIsSelected(10000);
    }
  }, [startIndex]);

  useEffect(() => {
    // console.log("isSelected", isSelected);
  }, [isSelected]);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollDirection = e.deltaY > 0 ? "down" : "up"; // deltaY를 이용하여 스크롤 방향을 확인

      if (scrollDirection === "down" && cards) {
        setStartIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 3)); // 아래로 스크롤 시 증가
      } else {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 1)); // 위로 스크롤 시 감소
      }
    };
    window.addEventListener("wheel", handleScroll); // 스크롤 이벤트 등록
    // 페이지 로드 후 처음 스크롤이 자동으로 발생하도록 상태 설정
    setStartIndex(1); // 또는 적절한 값으로 초기 설정

    return () => {
      window.removeEventListener("wheel", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, [cards]);

  const getInfo = async () => {
    await getCards().then((res) => {
      // console.log("[Main Page] card response", res.result);
      if (res) {
        const cardsInfos = res.result.map((card, index) => ({
          ...card,
          key: index + 1,
        }));
        setCards(cardsInfos);
      }
    });
    await discountAll().then((res) => {
      // console.log("[Main Page] discount response : ", res.result);
      if (res) {
        setDiscount(res.result);
        // return res.result;
      }
    });
    await getUser().then((res) => {
      // console.log("[Main Page] user response", res.result);
      if (res) {
        setUser(res.result);
        // return res.result;
      }
    });
  };

  return (
    <div
      className={css`
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f6f6f6;
        position: relative;
      `}
    >
      <div
        className={css`
          font-size: 3.8rem;
          width: 80%;
          font-family: "Pretendard";
          font-weight: 700;
          margin-top: 1.7rem;
        `}
      >
        Hello,
      </div>
      <div
        className={css`
          font-size: 3.2rem;
          width: 80%;
          display: flex;
          justify-content: flex-end;
          font-family: "Pretendard";
          font-weight: 700;
        `}
      >
        {user}
      </div>
      <div
        className={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90%;
          height: 39vh;
          overflow: hidden;
          margin-top: 0.5rem;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 1rem;
          `}
        >
          <div
            className={css`
              width: 20.5rem;
              padding: 0 1.5rem;
              height: 13.627rem;
              border-radius: 1rem;
              background-color: white;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-shadow: 0 0 5px rgb(0, 0, 0, 0.15);
              box-sizing: border-box;
            `}
            // onClick={() => console.log("???")}
          >
            <div
              className={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                border-bottom: solid 0.2rem black;
                padding: 0.9rem 0;
              `}
            >
              <div
                className={css`
                  color: black;
                  font-size: 1.3rem;
                  font-weight: 600;
                `}
              >
                새 카드 등록
              </div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css`
                  cursor: pointer;
                `}
                onClick={_addCard}
              >
                <circle cx="15.75" cy="15.75" r="14.75" stroke="black" strokeWidth="2" />
                <path
                  d="M15.5 7.625V23.375M7.625 15.5H23.375"
                  stroke="#1E1E1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {cards &&
          cards.map((card, index) => (
            <div
              key={index}
              className={css`
                position: absolute;
                top: ${(index - startIndex + 2) * 3.5 + (isSelected < card.key ? 11 : 1)}rem;
                opacity: ${startIndex > card.key
                  ? 0
                  : 1}; /* startIndex와 현재 데이터 key가 같으면 사라짐 */
              `}
              onClick={() => _showCard(card.key)}
            >
              <Card setShowModal={setShowModal} isSelected={isSelected} data={card} />
            </div>
          ))}
      </div>
      <div
        className={css`
          background-color: black;
          display: flex;
          flex-direction: column;
          width: 17rem;
          padding: 0 2rem;
          height: 7.7rem;
          border-radius: 1.3rem;
          align-items: center;
          margin-top: 1.3rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 1.2rem;
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css`
              cursor: pointer;
            `}
            onClick={() => {
              navigate("/discount");
            }}
          >
            <circle cx="15.75" cy="15.75" r="14.75" stroke="white" strokeWidth="2" />
            <path
              d="M9.9375 21.5625L21.5625 9.9375M21.5625 9.9375H9.9375M21.5625 9.9375V21.5625"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.2rem;
            font-weight: 600;
            height: 50%;
          `}
        >
          총 {discount && discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </div>
      </div>
      {/* <div
        className={css`
          position: absolute;
          top: 15rem;
        `}
      >
        <TodoMapOverlay />
      </div> */}
      {isSelected && showModal && (
        <CardModal setShowModal={setShowModal} data={cards[selectedIndex - 1]}></CardModal>
      )}
      <NavBar isSelected={"Home"} />
    </div>
  );
}

export default MainPage;
