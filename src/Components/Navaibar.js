import React from 'react';
import '../CSSs/Navibar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Chart from './ChartPage';
import MapPage from './MapPage';
import NaverMapComponent from './NaverMapComponent';
import SubwayPage from './SubwayPage';

function Navibar(props){
    return(
            <Router>
                <div>
                    <div className="Navibar">
                        장애인 운동 시설 및 편의시설
                        <Link className="linkitem" to="/">지도</Link>
                        <Link className="linkitem" to="/subway">지하철</Link>
                        <Link className="linkitem" to="/chart">차트</Link>
                    </div>
                  
                </div>
                <div className="Navibar_Content" style={{textAlign:"center", width:'100%'}} >
                    <Route exact path="/" component={MapPage} />
                    <Route path="/subway" component={SubwayPage} />
                    <Route path="/chart" component={Chart} />
                </div>
            </Router>
    )
}

export default Navibar;


        