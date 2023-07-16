import React from 'react';

export default function HeaderModalComponent({setHeaderModalClose}) {
    /**
    localStorage
        만료기한 1/1000 .getTime();
        setItem(키, 값); 한쌍
        getItem(키);
    */

    // 비구조화
    // const {key, value, expires} = storageCookie;

    const onClickHeaderModalClose=(e)=>{
        e.preventDefault();
        setHeaderModalClose();
    }

    return (
        <header id='headerModal'>
            <div className="container">
                <div className="content">
                    <a href="!#">
                        지금 가입하고 인기상품 <strong>100원</strong>에 받아가세요!
                        <span onClick={onClickHeaderModalClose}>
                            <img src="./img/header_modal/close.svg" alt="" />
                        </span>
                    </a>
                </div>
            </div>
        </header>
    );
};
