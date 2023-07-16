import React from 'react';

// 컨텍스트 가져오기
import {ViewProductContext} from '../../context/ViewProductContext';

export default function Section2SlideWrapSlide({상품}) {

    // 컨텍스트 사용 등록
    const {setViewProductFn} = React.useContext(ViewProductContext);

    // 최근 본 상품
    // 클릭한 상품을 저장소에 보관하기 - 저장된 데이터를 가져와서 우측 퀵메뉴 이미지박스에 스택구조로 배치
    // 상품정보 모두 저장 + 클릭한 시점의 날짜시간 저장(1/1000초 단위) ..로컬스토리지에! ..WrapComponent.jsx
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        // console.log(item);

        setViewProductFn(item, imgPath); //현재 클릭한 상품정보가 최상위 컴포넌트에게 전달됨
    }

    return (
        <ul className="slide-wrap">
            {
                상품.map((item, idx)=>{
                    return (
                        <li className="slide" key={item.번호} >
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
