import { css } from "@emotion/css";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCards, getUser, postRepresentiveCard } from "../apis/Main";
import { discountAll } from "../apis/Discount";
import Card from "../components/Card";
import CardModal from "../components/CardModal";
import SquareButton from "../components/Button/SquareButton";
import { payment } from "../apis/Mydata";
import toast, { Toaster } from "react-hot-toast";

function CardPage() {
  const [isSelected, setIsSelected] = useState(10000);
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const [cards, setCards] = useState();
  const [discount, setDiscount] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [user, setUser] = useState();
  const [isRepresentativeSelected, setIsRepresentativeSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const _addCard = () => {
    navigate("/company-select");
  };

  const _showCard = (key) => {
    setSelectedIndex(key);
    // console.log(index);
    if (isRepresentativeSelected) {
      return;
    }
    if (key === isSelected) {
      setIsSelected(10000);
    } else {
      if (startIndex <= key) {
        setIsSelected(key);
      }
    }
  };

  const _payment = async () => {
    const data = {
      cardNo: "1006113951589939",
      cvc: "859",
      merchantId: 1464,
      paymentBalance: 4800,
    };
    const response = await payment(data);

    notify(response);

    discountAll().then((res) => {
      // console.log("[Main Page] discount response : ", res.result);
      if (res) {
        setDiscount(res.result);
        // return res.result;
      }
    });
  };

  const notify = (data) =>
    toast(
      "결제가 완료됐습니다.\n" +
        "매장명 : " +
        data.merchantName +
        "\n" +
        "결제 금액 : " +
        data.paymentBalance +
        "원\n" +
        "결제 일시 :\n" +
        data.transactionDate.slice(0, 4) +
        "년 " +
        data.transactionDate.slice(4, 6) +
        "월 " +
        data.transactionDate.slice(6, 8) +
        "일\n" +
        data.transactionTime.slice(0, 2) +
        "시 " +
        data.transactionTime.slice(2, 4) +
        "분 " +
        data.transactionTime.slice(4, 6) +
        "초"
    );

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
    getInfo().then(() => setLoading(true));
  }, []);

  useEffect(() => {
    let startY = 0; // 터치 시작 위치
    let endY = 0; // 터치 종료 위치

    const handleScroll = (direction) => {
      if (direction === "down" && cards) {
        setStartIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 3)); // 아래로 스크롤 시 증가
      } else {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 1)); // 위로 스크롤 시 감소
      }
    };

    const handleWheel = (e) => {
      const scrollDirection = e.deltaY > 0 ? "down" : "up"; // deltaY를 이용하여 스크롤 방향 확인
      handleScroll(scrollDirection);
    };

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY; // 터치 시작 위치 저장
    };

    const handleTouchMove = (e) => {
      endY = e.touches[0].clientY; // 터치 이동 위치 저장
    };

    const handleTouchEnd = () => {
      const scrollDirection = endY > startY ? "up" : "down"; // 터치 방향 감지
      handleScroll(scrollDirection);
    };

    window.addEventListener("wheel", handleWheel); // 스크롤 이벤트 등록
    window.addEventListener("touchstart", handleTouchStart); // 터치 시작 이벤트 등록
    window.addEventListener("touchmove", handleTouchMove); // 터치 이동 이벤트 등록
    window.addEventListener("touchend", handleTouchEnd); // 터치 종료 이벤트 등록

    // 페이지 로드 후 처음 스크롤이 자동으로 발생하도록 상태 설정
    setStartIndex(1); // 또는 적절한 값으로 초기 설정

    return () => {
      window.removeEventListener("wheel", handleWheel); // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cards]);

  const getInfo = async () => {
    await getCards().then((res) => {
      // console.log("[Main Page] card response", res.result);
      if (res) {
        const cardsInfos = res?.result.map((card, index) => ({
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

  const saveRadioButton = (cardId) => {
    cards.map((card) => {
      if (card.cardId === cardId) {
        card.isRepresentativeSelected = true;
      } else {
        card.isRepresentativeSelected = false;
      }
    });
  };

  const saveRepresentCard = () => {
    if (isRepresentativeSelected) {
      console.log("api 전송");
      const request = cards.map((card) => ({
        id: card.cardId,
        representativeSelected: card.isRepresentativeSelected,
      }));
      const response = postRepresentiveCard(request);
      console.log("response: ", response);
    }

    setIsRepresentativeSelected(!isRepresentativeSelected);
  };

  if (!loading) {
    return (
      <div
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
        `}
      >
        <img src="/loading.gif" />
        <NavBar isSelected={"Card"} />
      </div>
    );
  }

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
          width: 100%;
          padding-top: 2rem;
          padding-left: 4rem;
          display: flex;
          float: left;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: Default;
        `}
      >
        Card
        <div
          className={css`
            width: 30%;
            margin-left: 5rem;
            margin-right: 3rem;
          `}
        >
          <SquareButton name={"결제"} hoverColor={"lightblue"} onClick={_payment}></SquareButton>
        </div>
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
          margin-top: 2rem;
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
                  cursor: Default;
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
                top: ${isSelected === card.key
                  ? "5rem" // 클릭된 카드는 화면 상단 가까이에 위치
                  : `${(index - startIndex + 2) * 3.5 + (isSelected < card.key ? 11 : 1)}rem`};
                opacity: ${startIndex > card.key ? 0 : 1};
                transition: top 0.3s ease-out, opacity 0.3s ease-out;
              `}
              onClick={() => _showCard(card.key)}
            >
              <Card
                setShowModal={setShowModal}
                isSelected={isSelected}
                data={card}
                isRepresentativeSelected={isRepresentativeSelected}
              />
              {isRepresentativeSelected && (
                <div
                  className={css`
                    display: flex;
                    z-index: 1;
                    position: absolute;
                    top: 10px;
                    right: 1.5rem;
                    width: 1.8rem;
                    height: 1.8rem;
                    border: 2.5px solid ${card.colorTitle};
                    background-color: ${card.colorBackground};
                    border-radius: 50%;
                    justify-content: center;
                    align-items: center;
                  `}
                  onClick={() => {
                    saveRadioButton(card.cardId);
                  }}
                >
                  {card.isRepresentativeSelected && (
                    <div>
                      <div
                        className={css`
                          display: flex;
                          width: 1.5rem;
                          height: 1.5rem;
                          background-color: ${card.colorTitle};
                          border-radius: 50%;
                        `}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      <div
        className={css`
          display: flex;
          position: relative;
          width: 20.5rem;
          float: right;
          justify-content: flex-end;
          align-items: center;
          padding: 1rem 2rem 0rem 1rem;
        `}
      >
        <button
          className={css`
            color: #555555;
            font-size: 1rem;
            font-weight: 600;
            background-color: transparent;
            border: none;
            cursor: pointer;
          `}
          onClick={() => {
            saveRepresentCard(!isRepresentativeSelected);
          }}
        >
          {isRepresentativeSelected ? "저장" : "대표카드 선택"}
        </button>
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
      {isSelected && showModal && (
        <CardModal setShowModal={setShowModal} data={cards[selectedIndex - 1]}></CardModal>
      )}
      <NavBar isSelected={"Card"} />

      <Toaster position="bottom-center" />
    </div>
  );
}
export default CardPage;
