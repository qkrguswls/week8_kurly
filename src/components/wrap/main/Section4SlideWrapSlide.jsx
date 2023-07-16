import React from 'react';
// import $ from 'jquery'; 상태관리로 바꿔줬으니까

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section4SlideWrapSlide({상품}) {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    const [state, setState] = React.useState({
        H: 0, //시
        M: 0, //분
        S: 0 //초
    });

    React.useEffect(()=>{    
        let setId = setInterval(function(){
            // 타이머 카운트
            // 시작시간 = 현재시간(타임세일 시작시간)
            // 종료시간 = 현재시간(타임세일 시작시간) + 24시간
            // 현재시간
            // 남은시간 = 종료시간 - 현재시간
    
            let timeSale = '2023-05-21 09:00:00';
            let start = new Date(timeSale); //시작시간
            start.setHours(start.getHours()+24); // 24시간 타임세일 종료시간 - start 요소를 바꿔주도록 여기 껴넣기
            let now = new Date(); //현재시간
            let countTime = start - now; // 남은시간
    
            // 24시간 타임세일 종료시간 = 시작시간 + 24
            // 방법1. 시간 설정 - 설정함수(setter함수) / 가져오는함수(getter함수)
            // start.setHours(start.getHours()+24); //getHours를 안쓰면 starts의 날짜도 가져오게되니까
            // console.log('타임세일 종료시간 ' + start);
    
            // 방법2. 1일 추가(24시간 대신)
            // start.setDate(start.getDate()+1);
            // console.log('타임세일 종료일' + start);
    
            let h, m, s = 0; //초기화
    
            // 종료
            if(now >= start) {
                clearInterval(setId);
                h = 0;
                m = 0;
                s = 0;
                /*
                $('#section4 .hours').text(h < 10 ? `0${h}` : h);
                $('#section4 .minutes').text(m < 10 ? `0${m}` : m);
                $('#section4 .seconds').text(s < 10 ? `0${s}` : s);
                */
            } else {
                // 타임세일 남은시간 = 종료시간 - 현재시간
                // console.log(countTime); // 1/1000초 단위로 나옴
                h = Math.floor(countTime / (60*60*1000)) % 24; // 시간 단위로 출력! - 1일은 24시
                m = Math.floor(countTime / (60*1000)) % 60; // 분 단위로 출력! - 1시간은 60분
                s = Math.floor(countTime / (1000)) % 60; // 초 단위로 출력! - 1분은 60초
                // Math.floor - 소수미만 버림
            }
            setState({ //상태관리로 해주기
                ...state,
                H: h < 10 ? `0${h}` : h,
                M: m < 10 ? `0${m}` : m,
                S: s < 10 ? `0${s}` : s
            });
        }, 1000);

    },[]);

    // 최근 본 상품
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();

        setViewProductFn(item, imgPath); 
    }

    return (
        <ul className="slide-wrap">
            <li className="slide slide1">
                <div className="slide-gap">
                    <ul>
                        <li><h2>일일특가</h2></li>
                        <li><h3>24시간 한정 특가</h3></li>
                        <li>
                            <div className="timer">
                                <img src="./img/intro/timer.svg" alt="" />
                            </div>
                            <div className="timer-counter">
                                <span className='hours'>{state.H}</span>
                                <i>:</i>
                                <span className='minutes'>{state.M}</span>
                                <i>:</i>
                                <span className='seconds'>{state.S}</span>
                            </div>
                        </li>
                        <li><p>망설이면 늦어요!</p></li>
                    </ul>
                </div>
            </li>
            {
                상품.map((item, idx)=>{
                    return (
                        <li className="slide" key={item.번호}>
                            <div className="slide-gap" onClick={(e)=>onClickViewProduct(e, item, `./img/intro/${item.이미지}`)}>
                                <div className="img-box">
                                    <img src={`./img/intro/${item.이미지}`} alt="" />
                                    <span><img src="./img/intro/icon_cart_purple.svg" alt="" /></span>
                                </div>
                                <div className="text-box">
                                    <ul>
                                        <li>{item.상품소개}</li>
                                        <li>{item.상품이름}</li>
                                        <li>
                                            {
                                                item.할인율 > 0 ? (
                                                    <>
                                                    {/* 태그가 두개이상 나열되어있으면 태그로 묶어줘야함(여기선 빈태그로 묶어줌) */}
                                                        <strong>{Math.round(item.할인율*100)}%</strong>
                                                        <span>{Math.round((item.정가*(1-item.할인율))).toLocaleString('ko-KR')}원</span>
                                                        <em>{item.정가.toLocaleString('ko-KR')}원</em>
                                                    </>
                                                )
                                                :
                                                (
                                                    item.정가.toLocaleString('ko-KR')
                                                    // toLocaleString('ko-KR')는 1,000 나오게해줌
                                                )
                                            }
                                        </li>
                                        <li>
                                            <img src={`./img/intro/icon_review.svg`} alt="" />
                                            <span>{`후기`}</span>
                                            <span>{item.후기카운트}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    );
};
