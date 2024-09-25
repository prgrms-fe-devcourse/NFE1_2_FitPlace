// 카카오 지도 관련(지도 + 마커 표시 + 현재위치 설정)
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=d735989af4ed4e049847dd3e7d4fba63&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오 지도가 로드되었습니다.");
        const container = document.getElementById("map");
        if (!container) {
          console.error("표시할 영역을 찾을 수 없습니다.");
          return;
        }

        // 서울역 좌표 (위도: 37.556135, 경도: 126.972608)
        const initialPosition = {
          lat: 37.556135,
          lng: 126.972608,
        };

        const options = {
          center: new window.kakao.maps.LatLng(
            initialPosition.lat,
            initialPosition.lng
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
          map: map,
        });
        markerRef.current = marker;

        const geocoder = new window.kakao.maps.services.Geocoder();

        const getAddress = (lat: number, lng: number) => {
          const coord = new window.kakao.maps.LatLng(lat, lng);
          geocoder.coord2Address(lng, lat, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              setAddress(address);
            }
          });
        };

        // 초기 주소 설정 (서울역)
        getAddress(initialPosition.lat, initialPosition.lng);

        window.kakao.maps.event.addListener(map, "center_changed", () => {
          const center = map.getCenter();
          marker.setPosition(center);

          getAddress(center.getLat(), center.getLng());
        });

        console.log("지도에 마커가 추가되었습니다.", map.getCenter());
      });
    };

    script.onerror = () => {
      console.error("카카오 지도를 로드하지 못했습니다.");
    };

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div>
      {/* 현재 주소를 텍스트로 표시 */}
      <div className="text-left mb-2 text-gray-400 text-xs ">
        <p>현재 위치: {address}</p>
      </div>
      {/* 카카오 지도 */}
      <div id="map" style={{ width: "100%", height: "550px" }}></div>
    </div>
  );
};

export default KakaoMap;
