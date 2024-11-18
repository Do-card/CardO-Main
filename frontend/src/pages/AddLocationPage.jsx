import { css } from "@emotion/css";
import { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { Map, MapMarker, CustomOverlayMap, useKakaoLoader } from "react-kakao-maps-sdk";
import PlaceInfo from "../components/PlaceInfo";
import { useLocation } from "react-router-dom";
import { getLocalTrend } from "../apis/Todo";

const { kakao } = window;

function AddLocationPage() {
  const info = useLocation();
  const TodoId = info.state.TodoId;

  useKakaoLoader();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState("");

  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mapCenter, setMapCenter] = useState({
    level: 3,
    lat: 33.450701,
    lng: 126.570667,
  });

  const [isMoved, setIsMoved] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const search = () => {
    //console.log("키워드 : " + keyword);
    //console.log("lat : " + mapCenter.lat);
    //console.log("lng : " + mapCenter.lng);
    //console.log("lat : " + kakao.maps.latitude + "," + kakao.maps.longitude);
    if (!map || !keyword) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          //console.log("data : ", data);
          const newData = data.map((place) => ({
            ...place,
            selected: false,
          }));
          setPlaces(newData);
          //console.log("newdata : ", newData);
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
              poi: data[i].id,
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
        } else {
          setPlaces([]);
          setMarkers([]);
        }
      },
      {
        radius: 1000,
        size: 10,
        location: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
    //console.log("markers : ", markers);
    setIsMoved(false);
    setIsSearched(true);
    setTranslateY(220);
  };

  const [startY, setStartY] = useState(310);
  const [translateY, setTranslateY] = useState(220);

  // 터치 이동 시
  const handleTouchMove = (e) => {
    //console.log(e.touches[0].clientY);
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (currentY > 330) {
      setTranslateY(distance);
    }
  };

  // 터치 종료 시
  const handleTouchEnd = (e) => {
    //console.log(e.changedTouches[0].clientY);
    if (e.changedTouches[0].clientY > 450) {
      //console.log("최소화");
      setTranslateY(220);
    } else {
      // 원래 위치로 되돌아가도록 설정
      //console.log("제자리");
      setTranslateY(0);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          setMapCenter((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
        },
        (err) => {
          setCenter((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCenter((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    // console.log("키워드 : " + keyword);
    // console.log("lat : " + mapCenter.lat);
    // console.log("lng : " + mapCenter.lng);
    if (!map || !keyword) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          //console.log("data : ", data);
          const newData = data.map((place) => ({
            ...place,
            selected: false,
          }));
          setPlaces(newData);
          //console.log("newdata : ", newData);
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
              poi: data[i].id,
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          // map.setBounds(bounds);
        } else {
          setMarkers([]);
        }
      },
      {
        radius: 1000,
        size: 10,
        location: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
    //console.log("markers : ", markers);
    setIsMoved(false);
    setIsSearched(true);
    setTranslateY(220);
  }, [map, keyword]);

  useEffect(() => {
    setIsMoved(true);
    //console.log(mapCenter.lat + " " + mapCenter.lng);
  }, [mapCenter]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
      //   return search();
    }
  };
  const selectedPlace = async (index, poiId) => {
    console.log("poiId : ", poiId);

    const response = await getLocalTrend(poiId).then((res) => {
      //console.log(res);
      return res;
    });

    setPlaces((prevPlaces) =>
      prevPlaces.map((place, i) =>
        i === index
          ? { ...place, selected: true, localTrend: response }
          : { ...place, selected: false }
      )
    );

    // console.log("selected!!!!!!!!!!!!", places);
  };

  // const localTrendData = async (poiId) => {
  //   return await getLocalTrend(poiId).then((res) => {
  //     console.log(res);
  //     return res;
  //   });
  // };

  return (
    <div
      className={css`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <Map
        ref={mapRef}
        // center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
        center={center.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        onCreate={setMap}
        // level={3}
        onDragEnd={(map) => {
          const level = map.getLevel();
          const latlng = map.getCenter();
          setMapCenter({
            level: level,
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
          //   search();
        }}
      >
        {markers.map((marker, index) => (
          <MapMarker key={index} position={marker.position}></MapMarker>
        ))}
      </Map>
      <div
        className={css`
          position: absolute;
          top: 1.5rem;
          width: 90%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          z-index: 2;
          justify-content: center;
        `}
      >
        <div
          className={css`
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
          `}
        >
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
              z-index: 2;
              &:focus {
                outline: none;
              }
            `}
            onKeyDown={handleKeyDown}
            // onChange={(e) => setKeyword(e.target.value)}
          />
          <img
            src="/search.svg"
            alt=""
            className={css`
              position: absolute;
              right: 1rem;
              z-index: 2;
            `}
            onClick={() => {
              search();
            }}
          />
        </div>
        <div
          className={css`
            display: ${isMoved && isSearched ? "block" : "none"};
          `}
        >
          <div
            className={css`
              width: 15rem;
              height: 2rem;
              cursor: pointer;
              background-color: #ffffff;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 1rem;
              border-radius: 100px;
              border: 1px solid gray;
            `}
          >
            <span
              onClick={() => {
                search();
              }}
            >
              ↻ 현재 위치에서 다시 검색하기
            </span>
          </div>
        </div>
      </div>
      {places.length > 0 ? (
        <div
          className={css`
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            bottom: 0;
            z-index: 2;
            width: 100%;
            height: 60vh;
            background-color: white;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
            transform: translateY(${translateY}px);
            transition: ${translateY === 0 ? "transform 0.3s ease-out" : "none"};
            user-select: none;
            -webkit-user-drag: none;
          `}
        >
          <div
            className={css`
              width: 100%;
              height: 3rem;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 0.5rem;
            `}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={css`
                width: 30px;
                height: 5px;
                border-radius: 1rem;
                background-color: #d9d9d9;
              `}
            ></div>
          </div>

          <div
            className={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              padding-bottom: 5rem; // 짤리는 거 수정
              box-sizing: border-box;
              overflow: scroll;
              ::-webkit-scrollbar {
                width: 0.4rem;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #dedede; /* 스크롤바 색상 */
                border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
              }
              ::-webkit-scrollbar-corner {
                background-color: transparent;
              }
              ::-webkit-scrollbar-button:vertical:start:increment {
                display: block;
                height: 25px;
              }
            `}
          >
            {places.map((place, index) => (
              <PlaceInfo
                TodoId={TodoId}
                place={place}
                key={index}
                onClick={() => {
                  selectedPlace(index, place.id);}}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <NavBar isSelected={"Todo"} />
    </div>
  );
}

export default AddLocationPage;
