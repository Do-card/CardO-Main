import { css } from "@emotion/css";
import { useState } from "react";

export const Toggle = ({ onClick, isAll }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
      onClick={onClick}
    >
      <div
        className={css`
          transition: all 0.3s;
          position: relative;
          width: 62px;
          height: 26px;
          border-radius: 16px;
          outline: none;
          padding: 0 2px;
          cursor: pointer;
          ${isAll ? "background-color: #000000" : "background-color: #D9D9D9"};
        `}
      >
        <div
          className={css`
            transition: all 0.3s;
            display: block;
            width: 19px;
            height: 19px;
            border-radius: 16px;
            margin-top: 3px;
            background-color: white;

            transform: ${isAll ? "translateX(42px)" : "translateX(1px)"};
          `}
        ></div>
        <div
          className={css`
            transition: all 0.3s;
            position: absolute;
            top: 4.5px;
            ${isAll ? "color: #ffffff" : "color: transparent"};
            font-size: 14px;
            padding-left: 10px;
          `}
        >
          전체
        </div>
        <div
          className={css`
            transition: all 0.3s;
            position: absolute;
            top: 5px;
            right: 6px;

            ${isAll ? "color: transparent" : "color: #777777"};
            font-size: 13px;
          `}
        >
          미완료
        </div>
      </div>
    </div>
  );
};
