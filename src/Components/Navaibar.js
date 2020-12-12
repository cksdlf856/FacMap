import React, { useState } from 'react';
import '../CSSs/Navibar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Chart from './ChartPage';
import MapPage from './MapPage';
import NaverMapComponent from './NaverMapComponent';
import SubwayPage from './SubwayPage';

import hamburgerImage from '../Images/hamburgerImage.png';

function Navibar(props) {

    const [DP1, setDP1] = useState('linkitem');
    const [DP2, setDP2] = useState('linkitem');
    const [DP3, setDP3] = useState('linkitem');

    const [DPofMobileNavi, setDPofMobileNavi] = useState('Navi_Mobile_hide');
    const [DPofHamburger, setDPofHamburger] =useState('Hamburger_show');
    return (
        <Router basename="/faclimap">
            {/* 테블릿, 데스크탑에서 보여질 네비게이션 바 */}
            <div className="Navibar">
                <p className="Navibar_text">장애인 운동 시설 및 편의시설</p>
                <div className="menu_icon"></div>
                <Link onClick={() => {
                    setDP1('linkitem menu1_clicked')
                    setDP2('linkitem');
                    setDP3('linkitem')
                }} className={DP1 + ' menu1'} to="/">운동시설 지도</Link>
                <Link onClick={() => {
                    setDP1('linkitem')
                    setDP2('linkitem menu2_clicked');
                    setDP3('linkitem')
                }} className={DP2 + ' menu2'} to="/subway">공사중 지하철</Link>
                <Link onClick={() => {
                    setDP1('linkitem')
                    setDP2('linkitem');
                    setDP3('linkitem menu3_clicked')
                }} className={DP3 + ' menu3'} to="/chart">시설 분포 차트</Link>


                <div className="footer">
                    <p>문의 : snstkfka02@hanmail.net</p>
                </div>
            </div>

            {/* 모바일에서 보여질 네비게이션 바 */}
            <div className={DPofHamburger} onClick={()=>{
                setDPofMobileNavi('Navi_Mobile_show');
                setDPofHamburger('Hamburger_hide');
            }}></div>
            <div className={DPofMobileNavi}>
                <div className="Xbtn" onClick={()=>{
                    setDPofHamburger('Hamburger_show');
                    setDPofMobileNavi('Navi_Mobile_hide')
                }}></div>
                <p className="Navibar_text">장애인 운동 시설 및 편의시설</p>
                <div className="menu_icon"></div>
                <Link onClick={() => {
                    setDP1('linkitem menu1_clicked')
                    setDP2('linkitem');
                    setDP3('linkitem')
                    setDPofMobileNavi('Navi_Mobile_hide');
                    setDPofHamburger('Hamburger_show');
                }} className={DP1 + ' menu1'} to="/">운동시설 지도</Link>
                <Link onClick={() => {
                    setDP1('linkitem')
                    setDP2('linkitem menu2_clicked');
                    setDP3('linkitem')
                    setDPofMobileNavi('Navi_Mobile_hide');
                    setDPofHamburger('Hamburger_show');
                }} className={DP2 + ' menu2'} to="/subway">공사중 지하철</Link>
                <Link onClick={() => {
                    setDP1('linkitem')
                    setDP2('linkitem');
                    setDP3('linkitem menu3_clicked')
                    setDPofMobileNavi('Navi_Mobile_hide');
                    setDPofHamburger('Hamburger_show');
                }} className={DP3 + ' menu3'} to="/chart">시설 분포 차트</Link>
            </div>

            <div className="Navibar_Content" style={{ textAlign: "center", width: '100%' }} >
                <Route exact path="/" component={MapPage} />
                <Route path="/subway" component={SubwayPage} />
                <Route path="/chart" component={Chart} />
            </div>

        </Router>
    )
}

export default Navibar;


