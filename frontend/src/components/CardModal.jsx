import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";
import BarcodeItem from "./BarcodeItem";

function CardModal({ setShowModal, data }) {
  // console.log("[MODAL DATA]", data);

  const handleScroll = (event) => {
    event.stopPropagation(); // 스크롤 이벤트 전파 중단
  };

  const lightenColor = (hex, percent) => {
    // HEX를 RGB로 변환
    const hexToRgb = (hex) => {
      hex = hex.replace("#", "");
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    // RGB 값을 HEX로 변환
    const rgbToHex = (r, g, b) => {
      const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    };

    // 색상을 밝게 만드는 함수
    const [r, g, b] = hexToRgb(hex);
    const newR = Math.min(255, r + (255 - r) * percent);
    const newG = Math.min(255, g + (255 - g) * percent);
    const newB = Math.min(255, b + (255 - b) * percent);

    // 밝아진 색을 다시 HEX로 변환하여 반환
    return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
  };

  const lighterColor = lightenColor(data.colorBackground, 0.5);

  return (
    <div
      className={css`
        position: absolute;
        background-color: rgb(0, 0, 0, 0.2);
        width: 100%;
        height: 100vh;
        z-index: 2;
      `}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowModal(false);
        }
      }}
    >
      <div
        className={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 17.56rem;
          padding: 0 2rem;
          height: 13.627rem;
          border-radius: 1rem;
          background-color: ${lighterColor};
          color: ${data.colorTitle};
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            border-bottom: solid 0.2rem ${data.colorTitle};
            padding: 1rem 0;
          `}
        >
          <div
            className={css`
              font-size: 1.5rem;
            `}
          >
            {data.cardName}
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={()=> setShowModal(false)}
          >
            <circle cx="15.75" cy="15.75" r="14.75" stroke={data.colorTitle} strokeWidth="2" />
            <path
              d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
              stroke={data.colorTitle}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          className={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: scroll;

            ::-webkit-scrollbar {
              width: 0.4rem;
            }
            ::-webkit-scrollbar-thumb {
              background-color: ${data.colorTitle}; /* 스크롤바 색상 */
              border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
            }
            ::-webkit-scrollbar-corner {
              background-color: transparent; /* 배경색을 투명하게 설정 */
            }
          `}
          onWheel={handleScroll}
        >
          <BarcodeItem
            barcodeNumber={data.cardNo}
            bgColor={lighterColor}
            colorText={data.colorTitle}
          />
          <div
            className={css`
              font-size: 1.2rem;
              font-weight: 800;
              width: 100%;
            `}
          >
            카드 혜택
          </div>
          <div
            className={css`
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
            `}
          >
            {data.cardBenefits.map((benefit) => (
              <div
                className={css`
                  width: 50%;
                  display: flex;
                  flex-direction: row;
                  margin: 0.3rem 0;
                `}
              >
                <div
                  className={css`
                    width: 60%;
                  `}
                >
                  {benefit.merchantCategory || benefit.categoryName}
                </div>
                <div
                  className={css`
                    width: 40%;
                    font-weight: 800;
                  `}
                >
                  {benefit.discountRate}%
                </div>
              </div>
            ))}
          </div>
          <div
            className={css`
              width: 100%;
              display: flex;
            `}
          >
            <div
              className={css`
                width: 50%;
              `}
            >
              <div
                className={css`
                  font-size: 1.2rem;
                  font-weight: 800;
                `}
              >
                전월실적
              </div>
              <div
                className={css`
                  width: 100%;
                  margin: 0.3rem 0;
                `}
              >
                최소 30만원
              </div>
            </div>
            <div
              className={css`
                width: 50%;
              `}
            >
              <div
                className={css`
                  font-size: 1.2rem;
                  font-weight: 800;
                `}
              >
                연회비
              </div>
              <div
                className={css`
                  width: 100%;
                  margin: 0.3rem 0;
                  font-size: 1rem;
                `}
              >
                국내 전용 10,000원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
