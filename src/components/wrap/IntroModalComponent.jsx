import React from 'react';
import './scss/intro_modal.scss';
import introModalImage from './images/92caebda-2c7b-4ee8-8d43-d2df9c21e703.png';

export default function IntroModalComponent({introModalClose, cookie}) {
    // 비구조화 - 구조분할할당
    const {cookieName, cookieValue, cookieExpires} = cookie;

    /*
        setCookie(모달창 닫기) / getCookie(로딩시 쿠키이름이 있는지 검증)

        쿠키 쿠성요소
            // setCookie
            도큐먼트.쿠키 = `쿠키이름=쿠키값; 패스=/; 만료일=날짜세팅.국제표준시();`;
            
            만료일(expires): 현재날짜.세팅날짜(현재날짜.날짜+1) 1일 기한 
                            //날짜 대신 시간,월,년,분,초도 됨
                            현재날짜.세팅월(현재날짜.월+1) 1달 기한
            
            let toDay = new Date();
            toDay.setDate(toDay.getDate()+1); //1일 기한
            toDay.setMonth(toDay.getMonth*()+1); //1달 기한

            let cookieName = 'HJKURLY_INTROMODAL_01';
            let cookieValue = 'YEAR8_SALE_EVENT_MODALWINDOW';
            document.cookie = `{$cookieName}={$cookieValue}; path=/; expires={$toDay.toUTCString()}`;
    */

    // 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        introModalClose(); //부모컴포넌트의 닫기함수 실행
    }

    // 다시 안 보기
    // 1일 쿠키 설정 후 창 닫기
    const setCookie=()=>{
        let today = new Date();
        today.setDate(today.getDate() + cookieExpires); //3일 기한

        document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${today.toUTCString()};`;
    }
    const onClickSetCookieClose=(e)=>{
        e.preventDefault(); //버튼이라 새로고침 발생해서 막아주기

        setCookie();
        
        introModalClose(); //창닫기
    }

    return (
        <div id="introModal">
            <div className="container">
                <div className="wrap">
                    <div className="content">
                        <ul>
                            <li><a href="!#"><img src={introModalImage} alt="" /></a></li>
                            {/* src에서 만든 동적이미지는 import의 변수로 가져와야함 */}
                            <li>
                                <button onClick={onClickSetCookieClose}>다시 안 보기</button>
                                <button onClick={onClickClose}>닫기</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

