import React,{useState, useEffect} from 'react';
import goTopImage from './images/go_top.png';
import './scss/go_top.scss';

export default function GoTopComponent() {
    ///////// GoTop 버튼 ////////
    // 클릭 시 부드럽게 맨위로 올라감
    const [goTop, setGoTop] = useState(false); //초기값이 false - 처음엔 버튼이 안보이니까

    useEffect(()=>{
        window.addEventListener('scroll', function(){
            let goTop = false;

            if (window.scrollY > 1000) { //1000px 초과이면
                goTop = true;
            } else {
                goTop = false;
            }
            setGoTop(goTop);
        });
    },[]);

    return (
        <div id="goTop" className={goTop === true ? 'on' : 'off'}>
            <a href="#wrap"><img src={goTopImage} alt="" /></a>
        </div>
    );
};