import React,{useEffect, useState} from 'react';
// {}안에 써주면 밑에서 쓸때 React생략해도됨
import Section5SlideWrapSlide from './Section5SlideWrapSlide';
import axios from 'axios';

export default function Section5Component() {

    const [state, setState] = useState({
        상품: [],
        n: 0
    });

    useEffect(()=>{
        axios({
            url: './data/sec5_slide.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200) {
                setState({
                    ...state,
                    상품: res.data.상품,
                    n: res.data.상품.length
                });
            } 
        })
        .catch((err)=>{console.log('AXIOS 실패! ' + err)});
    },[state.n]);

    return (
        <section id="section5">
            <div className="container">
                <div className="title hide">
                    <h2>이 상품 어때요?</h2>
                </div>
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <Section5SlideWrapSlide 상품 = {state.상품}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
