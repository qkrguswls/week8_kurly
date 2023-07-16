import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { ViewProductContext } from '../context/ViewProductContext';

export default function HeaderComponent() {
    
    // 주소검색
    const {post, setPost} = React.useContext(ViewProductContext);

    const onClickAddress=(e)=>{
        e.preventDefault();
        setPost({
            ...post,
            isPostCode: true
        });
    }

    const useLoc = useLocation();

    // 상태관리
    const [state, setState] = React.useState({
        isSub1: false,
        isSub2: false,
        isFixed: false
    });

    // 헤더 fixed
    // refRow3Fixed useRef() 변수 등록
    const refRow3Fixed = React.useRef(); //${'.row3'}를 리액트에서는 ref로 함

    React.useEffect(()=>{
        // 현재 row3의 position top값을 참조
        const row3Top = refRow3Fixed.current.offsetTop; //바닐라방식, 제이쿼리는 offset().top으로 씀
        
        // 윈도우 스크롤 구현
        window.addEventListener('scroll', function(a,b) {
            let isFixed = false; //변수를 안만들면 if와 else에 각각 setState를 써줘야해서 복잡도를 줄이기 위해!

            if (window.scrollY >= row3Top) {
                isFixed = true;
            } else {
                isFixed = false;
            }
            setState({
                ...state,
                isFixed: isFixed
            });
        });
    },[]);
    
    // 고객센터
    const onMouseEnterNotice=()=>{
        setState({
            ...state,
            isSub1: true
        });
    }
    const onMouseLeaveNotice=()=>{
        setState({
            ...state,
            isSub1: false
        });
    }

    // 배송지
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            isSub2: true
        });
    }
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            isSub2: false
        });
    }

    return (
        <>
            <header id='header'>
                <div className="row1">
                    <div className="container">
                        <div className="content">
                            <span><Link to="/signUp" className="on">회원가입</Link></span>
                            <span><i>|</i></span>
                            <span><Link to="/signIn">로그인</Link></span>
                            <span><i>|</i></span>
                            <span>
                                <Link to="/notice" onMouseEnter={onMouseEnterNotice}>고객센터 <img src="./img/intro/ico_down_16x10.png" alt="" /></Link>{/* img경로가 원래는 더 긴데 찾은 후에는 저렇게 해줘야함 */}
                                {
                                    state.isSub1 && (<div className="sub" onMouseLeave={onMouseLeaveNotice}>
                                        <ul>
                                            <li><Link to="/notice">공지사항</Link></li>
                                            <li><a href="!#">자주하는 질문</a></li>
                                            <li><a href="!#">1:1 문의</a></li>
                                            <li><a href="!#">대량주문 문의</a></li>
                                        </ul>
                                    </div>)
                                    // &&는 참이면 보이고 거짓이면 안보임
                                }   
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`row2 ${state.isFixed ? 'on' : ''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <span><Link to="/main"><img src="./img/intro/kurly.svg" alt="" /><strong>마켓컬리</strong></Link></span>
                                <span><i>|</i></span>
                                <span><a href="!#">뷰티컬리</a></span>
                            </div>
                            <div className="center">
                                <div>
                                    <input type="text" name='input_search' id='inputSearch' placeholder='검색어를 입력해주세요'/>
                                    <a href="!#" className='search-btn'><img src="./img/intro/icon_search.svg" alt="" /></a>
                                </div>
                            </div>
                            <div className="right">
                                <div>
                                    <a href="!#" onMouseEnter={onMouseEnterMap}><img src="./img/intro/icon_map.svg" alt="" /></a>

                                    {
                                        state.isSub2 && (<div className="sub" onMouseLeave={onMouseLeaveMap}>
                                            <ul>
                                                {
                                                    post.주소1 === '' ? (
                                                        <li>
                                                            <h2>배송지를 등록</h2>
                                                            <h3>구매 가능한 상품을 확인하세요!</h3>
                                                        </li>
                                                    )
                                                    :
                                                    (
                                                        <li>
                                                            {post.주소1} &nbsp; {post.주소2}
                                                        </li>
                                                    )
                                                }
                                                <li>
                                                    <button className='login'>로그인</button>
                                                    <button className='addr-search' onClick={onClickAddress}>
                                                        <img src="./img/header/icon_search.png" alt="" />
                                                        주소검색
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>)
                                    }

                                </div>
                                <div><a href="!#"><img src="./img/intro/icon_heart.svg" alt="" /></a></div>
                                <div><a href="!#"><img src="./img/intro/icon_cart.svg" alt="" /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={refRow3Fixed} className={`row3 ${state.isFixed ? 'on' : ''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <a href="!#"><span>카테고리</span>
                                </a>
                            </div>
                            <div className="center">
                                <nav>
                                    <ul>
                                        <li className={useLoc.pathname === '/sub01' ? 'on' : ''}><Link to="/sub01">신상품</Link></li>
                                        <li className={useLoc.pathname === '/sub02' ? 'on' : ''}><Link to="/sub02">베스트</Link></li>
                                        <li className={useLoc.pathname === '/sub03' ? 'on' : ''}><Link to="/sub03">알뜰상품</Link></li>
                                        <li className={useLoc.pathname === '/sub04' ? 'on' : ''}><Link to="/sub04">특가/혜택</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="right">
                                <a href="!#">
                                    <strong>샛별・택배</strong><span>배송안내</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet/> {/* 이 위치에 링크가 나오는거임 */}
        </>
    );
};
