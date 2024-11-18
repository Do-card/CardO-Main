import { css } from "@emotion/css";

function dateToString(date) {
  if (!date){
    return "";
  }

  if (!(date instanceof Date)){
    date = new Date(date);
  }

  return date.getFullYear() +
    "-" +
    (date.getMonth() > 9 ? "" : "0") +
    (date.getMonth() + 1) +
    "-" +
    (date.getDate() > 9 ? "" : "0") +
    date.getDate()
}

function BirthInput({ title, type, placeholder, onChange, children, onKeyDown, value }) {
  const date = dateToString(value);
  const today = dateToString(new Date());

  return (
    <div
      className={css`
        position: relative;
        padding-top: 1rem;
        width: 100%;
      `}
    >
      <div
        className={css`
          color: #959595;
          font-weight: bold;
          font-size: 1.2rem;
          cursor: Default;
        `}
      >
        {title}
      </div>
      <input
        className={css`
          width: 90%;
          border: none;
          border-bottom: solid #959595;
          padding-top: 1rem;
          padding-bottom: 0.3rem;
          font-weight: 600;
          outline: none;
          color: #959595;
          font-size: 0.95rem;
          &:focus {
            border-bottom: solid #b0ffa3;
          }
          &::placeholder {
            font-weight: 600;
            color: #c6c6c6;
          }
        `}
        type={type}
        min="1950-01-01"
        max={today}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={date}
      />
      {children}
    </div>
  );
}
export default BirthInput;
