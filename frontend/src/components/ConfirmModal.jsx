import { css } from "@emotion/css";
import SquareButton from "./Button/SquareButton";

function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className={css`
          position: fixed;
          width: 300px;
          padding: 20px;
          border-radius: 8px;
          background-color: #fff;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          margin: auto;
        `}
      >
        {/* <h2>{title}</h2> */}
        <h3
          className={css`
            margin-bottom: 2rem;
          `}
        >
          {message}
          </h3>
        <div
          className={css`
            display: flex;
            justify-content: center;
            width: ${onConfirm ? "70%" : "40%"};
            gap: 1.2rem;
          `}
        >
          {onConfirm
          ? <SquareButton name="확인" onClick={onConfirm} hoverColor="lightgray" />
          : <></>}
          {onCancel
          ? <SquareButton name={onConfirm ? "취소" : "확인"} onClick={onCancel} hoverColor="lightgray" />
          : <></>}
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
