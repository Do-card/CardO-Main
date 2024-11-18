import React, { useState, useRef, useEffect, useCallback } from "react";
import "../App.css"; // 스타일을 위한 CSS 파일
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { css } from "@emotion/css";
import { getRecommendedCards } from "../apis/Recommend";
import CardInfo from "../components/CardInfo";
import CardModal from "../components/CardModal";
import TodoMapOverlay from "../components/TodoMapOverlay";
import { getMarkersNearby } from "../apis/Map";

const MapPageStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative; /* 메뉴바를 이동시키기 위해 상대적 위치로 설정 */
  //overflow: hidden; /* 스크롤바를 숨김 */
`;

const InputField = styled.input`
  position: absolute;
  top: 1.5rem;
  border: solid #d9d9d9 0.1rem;
  border-radius: 0.5rem;
  width: 90%;
  height: 3rem;
  z-index: 2;
  font-size: 2rem;
  &:focus {
    /* outline: red 1px; */
  }
  box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
`;

// const MenuBar = styled.div`
//   position: absolute;
//   bottom: ${(props) => props.position}px;
//   z-index: 2;
//   width: 100%;
//   height: 100vh;
//   background-color: white;
//   border-top-left-radius: 20px;
//   border-top-right-radius: 20px;
//   box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
//   padding-top: 0.3rem;
// `;

const CategoryContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 2;
`;

const { kakao } = window;

const MapPage = () => {
  // console.log("[MAPPAGE RENDERING]");
  // 초기 정보 받아올 때
  // const [loading, setLoading] = useState(true);

  // 모달 관련 states
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isMenuBarClicked, setIsMenuBarClicked] = useState(false);
  const [nowLocation, setNowLocation] = useState({
    // 현재 사용자의 위치
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [markerSet, setMarkerSet] = useState(new Set());

  const [mapCenter, setMapCenter] = useState({
    lat: 37.554371328,
    lng: 126.9227542239,
  });

  const [markers, setMarkers] = useState([]); // 장소 정보 관리
  const [selectedCategory, setSelectedCategory] = useState("카페");
  const [keyword, setKeyword] = useState(""); // 검색어
  const [clickedPlace, setClickedPlace] = useState(null); // 선택된 장소
  const [todos, setTodos] = useState({});

  useEffect(() => {
    // const initialPosition = -window.innerHeight * 0.8;
    // setPosition(initialPosition);

    // geolocation을 이용해서 접속 위치를 얻어옴
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNowLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          setMapCenter({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
        },
        (err) => {
          setNowLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setNowLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }

    // 맵 중심 위치 현재 위치로 변경
  }, []);

  const clickMenuBar = (e) => {
    e.stopPropagation();
    setIsMenuBarClicked(true);
  };

  //------------ 여기까지 MenuBar 관련 함수 -----------------

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const [map, setMap] = useState();
  const mapRef = useRef(null);
  // const nextButton = useRef(null);

  const removeMarker = () => {
    // for (var i = 0; i < markers.length; i++) {
    //   markers[i].setMap(null);
    // }
    setMarkers([]);
  };

  // 검색 관련 함수
  // useEffect(() => {
  //   console.log("[map]", map);
  //   // if (!map) return;
  //   const ps = new kakao.maps.services.Places();
  //   ps.keywordSearch(keyword, placesSearchCB);
  //   function placesSearchCB(data, status, pagination) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       var bounds = new kakao.maps.LatLngBounds();
  //       console.log("marker data : ", data);
  //       removeMarker();
  //       setMarkers(data);
  //       for (var i = 0; i < data.length; i++) {
  //         // displayMarker(data[i]);
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds);
  //     }
  //   }
  //   // var infowindow = new kakao.maps.InfoWindow({ zIndex: 2 });

  //   // function displayMarker(place) {
  //   //   // 마커를 생성하고 지도에 표시합니다
  //   //   var marker = new kakao.maps.Marker({
  //   //     map: map,
  //   //     position: new kakao.maps.LatLng(place.y, place.x),
  //   //   });
  //   //   // 마커에 클릭이벤트를 등록합니다
  //   //   kakao.maps.event.addListener(marker, "click", function () {
  //   //     setClickedPlace(place);
  //   //   });
  //   //   markers.push(marker);
  //   // }
  //   console.log("kakao ps", ps);
  // }, [map, keyword]);

  //------------ 여기까지 Keyword 관련 함수 -----------------

  const [isMountedNowLocation, setIsMountedNowLocation] = useState(false);
  useEffect(() => {
    // 첫 화면에서 nowLocation이 세팅되면 정보를 가져오게 구현
    if (isMountedNowLocation) {
      getPlacesInWindow();
    } else {
      setIsMountedNowLocation(true);
    }
    // setLoading(false);
  }, [nowLocation]);

  const [isMountedSelectedCategory, setIsMountedSelectedCategory] = useState(false);

  useEffect(() => {
    if (isMountedSelectedCategory) {
      getPlacesInWindow();
    } else {
      setIsMountedSelectedCategory(true);
    }
  }, [selectedCategory]);

  const categoryName2categoryCode = (category) => {
    let categoryCode = null;
    if (category === "카페") {
      categoryCode = "CE7";
    } else if (category === "음식점") {
      categoryCode = "FD6";
    } else if (category === "문화시설") {
      categoryCode = "CT1";
    } else if (category === "대형마트") {
      categoryCode = "MT1";
    } else if (category === "편의점") {
      categoryCode = "CS2";
    } else if (category === "주유소") {
      categoryCode = "OL7";
    } else {
      throw new Error(`Invalid category: ${category}`);
    }
    // console.log("[[categoryCode]]", categoryCode);
    return categoryCode;
  };

  // 현재 위치 기준으로 정보 가져오기
  const getPlacesInWindow = () => {
    var ps = new kakao.maps.services.Places(map);
    let categoryCode = categoryName2categoryCode(selectedCategory);
    // console.log("[ps]", ps);
    ps.categorySearch(categoryCode, setPlacesSearchIW, {
      useMapBounds: true,
      size: 5,
      useMapCenter: true,
    });
    // ps.categorySearch("OL7", addPlacesSearchIW, {
    //   useMapBounds: true,
    //   size: 5,
    // });
  };

  const setPlacesSearchIW = (data, status) => {
    // console.log("[status]", status);
    if (status === kakao.maps.services.Status.OK) {
      //console.log("[PLACE DATA FROM KAKAOMAP API]", data);
      getCardRecommendation(data).then(async (res) => {
        //console.log("[RES]", res);
        const totalList = [];
        const markerSet = new Set();

        const sortDescRes = await res.map((place) => {
          markerSet.add(place.latitude + " " + place.longitude);

          // 새로운 배열로 반환
          //console.log("[place]", place);
          return {
            ...place, // place의 나머지 속성 복사
            cards: place.cards.map((card) => {
              // cards 배열의 각 요소도 복사
              // console.log(card.card.cardDescription);
              // console.log(selectedCategory);
              return {
                ...card, // card의 나머지 속성 복사
                card: {
                  ...card.card, // card.card의 나머지 속성 복사
                  cardDescription: reSortCardDescription(
                    card.card.cardDescription,
                    selectedCategory
                  ), // cardDescription만 수정
                },
              };
            }),
          };
        });
        //
        sortDescRes.map((item) => totalList.push(item));

        const todoRes = await getMarkersNearby({
          latitude: mapCenter.lat,
          longitude: mapCenter.lng,
        }).then((res) => {
          console.log("[Map page todo 찍기]", res);
          return res;
        });
        todoRes.map((item) => {
          item.todo = true;
          if (markerSet.has(item.latitude + " " + item.longitude)) {
            item.duplicate = true;
          }
          return totalList.push(item);
        });

        console.log("[totalList]", totalList);
        totalList.reverse();
        // totalList.push(todoRes);

        setMarkers(totalList);
      });

      // getMarkersNearby({
      //   latitude: mapCenter.lat,
      //   longitude: mapCenter.lng,
      // }).then((res) => {
      //   console.log("[Map page todo 찍기]", res);
      //   setMarkers((prev) => {
      //     if (prev) {
      //       const newlist = {
      //         ...prev,
      //         res,
      //       };
      //       // newlist.push(res);
      //       return newlist;
      //     }
      //   });
      // });
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setMarkers([]);
    }
  };

  // // @deprecated
  // const addPlacesSearchIW = (data, status) => {
  //   if (status === kakao.maps.services.Status.OK) {
  //     // console.log("[PLACE DATA FROM KAKAOMAP API]", data);
  //     getCardRecommendation(data).then((res) => {
  //       let tempMarkers = markers;
  //       for (var i = 0; i < res.length; i++) {
  //         tempMarkers.push(res[i]);
  //       }
  //       setMarkers(tempMarkers);
  //     });
  //   }
  // };

  const getCardRecommendation = async (data) => {
    let mapRequestDtos = { mapRequestDtos: [] };
    for (let i = 0; i < data.length; i++) {
      mapRequestDtos.mapRequestDtos.push({
        name: data[i].place_name,
        merchantCategory: categoryCode2merchantCategory(data[i].category_group_code),
        latitude: Number(data[i].y),
        longitude: Number(data[i].x),
        address: data[i].road_address_name,
        placeUrl: data[i].place_url,
      });
    }
    // console.log("[mapRequestDtos]", mapRequestDtos);
    if (window.sessionStorage.getItem("accessToken")) {
      const res = await getRecommendedCards(mapRequestDtos);
      // console.log("axios response data :", res.result);
      if (res) {
        return res.result;
      }
    }
  };

  const categoryCode2merchantCategory = (categoryCode) => {
    if (categoryCode === "OL7") {
      return "REFUELING";
    } else if (categoryCode === "MT1") {
      return "MARKET";
    } else if (categoryCode === "CS2") {
      return "MARKET";
    } else if (categoryCode === "CE7") {
      return "LIFE";
    } else if (categoryCode === "FD6") {
      return "LIFE";
    } else if (categoryCode === "CT1") {
      return "LIFE";
    }
    return null;
  };

  // useEffect(() => {
  //   console.log("Updated markers:", markers);
  // }, [markers]);

  const merchantCategory2categoryName = (merchantCategory) => {
    if (merchantCategory === "LIFE") {
      return "생활";
    } else if (merchantCategory === "MARKET") {
      return "마트";
    } else if (merchantCategory === "REFUELING") {
      return "주유소";
    } else {
      return merchantCategory;
    }
  };

  const cardMoreCategory2KakaoCategory = (category) => {
    let kakaoCategory = null;
    if (category === "카페") {
      kakaoCategory = "생활";
    } else if (category === "음식점") {
      kakaoCategory = "생활";
    } else if (category === "문화시설") {
      kakaoCategory = "생활";
    } else if (category === "대형마트") {
      kakaoCategory = "마트";
    } else if (category === "편의점") {
      kakaoCategory = "마트";
    } else if (category === "주유소") {
      kakaoCategory = "주유";
    } else {
      throw new Error(`Invalid category: ${category}`);
    }
    return kakaoCategory;
  };

  const reSortCardDescription = (cardDescription, category) => {
    let cardDescriptionList = cardDescription.split(", ");
    const choosed = cardDescriptionList.filter((str) => {
      const cat_name = str.split(" ")[0].trim(); // 공백 제거
      const categoryName = cardMoreCategory2KakaoCategory(category).trim(); // 공백 제거
      return cat_name === categoryName; // 엄격한 비교 사용
    });
    cardDescriptionList = cardDescriptionList.filter((str) => {
      const cat_name = str.split(" ")[0].trim(); // 공백 제거
      const categoryName = cardMoreCategory2KakaoCategory(category).trim(); // 공백 제거
      return cat_name !== categoryName; // 엄격한 비교 사용
    });

    if (choosed.length > 0) {
      cardDescriptionList.unshift(choosed[0]);
    }
    return cardDescriptionList.join(", ");
  };

  const getPercentageFromCardDescription = (cardDescription, category) => {
    // (카드 설명, 맵에서 선택된 카테고리)
    const choosed = cardDescription.split(", ").filter((str) => {
      // console.log("[SELECTED CATEGORY]", category);
      // console.log("[cardDescription]", cardDescription);

      const cat_name = str.split(" ")[0];
      return cat_name === cardMoreCategory2KakaoCategory(category);
    });
    // console.log("[CHOOSED]", choosed);
    if (choosed.length > 0) {
      return choosed[0].split(" ")[1];
    } else {
      return null;
    }
  };

  const sortCards = (res) => {
    // console.log("[IN SORT FUNCTION]", res);
    const sortedRes = res.sort((a, b) => {
      if (
        Number(a.card.cardDescription.split(", ")[0].split(" ")[1].split("%")[0]) <
        Number(b.card.cardDescription.split(", ")[0].split(" ")[1].split("%")[0])
      ) {
        return 1;
      } else if (
        Number(a.card.cardDescription.split(", ")[0].split(" ")[1].split("%")[0]) >
        Number(b.card.cardDescription.split(", ")[0].split(" ")[1].split("%")[0])
      ) {
        return -1;
      } else {
        if (a.card.cardUniqueNo > b.card.cardUniqueNo) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    // console.log("[SORT]", sortedRes);
    return sortedRes;
  };

  const getLimitedCardInfos = (arr) => {
    return arr.length > 3 ? arr.slice(0, 3) : arr;
  };

  return (
    <MapPageStyle onClick={() => setIsMenuBarClicked(false)}>
      {/*<InputField onChange={handleKeyword} />*/}
      <CategoryContainer>
        {["카페", "음식점", "편의점", "주유소", "문화시설", "대형마트"].map((text, index) => (
          <div
            key={index}
            className={css`
              --height: 2rem;
              background-color: ${selectedCategory === text ? "#979797" : "white"};
              line-height: var(--height);
              height: var(--height);
              padding: 0 1rem;
              margin-right: 0.5rem;
              margin-bottom: 0.4rem;
              border-radius: 1rem;
              color: ${selectedCategory === text ? "white" : "979797"};
              box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
            `}
            onClick={(e) => {
              setSelectedCategory(text);
            }}
          >
            {text}
          </div>
        ))}
      </CategoryContainer>
      {/* <KakaoMap onMapLoad={handleMapLoad} /> */}
      <Map
        center={mapCenter}
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
        onCreate={setMap}
        ref={mapRef}
        onDragEnd={getPlacesInWindow}
      >
        {!nowLocation.isLoading && (
          <MapMarker // 현재 위치 빨간 원 모양 마커로 표시
            position={nowLocation.center}
            image={{
              src: "/NowLocationIcon.svg",
              size: {
                width: 30,
                height: 30,
              },
              options: {
                offset: {
                  x: 0,
                  y: 0,
                },
              },
            }}
          />
        )}
        {markers?.length > 0 &&
          markers?.map((markerInfo, index) => (
            <div key={index}>
              <MapMarker // 장소 마커 생성
                position={{
                  lat: markerInfo.latitude,
                  lng: markerInfo.longitude,
                }}
                clickable={true}
                onClick={() => (markerInfo.todo ? null : setClickedPlace(markerInfo))}
              />
              <CustomOverlayMap
                position={{
                  lat: markerInfo.latitude,
                  lng: markerInfo.longitude,
                }}
              >
                <div
                  className={css`
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  `}
                >
                  {!markerInfo.poiName && (
                    <div
                      className={css`
                        position: absolute;
                        width: fit-content;
                        padding: 5px;
                        background-color: white;
                        border-radius: 0.5rem;
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 0.3rem;
                      `}
                    >
                      {getLimitedCardInfos(sortCards(markerInfo.cards, selectedCategory)).map(
                        (cardinfo, index) => (
                          <div
                            key={index}
                            className={css`
                              color: ${cardinfo.colorTitle};
                              border: 0.1rem solid ${cardinfo.colorTitle};
                              background-color: ${cardinfo.colorBackground};
                              border-radius: 0.3rem;
                              margin: 0 0.2rem;
                              padding: 0.1rem 0.2rem;
                            `}
                          >
                            {getPercentageFromCardDescription(
                              cardinfo.card.cardDescription,
                              selectedCategory
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                  {markerInfo.poiName ? (
                    <>
                      <TodoMapOverlay Todo={markerInfo} />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CustomOverlayMap>
            </div>
          ))}
      </Map>
      <div
        // MenuBar
        className={css`
          position: absolute;
          bottom: ${clickedPlace
            ? isMenuBarClicked
              ? `-${window.innerHeight * 0.2}px`
              : `-${window.innerHeight * 0.8}px`
            : `-${window.innerHeight * 1.0}px`};
          z-index: 2;
          width: 100%;
          height: 100vh;
          background-color: white;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
          padding-top: 0.3rem;
        `}
        onClick={clickMenuBar}
      >
        {clickedPlace && (
          <div
            className={css`
              padding: 0.6rem;
              display: flex;
              justify-content: center;
              padding-top: 1rem;
              margin-top: 1.5rem;
            `}
          >
            <div
              className={css`
                width: 50%;
                /* height: 13.627rem; */
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <div
                className={css`
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  line-height: 1.3rem;
                  margin-bottom: 0.5rem;
                `}
              >
                <div
                  // 상호명
                  className={css`
                    font-weight: 500;
                    font-size: 1.3rem;
                    margin-right: 0.5rem;
                  `}
                >
                  {clickedPlace.name}
                </div>
                <div
                  // 카테고리
                  className={css`
                    font-weight: 200;
                    font-size: 1rem;
                    min-width: 3rem;
                  `}
                >
                  {merchantCategory2categoryName(clickedPlace.merchantCategory)}
                </div>
              </div>
              <div
                // 도로명주소
                className={css`
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  font-size: 0.9rem;
                `}
              >
                {clickedPlace.address}
              </div>
            </div>
            <div
              className={css`
                width: 25%;
                background-color: #f6f6f6;
                border: 1px solid #bbbbbb;
                border-radius: 2rem;
                font-size: 1.1rem;
                height: 2.6rem;
                justify-content: center;
                align-items: center;
                display: flex;
                flex-direction: column;
                margin-left: 2rem;
                cursor: pointer;
              `}
              onClick={() => (window.location.href = clickedPlace.placeUrl)}
            >
              추가 정보
            </div>
          </div>
        )}
        {clickedPlace && isMenuBarClicked && (
          <>
            <div
              className={css`
                display: flex;
                width: 100%;
                padding-left: 1.6rem;
                padding-top: 1rem;
                padding-bottom: 0.5rem;
                font-size: 1.5rem;
                font-weight: 800;
              `}
            >
              카드 혜택
            </div>
            {clickedPlace?.cards && (
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 100%;
                  overflow-y: auto; // 수직 스크롤 추가
                  max-height: 22rem;

                  ::-webkit-scrollbar {
                    width: 0.4rem;
                  }
                  ::-webkit-scrollbar-thumb {
                    background-color: #dedede; /* 스크롤바 색상 */
                    border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
                  }
                  ::-webkit-scrollbar-corner {
                    background-color: transparent; /* 배경색을 투명하게 설정 */
                  }
                `}
              >
                {clickedPlace.cards.map((info, index) => (
                  <div
                    key={index}
                    className={css`
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      width: 85%;
                    `}
                    onClick={() => {
                      setModalData({
                        ...info.card,
                        cardNo: info.cardNo,
                        cardExpiryDate: info.cardNo,
                        colorTitle: info.colorTitle,
                        colorBackground: info.colorBackground,
                        cardBenefits: info.card.cardBenefitsInfo,
                      });
                      setShowModal(true);
                    }}
                  >
                    <CardInfo
                      key={index}
                      backgroundColor={"#F6F6F6"}
                      data={{
                        card: {
                          ...info.card,
                          cardNo: info.cardNo,
                          cardExpiryDate: info.cardNo,
                          colorTitle: info.colorTitle,
                          colorBackground: info.colorBackground,
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <NavBar isSelected={"Map"} />
      {showModal && <CardModal setShowModal={setShowModal} data={modalData} />}
    </MapPageStyle>
  );
};

export default React.memo(MapPage);
