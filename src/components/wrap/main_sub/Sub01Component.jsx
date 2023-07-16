import React, {useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
import './scss/main_sub.scss';

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Sub01Component() {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    const [state, setState] = useState({
        상품: []
    });

    useEffect(()=>{
        axios({
            url: './data/sub_01.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200) {

                let 상품 = []; //상태변수는 반복 동작 시에 마지막만 저장됨(새로고침돼서) so, 이렇게해줌

                res.data.상품.map((item)=>{ // item.번호 or res.data.상품[idx].번호
                    상품 = [
                        ...상품,
                        {
                            번호: item.번호,
                            이미지: item.이미지,
                            상품이름: item.상품이름,
                            할인율: item.할인율,
                            정가: item.정가,
                            판매가: Math.round(item.정가 * (1-item.할인율)),
                            후기카운트: item.후기카운트
                        }
                    ]
                });

                // 상태관리변수는 반복처리가 끝난 후 한번에 저장 - setState로 반복문 쓰면 문제가 생겨서 따로 빼줌
                setState({
                    상품: 상품,
                    total: 상품.length,
                    list: 6,
                    totPage: 상품.length/6,
                    isCurrent: false,
                    clickNum: 1, //초기값(기본 첫페이지 -> 클릭하면 해당페이지로 바뀜)
                    cnt: 1 //첫페이지 노출
                });

            } 
        })
        .catch((err)=>{console.log('AXIOS 실패! ' + err)});
    },[]);
    
    // 카테고리
    const [isCategoryBtn1, setIsCategoryBtn1] = React.useState(false);
    const [isCategoryBtn2, setIsCategoryBtn2] = React.useState(false);
    const [isCategoryBtn3, setIsCategoryBtn3] = React.useState(false);
    const [isCategoryBtn4, setIsCategoryBtn4] = React.useState(false);
    const [isCategoryBtn5, setIsCategoryBtn5] = React.useState(false);
    
    // sub
    const [isSub2Order, setIsSub2Order] = React.useState(true);

    const [toggle1, setToggle1] = React.useState(false);
    const [toggle2, setToggle2] = React.useState(false);
    const [toggle3, setToggle3] = React.useState(false);
    const [toggle4, setToggle4] = React.useState(false);
    const [toggle5, setToggle5] = React.useState(false);

    // 카테고리
    React.useEffect(()=>{ 
        $('.category-btn1').on({
            click(e){
                e.preventDefault();

                if (toggle1 === false) { //false대신 0으로, true대신 1로 써도됨
                    setToggle1(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn1(true);
                } else {
                    setToggle1(false);
                    $(this).next().stop().slideUp(200);
                    setIsCategoryBtn1(false);
                }
            }
        });
        $('.category-btn2').on({
            click(e){
                e.preventDefault();

                if (toggle2 === false) {
                    setToggle2(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn2(true);
                } else {
                    setToggle2(false);
                    $(this).next().stop().slideUp(200);
                    setIsCategoryBtn2(false);
                }
            }
        });
        $('.category-btn3').on({
            click(e){
                e.preventDefault();

                if (toggle3 === false) {
                    setToggle3(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn3(true);
                } else {
                    setToggle3(false);
                    $(this).next().stop().slideUp(200);
                    setIsCategoryBtn3(false);
                }
            }
        });
        $('.category-btn4').on({
            click(e){
                e.preventDefault();

                if (toggle4 === false) {
                    setToggle4(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn4(true);
                } else {
                    setToggle4(false);
                    $(this).next().stop().slideUp(200);
                    setIsCategoryBtn4(false);
                }
            }
        });
        $('.category-btn5').on({
            click(e){
                e.preventDefault();

                if (toggle5 === false) {
                    setToggle5(true);
                    $(this).next().stop().slideDown(200);
                    setIsCategoryBtn5(true);
                } else {
                    setToggle5(false);
                    $(this).next().stop().slideUp(200);
                    setIsCategoryBtn5(false);
                }
            }
        });

    },[toggle1, toggle2, toggle3, toggle4, toggle5]);

    const onClickOrder=(e, orderName)=>{
        e.preventDefault();
        // console.log(orderName);

        if (orderName === '추천순') { //상품이름(문자열)의 오름차순
            setState({
                ...state,
                상품: state.상품.sort((a,b) => a.상품이름 < b.상품이름 ? (-1) : (a.상품이름 > b.상품이름 ? (1) : (0)))

                /*
                상품: state.상품.sort(function(a,b){
                    if (a.상품이름 < b.상품이름) {return -1;} //-는 오름차순
                    if (a.상품이름 > b.상품이름) {return 1;}
                    if (a.상품이름 === b.상품이름) {return 0;}
                })
                */
            
            });
        } else if (orderName === '신상품순') { //데이터 번호의 오름차순(Aescending)
            setState({ //sort:정렬
                ...state,
                상품: state.상품.sort((a,b) => a.번호 - b.번호) //return문 대신 한줄코딩 - {}가 있으면 return을 꼭 써줘야함
            });
        } else if (orderName === '오래된순') { //데이터 번호의 내림차순(Descending)
            setState({
                // 상품: state.상품.sort(function(a,b){
                //     return b.번호 - a.번호
                // })
                ...state,
                상품: state.상품.sort((a,b) => b.번호 - a.번호)
            });
        } else if (orderName === '혜택순') { //할인율의 내림차순(할인율이 클수록 먼저 나오게)
            setState({
                ...state,
                상품: state.상품.sort((a,b) => b.할인율 - a.할인율)
            });
        } else if (orderName === '낮은가격순') { //판매가의 오름차순
            setState({
                ...state,
                상품: state.상품.sort((a,b) => a.판매가 - b.판매가)
            });
        } else if (orderName === '높은가격순') { //판매가의 내림차순
            setState({
                ...state,
                상품: state.상품.sort((a,b) => b.판매가 - a.판매가)
            });
        }
    }

    // 최근 본 상품
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();

        setViewProductFn(item, imgPath);
    }

    // 페이지네이션
    // 페이지버튼
    const onClickPageBtn=(e, num)=>{
        e.preventDefault();

        setState({
            ...state,
            clickNum: num
        });
    }

    // 페이지버튼 1씩 증가, 감소
    const onClickPrev=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt-1
        });
    }
    const onClickNext=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            cnt: state.cnt+1
        });

    }

    return (
        <main id="mainSub01" className='mainSub'>
            {/* sub01이 나오면 main이 사라지니까 이름을 main으로 해줌 */}
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>이 주의 신상 랭킹</h2>
                        </div>
                        <div className="content">
                            <a href="!#"><img src="./img/sub_page/sub_01/aIcWA1qAhYmdq7llqnbhuurr83QSGPUwaNG2haqc.jpg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>신상품</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-head">
                                    <h3>필터</h3>
                                    <span><img src="./img/sub_page/sub_01/icon_refresh.svg" alt="" />초기화</span>
                                </div>
                                <nav id="category">
                                    <ul>
                                        <li>
                                            <a href="!#" className={`category-btn1 ${isCategoryBtn1 ? 'on' : ''}`}>카테고리<i></i></a>
                                            <div className="sub sub1">
                                                <ul>
                                                    <li><label htmlFor='sub1Chk1'><input type='checkbox' name='sub1_chk' id='sub1Chk1' value='수산·해산·건어물'/>수산·해산·건어물</label></li>
                                                    <li><label htmlFor='sub1Chk2'><input type='checkbox' name='sub1_chk' id='sub1Chk2' value='샐러드·간편식'/>샐러드·간편식</label></li>
                                                    <li><label htmlFor='sub1Chk3'><input type='checkbox' name='sub1_chk' id='sub1Chk3' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                                    <li><label htmlFor='sub1Chk4'><input type='checkbox' name='sub1_chk' id='sub1Chk4' value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                                    <li><label htmlFor='sub1Chk5'><input type='checkbox' name='sub1_chk' id='sub1Chk5' value='헤어·바디·구강'/>헤어·바디·구강</label></li>
                                                    <li><label htmlFor='sub1Chk6'><input type='checkbox' name='sub1_chk' id='sub1Chk6' value='면·양념·오일'/>면·양념·오일</label></li>
                                                    <li><label htmlFor='sub1Chk7'><input type='checkbox' name='sub1_chk' id='sub1Chk7' value='채소'/>채소</label></li>
                                                    <li><label htmlFor='sub1Chk8'><input type='checkbox' name='sub1_chk' id='sub1Chk8' value='주방용품'/>주방용품</label></li>
                                                    <li><label htmlFor='sub1Chk9'><input type='checkbox' name='sub1_chk' id='sub1Chk9' value='간식·과자·떡'/>간식·과자·떡</label></li>
                                                    <li><label htmlFor='sub1Chk10'><input type='checkbox' name='sub1_chk' id='sub1Chk10' value='건강식품'/>건강식품</label></li>
                                                </ul>
                                                <button>카테고리 더보기 <img src="./img/sub_page/sub_01/icon_arrow_right.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn2 ${isCategoryBtn2 ? 'on' : ''}`}>브랜드<i></i></a>
                                            <div className="sub sub2">
                                                <div className="row1">
                                                    <button className={isSub2Order ? 'on' : ''}>가나다순</button>
                                                    <i>|</i>
                                                    <button className={isSub2Order ? '' : 'on'}>상품 많은순</button>
                                                </div>
                                                <div className="row2">
                                                    <a href="!#">전체</a>
                                                    <i></i>
                                                    <a href="!#">ㄱ</a>
                                                    <i></i>
                                                    <a href="!#">ㄴ</a>
                                                    <i></i>
                                                    <a href="!#">ㄷ</a>
                                                    <i></i>
                                                    <a href="!#">ㄹ</a>
                                                    <i></i>
                                                    <a href="!#">ㅁ</a>
                                                    <i></i>
                                                    <a href="!#">ㅂ</a>
                                                    <i></i>
                                                    <a href="!#">ㅅ</a>
                                                    <i></i>
                                                    <a href="!#">ㅇ</a>
                                                    <i></i>
                                                    <a href="!#">ㅈ</a>
                                                    <i></i>
                                                    <a href="!#">ㅊ</a>
                                                    <i></i>
                                                    <a href="!#">ㅋ</a>
                                                    <i></i>
                                                    <a href="!#">ㅌ</a>
                                                    <i></i>
                                                    <a href="!#">ㅍ</a>
                                                    <i></i>
                                                    <a href="!#">ㅎ</a>
                                                    <i></i>
                                                    <a href="!#">A-Z</a>
                                                </div>
                                                <ul>
                                                    <li><label htmlFor='sub2Chk1'><input type='checkbox' name='sub2_chk' id='sub2Chk1' value='낫포유'/>낫포유</label></li>
                                                    <li><label htmlFor='sub2Chk2'><input type='checkbox' name='sub2_chk' id='sub2Chk2' value='농부의 꽃'/>농부의 꽃</label></li>
                                                    <li><label htmlFor='sub2Chk3'><input type='checkbox' name='sub2_chk' id='sub2Chk3' value='니베아'/>니베아</label></li>
                                                    <li><label htmlFor='sub2Chk4'><input type='checkbox' name='sub2_chk' id='sub2Chk4' value='다슈'/>다슈</label></li>
                                                    <li><label htmlFor='sub2Chk5'><input type='checkbox' name='sub2_chk' id='sub2Chk5' value='닥터브로너스'/>닥터브로너스</label></li>
                                                    <li><label htmlFor='sub2Chk6'><input type='checkbox' name='sub2_chk' id='sub2Chk6' value='대흥'/>대흥</label></li>
                                                    <li><label htmlFor='sub2Chk7'><input type='checkbox' name='sub2_chk' id='sub2Chk7' value='데쎄오'/>데쎄오</label></li>
                                                    <li><label htmlFor='sub2Chk8'><input type='checkbox' name='sub2_chk' id='sub2Chk8' value='디어스킨'/>디어스킨</label></li>
                                                    <li><label htmlFor='sub2Chk9'><input type='checkbox' name='sub2_chk' id='sub2Chk9' value='래디어스'/>래디어스</label></li>
                                                    <li><label htmlFor='sub2Chk10'><input type='checkbox' name='sub2_chk' id='sub2Chk10' value='르네휘테르'/>르네휘테르</label></li>
                                                </ul>
                                                <button>브랜드 더보기 <img src="./img/sub_page/sub_01/icon_arrow_right.svg" alt="" /></button>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn3 ${isCategoryBtn3 ? 'on' : ''}`}>가격<i></i></a>
                                            <div className="sub sub3">
                                                <ul>
                                                    <li><label htmlFor='sub3Chk1'><input type='checkbox' name='sub3_chk' id='sub3Chk1' value='5,980원 미만'/>5,980원 미만</label></li>
                                                    <li><label htmlFor='sub3Chk2'><input type='checkbox' name='sub3_chk' id='sub3Chk2' value='5,980원 ~ 9,800원'/>5,980원 ~ 9,800원</label></li>
                                                    <li><label htmlFor='sub3Chk3'><input type='checkbox' name='sub3_chk' id='sub3Chk3' value='9,800원 ~ 18,900원'/>9,800원 ~ 18,900원</label></li>
                                                    <li><label htmlFor='sub3Chk4'><input type='checkbox' name='sub3_chk' id='sub3Chk4' value='18,900원 이상'/>18,900원 이상</label></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn4 ${isCategoryBtn4 ? 'on' : ''}`}>혜택<i></i></a>
                                            <div className="sub sub4">
                                                <ul>
                                                    <li><label htmlFor='sub4Chk1'><input type='checkbox' name='sub4_chk' id='sub4Chk1' value='할인상품'/>할인상품</label></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="!#" className={`category-btn5 ${isCategoryBtn5 ? 'on' : ''}`}>유형<i></i></a>
                                            <div className="sub sub5">
                                                <ul>
                                                    <li><label htmlFor='sub5Chk1'><input type='checkbox' name='sub5_chk' id='sub5Chk1' value='Kurly Only'/>Kurly Only</label></li>
                                                    <li><label htmlFor='sub5Chk2'><input type='checkbox' name='sub5_chk' id='sub5Chk2' value='희소가치 프로젝트'/>희소가치 프로젝트</label></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="right">
                                <div className="right-head">
                                    <span>총 205건</span>
                                    <span>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '추천순')}>추천순 </a><img src="./img/sub_page/sub_01/icon_question.svg" alt="" />
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '신상품순')} className='on'>신상품순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '오래된순')}>오래된순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '혜택순')}>혜택순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '낮은가격순')}>낮은 가격순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '높은가격순')}>높은 가격순</a>
                                    </span>
                                </div>
                                <ul className='product'>
                                    {
                                        state.상품.map((item, idx)=>{
                                            if (Math.ceil((idx+1) / state.list) === state.clickNum){
                                                return (
                                                    <li className="list" key={item.번호} data-key={item.번호}>
                                                        {/* data-key: key번호를 f12 elements창에서 보고싶어서(태그에 나옴) */}
                                                        <div className="list-gap" onClick={(e)=>onClickViewProduct(e, item, `./img/sub_page/sub_01/${item.이미지}`)}>
                                                            <div className="img-box">
                                                                <img src={`./img/sub_page/sub_01/${item.이미지}`} alt="" />
                                                                <span><img src="./img/intro/icon_cart_purple.svg" alt="" /></span>
                                                            </div>
                                                            <div className="text-box">
                                                                <ul>
                                                                    <li>{item.상품이름}</li>
                                                                    <li>
                                                                        {
                                                                            item.할인율 > 0 ? (
                                                                                <>
                                                                                    <strong>{Math.round(item.할인율*100)}%</strong>
                                                                                    <span>{Number((item.정가*(1-item.할인율))).toLocaleString('ko-KR')}원</span>
                                                                                    <em>{Number(item.정가).toLocaleString('ko-KR')}원</em>
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                `${Number(item.정가).toLocaleString('ko-KR')}원`
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
                                            }
                                        })
                                    }
                                </ul>
                                <div className="page-btn-box">
                                    {
                                        state.cnt > 1 && <a href="!#" onClick={onClickPrev} className='prev-btn'><img src="./img/sub_page/icon_arrow_right.svg" alt="" /></a>
                                    }
                                    {
                                        // 페이지네이션: 페이지번호 바인딩
                                        (()=>{ //즉시표현함수식 - 이게 없으면 {}안에 map함수밖에 못씀

                                            // #번호 그룹 별로 넘기기
                                            // 그룹 5개씩 묶음
                                            let group = 5;
                                            // 시작페이지
                                            let from = (state.cnt-1) * group;
                                            // 종료페이지
                                            let to = from + group;
                                            // 그룹페이지 전체 개수
                                            let groupPageTotal = Math.ceil(state.total/state.list);

                                            // #페이지 번호
                                            let pageEl = [];

                                            for (let i = from; i < to; i++){
                                                if (i < groupPageTotal){
                                                    pageEl = [
                                                        ...pageEl,
                                                        <a href='!#' key={i+1} onClick={(e)=>onClickPageBtn(e, i+1)} className={state.clickNum === (i+1) ? 'on' : ''}>{i+1}</a>
                                                    ]
                                                }
                                            }

                                            return pageEl
                                        })()
                                    }
                                    {
                                        state.cnt < Math.ceil(state.total/state.list/5) && <a href="!#" onClick={onClickNext} className='next-btn'><img src="./img/sub_page/icon_arrow_right.svg" alt="" /></a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
