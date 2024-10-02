import React, { useEffect, useRef, useState, CSSProperties } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  isMarkerFixed: boolean;
  location: { lat: number; lng: number };
  onCenterChange?: (lat: number, lng: number) => void;
  style?: CSSProperties;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ isMarkerFixed, location, onCenterChange, style }) => {
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
        const container = document.getElementById("map");
        if (!container) {
          console.error("마커를 표시할 영역을 찾을 수 없습니다.");
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
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

        getAddress(location.lat, location.lng);

        window.kakao.maps.event.addListener(map, "center_changed", () => {
          if (!isMarkerFixed) {
            const center = map.getCenter();
            marker.setPosition(center);

            if (onCenterChange) {
              onCenterChange(center.getLat(), center.getLng());
            }
          }
        });
      });
    };

    script.onerror = () => {
      console.error("카카오 지도를 로드하지 못했습니다.");
    };

    return () => {
      script.remove();
    };
  }, [isMarkerFixed, location.lat, location.lng, onCenterChange]);

  return (
    <div>
      <div className="text-left mb-2 text-gray-400 text-xs">
        <p>현재 위치: {address}</p>
      </div>
      <div id="map" style={{ width: "100%", height: "550px", ...style }}></div>
    </div>
  );
};

export default KakaoMap;
