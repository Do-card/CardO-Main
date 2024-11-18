import { css } from "@emotion/css";
import { getCardAll } from "../apis/Mydata";
import { useEffect, useState } from "react";
import SquareButton from "../components/Button/SquareButton";
import { sendCard } from "../apis/Mydata";
import { useNavigate } from "react-router-dom";

function CardSelectPage() {
  const [cards, setCards] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getCardList();
  }, []);

  const getCardList = async () => {
    const response = await getCardAll().then((res) => {
      // console.log(res.result);
      if (res) {
        return res.result;
      }
    });
    if (response) {
      await setCards(
        response.map((company) => ({
          ...company,
          isOpen: false,
        }))
      );
    }
  };

  const cardSelect = (e, CompIndex, CardIndex) => {
    e.stopPropagation();
    setCards((prevCards) => {
      const updatedCards = prevCards.map((company, i) =>
        i === CompIndex
          ? {
              ...company,
              cards: company.cards.map((card, ci) =>
                ci === CardIndex
                  ? { ...card, isSelected: !card.isSelected }
                  : card
              ),
            }
          : company
      );

      return updatedCards;
    });
  };

  const openCompany = (index) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((company, i) =>
        i === index
          ? {
              ...company,
              isOpen: !company.isOpen,
            }
          : company
      );
      return updatedCards;
    });
  };

  const selectedCard = async () => {
    const cardsSelected = [];
    cards.map((company) =>
      company.cards.map((card) =>
        cardsSelected.push({ id: card.cardId, isSelected: card.isSelected })
      )
    );
    const data = {
      cardsSelectedInfos: cardsSelected,
    };
    // console.log(data);
    const response = await sendCard(data).then((res) => {
      // console.log(res.success);
      return res.success;
    });
    // console.log(response);
    if (response) {
      navigate("/");
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
            width: 100%;
            color: #959595;
            font-size: 1.2rem;
            font-weight: 700;
          `}
        >
          불러올 카드 선택
        </div>
        <ul
          className={css`
            border: solid 1px #dcdcdc;
            border-radius: 0.8rem;
            width: 100%;
            margin-top: 1rem;
            box-sizing: border-box;
            padding-inline-start: 0;
          `}
        >
          {cards &&
            cards.map(
              (company, CompIndex) =>
                company.isSelected &&
                company.cards.length > 0 && (
                  <li
                    key={CompIndex}
                    className={css`
                      margin-top: 1rem;
                      margin-bottom: 1rem;
                      font-size: 1.2rem;
                      color: #959595;
                      list-style: none;
                      padding-left: 1.3rem;
                      cursor: pointer;
                      &:not(:first-child) {
                        padding-top: 1rem;
                        border-top: 1px solid #dcdcdc;
                      }
                    `}
                    onClick={() => {
                      openCompany(CompIndex);
                    }}
                  >
                    {company.companyName}
                    {company.isOpen && (
                      <div
                        className={css`
                          margin-top: 0.5rem;
                        `}
                      >
                        {company.cards.map(
                          (cardInfo, CardIndex) =>
                            cardInfo && (
                              <div
                                key={CardIndex}
                                className={css`
                                  display: flex;
                                  align-items: center;
                                  font-size: 1.1rem;
                                `}
                              >
                                {cardInfo.isSelected ? (
                                  <img
                                    className={css`
                                      margin: 0.5rem;
                                      cursor: pointer;
                                    `}
                                    onClick={(e) => {
                                      cardSelect(e, CompIndex, CardIndex);
                                    }}
                                    src="/Selected.svg"
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className={css`
                                      margin: 0.5rem;
                                      cursor: pointer;
                                    `}
                                    onClick={(e) => {
                                      cardSelect(e, CompIndex, CardIndex);
                                    }}
                                    src="/Unselected.svg"
                                    alt=""
                                  />
                                )}
                                <div>{cardInfo.cardName}</div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </li>
                )
            )}
        </ul>
        <SquareButton
          name={"다음"}
          marginTop={"3rem"}
          onClick={() => {
            selectedCard();
          }}
        />
      </div>
    </div>
  );
}
export default CardSelectPage;
