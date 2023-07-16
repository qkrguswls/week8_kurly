import React,{useEffect, useState} from 'react';
import Section9SlideWrapSlide from './Section9SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section9Component() {

    const [state, setState] = useState({
        상품: [],
        n: 0,
        param: '스승의날'
    });

    const [para, setPara] = useState('스승의날'); //useState를 별도로 만들어준 이유는 - 위에 setState에서 상품 배열이 반복되니까 계속 돌아서 문제가생김

    const onClickTabBtn=(e, value)=>{
        console.log(value);
        e.preventDefault();
        axiosApi(value); //파라미터 클릭 값

        setPara(value);
    }

    const axiosApi=(value)=>{
        console.log(value);
        let item = '';

        if (value === undefined) {
            item = state.param;
        } else {
            item = value;
        }

        axios({
            url: './data/sec9_slide.json',
            method: 'GET'
        })
        .then((res)=>{
            if (res.status === 200) {
                if (item === "스승의날") {
                    setState({
                        ...state,
                        상품: res.data.스승의날,
                        n: res.data.스승의날.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.스승의날.length}%`});
                } else if (item === "성년의날") {
                    setState({
                        ...state,
                        상품: res.data.성년의날,
                        n: res.data.성년의날.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.성년의날.length}%`});
                } else if (item === "~2만원대") {
                    setState({
                        ...state,
                        상품: res.data.$2만원대,
                        n: res.data.$2만원대.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.$2만원대.length}%`});
                } else if (item === "3~5만원대") {
                    setState({
                        ...state,
                        상품: res.data.$3_5만원대,
                        n: res.data.$3_5만원대.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.$3_5만원대.length}%`});
                } else if (item === "뷰티") {
                    setState({
                        ...state,
                        상품: res.data.뷰티,
                        n: res.data.뷰티.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.뷰티.length}%`});
                } else if (item === "디저트/커피/차") {
                    setState({
                        ...state,
                        상품: res.data.디저트_커피_차,
                        n: res.data.디저트_커피_차.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.디저트_커피_차.length}%`});
                } else if (item === "건강") {
                    setState({
                        ...state,
                        상품: res.data.건강,
                        n: res.data.건강.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.건강.length}%`});
                } else if (item === "발사믹/오일") {
                    setState({
                        ...state,
                        상품: res.data.발사믹_오일,
                        n: res.data.발사믹_오일.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.발사믹_오일.length}%`});
                } else if (item === "와인/위스키/전통주") {
                    setState({
                        ...state,
                        상품: res.data.와인_위스키_전통주,
                        n: res.data.와인_위스키_전통주.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.와인_위스키_전통주.length}%`});
                } else if (item === "꽃") {
                    setState({
                        ...state,
                        상품: res.data.꽃,
                        n: res.data.꽃.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.꽃.length}%`});
                } else if (item === "신선") {
                    setState({
                        ...state,
                        상품: res.data.신선,
                        n: res.data.신선.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.신선.length}%`});
                } else if (item === "리빙/주방") {
                    setState({
                        ...state,
                        상품: res.data.리빙_주방,
                        n: res.data.리빙_주방.length
                    });
                    $('#section9 .slide-wrap').css({width: `${25 * res.data.리빙_주방.length}%`});
                } 
            } 
        })
        .catch((err)=>{console.log('AXIOS 실패! ' + err)});
    }

    useEffect(()=>{
        axiosApi();
    },[]); //상품이 n보다 먼저 뿌려지니까 상품을 써주는게 안정적임 - 버튼클릭을 할땐 상품이 계속 들어오니까 []안에 state.상품 적으면 안됨(버튼 이벤트 있으면 써주지 말자!)

    // 슬라이드 - 클릭 이벤트
    useEffect(()=>{
        let cnt = 0;
        
        // 1. 메인 슬라이드 함수
        mainSlide();
        function mainSlide(){
            $('#section9 .slide-wrap').stop().animate({left: `${-100*cnt}%`}, 600);
            if(cnt === Math.ceil(state.n / 4) - 1) { //4
                $('#section9 .arrow-next-btn').stop().fadeOut(300);
            } else {
                $('#section9 .arrow-next-btn').stop().fadeIn(300);
            }
            if(cnt === 0) {
                $('#section9 .arrow-prev-btn').stop().fadeOut(300);
            } else {
                $('#section9 .arrow-prev-btn').stop().fadeIn(300);
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
        $('#section9 .arrow-next-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        // 3-2. 이전 버튼 클릭이벤트 함수
        $('#section9 .arrow-prev-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });

    },[state.n]);

    return (
        <section id="section9">
            <div className="container">
                <div className="title">
                    <h2>🎁마음 전하는 선물 BEST</h2>
                </div>
                <div className="content">
                    <nav className='sec9-tab-menu'>
                        <ul>
                            <li><a href="!#" className={para === "스승의날" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"스승의날")}>스승의 날</a></li>
                            <li><a href="!#" className={para === "성년의날" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"성년의날")}>성년의 날</a></li>
                            <li><a href="!#" className={para === "~2만원대" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"~2만원대")}>~2만원대</a></li>
                            <li><a href="!#" className={para === "3~5만원대" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"3~5만원대")}>3~5만원대</a></li>
                            <li><a href="!#" className={para === "뷰티" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"뷰티")}>뷰티</a></li>
                            <li><a href="!#" className={para === "디저트/커피/차" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"디저트/커피/차")}>디저트/커피/차</a></li>
                            <li><a href="!#" className={para === "건강" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"건강")}>건강</a></li>
                            <li><a href="!#" className={para === "발사믹/오일" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"발사믹/오일")}>발사믹/오일</a></li>
                            <li><a href="!#" className={para === "와인/위스키/전통주" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"와인/위스키/전통주")}>와인/위스키/전통주</a></li>
                            <li><a href="!#" className={para === "꽃" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"꽃")}>꽃</a></li>
                            <li><a href="!#" className={para === "신선" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"신선")}>신선</a></li>
                            <li><a href="!#" className={para === "리빙/주방" ? 'on' : ''} onClick={(e)=>onClickTabBtn(e,"리빙/주방")}>리빙/주방</a></li>
                        </ul>
                    </nav>
                    <div className="slide-container">
                        <div className="slide-view">
                            <Section9SlideWrapSlide 상품 = {state.상품}/>
                        </div>
                        <a href="!#" className='arrow-next-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                        <a href="!#" className='arrow-prev-btn'><img src="./img/intro/slide_arrow_white.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};
