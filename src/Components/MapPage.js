import React from 'react';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps'; // 패키지 불러오기
import NaverMapComponent from './NaverMapComponent';

// redux 관련
import { connect } from 'react-redux';
import { actionCreators } from '../store';

function MapPage(props) {

    return (
        <div>
            <RenderAfterNavermapsLoaded
                ncpClientId={'ce25x52vaf'} // 자신의 네이버 계정에서 발급받은 Client ID
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
            >
                <NaverMapComponent />
            </RenderAfterNavermapsLoaded>
        </div>
    )
}

export default MapPage;