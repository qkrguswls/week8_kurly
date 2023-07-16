import React from 'react';
import Postcode from 'react-daum-postcode';
import { ViewProductContext } from '../context/ViewProductContext';

export default function PostCodeChild() {

    const {post, setPost} = React.useContext(ViewProductContext);

    const [state, setState] = React.useState({
        moreView: false
    });
    
    const onCompletePostCode=(data)=>{
        // console.log(data);
        // console.log(data.zonecode);
        // console.log(data.address);
        
        setPost({
            ...post,
            주소1: data.address
        });
    }

    const onChangeAddress2=(e)=>{
        setPost({
            ...post,
            주소2: e.target.value
        });
    }
    
    const onClickMoreView=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            moreView: !state.moreView
        });
    }
    // !state.moreView => toggle.. true이면 false로, false이면 true로 바뀌게만듦

    const onClickAddressSave=(e)=>{
        e.preventDefault();

        // 주소를 새로고침해도 유지하도록 세션스토리지에 저장하기
        const addr = {
            주소1: post.주소1,
            주소2: post.주소2
        }

        // 로컬에 저장
        sessionStorage.setItem(post.addressKey, JSON.stringify(addr));

        // 버튼 누르면 닫기
        setPost({
            ...post,
            isPostCode: false
        });
    }

    const postCodeStyle = { //본래 카카오에서 지정한 껍데기 값은 내부스타일에서 바꿔야 변경됨(f12에서 확인하기)
        width: '100%', 
        height: '100%',
        background: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2
        // display: 'none' //개발할동안에만
    }

    return (
        <div id="postCodeBox">

            <div id="form">
                <form>
                    <ul>
                        <li><h1><strong>샛별배송</strong> <span>지역입니다.</span></h1></li>
                        <li><h2>매일 새벽, 문 앞까지 신섬함을 전해드려요.</h2></li>
                        <li>
                            <div>{post.주소1}</div>
                            <button>재검색</button>
                        </li>
                        <li>
                            <input type="text" id='add2' name='add2' value={post.주소2} onChange={onChangeAddress2}/>
                        </li>
                        <li>
                            <p>
                                ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br/>
                                로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                            </p>
                        </li>
                        <li>
                            <button onClick={onClickAddressSave}>저장</button>
                        </li>
                        <li>
                            <p>샛별배송 지역 중 배송불가 장소 안내</p>
                            <div>
                                <strong>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</strong>
                                <a href="!#" onClick={onClickMoreView}>자세히 보기</a>
                            </div>
                        </li>
                        <li>
                            {
                                state.moreView && (
                                    <ul class="sub">
                                        <li>가락동농수산물도매시장</li><li>가락동농수산물시장</li><li>가천대학교</li><li>고려대학교안암캠퍼스</li><li>고매동 일부(일부지역만 배송가능)</li><li>국립중앙박물관</li><li>국민대학교</li><li>덕성여자대학교</li><li>덕양구 신원동 일부(일부지역만 배송가능)</li><li>도내동 일부(원흥지구만 배송가능)</li><li>동덕여자대학교</li><li>반월특수지구</li><li>서경대학교</li><li>서울사이버대학교</li><li>서울시립대학교</li><li>서울여자대학교</li><li>성균관대학교</li><li>성신여자대학교</li><li>세종대학교</li><li>연세대학교</li><li>이화여자대학교</li><li>한국외국어대학교</li><li>홍익대학교</li>
                                    </ul>
                                )
                            }
                        </li>
                    </ul>
                </form>
            </div>

            {/* 이게 먼저 보이다가 검색 누르면 위에 #form이 나타남 */}
            <Postcode className='post-code' style={postCodeStyle} onComplete={onCompletePostCode}/>
        </div>
    );
};