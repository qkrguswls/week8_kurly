import React from 'react';
import PostCodeChild from './PostCodeChild';
import './scss/post_code.scss';

export default function PostCodeComponent() {
    /*
        설치
            깃배시 -> npm i react-daum-postcode 엔터! -> package.json에 react-daum-postcode 있는지 확인하기
            
        코드 가이드
            https://postcode.map.daum.net/guide
    */

    const [state, setState] = React.useState({
        isShow: true
    });

    return (
        <div id="postCode">
            <h2>주소검색 API</h2>
            {state.isShow && <PostCodeChild/>}
        </div>
    );
};