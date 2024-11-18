import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "./Axios";

// 즐겨찾기된 모든 마커 조회(무한 스크롤 X)
export const getAllFavoriteMarkers = async () => {
  try {
    const response = await axios.get("/markers/favorite/all").then((res) => {
      // console.log("[Get All Favorite Markers] : ", res.data.result);
      return res.data.result;
    });
    return response;
  } catch (error) {
    console.log("getting all favorite markers failed", error);
  }
};

// 즐겨찾기 안된 모든 마커 조회(무한 스크롤) (키워드 존재 시 즐겨찾기 포함)
export const getAllMarkers = async (keyword, pageParam, limit) => {
  try {
    console.log("pageParam : ", pageParam);
    const response = await axios
      .get(
        `/markers/all?${keyword ? "keyword=" + keyword + "&" : ""}${
          pageParam > -1 ? "lastId=" + pageParam + "&" : ""
        }${limit ? "limit=" + limit : ""}`
      )
      .then((res) => {
        console.log("[Todo all response] ", res.data.result.content);
        return res.data.result.content;
      });
    return response;
  } catch (error) {
    console.error("getting todo list failed : ", error);
  }
};

export const addMarker = async (data) => {
  try {
    console.log("add data : ", data);
    await axios.post("/markers", data).then((res) => {
      console.log("[add New Marker Axios] : ", res);
    });
  } catch (error) {
    console.error("add marker error");
  }
};

export const useAddMarker = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => addMarker(params.data),
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

export const deleteMarker = async (id) => {
  try {
    await axios.delete(`/markers/${id}`).then((res) => {
      console.log("[Delete Marker] ", res);
    });
  } catch (error) {
    console.error(error);
  }
};

export const useDeleteMarker = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => deleteMarker(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries("todoFavList");
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

export const patchMarkerName = async (id, data) => {
  try {
    await axios.patch(`markers/${id}/style`, data).then((res) => {
      console.log("[Patch Marker Name] : ", res);
    });
  } catch (error) {
    console.error("[Patch Marker Name failed] : ", error);
  }
};

export const useChangeMarkerName = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => patchMarkerName(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries("todoFavList");
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

export const patchFavorite = async (id, data) => {
  try {
    await axios.patch(`/markers/${id}/favorite`, data).then((res) => {
      console.log("[Change Favorite]", res);
    });
  } catch (error) {
    console.error("patch Favorite error : ", error);
  }
};

export const usePatchFavorite = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => patchFavorite(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries("todoFavList");
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

//========================marker 장소 추가========================
export const patchLocation = async (id, data) => {
  try {
    // console.log("data!!!!!!!!!!!!!!!!!", data);
    await axios.patch(`/markers/${id}/location`, data).then((res) => {
      console.log("[Patch Location Success] ", res);
    });
  } catch (error) {
    console.error("Patch Location failed : ", error);
  }
};

export const usePatchLocation = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => patchLocation(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries("todoFavList");
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

//========================item 관리===============================

export const postItem = async (data) => {
  try {
    //console.log("!!!!!!!!!!!", data);
    if (data.name !== "") {
      const response = await axios.post("/items", data).then((res) => {
        console.log("[Post Item Success]", res);
      });
    }
  } catch (error) {
    console.error("post item failed : ", error);
  }
};

export const usePostItem = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => postItem(params.data),
    onSuccess: () => {
      queryClient.invalidateQueries("todoFavList");
      queryClient.invalidateQueries("todoList");
    },
  });
  return mutate;
};

export const patchItem = async (id) => {
  try {
    const resonse = await axios.patch(`/items/${id}`).then((res) => {
      console.log("[patch Item Success] : ", res);
    });
  } catch (error) {
    console.error("[patch item failed]", error);
  }
};

export const usePatchItem = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (params) => patchItem(params.id),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries("todoFavList"),
        queryClient.invalidateQueries("todoList"),
      ]);
    },
  });
  return mutate;
};

//=========================Todo Map ES======================
export const getLocalTrend = async (poiId) => {
  try {
    const response = await axios.get(`/items/local-trend?poiId=${poiId}`).then((res) => {
      //console.log(`[Get Local Trend] : ${poiId}`, res.data.result);
      return res.data.result;
    });
    return response;
  } catch (error) {
    console.error("getting Local Trend failed : ", error);
    return [];
  }
};
