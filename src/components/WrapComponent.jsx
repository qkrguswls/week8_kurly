import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderModalComponent from './wrap/HeaderModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub01Component from './wrap/main_sub/Sub01Component';
import Sub02Component from './wrap/main_sub/Sub02Component';
import Sub03Component from './wrap/main_sub/Sub03Component';
import Sub04Component from './wrap/main_sub/Sub04Component';
import Sub05SignUpComponent from './wrap/main_sub/Sub05SignUpComponent';
import Sub06SignInComponent from './wrap/main_sub/Sub06SignInComponent';
import Sub07NoticeComponent from './wrap/main_sub/Sub07NoticeComponent';
import FooterComponent from './wrap/FooterComponent';
import IntroModalComponent from './wrap/IntroModalComponent';
import GoTopComponent from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';

// 모달 - type=1확인, type=2취소,확인
import ConfirmComponent from './wrap/ConfirmComponent';

// 주소검색 API
import PostCodeComponent from './wrap/PostCodeComponent';

// 컨텍스트 가져오기
import { ViewProductContext } from './context/ViewProductContext';

export default function WrapComponent() {
    ///////// 최근 본 상품 /////////
    // 로컬스토레이지!
    // 상태관리 변수
    // 최근 본 상품 - 키: KURLY_VIEW_PRODUCT_HJ
    // 장바구니 - 키: KURLY_CART_PRODUCT_HJ
    const [viewProduct, setViewProduct] = useState({
        viewProductKEY: 'KURLY_VIEW_PRODUCT_HJ',
        최근본상품: {},
        isClick: false,
        isTime: false,
        isQuickMenu: false,
        최근본상품리스트: [],
        imgPath: ''
    }); //객체로 보관 시 - 한번 누를때마다 이미지정보가 하나씩 저장되도록

    // 비구조화
    const {viewProductKEY, 최근본상품, isClick, isTime, isQuickMenu, 최근본상품리스트} = viewProduct;

    // 로딩시 저장소에서 가져오기 - 퀵메뉴 리스트 내려보낼 최근본상품리스트
    React.useEffect(()=>{
        if (localStorage.getItem(viewProductKEY) !== null) {
            setViewProduct({
                ...viewProduct,
                최근본상품리스트: JSON.parse(localStorage.getItem(viewProductKEY))
            });
        }
    },[]);

    // 2. 상태변수가 변경되면 즉시 동작하는 effect훅을 사용
    useEffect(()=>{ //2. 1/1000초의 날짜시간 추가(time정보 추가)

        if (isClick === true) {
            setViewProduct({
                ...viewProduct,
                최근본상품: {
                    ...최근본상품,
                    이미지: viewProduct.imgPath,
                    time: new Date().getTime() //클릭한 시점의 날짜시간을 저장
                },
                isClick: false, //한번 실행되고 초기화
                isTime: true
            });
        }

    },[최근본상품]); //로딩시 1회 실행 그리고 다시 최근본상품이 변경되면 실행

    // 3. 로컬스토리지 저장소에 최근본상품 time추가항목까지 배열로 저장
    // (저장소는 반드시 객체를 문자열로 저장해야한다)
    useEffect(()=>{

        // 3-1) 로컬스토리지에 저장된 데이터 가져오기
        // 3-2) 가져온 데이터와 현재 데이터를 병합하여 배열로 저장하기
        // 3-3) 저장소에 저장된 데이터가 있을때
        // 3-4) 저장소에 저장된 데이터가 없을때

        let arr = []; //임시배열

        if (isTime === true) {
            if (localStorage.getItem(viewProductKEY) !== null) { //3-3
                arr = JSON.parse(localStorage.getItem(viewProductKEY)); //[{...},{...}]
                arr = [
                    최근본상품, //이게 위에 있어서 스택 구조가 됨
                    ...arr //이게 위에 있으면 큐 구조가 됨
                ];
            } else {
                arr = [최근본상품];
            }

            // 최근본상품의 데이터 최종 저장
            localStorage.setItem(viewProductKEY, JSON.stringify(arr)); //문자열로 저장

            setViewProduct({
                ...viewProduct,
                isTime: false,
                isQuickMenu: true, //퀴메뉴에게 전송할 신호
                최근본상품리스트: arr
            });
        }

    },[최근본상품.time]); //time이 변경되면

    // 1. setter 함수
    // 클릭하면 로컬스토리지 상품정보를 모두 가져오고 - 제품코드와 방금 클릭한 제품코드를 비교하고 - 클릭한 제품코드가 이미 등록된 상품이면(로컬스토리지) 저장하지 않는다
    const setViewProductFn=(value, imgPath)=>{
        // console.log(value);

        // 이 부분에! -  중복된 데이터가 있다면 저장안함 - 단 저장소에 데이터가 없다면 비교 안하고 바로 저장하고 그렇지 않다면 비교하기
        if (localStorage.getItem(viewProductKEY) !== null) {
            let result = JSON.parse(localStorage.getItem(viewProductKEY));

            // 전체를 비교하고 많은 데이터 중에 1개라도 있다면 저장 안함
            /*
            // 방법1.
            let found = false;

            result.map((item)=>{
                if (item.번호 === value.번호) {
                    found = true; //중복 - 저장하지말고 나가기
                }
            });

            if (found === false) {
                setViewProduct({
                    ...viewProduct,
                    최근본상품: value,
                    isClick: true,
                    imgPath: imgPath
                });
            }
            */

            // 방법2. 배열 - 비교 한줄코딩
            // found에는 결과값이 배열로 저장됨 ex.found[false,false,false...true,false]
            const found = result.map((item)=> item.번호 === value.번호); // ? true : false가 생략된 구문, 매우 간단해짐
            
            // console.log(found.includes(true));

            if (found.includes(true) === false) { //true가 없으면 즉, 중복된 데이터가 아니면
                setViewProduct({
                    ...viewProduct,
                    최근본상품: value,
                    isClick: true,
                    imgPath: imgPath
                });
            }

        } else {
            setViewProduct({
                ...viewProduct,
                최근본상품: value, //1.저장
                isClick: true,
                imgPath: imgPath
            });
        }    
    }


    ///////// headerModal /////////
    // 로컬스토레이지! - 메모리 사용
    const [storageCookie] = useState({
        key: 'HJKURLY_HEADERMODAL',
        value: 'SIGNUP_SALE_EVENT',
        expires: 1 //1년
    });

    // 비구조화
    const {key, value, expires} = storageCookie;

    const [headerModal, setHeaderModal] = useState(true);

    // headerModal 닫기
    const setHeaderModalClose=()=>{
        setHeaderModal(false);

        let today = new Date();
        // today.setDate(today.getDate()+expires);
        today.setFullYear(today.getFullYear()+expires);
        
        const val = {
            value: value,
            expires: today.getTime()
        }
        localStorage.setItem(key, JSON.stringify(val)); //객체는 문자열로 변환
    }

    // 로컬스토리지에 저장된 headerModal의 키와 값
    useEffect(()=>{
        if (localStorage.getItem(key) === null) { //키가 없으면 리턴, 강제종료
            return;
        }
        // 쿠키는 공백, 로컬스토리지는 null로 예외처리해줘야함* - key값을 바꿔서 콘솔확인해보면 null뜸

        const topModal = JSON.parse(localStorage.getItem(key));

        /*
        console.log(topModal);
        console.log(topModal.value);
        console.log(new Date(topModal.expires));
        console.log(new Date(topModal.expires).getFullYear()); //month면 +1해줘야함
        
        console.log(new Date(1716858935624).getFullYear()); //마켓컬리 로컬스토리지 값이 언젠지 한번 해본거임 - 1년짜리가 됐는지!
        console.log(new Date(1716858935624).getMonth()+1); //0~11이라서 +1해줘야함
        console.log(new Date(1716858935624).getDate());
        */

        if (new Date() > new Date(topModal.expires)) {
            setHeaderModal(true); //만료일이 지남 - 모달 띄워야함
        } else {
            setHeaderModal(false); //만료일 남음 - 모달 닫기
        }

    },[]);

    
    ///////// introModal /////////
    // 쿠키!
    const [cookie] = useState({
        cookieName: 'HJKURLY_INTROMODAL_01',
        cookieValue: 'YEAR8_SALE_EVENT_MODALWINDOW',
        cookieExpires: 3 //3일
    });
    const {cookieName, cookieValue} = cookie; //cookie.cookieName이 기니까 비구조화시킴 - 그럼 그냥 쿠키는 생략하고 이름을 편하게 쓸수있음

    const [introModal, setIntroModal] = useState(true); //변수(introModal)와 setter(setIntroModal)

    // introModal 열기
    const introModalOpen=()=>{
        setIntroModal(true);
    }
    // introModal 닫기
    const introModalClose=()=>{
        setIntroModal(false);
    }

    // getCookie - 쿠키 가져오기
    const getCookie=()=>{
        // 가져올 쿠키가 없으면 trim()공백이 없어져 오류가 뜸
        if (document.cookie === '') {
            return;  //나가도록 - 예외처리
        }

        let cookie = document.cookie.split(';');
        // console.log(cookie);

        let arr = [];
        cookie.map((item, idx)=>{ //2차원 배열
            // console.log(item.split('=')[0].trim()); //trim 공백제거
            // console.log(item.split('=')[1].trim());

            arr[idx] = {
                쿠키이름: item.split('=')[0].trim(),
                쿠키값: item.split('=')[1].trim()
            }
        });

        // 쿠키이름, 쿠키값 비교
        // 있다면(found) 모달창 닫기 / 없다면(not found) 모달창 열기
        arr.map((item)=>{
            if (item.쿠키이름 === cookieName && item.쿠키값 === cookieValue) {
                setIntroModal(false);
            } //기본값이 true니까 else안써줌
        });
    }

    useEffect(()=>{
        getCookie();
    },[introModal]);


    ////////////////// ConfirmComponent ////////////////
    // ConfirmComponent - 모달 상태변수
    const [confirm, setConfirm] = useState({
        isConfirm: false,
        msg: '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
        type: 1,
        timerStart: false
    });

    const {msg, type, isConfirm, timerStart} = confirm;

    // 모달 닫기함수
    const confirmModalClose=()=>{
        if (msg.includes('인증번호') === true) { //이거 안하면 다른 input중복확인 버튼에도 타이머가 뜨게돼서!
            setConfirm({
                isConfirm: false,
                timerStart: true
            });
        } else {
            setConfirm({
                isConfirm: false
            });
        }

        // 모달을 닫으면 다시 스크롤창이 나타나게
        document.querySelector('html').style.overflowY = 'auto';
    }
    // 모달 열기함수
    const confirmModalOpen=(msg, type)=>{
        setConfirm({
            isConfirm: true,
            msg: msg,
            type: type
        });

        // 모달이 뜨면 스크롤창이 없어지게
        document.querySelector('html').style.overflow = 'hidden';
    }


    ////////////////// PostCodeComponent ////////////////
    // 주소검색 상태변수
    const [post, setPost] = useState({
        isPostCode: false,
        주소1: '',
        주소2: '',
        addressKey: 'KURLYADDRESSKEY'
    });

    // 로딩, 새로고침할때
    // sessionStorage()에 등록된 주소가 있다면 상태변수에 저장하기
    useEffect(()=>{
        let result = '';
        if (sessionStorage.getItem(post.addressKey) !== null) {
            result = JSON.parse(sessionStorage.getItem(post.addressKey));
            setPost({
                ...post,
                주소1: result.주소1,
                주소2: result.주소2
            });
        }
    },[]);

    return (
        <div id='wrap'>
            <ViewProductContext.Provider value={{setViewProductFn, confirmModalClose, confirmModalOpen, msg, type, timerStart, post, setPost}}>

                {headerModal && <HeaderModalComponent setHeaderModalClose={setHeaderModalClose}/>}

                <BrowserRouter basename={process.env.PUBLIC_URL}>
                {/* 매번 뜨는게 아니라 교체되는 페이지들 */}
                    <Routes>
                        <Route path='/' element={<HeaderComponent/>}> {/* 항상 떠있다는 뜻 - 고정페이지 */}
                            <Route index element={<MainComponent/>}/> {/* 로딩시에 처음 보여질 페이지 */}
                            <Route path='/main' element={<MainComponent/>}/>
                            <Route path='/sub01' element={<Sub01Component />}/>
                            <Route path='/sub02' element={<Sub02Component/>}/>
                            <Route path='/sub03' element={<Sub03Component/>}/>
                            <Route path='/sub04' element={<Sub04Component/>}/>
                            <Route path='/signUp' element={<Sub05SignUpComponent/>}/>
                            <Route path='/signIn' element={<Sub06SignInComponent/>}/>
                            <Route path='/notice' element={<Sub07NoticeComponent/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>

                <FooterComponent/>
                {introModal && <IntroModalComponent introModalClose={introModalClose} cookie={cookie}/>}
                {/* {}는 자바스크립트 문법 */}
                {/* cookie={cookie}로 써주면 안에 있는 네임벨류익스파이어스 변수 다 사용가능함 */}
                <GoTopComponent/>
                <QuickMenuComponent 최근본상품리스트={최근본상품리스트}/>
                {isConfirm && <ConfirmComponent/>}
                {post.isPostCode && <PostCodeComponent/>}

            </ViewProductContext.Provider>
        </div>
    );
};
