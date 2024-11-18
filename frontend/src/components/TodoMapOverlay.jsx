import { css } from "@emotion/css";
import { useState } from "react";

const TodoMapOverlay = ({ Todo }) => {
  const [open, setOpen] = useState(false);
  // console.log("[Todo Map Overlay]", Todo);

  return (
    <div
      className={css`
        width: 9rem;
        ${Todo.duplicate ? "top:2.3rem;" : ""}
        position: relative;
      `}
    >
      <div
        className={css`
          width: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #bdff72;
          box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 1rem;
          padding-block: 0.3rem;
          padding-inline: 0.6rem;
          box-sizing: border-box;
          z-index: 1;
        `}
      >
        <div>Todo !</div>
        {open ? (
          <img
            src="/arrow_drop_up.svg"
            alt=""
            className={css`
              cursor: pointer;
            `}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <img
            src="/arrow_drop_down.svg"
            alt=""
            className={css`
              cursor: pointer;
            `}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>
      {open ? (
        <div
          className={css`
            position: absolute;
            width: 100%;
            background-color: white;
            padding: 1.5rem 0.5rem 0.5rem;
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
            box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
            top: 1rem;
            z-index: 0;
            box-sizing: border-box;
          `}
        >
          {Todo?.items.map((item, index) => (
            <div
              key={index}
              className={css`
                width: 100%;
                display: flex;
                justify-content: start;
              `}
            >
              <img
                src="/checked.svg"
                alt=""
                className={css`
                  width: 0.9rem;
                  margin-right: 0.4rem;
                  margin-left: 0.2rem;
                `}
              />
              <div
                className={css`
                  color: black;
                `}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoMapOverlay;
