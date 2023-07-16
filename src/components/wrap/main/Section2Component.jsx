import React,{useEffect, useState} from 'react';
// {}안에 써주면 밑에서 쓸때 React생략해도됨
import Section2SlideWrapSlide from './Section2SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section2Component() {

    const [state, setState] = useState({
        상품: [],
        n: 0
    });

    useEffect(()=>{
        axios({
            url: './data/sec2_slide.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200) {
                setState({
                    ...state,
                    상품: res.data.상품,
                    n: res.data.상품.length
                });
                $('#section2 .slide-wrap').css({width: `${25 * state.n}%`});
                // state.n대신 위에 n없애고 res.data.상품.length넣어도됨
            } 
        })
        .catch((err)=>{console.log('AXIOS 실패! ' + err)});
    },[state.n]);

    // 슬라이드 - 클릭 이벤트
    useEffect(()=>{
        let cnt = 0;
        
        // 1. 메인 슬라이드 함수
        mainSlide(); //처음 로딩할때부터 실행하라는 뜻(이거 없으면 cnt===0일때가 실행이 안됨 - 즉, 첫화면에 왼쪽 btn이 나오게됨 - 초기값이 나오게됨 왜냐면 mainSlide안에있는 함수는 그 안에 있는거니까 so, 먼저 실행시켜줘야함)
        function mainSlide(){
            $('#section2 .slide-wrap').stop().animate({left: `${-100*cnt}%`}, 600);
            if(cnt === Math.ceil(state.n / 4) - 1) { //4
                $('#section2 .arrow-next-btn').stop().fadeOut(300);
            } else {
                $('#section2 .arrow-next-btn').stop().fadeIn(300);
            }
            if(cnt === 0) {
                $('#section2 .arrow-prev-btn').stop().fadeOut(300);
            } else {
                $('#section2 .arrow-prev-btn').stop().fadeIn(300);
            }
        }

        // 2-1. 다음 카운트 함수
        function nextCount(){
            cnt++;
            if(cnt > Math.ceil(state.n / 4) - 1) { //4
                cnt = 4;
            }
            mainSlide();
        }
        // 2-2. 이전 카운트 함수
        function prevCount(){
            cnt--;
            if(cnt < 1) {
                cnt = 0;
            }
            mainSlide();
        }

        // 3-1. 다음 버튼 클릭이벤트 함수(혹은 타이머!)
        $('#section2 .arrow-next-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        // 3-2. 이전 버튼 클릭이벤트 함수
        $('#section2 .arrow-prev-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });

    },[state.n]);

    return (
        <section id="section2">
            <div className="container">
                <div className="title">
                    <h2>이 상품 어때요?</h2>
                </div>
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <Section2SlideWrapSlide 상품 = {state.상품}/>
                        </div>
                        <a href="!#" className='arrow-next-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                        <a href="!#" className='arrow-prev-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};
