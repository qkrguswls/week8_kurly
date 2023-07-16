import React from 'react';

export default function Section1SlideWrapSlide({이미지, n}) { //Section1Component.jsx의 프롭스 이미지임

    // 제이쿼리로 만든 이벤트를 리액트로 만들어주기!

    const [cnt, setCnt] = React.useState(0); //변수한개일땐(cnt=0) 이렇게써도됨
    const [isArrow, setIsArrow] = React.useState(false);
    const refSlideWrap = React.useRef(); // 선택자 만들기

    // 슬라이드 전체너비
    React.useEffect(()=>{
        refSlideWrap.current.style.width = `${100 * (n+2)}%`;
    },[n]);

    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }
    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 메인 슬라이드 함수
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const mainSlide=()=>{
        refSlideWrap.current.style.transition = `all 0.6s ease-in-out`;
        refSlideWrap.current.style.left = `${-(100 * cnt)}%`;

        returnNextFirst();
        returnPrevFirst();
    }
    
    // next 마지막 슬라이드 처음으로 리턴 함수
    const returnNextFirst=()=>{
        if (cnt>n) {
            setCnt(1); //처음으로 - 1을해준이유: 눈속임으로 첫장을 맨끝에 넣어둬서 그게 보여진 후에 두번째 슬라이드가나올땐 1번째로 시작함
            refSlideWrap.current.style.transition = `none`; //처음으로 돌아가는게 보이지않도록 - 순간이동
            refSlideWrap.current.style.left = `0%`; //초기화
        }
    }
    // prev 처음 슬라이드 마지막으로 리턴 함수
    const returnPrevFirst=()=>{
        if (cnt<0) {
            setCnt(n-1); //마지막으로 - 0~19까지니까 -1
            refSlideWrap.current.style.transition = `none`; //처음으로 돌아가는게 보이지않도록 - 순간이동
            refSlideWrap.current.style.left = `${-(100 * n)}%`; //초기화
        }
    }

    React.useEffect(()=>{
        mainSlide();
    },[cnt, mainSlide]);

    const onMouseEnterContainer=(e)=>{
        e.preventDefault();
        setIsArrow(true);
    }
    const onMouseLeaveContainer=(e)=>{
        e.preventDefault();
        setIsArrow(false);
    }

    return (
        <div className="slide-container" onMouseEnter={onMouseEnterContainer} onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">
                <ul ref={refSlideWrap} className='slide-wrap'>
                    {/* axios 데이터 내려받아서 반복처리 */}
                    {
                        이미지.map((item, idx)=>{
                            return (
                                <li className="slide" key={idx}><a href="!#"><img src={item.src} alt="" /></a></li>
                            )
                        })
                    }
                </ul>
            </div>

            {
                isArrow && (
                    // && isArrow가 true면 밑에를 실행하라
                <>
                    <a onClick={onClickNextArrowBtn} href="!#" className='next-arrow-btn'><img src="./img/intro/icon_arrow_grey.svg" alt="" /></a>
                    <a onClick={onClickPrevArrowBtn} href="!#" className='prev-arrow-btn'><img src="./img/intro/icon_arrow_grey.svg" alt="" /></a>
                </>)
            }

            <span className='page-number-box'>
                <em className='current-number'>{cnt+1 > n ? 1 : cnt+1}</em>
                <i>/</i>
                <em className='total-number'>{n}</em>
            </span>
        </div>
        
    );
};
