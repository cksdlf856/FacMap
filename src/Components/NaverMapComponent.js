import React, { useEffect, useState } from 'react';
// navermap 관련
import { NaverMap, Marker } from 'react-naver-maps'; 
import Swal from 'sweetalert2'
// Component 관련
import '../CSSs/NaverMapComponent.css';
// Data 관련
import ClassInfo from '../Data/ClassInfo.json';
// Image 관련
import placeholder from '../Images/placeholder.png';
// redux 관련
import { connect } from 'react-redux';
import { actionCreators } from '../store';




function NaverMapComponent(props) {

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■state관련
  const [Center, setCenter] = useState({
    lat: 37.497175,
    lng: 127.027926
  })
  const [MyPosition, setMyPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [ClassTypes, setClassTypes] = useState([]);
  const [MarkerContainer, setMarkerContainer] = useState([]);

  



  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■function 관련
  function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setMyPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        props.updateState(position.coords.latitude, position.coords.longitude)
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


  function PanToMe() {
    getLocation();
  }

  function GetClassInfo(){
    let title = new Set();
    ClassInfo.forEach(data=> title.add(data[5]));
    setClassTypes(Array.from(title));
    console.log(ClassTypes)
  }


  function MakeMarker(type){
    let Made = [];
    ClassInfo.forEach((data,index)=>{
      if(data[5] === type){
        Made.push(
          <Marker
            key={index}
            position={{lat: data[7], lng: data[6]}}
            animation={2}
            onClick={()=>{
              Swal.fire({
                title : data[1],
                text : data[3]+data[4] + <br/> + 'asd',
              })
            }}
          />
        )
      }
    })
    console.log(Made)
    setMarkerContainer(Made);
  }






// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ useEffect
  useEffect(() => {
    getLocation();
    GetClassInfo();
  },[])



  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ return
  return (
    <div>
      <NaverMap
        id="react-naver-maps-introduction"
        style={{ width: '100%', height: '100vh' }}
        center={Center}
      >
        <div className="TitleLine">
          <ul className="TitleLine_list">
              {ClassTypes.map((data,index)=>{
                return <li key={index} className="Title_type" onClick={(e)=>{
                  MakeMarker(data);
                }}>{data}</li>
              })}
          </ul>
        </div>
        <button className="ToMeBTN" onClick={PanToMe} />
        <Marker
          key="mypos"
          position={MyPosition}
          animation={2}
          icon={placeholder}
        />
        {MarkerContainer}
      </NaverMap>
    </div>
  )

}


// reducer에 action을 알리는 함수 
function mapDispatchToProps(dispatch) {
  return {
      updateState: (x, y) => dispatch(actionCreators.updateState(x, y))
  };
}


export default connect(null, mapDispatchToProps)(NaverMapComponent);