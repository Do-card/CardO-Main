import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePatchFavorite, usePatchItem, usePostItem } from "../apis/Todo";
import AdjustInput from "./AdjustInput";

function TodoCard({ Todo, isAll, onDelete, setIdOnDelete, onChangeLocation, setIdOnChangeLocation }) {
  const navigator = useNavigate();
  const updateFavorite = usePatchFavorite();
  const checkItem = usePatchItem();
  const addItem = usePostItem();
  const [value, setValue] = useState("");

  const ToLocation = (name) => {
    if (name) {
      setIdOnChangeLocation(Todo.id);
      onChangeLocation();
    } else {
      // 위치 추가 페이지로
      navigator("/addloc", { state: { TodoId: Todo.id } });
    }
  };

  const handleCompleteItem = (index) => {
    checkItem.mutate({ id: index });
  };

  const handleFavorite = () => {
    const data = {
      isFavorite: !Todo.isFavorite,
    };
    updateFavorite.mutate({ id: Todo.id, data: data });
  };

  const handleEnterDown = (e) => {
    if (e.key === "Enter") {
      const data = {
        markerId: Todo.id,
        name: e.target.value,
      };
      addItem.mutate({ data: data });
      setValue("");
    }
  };

  const handleOnBlurItem = (e) => {
    const data = {
      markerId: Todo.id,
      name: e.target.value,
    };
    addItem.mutate({ data: data });
    setValue("");
  };

  const handleDelete = () => {
    setIdOnDelete(Todo.id);
    onDelete();
  };

  return (
    <div
      className={css`
        width: 100%;
        position: relative;
        margin-top: 1rem;
      `}
    >
      {/* 삭제 버튼 */}
      <img
        src="/X.svg"
        alt=""
        className={css`
          position: absolute;
          right: 0.5rem;
          width: 1.5rem;
          cursor: pointer;
        `}
        onClick={() => handleDelete()}
      />

      {/* ToDo 파일 */}
      <div
        className={css`
          width: 100%;
        `}
      >
        {/* Todo Header */}
        <div
          className={css`
            display: flex;
            align-items: end;
          `}
        >
          <div
            className={css`
              display: inline-flex;
              align-items: center;
              background-color: ${Todo.colorBackground};
              padding-left: 0.5rem;
              padding-right: 1rem;
              padding-block: 0.3rem;
              border-top-right-radius: 0.7rem;
              border-top-left-radius: 0.7rem;
            `}
          >
            {/* 즐겨찾기 여부 */}
            {Todo.isFavorite ? (
              <img
                className={css`
                  cursor: pointer;
                `}
                onClick={() => handleFavorite()}
                src="/star_filled.svg"
                alt=""
              />
            ) : (
              <img
                className={css`
                  cursor: pointer;
                `}
                onClick={() => handleFavorite()}
                src="/star_grey.svg"
                alt=""
              />
            )}
            {/* Todo 카테고리 이름 */}
            <div>
              <AdjustInput name={Todo.name} todoId={Todo.id}></AdjustInput>
            </div>
          </div>
          <div
            className={css`
              content: "";
              height: 10px;
              width: 10px;
              background: radial-gradient(
                circle at top right,
                transparent 70%,
                ${Todo.colorBackground} 50%
              );
            `}
          ></div>
          {/* 위치 */}
          <div
            className={css`
              color: #959595;
              font-size: 0.8rem;
              font-weight: 500;
              margin-left: 0.5rem;
              margin-bottom: 0.5rem;
              /* max-width: 8rem; */
              cursor: pointer;
            `}
            onClick={() => ToLocation(Todo.poiName)}
          >
            {/* 위치 있으면 위치 이름 띄우고 없으면 위치 추가 */}
            {Todo.poiName ? Todo.poiName : "위치 추가"}
          </div>
        </div>
        <div
          className={css`
            background-color: ${Todo.colorBackground};
            border-bottom-left-radius: 0.7rem;
            border-bottom-right-radius: 0.7rem;
            border-top-right-radius: 0.7rem;
            padding: 1rem 0.8rem;
            box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
          `}
        >
          {/* Todo List */}
          {Todo?.items.map((todo, index) => (
            <div key={index}>
              {!isAll && todo.isDone ? (
                <></>
              ) : (
                <div
                  className={css`
                    display: flex;
                    margin-bottom: 0.5rem;
                  `}
                  onClick={() => handleCompleteItem(todo.id)}
                >
                  <img src={todo.isDone ? "/CompletedItem.svg" : "/UncompletedItem.svg"} alt="" />
                  <div
                    className={css`
                      margin-left: 0.5rem;
                      ${todo.isDone ? "text-decoration: line-through; color: #626262;" : ""}
                    `}
                  >
                    {todo.name}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Todo 추가 */}
          <input
            type="text"
            placeholder="추가..."
            className={css`
              outline: none;
              border: none;
              font-size: 1rem;
              margin-top: 0.3rem;
              color: #959595;
              background-color: transparent;
            `}
            onKeyDown={handleEnterDown}
            onBlur={handleOnBlurItem}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default TodoCard;
