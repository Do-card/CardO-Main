import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

function TodoMain({favoriteMarkerName, patterns}) {
  const navigate = useNavigate()

  return (
    <div
      className={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        background-color: #ffffff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        height: 10rem;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          position: relative;
        `}
      >
        <div
          className={css`
            padding-left: 1rem;
            padding-top: 0.2rem;
            display: flex;
            align-items: center;
            width: 100%;
            font-weight: 700;
            color: #002c1b;
            background-color: #e6ffca;
            border-radius: 1rem 0.6rem 0 0;
            font-size: 1.5rem;
            cursor: Default;
          `}
        >
          { favoriteMarkerName }
        </div>
        <div
          className={css`
            position: relative;
            background-color: #e6ffca;
            border-radius: 0 1rem 0 0;
          `}
        >
          <div
            className={css`
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0 1rem 0 0.6rem;
              top: 0;
              right: 0;
              background-color: #ffffff;
              width: 3rem;
              height: 3rem;
            `}
          >
            <img
              src="/move.svg"
              alt=""
              className={css`
                position: parent;
                width: 2rem;
                height: 2rem;
                cursor: pointer;
              `}
              onClick={() => navigate("/todo")}
            />
          </div>
        </div>
      </div>
      <div
        className={css`
          border-radius: 0 0.6rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          background-color: #e6ffca;
          padding: 0 0 1rem 1rem;
          height: 7rem;
          overflow: auto;

          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {patterns.length > 0 ? (
          patterns.map((pattern) => (
            <div
              className={css`
                padding: 5px;
                font-weight: 600px;
                display: flex;
                cursor: pointer;
              `}
              key={pattern.id}
            >
              <div
                className={css`
                  padding-right: 15px;
                  color: #002c1b;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <img
                  src="/checked.svg"
                  alt=""
                  className={css`
                    color: #002c1b;
                    width: 1rem;
                  `}
                />
              </div>
              <div
                className={css`
                  color: #002c1b;
                  font-size: 1.1rem;
                `}
              >
                {pattern.name}
              </div>
            </div>
          ))
        ) : (
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
                color: #6c6c6c;
              `}
            >
              즐겨찾기한 TODO가 없습니다.
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
              onClick={() => navigate("/todo")}
            >
              TODO 등록하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoMain;
