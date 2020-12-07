import React, { useEffect, useState } from 'react';
import { NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기
import axios from 'axios';
import { Modal } from 'antd';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps'; // 패키지 불러오기

// Image import
import warning from '../Images/warning.png'

// Component import
import 'antd/dist/antd.css';
import Subway from '../Data/Subway.json';
import '../CSSs/NaverMapComponent.css';
import { connect } from 'react-redux';

// 전역 변수
let list2 = [];

function SubwayPage(props) {

    const [Markers, setMarkers] = useState([]);
    const [MyPos, setMyPos] = useState({
        lat : props.POS.x,
        lng : props.POS.y
    })


    let arrivelist = '잠시만 기다려주세요....';
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ 로드 시 지하철 실시간 도착 정보 받아오기 ■■■■■■■■■■■■■■■■■■■■■■■■■■■
    const getStationTimeData = async (subwayname) => {
        arrivelist = '';    //이전에 있던 데이터를 지워주고
        try {
            const response = await axios.get(`https://under-construction-project.herokuapp.com/api/${subwayname}/`);
            //   console.log(response.data.realtimeArrivalList);
            response.data.realtimeArrivalList.forEach(data => {
                arrivelist += `${data.trainLineNm} ${data.arvlMsg2} \n`
            })
            swal(arrivelist);
        } catch (e) {
            arrivelist = "도착정보가 없습니다.";
            swal(arrivelist);
            console.log(e);
        }
    }


    useEffect(() => {
        console.log("Subway useEffect")
        console.log(props.POS);
        let list2 = [];
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 지하철 공사중인 Data api불러오는 코드 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        const GetConstDataFromAPI = async () => {
            try {
                const response = await axios.get(
                    'https://under-construction-project.herokuapp.com/api/'
                ).then(answer => {
                    console.log(answer);
                    answer.data.forEach(data => {
                        let station_information = [];
                        data.elevating_equipment.forEach(data2 => {
                            station_information.push(`▲${data2.location} ${data2.facility} 상태:${data2.status} `)
                        })
                        list2.push(
                            <Marker
                                key={data.id}
                                position={{ lat: Subway[data.name][0], lng: Subway[data.name][1]}}
                                animation={2}
                                icon={warning}
                                onClick={() => {
                                    swal(`${data.name}역`, {
                                        buttons: {
                                            공사정보: {
                                                value: "const"
                                            },
                                            도착정보: {
                                                value: "arrive",
                                            }
                                        },
                                    })
                                        .then((value) => {
                                            switch (value) {
                                                case "const":
                                                    swal(station_information.join(`\n`));
                                                    break;

                                                default:
                                                    getStationTimeData(data.name);      // 지하철 도착정보 불러와서 swal을 띄워준다.
                                            }
                                        });


                                }
                                }
                            />
                        )
                    });
                    setMarkers(list2);
                })
            } catch (e) {
                console.log(e);
            }

        }
        GetConstDataFromAPI();

    }, []);



    return (
        <div>
            <RenderAfterNavermapsLoaded
                ncpClientId={'ce25x52vaf'} // 자신의 네이버 계정에서 발급받은 Client ID
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
            >
                <NaverMap
                    id='Mymap'
                    style={{ width: '100%', height: '93.36vh' }}
                    defaultZoom={16}
                    center={MyPos}
                >
                    <Marker
                        key='myposition'
                        position={MyPos}
                        animation={2}
                    />
                    {Markers}
                </NaverMap>
            </RenderAfterNavermapsLoaded>
        </div>
    )
}

function mapStateToProps(state, onwProps) {
    return { POS: state };
}

export default connect(mapStateToProps)(SubwayPage);