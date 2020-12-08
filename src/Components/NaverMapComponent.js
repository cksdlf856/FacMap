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


// Data관련
import ChildrenWelfareFacility from '../Data/ChildrenWelfareFacility.json';
import DaycareCenter from '../Data/DaycareCenter.json';
import DisableEmployeeFacility from '../Data/DisableEmployeeFacility.json';
import DisableFacility from '../Data/DisableFacility.json';
import GeneralHospital from '../Data/GeneralHospital.json';
import KinderGarden from '../Data/KinderGarden.json';
import PoliceBox from '../Data/PoliceBox.json';
import PublicHealth from '../Data/PublicHealth.json';
import PublicToilet from '../Data/PublicToliet.json';
import Shlter from '../Data/Shelter.json';
import SpecialSchool from '../Data/SpecialSchool.json';
import WelfareCenter from '../Data/WelfareCenter.json';

// 장애인 편의시설 종류 배열
let Faclities = ['아동복지센터', '어린이집', '장애인고용공단', '장애인복지시설', '종합병원', '유치원집', '파출소', '보건소', '공용화장실', '대피소', '특수학교', '노인복지시설(경로당포함)'];


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
  const [SportType, setSportType] = useState('');
  const [SportType2, setSportType2] = useState('');

  const selectType = e => {
    setSportType(e.target.value);
    setSportType2('null');
    MakeMarker(e.target.value);
  }
  const selectType2 = e => {
    setSportType2(e.target.value);
    setSportType('null');
    MakeMarker2(e.target.value);
  }




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

  function GetClassInfo() {
    let title = new Set();
    ClassInfo.forEach(data => title.add(data[5]));
    setClassTypes(Array.from(title));
    console.log(ClassTypes)
  }

  // 운동시설 Marker 만드는 함수
  function MakeMarker(type) {
    let Made = [];
    ClassInfo.forEach((data, index) => {
      if (data[5] === type) {
        Made.push(
          <Marker
            key={index}
            position={{ lat: data[7], lng: data[6] }}
            animation={2}
            onClick={() => {
              Swal.fire({
                title: data[1],
                text: data[3] + data[4],
              })
            }}
          />
        )
      }
    })
    console.log(Made)
    setMarkerContainer(Made);
  }

  // 편의시설 Marker 만드는 함수
  function MakeMarker2(type){
    let Made = [];
    switch(type){
      case '아동복지센터' :
        ChildrenWelfareFacility.forEach((data,index)=>{
          Made.push(
            <Marker
            key={index}
            position={{ lat: data[2], lng: data[1] }}
            animation={2}
            onClick={() => {
              Swal.fire({
                title: data[0],
              })
            }}
          />
          )
        }) 
        console.log('1');
        setMarkerContainer(Made);
        break;
      case '어린이집' : 
        console.log("2");
        break;
      case '장애인고용공단' : 
        console.log("3");
        break;
      case '장애인복지시설' : 
        console.log("4");
        break;
      case '종합병원' : 
        console.log("5");
        break;
      case '유치원집' : 
        console.log("6");
        break;
      case '파출소' : 
        console.log("7");
        break;
      case '보건소' : 
        console.log("8");
        break;
      case '공용화장실' : 
        console.log("9");
        break;
      case '대피소' : 
        console.log("10");
        break;
      case '특수학교' : 
        console.log("11");
        break;
      case '노인복지시설(경로당포함)' : 
        console.log("12");
        break;
    }
  }





  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ useEffect
  useEffect(() => {
    getLocation();
    GetClassInfo();
  }, [])


  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ return
  return (
    <div className="Router_Div">
      <div className="TitleLine_BackPoint"></div>
      <div className="TitleLine">
        <p>찾으시는 종목을 선택하시면 해당 체육시설 또는 편의시설들이 표시됩니다.</p>
        <span className="SelectMenu_span1">종목 : </span>
        <select className="SelectMenu" onChange={selectType} value={SportType}>
          <option value={null}>선택하세요.</option>
          {ClassTypes.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
        <span className="SelectMenu_span2">편의시설 : </span>
        <select className="SelectMenu2" onChange={selectType2} value={SportType2}>
          <option value={null}>선택하세요.</option>
          {Faclities.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
      </div>
      <NaverMap
        id="react-naver-maps-introduction"
        style={{ width: '1000px', height: '600px' }}
        center={Center}
        defaultZoom={10}
        onBoundsChanged={()=>{
          console.log(window.naver.maps.getBounds)
        }}
      >

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