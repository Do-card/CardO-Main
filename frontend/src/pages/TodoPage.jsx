import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import NavBar from "../components/NavBar";
import { getAllMarkers, useAddMarker, getAllFavoriteMarkers, useDeleteMarker } from "../apis/Todo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Toggle } from "../components/Toggle";
import ConfirmModal from "../components/ConfirmModal"

function TodoPage() {
  const navigator = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [limit, _] = useState(10);
  const [isAll, setIsAll] = useState(true);
  const [isKeywordEmpty, setIsKeywordEmpty] = useState(true);
  const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isChangeLocationConfirmModalOpen, setIsChangeLocationConfirmModalOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(0);
  const [changeTodoId, setChangeTodoId] = useState(0);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const addNewMarker = useAddMarker();
  const deleteMarker = useDeleteMarker();

  const [ref, inView] = useInView();

  const colors = ["#FFFFFF", "#F9FFDE", "#EAF6FD", "#FFF9D2", "#FFEEE7", "#E8DBFF"];

  const { data: todoFavList } = useQuery({
    queryKey: ["todoFavList"],
    queryFn: async () => {
      const response = await getAllFavoriteMarkers();
      return response;
    },
  });

  useEffect(() => {
    const handleResize = () => {
      // 창 높이가 줄어들면 키보드가 열렸다고 가정
      if (window.innerHeight < 600) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    isfetching,
    fetchNextPage,
    data: todoList,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["todoList"],
    queryFn: async ({ pageParam }) => {
      const response = await getAllMarkers(keyword, pageParam.pageParam, limit);
      return response;
    },
    initialPageParam: {
      pageParam: 0,
    },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length > 0) {
        return {
          pageParam: lastPage[lastPage.length - 1].id,
        };
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsKeywordEmpty(keyword.length === 0);
      refetch();
    }
  };

  const handleNewMarker = () => {
    const data = {
      name: "",
      colorBackground: colors[Math.floor(Math.random() * 6)],
    };
    addNewMarker.mutate({ data: data });
    setIsCreateAlertModalOpen(true);
    refetch();
  };

  const handleToggle = () => {
    setIsAll(!isAll);
  };

  const handleDeleteMarker = () => {
    deleteMarker.mutate({ id: deleteTodoId });
    setIsDeleteConfirmModalOpen(false);
  }

  const handleCancelDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
  }

  const handleDeleteConfirmModalOpen = () => {
    setIsDeleteConfirmModalOpen(true);
  }

  const handleCreateAlert = () => {
    setIsCreateAlertModalOpen(false);
  }

  const handleChangeLocationConfirmModalOpen = () => {
    setIsChangeLocationConfirmModalOpen(true);
  }

  const handleChangeLocation = () => {
    navigator("/addloc", { state: { TodoId: changeTodoId } });
  }

  const handleCancelChangeLocationConfirmModal = () => {
    setIsChangeLocationConfirmModalOpen(false);
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f6f6f6;
        height: 100vh;
        padding: 0 2rem;
      `}
    >
      <ConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        setShowModal={setIsDeleteConfirmModalOpen}
        message="정말 삭제할까요?"
        onConfirm={() => handleDeleteMarker()}
        onCancel={() => handleCancelDeleteConfirmModal()}
      />
      <ConfirmModal
        isOpen={isCreateAlertModalOpen}
        setShowModal={setIsCreateAlertModalOpen}
        message="생성되었습니다!"
        onCancel={() => handleCreateAlert()}
      />
      <ConfirmModal
        isOpen={isChangeLocationConfirmModalOpen}
        setShowModal={setIsChangeLocationConfirmModalOpen}
        message="위치를 변경하시겠습니까?"
        onConfirm={handleChangeLocation}
        onCancel={handleCancelChangeLocationConfirmModal}
      />
      <div
        className={css`
          width: 100%;
          padding-top: 2rem;
          display: flex;
          align-items: baseline;
        `}
      >
        <div
          className={css`
            float: left;
            font-size: 2.5rem;
            font-weight: bold;
            cursor: Default;
          `}
        >
          Todo
        </div>
        <div
          className={css`
            margin-left: 1rem;
            display: flex;
            align-items: center;
          `}
        >
          <Toggle onClick={handleToggle} isAll={isAll} />
        </div>
      </div>
      <div
        className={css`
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 1rem;
        `}
      >
        <img
          src="/Add.svg"
          alt=""
          className={css`
            position: absolute;
            right: 0;
            top: -3.5rem;
            cursor: pointer;
          `}
          onClick={() => handleNewMarker()}
        />
        <input
          type="text"
          className={css`
            top: 1.5rem;
            width: 90%;
            height: 2.5rem;
            padding-inline: 1rem;
            border-radius: 0.8rem;
            border: solid #d9d9d9 0.1rem;
            box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
            font-size: 1.2rem;
            color: #474747;
            &:focus {
              outline: none;
            }
          `}
          onKeyDown={handleKeyDown}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <img
          src="/search.svg"
          alt=""
          className={css`
            position: absolute;
            right: 1rem;
          `}
        />
      </div>
      <div
        className={css`
          margin-top: 1rem;
          width: 100%;
          height: 65vh;
          overflow: scroll;
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {isKeywordEmpty && todoFavList?.map((data) => (
          <div key={data.id}>
            {!isAll && data.isComplete
            ? <></>
            : <TodoCard
                Todo={data}
                isAll={isAll}
                onDelete={handleDeleteConfirmModalOpen}
                setIdOnDelete={setDeleteTodoId}
                onChangeLocation={handleChangeLocationConfirmModalOpen}
                setIdOnChangeLocation={setChangeTodoId}
              />}
          </div>
        ))}
        {todoList?.pages.map((page) =>
          page.map((data) => (
            <div key={data.id}>
              {(!isAll && data.isComplete) || (!isKeywordEmpty && data.items.length === 0)
              ? <></>
              : <TodoCard
                  Todo={data}
                  isAll={isAll}
                  onDelete={handleDeleteConfirmModalOpen}
                  setIdOnDelete={setDeleteTodoId}
                  onChangeLocation={handleChangeLocationConfirmModalOpen}
                  setIdOnChangeLocation={setChangeTodoId}
                />}
            </div>
          ))
        )}
        {todoList && <div ref={ref}></div>}
      </div>
      {isKeyboardOpen ? <></> : <NavBar isSelected={"Todo"} />}
    </div>
  );
}
export default TodoPage;
