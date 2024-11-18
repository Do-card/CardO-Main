import React, { useEffect } from "react";

const { kakao } = window;

function CustomOverlay({ map, position, content }) {
  useEffect(() => {
    if (map) {
      const overlayPosition = new kakao.maps.LatLng(position.lat, position.lng);

      // 커스텀 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        position: overlayPosition,
        content: content,
      });

      // 맵에 오버레이를 추가
      overlay.setMap(map);

      // 클린업 함수로 오버레이를 삭제
      return () => overlay.setMap(null);
    }
  }, [map, position, content]);

  return null;
}

export default CustomOverlay;
