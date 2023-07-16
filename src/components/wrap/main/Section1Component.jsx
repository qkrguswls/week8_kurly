import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Section1SlideWrapSlide from './Section1SlideWrapSlide';

export default function Section1Component() {

    // 상태관리 Statement
    // 상태관리가 가장 먼저 실행됨 - 그다음 return문 - useEffect 순서
    const [state, setState] = React.useState({
        이미지: [], //이미지소스 22개 저장됨
        n: 0
    });

    // 메인슬라이드 controller
    // (modeling은 data안의 sec1_slide.json파일)
    React.useEffect(()=>{
        // console.log('실행순서 useEffect-1 위(Top)');
        axios({
        url: './data/sec1_slide.json',
        method: 'GET'
        })
        .then((res)=>{
            // console.log('실행순서 useEffect-1 axios -> then -> setState 상태관리 변경 이전');
            // 가져온 데이터 상태 배열변수에 저장
            if(res.status === 200){ //axios가 데이터 가져오기를 성공했을때
                setState({
                    // 여러개일땐 ...써주기
                    이미지: res.data.이미지, //sec1_slide.json데이터 이름이 이미지임
                    n: res.data.이미지.length-2
                });
                // console.log(res.data.이미지.length);
            }
            // console.log('실행순서 useEffect-1 axios -> then -> setState 상태관리 변경 후');
        })
        .catch((err)=>{
            console.log('axios 실패');
            console.log(err);
        });
        // console.log('실행순서 useEffect-1 아래(Bottom)');
    },[]); //[] 빈배열쓰면 반복멈춤, 로딩시와 코딩읽은후 두번 실행됨

    /*
    React.useEffect(()=>{
        // console.log('실행순서 useEffect-2 위(Top)');
        let cnt = 0;
        let n = state.n;
        console.log('n변수는 ' + n);

        $('#section1 .slide-wrap').css({width: `${100*n}%`}); //슬라이드 개수별 자동화

        // 1. 메인 슬라이드
        function mainSlide(){
            // 애니메이션 제작
            // 자동화 => 전체 슬라이드 개수
            $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 600, function(){
                if (cnt > n-3) { //19
                    cnt = 0;
                }
                if (cnt < 0) {
                    cnt = n-3; //19, 마지막 슬라이드(처음을 0에서 시작했으니까)
                }
                $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 0); //리턴 후 순간이동 - 이거 안해주면 첫슬라이드로 돌아가는게 보임
            });

            // 페이지번호 함수 호출
            pageNumber();
        }

        // 2-1. 다음 슬라이드 카운트
        function nextCount(){
            cnt++;
            mainSlide();
        }
        // 2-2. 이전 슬라이드 카운트
        function prevCount(){
            cnt--;
            mainSlide();
        }

        // 3. 자동 타이머
        // setInterval(nextCount, 3000);
        // setInterval(prevCount, 3000);

        // 4. 현재페이지 번호 함수
        function pageNumber(){
            $('#section1 .current-number').text(cnt+1 > n-2 ? 1 : (cnt+1 === 0 ? n-2 : cnt+1)); //삼항연산자, n-2는 마지막슬라이드
        }

        // 5-1. 다음 버튼 카운트
        $('#section1 .next-arrow-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        // 5-2. 이전 버튼 카운트
        $('#section1 .prev-arrow-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });
        // console.log('실행순서 useEffect-2 아래(Bottom)');

        // 6. slide-container에 mouseenter하면 버튼 카운트 나타나도록
        $('#section1 .slide-container').on({
            mouseenter(){
                $('#section1 .next-arrow-btn').stop().animate({opacity:1}, 600);
                $('#section1 .prev-arrow-btn').stop().animate({opacity:1}, 600);
            },
            mouseleave(){
                $('#section1 .next-arrow-btn').stop().animate({opacity:0}, 600);
                $('#section1 .prev-arrow-btn').stop().animate({opacity:0}, 600);
            }
        });

    },[state.n]);
    */

    // 슬라이드 마우스 오버 리브 이벤트
    /*
    const onMouseEnterArrowView=()=>{
        setState({
            ...state,
            isNextPrev: true
        });
    }
    */

    return (
        <section id="section1">
            <Section1SlideWrapSlide 이미지 = {state.이미지} n={state.n}/>
            {/* 이미지와 n을 내려보냄 */}
            {/* 이미지는 프롭스, 변수이름(똑같이써주는게편함)이고 state.이미지는 상태관리 */}
        </section>
    );
};
