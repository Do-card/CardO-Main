import { css } from "@emotion/css";
import { useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import TrendCard from "../components/TrendCard";
import TodoMain from "../components/TodoMain";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { getRepresentiveCard } from "../apis/Main";
import CardModal from "../components/CardModal";
import { getAllFavoriteMarkers } from "../apis/Todo";
import { trendAll } from "../apis/Home";

function HomePage() {
  const [card, setCard] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isSelected, setIsSelected] = useState(10000);
  const navigate = useNavigate();
  const [isTrendLoading, setIsTrendLoading] = useState(false);
  const [isMarkerLoading, seIsMarkerLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoriteMarkerName, setFavoriteMarkerName] = useState("");
  const [patterns, setPatterns] = useState([]);
  const [mainTrend, setMainTrend] = useState([]);
  const [userTrend, setUserTrend] = useState([]);

  const containerClass = css`
    width: 90%;
    background: white;
    border-radius: 1rem;
    padding: 1.3rem;
    margin-bottom: 1rem;
  `;

  useEffect(() => {
    // Fetch data and update pattern groups
    trendAll().then((res) => {
      if (res) {
        setMainTrend(res.result.mainTrend);
        setUserTrend(res.result.userTrend);
      } else {
        console.log("No response received.");
      }
      setIsTrendLoading(true);
    })
    
    getAllFavoriteMarkers().then((res) => {
      if (res?.length > 0) {
        setFavoriteMarkerName(res[0].name)
        setPatterns(res[0].items.filter((item) => !item.isDone && item));
      }
      seIsMarkerLoading(true);
    });

    getRepresentiveCard().then((res) => {
      if (res){
        setCard(res.result);
      }
      setIsCardLoading(true);
    });
  }, []);

  useEffect(() => {
    if (isTrendLoading && isMarkerLoading && isCardLoading){
      setLoading(true);
    }
  }, [isTrendLoading, isMarkerLoading, isCardLoading])

  if(!loading){
    return <div
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
      <NavBar isSelected={"Home"} />
    </div>;
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        background-color: #f6f6f6;
        padding: 2rem 2rem 12rem 2rem;
      `}
    >
      <div
        className={css`
          width: 100%;
          // padding-top: 2rem;
          // padding-left: 4rem;
          padding-bottom: 1rem;
          display: flex;
          float: left;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: Default;
        `}
      >
        Home
      </div>
      {isSelected && showModal && <CardModal setShowModal={setShowModal} data={card}></CardModal>}
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
        `}
      >
        {/* 실시간 소비 트렌드 */}
        <div className={containerClass}>
          <div
            className={css`
              float: left;
              font-size: 1.4rem;
              font-weight: 600;
              padding: 0 0.5rem 0.5rem 0.5rem;
              cursor: Default;
            `}
          >
            실시간 소비 트렌트
          </div>
          <TrendCard mainTrend={mainTrend} userTrend={userTrend} />
        </div>

        {/* 투두 리스트 */}
        <div className={containerClass}>
          <div
            className={css`
              float: left;
              font-size: 1.4rem;
              font-weight: 600;
              padding: 0 0.5rem 0.5rem 0.5rem;
              cursor: Default;
            `}
          >
            TODO LIST
          </div>
          <TodoMain favoriteMarkerName={favoriteMarkerName} patterns={patterns} />
        </div>

        {/* 대표 카드 */}
        <div className={containerClass}>
          <div
            className={css`
              float: left;
              font-size: 1.4rem;
              font-weight: 600;
              padding: 0 0.5rem 0.5rem 0.5rem;
              cursor: Default;
            `}
          >
            대표 카드
          </div>
          {!card ? (
            <div
              className={css`
                margin-top: 0.5rem;
                display: flex;
                width: 100%;
              `}
            >
              <div
                className={css`
                  padding: 1.5rem;
                  height: 11rem;
                  width: 100%;
                  border-radius: 1rem;
                  background-color: #ffffff;
                  color: #6c6c6c;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  box-shadow: 0 0 5px rgb(0, 0, 0, 0.15);
                  box-sizing: border-box;
                  cursor: pointer;
                `}
              >
                <div
                  className={css`
                    font-size: 1.3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: end;
                    width: 100%;
                    height: 100%;
                  `}
                >
                  <span
                    className={css`
                      display: flex;
                      justify-content: center;
                      padding-bottom: 1rem;
                      font-size: 1rem;
                    `}
                  >
                    등록된 카드가 없습니다.
                  </span>
                  <button
                    className={css`
                      background-color: #6c6c6c;
                      color: #ffffff;
                      padding: 0.5rem 1rem;
                      border-radius: 0.5rem;
                      cursor: pointer;
                      font-size: 1rem;
                      width: fit-content;
                      border: none;
                      font-size: 0.8rem;
                      font-weight: 700;
                    `}
                    onClick={() => navigate("/card")}
                  >
                    카드 등록하러 가기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={css`
                display: flex;
                width: 100%;
                position: relative;
                justify-content: center;
              `}
            >
              <Card
                data={card}
                setShowModal={setShowModal}
                isSelected={true}
                isRepresentativeSelected={false}
              />
              <div
                className={css`
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  z-index: 1;
                  top: 1.5rem;
                `}
              >
                <div
                  className={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2.5rem 0.4rem;
                    border-radius: 0 1rem 1rem 0;
                    writing-mode: vertical-lr;
                    color: #555555;
                    background-color: #b0ffa3;
                    box-shadow: 0 0 5px rgb(0, 0, 0, 0.15);
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: Pointer;
                  `}
                  onClick={() => navigate("/card")}
                >
                  카드 관리
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <NavBar isSelected={"Home"} />
    </div>
  );
}

export default HomePage;
