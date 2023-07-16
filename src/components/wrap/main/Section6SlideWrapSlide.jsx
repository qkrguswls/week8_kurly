import React from 'react';
import $ from 'jquery';

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section6SlideWrapSlide({상품}) {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

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
                        <li><h2>기저귀 최저가 도전</h2></li>
                        <li><h3>샛별배송으로 떨어질 걱정 끝!</h3></li>
                        <li><p>망설이면 늦어요!</p></li>
                    </ul>
                </div>
            </li>
            {
                상품.map((item, idx)=>{
                    return (
                        <li className="slide slide2" key={item.번호}>
                            <div className="slide-gap" onClick={(e)=>onClickViewProduct(e, item, `./img/intro/f9d78649-971f-419d-87fc-69320594a01f.jpeg`)}>
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
