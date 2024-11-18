import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import { useChangeMarkerName } from "../apis/Todo";

const AdjustInput = ({ name, todoId }) => {
  const [value, setValue] = useState(name);
  const [width, setWidth] = useState(0);

  const changeNameFn = useChangeMarkerName();
  const mirrorRef = useRef(null);

  useEffect(() => {
    setWidth(mirrorRef.current.clientWidth + 10);
  }, [value]);

  const changeName = () => {
    const data = {
      name: value,
    };
    changeNameFn.mutate({ id: todoId, data: data });
  };

  const handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      changeName();
    }
  };
  return (
    <>
      <input
        type="text"
        className={css`
          position: relative;
          margin-left: 0.4rem;
          font-size: 1.2rem;
          font-weight: 800;
          width: ${width}px;
          border: none;
          outline: none;
          background-color: transparent;
        `}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => changeName()}
        onKeyDown={handleEnterEvent}
      />
      <div
        className={css`
          position: absolute;
          display: inline-block;
          visibility: hidden;
          height: 0;
          font-size: 1.2rem;
          font-weight: 800;
          margin-left: 0.4rem;
        `}
        ref={mirrorRef}
        aria-hidden="true"
      >
        {value}
      </div>
    </>
  );
};

export default AdjustInput;
