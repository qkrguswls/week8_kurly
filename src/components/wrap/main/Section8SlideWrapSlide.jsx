import React from 'react';

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section8SlideWrapSlide({상품}) {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    // 최근 본 상품
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();

        setViewProductFn(item, imgPath); 
    }

    return (
        <ul className="slide-wrap">
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
                                        <li>{item.상품이름}</li>
                                        <li>
                                            {
                                                item.할인율 > 0 ? (
                                                    <>
                                                    {/* 태그가 두개이상 나열되어있으면 태그로 묶어줘야함(여기선 빈태그로 묶어줌) */}
                                                        <strong>{Math.round(item.할인율*100)}%</strong>
                                                        <span>{(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</span>
                                                        <em>{item.정가.toLocaleString('ko-KR')}</em>
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
