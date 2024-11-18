import { css } from "@emotion/css";

function TrendCard({mainTrend, userTrend}) {
  const truncateText = (text) => {
    return text.length > 7 ? `${text.slice(0, 7)} ..` : text;
  };

  return (
    <div
      className={css`
        display: flex;
        width: 100%;
        border-radius: 1rem;
        background-color: #ffffff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        height: 9.5rem;
        cursor: Default;
      `}
    >
      <div
        className={css`
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          className={css`
            margin-bottom: 5px;
            font-weight: 600;
            color: #555555;
            font-size: 1rem;
          `}
        >
          {userTrend.length > 0 && "나의 소비 패턴"}
        </div>
        <div>
          {userTrend.length == 0 && (
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: #555555;
                font-size: 1rem;
                font-weight: 600;
              `}
            >
              고객님의 소비가 <br /> 없어요
            </div>
          )}
          {userTrend &&
            userTrend.map((pattern, index) => (
              <div
                className={css`
                  padding: 5px;
                  border-bottom: 2px solid #c6c6c6;
                `}
                key={index}
              >
                <span
                  className={css`
                    padding-right: 10px;
                    color: #002c1b;
                    font-weight: 600;
                  `}
                >
                  {pattern.rank}
                </span>
                <span
                  className={css`
                    color: #626262;
                    font-size: 1rem;
                  `}
                >
                  {truncateText(pattern.category)}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div
        className={css`
          width: 50%;
          padding: 10px 0;
          background-color: #e1e9ff;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          className={css`
            margin-bottom: 5px;
            font-weight: 600;
            color: #014886;
          `}
        >
          20대 소비 패턴
        </div>
        <div>
          {mainTrend.map((pattern, index) => (
            <div
              className={css`
                padding: 6px 5px;
                border-bottom: 2px solid #ffffff;
              `}
              key={index}
            >
              <span
                className={css`
                  padding-right: 10px;
                  color: #014886;
                  font-weight: 600;
                `}
              >
                {pattern.rank}
              </span>
              <span
                className={css`
                  font-size: 1rem;
                  color: #626262;
                `}
              >
                {truncateText(pattern.category)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendCard;
