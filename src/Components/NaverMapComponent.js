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
import menuIcon from '../Images/menuIcon.png';
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
let region = ['강남구', '강북구', '강서구', '관악구', '광산구', '광양시', '광주시', '구로구', '구미시', '군산시', '금정구', '금천구',
  '남구', '남동구', '남양주시', '노원구', '대덕구', '도봉구', '동구', '동래구', '동작구', '마포구', '목포시', '미추홀구', '부천시', '부평구',
  '북구', '사상구', '사하구', '서구', '서대문구', '성남시', '성동구', '송파구', '수성구', '수영구', '수원시', '순천시', '안동시', '안산시',
  '연수구', '연제구', '영등포구', '영암군', '완주군', '은평구', '의정부시', '전주시', '정읍시', '제주시', '종로구', '중구', '춘천시',
  '충주시', '포항시', '하남시', '해운대구', '화성시'];
let Faclities = ['아동복지시설', '어린이집', '장애인고용공단', '장애인복지시설', '종합병원', '유치원집', '파출소', '보건소', '공용화장실', '대피소', '특수학교', '노인복지시설(경로당포함)'];


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
  const [SportType3, setSportType3] = useState('');


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
    if(type === '' || type === null) alert("종목을 선택해주세요.");
    else{
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
    }
    
    console.log(Made)
    setMarkerContainer(Made);
    setSportType2('');
    setSportType3('');
  }

  // 편의시설 Marker 만드는 함수 ( region : 구,시,군 선택     type : 파출소, 등 선택)
  function MakeMarker2(region, type) {
    if (region === '' || region === null || region === 'null') {
      alert("지역을 선택해주세요.");
    } else if (type === '' || type === null || type === 'null') {
      alert("시설종류를 선택해주세요.");
    }
    else {
      let Made = [];
      switch (type) {
        case '아동복지시설':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          ChildrenWelfareFacility.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '어린이집':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          DaycareCenter.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '장애인고용공단':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          DisableEmployeeFacility.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '장애인복지시설':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          DisableFacility.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '종합병원':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          GeneralHospital.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '유치원집':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          KinderGarden.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '파출소':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          PoliceBox.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '보건소':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          PublicHealth.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '공용화장실':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          PublicToilet.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '대피소':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          Shlter.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '특수학교':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          SpecialSchool.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
        case '노인복지시설(경로당포함)':
          Made = []; //초기화해야 다른 걸 또 선택했을 때 중복안됨
          WelfareCenter.forEach((data, index) => {
            if (data[0] === region) {
              Made.push(
                <Marker
                  key={index}
                  position={{ lat: data[3], lng: data[2] }}
                  animation={2}
                  onClick={() => {
                    Swal.fire({
                      title: data[1],
                    })
                  }}
                />
              )
            }
          })
          setMarkerContainer(Made);
          setSportType('');
          break;
      }
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
        <p className="Mobile_text1"><img className="TopMenuIcon" src={menuIcon}/> 장애인 운동시설 및 편의시설</p>
        <p className="Titleline_text2">장애인 스포츠 강좌 이용권으로 등록가능한 시설입니다.</p>
        <p className="Titleline_text2">찾으시는 종목을 선택하시면 해당 체육시설 또는 편의시설들이 표시됩니다.</p>
        <span className="SelectMenu_span1">종목 : </span>
        <select className="SelectMenu" onChange={(e) => { setSportType(e.target.value) }} value={SportType}>
          <option value=''>선택하세요.</option>
          {ClassTypes.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
        <div className="SelectBTN" onClick={() => { MakeMarker(SportType) }}></div>

        <div className="Mobile_EnterLine"></div>

        {/* 지역 및 편의시설 select */}
        <span className="SelectMenu_span2">편의시설 : </span>
        <select className="SelectMenu" onChange={(e) => { setSportType2(e.target.value) }} value={SportType2}>
          <option value="">지역(시,군,구)</option>
          {region.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
        <select className="SelectMenu" onChange={(e) => { setSportType3(e.target.value) }} value={SportType3}>
          <option value="">시설종류</option>
          {Faclities.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
        <div className="SelectBTN" onClick={() => { MakeMarker2(SportType2, SportType3) }}></div>
      </div>
      <NaverMap
        id="react-naver-maps-introduction"
        center={Center}
        defaultZoom={10}
      >

        <div className="ToMeBTN" onClick={PanToMe} />
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