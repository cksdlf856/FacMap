import React, { useState } from 'react';
import '../CSSs/Navibar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Chart from './ChartPage';
import MapPage from './MapPage';
import NaverMapComponent from './NaverMapComponent';
import SubwayPage from './SubwayPage';

function Navibar(props) {

    const [DP1, setDP1] = useState('linkitem');
    const [DP2, setDP2] = useState('linkitem');
    const [DP3, setDP3] = useState('linkitem');

    return (
        <Router>
            <div className="Navibar">
                <p className="Navibar_text">장애인 운동 시설 및 편의시설</p>
                <div className="menu_icon"></div>
                <Link onClick={()=>{
                    setDP1('linkitem using')
                    setDP2('linkitem');
                    setDP3('linkitem')
                }} className={DP1 + ' menu1'} to="/">체육관 지도</Link>
                <Link onClick={()=>{
                    setDP1('linkitem')
                    setDP2('linkitem using');
                    setDP3('linkitem')
                }} className={DP2 + ' menu2'} to="/subway">공사중 지하철</Link>
                <Link onClick={()=>{
                    setDP1('linkitem')
                    setDP2('linkitem');
                    setDP3('linkitem using')
                }} className={DP3 + ' menu3'} to="/chart">차트</Link>
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


