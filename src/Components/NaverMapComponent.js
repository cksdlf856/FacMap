import React, { useEffect, useState } from 'react';

// navermap 관련
import { NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기



function NaverMapComponent(props) {

  const [Center, setCenter] = useState({
    lat : 37.497175,
    lng : 127.027926
  })

  function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat : position.coords.latitude,
          lng : position.coords.longitude
        })
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }


  function PanToMe(){
    getLocation();
  }

  useEffect(() => {
    getLocation();
  }, [])

  return (
    <div>
      <button onClick={PanToMe} >내위치로</button>
        <NaverMap 
          id="react-naver-maps-introduction"
          style={{width: '100%', height: '100vh'}}
          center={Center}
          onCenterChanged={center => setCenter(center)}
        />
      </div>
  )

}

export default NaverMapComponent;