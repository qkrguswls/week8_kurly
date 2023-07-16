import React, { useEffect } from 'react';
import axios from 'axios';
import './scss/main_sub5_signup.scss';
import { ViewProductContext } from '../../context/ViewProductContext';

export default function Sub05SignUpComponent({회원가입}) {

    const {confirmModalOpen, timerStart, post, setPost} = React.useContext(ViewProductContext);

    // 입력된 데이터는 리액트(프론트)에서 PHP,JSP,ASP(백단)으로! => 데이터베이스(MYSQL) 서버에 저장됨

    const [state, setState] = React.useState(회원가입);

    const {isId, isPw1, isPw2, isName, isEmail, isHp, isAddr1, isAddr2, isGender, isChooga1, isChooga2, isService, msgId, msgPw1, msgPw2, msgName, msgEmail, msgHp, msgAddr1, msgAddr2, msgGender, msgBirth, msgChooga1, msgChooga2, chooGaPlaceHolder, chooGaGuideText, msgService, isIdDuplCheck, isEmailDuplCheck, isHpDis, isUserHpDis, 아이디, 비밀번호, 비밀번호확인, 이름, 이메일, 휴대폰, 휴대폰인증발급번호, 휴대폰인증입력번호, 성별, 생년, 생월, 생일, 추가입력사항, 추천인아이디, 이용약관, 이용약관동의, 체크아이디중복, 체크비밀번호, 체크이메일중복, 체크휴대폰인증} = state;

    const onChangeEvent=(e, z)=>{
        if (z === '아이디') {
            // const regexp1 = /(.){6,16}/g; //정규표현식, 6~16범위
            const regexp2 = /([A-Za-z]+[0-9]*){6,16}/g; //6~16범위 영문 대소문자(필수) + 숫자포함(선택) - 숫자만쓰면 false, 영문만쓰면 true
            let isId = false;
            let msgId = '';

            if (regexp2.test(e.target.value) === false) {
                isId = true;
                msgId = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            } else {
                isId = false;
                msgId = '';
            }

            setState({
                ...state,
                아이디: e.target.value,
                isId: isId,
                msgId: msgId
            });
        } 
        else if (z === '비밀번호') {
            // 최소 10자 이상, 영문/숫자/특수문자(공백 제외)만 허용 2개 이상 조합, 동일한 숫자 3개 연속 사용불가
            const regExp1 = /(.){10,}/g;
            // const regExp2 = /(.)\1\1/g; //연속 3자 사용불가(문자와 숫자 모두 포함)
            // const regExp2 = /([0-9])\1\1/g; //연속 3자 사용불가(숫자만)
            const regExp2 = /(\d)\1\1/g; //연속 3자 사용불가(숫자만)
            const regExp3 = /\s/g; //공백
            const regExp4 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+)+|([`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+[A-Za-z]+)+|([0-9]+[`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+)+|([`~!@#$%^&*()\-_=+|\\[\]{}'";:/?.>,<]+[0-9]+)+/g; //영/숫/특 2개이상 조합 - 경우의수3번!
            // +는 반드시 있어야한다는 뜻!

            let isPw1 = false;
            let msgPw1 = '';

            if (regExp1.test(e.target.value) === false) {
                isPw1 = true;
                msgPw1 = '최소 10자 이상 입력';
            } else if (regExp2.test(e.target.value) === true) {
                isPw1 = true;
                msgPw1 = '동일한 숫자 3개 이상 사용 불가';
            } else if (regExp3.test(e.target.value) === true || regExp4.test(e.target.value) === false) {
                isPw1 = true;
                msgPw1 = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            } else {
                isPw1 = false;
                msgPw1 = '';
            }

            setState({
                ...state,
                비밀번호: e.target.value,
                isPw1: isPw1,
                msgPw1: msgPw1
            });
        }
        else if (z === '비밀번호확인') {
            // 이전 입력 비밀번호와 일치
            let isPw2 = false;
            let msgPw2 = '';

            if (비밀번호 !== e.target.value) {
                isPw2 = true;
                msgPw2 = '동일한 비밀번호를 입력';
            } else {
                isPw2 = false;
                msgPw2 = '';
            }

            setState({
                ...state,
                비밀번호확인: e.target.value,
                isPw2: isPw2,
                msgPw2: msgPw2,
                체크비밀번호: true
            });
        }
        else if (z === '이름') {
            let isName = false;
            let msgName = '';

            if (e.target.value === "") {
                isName = true;
                msgName = '이름을 입력해 주세요.';
            } else {
                isName = false;
                msgName = '';
            }

            setState({
                ...state,
                이름: e.target.value,
                isName: isName,
                msgName: msgName
            });
        }
        else if (z === '이메일') {
            // ()[]<>..과 공백 사용불가
            // qkrguswls309@naver.com 혹은 co.kr
            // 시작은 ^ => ^([A-Za-z0-9`~!#$%^&*\-_=+|{}';:/?.,])
            // 끝은 $ => [A-Za-z]{2,3}$
            // *는 여러글자가 와도된다는 뜻(0자이상 다중문자)
            // +는 1자이상 다중문자
            // ?는 하나의 문자만 올수있다는 뜻(0자 또는 1자)

            const regExp = /^([A-Za-z]*|[0-9]*|[`~!#$%^&*\-_=+|{}';:/?.,]*)+@([A-Za-z0-9`~!#$%^&*\-_=+|{}';:/?.,]*)+\.[A-Za-z]{2,3}$/g;
            // 괄호 밖에있는 .는 escape문자처리 해야함. => 역슬레시. => .을 문자로 인식하게 하라는 뜻

            let isEmail = false;
            let msgEmail = '';

            if (regExp.test(e.target.value) === false) {
                isEmail = true;
                msgEmail = '이메일 형식으로 입력해 주세요.';
            } else {
                isEmail = false;
                msgEmail = '';
            }

            setState({
                ...state,
                이메일: e.target.value,
                isEmail: isEmail,
                msgEmail: msgEmail
            });
        }
        else if (z === '휴대폰') {
            // 숫자만! 그 외는 모두 제거(입력과 동시에 삭제), 11자까지 가능!(maxLength)
            const regExp = /[^0-9]/g;
            let isHp = false;
            let msgHp = '';
            let 휴대폰 = '';
            let isHpDis = false;

            // 숫자 제외 모두 삭제
            휴대폰 = e.target.value.replace(regExp, '');

            if (e.target.value === "") {
                isHp = false;
                msgHp = '휴대폰 번호를 입력해 주세요.';
                isHpDis = false;
            } else {
                isHp = true;
                msgHp = '';
                isHpDis = true;
            }

            setState({
                ...state,
                휴대폰: 휴대폰,
                isHp: isHp,
                msgHp: msgHp,
                isHpDis: isHpDis
            });
        }
        else if (z === '휴대폰인증입력번호') {
            setState({
                ...state,
                휴대폰인증입력번호: e.target.value
            });
        } 
    }

    // 아이디 이메일 중복체크
    const onClickDuplCheck=(e, value)=>{
        e.preventDefault();

        if (value === 'ID중복확인') {
            // 데이터베이스 아이디 sql처리 - 중복이면 -1, 아니면 1을 리턴
            // 닷홈 웹서버에 php sql 작성, 데이터베이스 연동 처리
            let newFormData =  new FormData();
            newFormData.append('id', 아이디);
            
            axios({
                    url: 'http://qkrguswls309.dothome.co.kr/week8_kurly/id_duplicate_check.php',
                    method: 'post',
                    data: newFormData
            })
            .then((res)=>{
                if (res.status === 200) {
                    if (res.data !== 1) {
                        setState({
                            ...state,
                            isIdDuplCheck: true,
                            체크아이디중복: true
                        });
                        confirmModalOpen('사용 가능한 아이디입니다.', 1);
                    } else {
                        confirmModalOpen('사용 불가능한 아이디입니다.', 1);
                    }
                }
            })
            .catch((err)=>{console.log(err);});
        } else if (value === 'EMAIL중복확인') {   
            let newFormData =  new FormData();
            newFormData.append('email', 이메일);
            
            axios({
                    url: 'http://qkrguswls309.dothome.co.kr/week8_kurly/email_duplicate_check.php',
                    method: 'post',
                    data: newFormData
            })
            .then((res)=>{
                if (res.status === 200) {
                    if (res.data !== 1) {
                        setState({
                            ...state,
                            isEmailDuplCheck: true,
                            체크이메일중복: true
                        });
                        confirmModalOpen('사용 가능한 이메일입니다.', 1);
                    } else {
                        confirmModalOpen('사용 불가능한 이메일입니다.', 1);
                    }
                }
            })
            .catch((err)=>{console.log(err);});
        }
    }

    // 휴대폰 인증번호 button 이벤트
    // 입력된 휴대폰 번호 유효성검증
    // 인증번호 생성, 보내기
    const onClickHpBtn=(e)=>{
        e.preventDefault();

        if (isUserHpDis === true) { //다른번호인증
            setState({
                ...state,
                isUserHpDis: false,
                휴대폰: '',
                휴대폰인증입력번호: ''
            });
        } else { //인증번호 받기
            let regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; //ex.01087195697
            let 휴대폰인증발급번호 = null;
    
            if (regExp.test(휴대폰) === false) {
                confirmModalOpen('잘못된 휴대폰 번호입니다. 확인 후 다시 시도해주세요.', 1);
            } else {
                // 인증번호 생성 - 6자리 숫자
                휴대폰인증발급번호 = Math.floor(Math.random() * 900000) + 100000;
    
                confirmModalOpen(휴대폰인증발급번호 + '인증번호를 입력해주세요.', 1);
            }
            setState({
                ...state,
                휴대폰인증발급번호: 휴대폰인증발급번호
            });
        }

    }

    // 인증번호 확인 버튼 클릭이벤트
    const onClickAuthenOk=(e)=>{
        e.preventDefault();

        // 입력된 인증번호(입력상자)와 발급된 인증번호(상태관리) 비교
        if (휴대폰인증발급번호 === Number(휴대폰인증입력번호)) {
            confirmModalOpen('인증에 성공했습니다.', 1);

            setState({
                ...state,
                isUserHpDis: true,
                휴대폰인증발급번호: '',
                체크휴대폰인증: true
            });
        } else {
            confirmModalOpen('잘못된 인증코드 입니다.', 1);
        }
    }

    // 휴대폰인증입력 시 3분 타이머 카운트
    const [timer, setTimer] = React.useState({
        분: 0,
        초: 0
    });

    // 휴대폰 인증번호 생성 & 입력대기 카운트 타이머 3분
    // 인증번호 성공하면 입력상자 버튼 숨기고 다른 번호 인증으로 변경 + 입력상자는 입력불가 상태로 변경

    //주소1
    const onChangeAddr1Event=(e)=>{
        setPost({
            ...post,
            주소1: e.target.value
        });
    }

    //주소2
    const onChangeAddr2Event=(e)=>{
        setPost({
            ...post,
            주소2: e.target.value
        });
    }

    // 주소검색
    const onClickAddress=(e)=>{
        e.preventDefault();
        setPost({
            ...post,
            isPostCode: true
        });
    }

    // 성별
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        });
    }

    // 생년월일
    // 조건
    // 생년: 100세 이하, 미래년도x, 14세 미만x 
    // 생월: 1~12 
    // 생일: 1~31
    const onChangeBirthYear=(e)=>{
        setState({
            ...state,
            생년: e.target.value
        });
    }
    const onChangeBirthMonth=(e)=>{
        setState({
            ...state,
            생월: e.target.value
        });
    }
    const onChangeBirthDate=(e)=>{
        setState({
            ...state,
            생일: e.target.value
        });
    }

    useEffect(()=>{
        // 생년, 생월, 생일 세 개의 값이 비어있으면 오류메시지 삭제
        if (생년 === '' && 생월 === '' && 생일 === '') {
            setState({
                ...state,
                msgBirth: ''
            });
            return;
        } else {
            if (생년 === '') {
                setState({
                    ...state,
                    msgBirth: '태어난 년도 4자리를 정확하게 입력해주세요.'
                });
            } else {
                if (Number(생년) < new Date().getFullYear()-100) {
                    setState({
                        ...state,
                        msgBirth: '생년월일을 다시 확인해주세요.(100세 이하 가능)'
                    });
                } else if (Number(생년) > new Date().getFullYear()) {
                    setState({
                        ...state,
                        msgBirth: '생년월일이 미래로 입력 되었습니다.'
                    });
                } 
                else if (Number(생년) >= new Date().getFullYear()-14) {
                    setState({
                        ...state,
                        msgBirth: '만 14세 미만은 가입이 불가합니다.'
                    });
                } else {
                    if (생월 === '') {
                        setState({
                            ...state,
                            msgBirth: '생월을 입력하세요.'
                        });
                    } else if (Number(생월) < 1 || Number(생월) > 12) {
                        setState({
                            ...state,
                            msgBirth: '생월을 입력하세요.'
                        });
                    } else {
                        if (생일 === '') {
                            setState({
                                ...state,
                                msgBirth: '생일을 입력하세요.'
                            });
                        } else if (Number(생일) < 1 || Number(생일) > 31) {
                            setState({
                                ...state,
                                msgBirth: '생일을 입력하세요.'
                            });
                        } else {
                            setState({
                                ...state,
                                msgBirth: ''
                            });
                        }
                    }
                }
            }
        }
    },[생년, 생월, 생일]);

    // 추가입력사항
    const onChangeChooga=(e)=>{

        // 라디오를 체크하면 그 값을 placeholder에 적용
        let chooGaPlaceHolder = '';
        let chooGaGuideText = '';

        if (e.target.value === '친구초대 추천인 아이디') {
            chooGaPlaceHolder = '추천인 아이디를 입력해 주세요.';
            chooGaGuideText = '가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
        } else {
            chooGaPlaceHolder = '참여 이벤트명을 입력해 주세요.';
            chooGaGuideText = '추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. 가입 이후는 수정이 불가능 합니다. 대소문자 및 띄어쓰기에 유의해주세요.';
        }

        setState({
            ...state,
            추가입력사항: e.target.value,
            chooGaPlaceHolder: chooGaPlaceHolder,
            chooGaGuideText: chooGaGuideText
        });
    }

    // 추천인 아이디
    const onChangeChooChunEvent=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
        });
    }

    const onClickChooChunIdOk=(e)=>{
        e.preventDefault();
        
        let newFormData =  new FormData();
        newFormData.append('id', 추천인아이디);
        
        axios({
                url: 'http://qkrguswls309.dothome.co.kr/week8_kurly/id_duplicate_check.php',
                method: 'post',
                data: newFormData
        })
        .then((res)=>{
            if (res.status === 200) {
                if (res.data === 1) {
                    setState({
                        ...state,
                        추천인아이디존재: true
                    });
                    confirmModalOpen('존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.', 1);
                } else {
                    confirmModalOpen('존재하지 않는 아이디 입니다.', 1);
                }
            }
        })
        .catch((err)=>{console.log(err);});
    }

    // 이용약관동의
    // 전체동의
    const onChangeAllCheck=(e)=>{
        if (e.target.checked === true) {
            setState({
                ...state,
                이용약관동의: 이용약관
            });
        } else {
            setState({
                ...state,
                이용약관동의: []
            });
        }
    }

    // 개별동의
    const onChangeCheck=(e)=>{
        if (e.target.checked) {
            setState({
                ...state,
                이용약관동의: [
                    ...이용약관동의, 
                    e.target.value
                ] //기존 값에 새로운 값 추가해야 저장된 상태로 누적됨
            });
        } else {
            // 필터: 선택 취소되면 삭제, 나머지는 그대로 저장
            setState({
                ...state,
                이용약관동의: 이용약관동의.filter((item)=>item !== e.target.value)
            });
        }
    }

    // 회원가입 폼 데이터 서버에 전송 - axios이용해 전송(위에 import해줌)
    const onSubmitSignup=(e)=>{
        e.preventDefault(); //화면 안넘어가도록

        // 유효성 검사 - 필수사항만
        // 아이디가 빈칸인지, 아이디가 중복인지, 비밀번호1,2가 빈칸인지, 이름이 빈칸인지, 이메일이 빈칸인지, 이메일이 중복인지, 휴대폰이 빈칸인지, 휴대폰 인증받았는지, 주소1,2 빈칸인지, 추천인아이디 기능 추가(선택사항), 필수 이용약관동의 3개 체크
        let 이용약관동의필수 = 0;
        let result = 이용약관동의.map((item)=>item.includes('필수') ? 1 : 0);

        result.map((item)=>{
            이용약관동의필수 += item;
        });

        if (아이디 === '') {
            confirmModalOpen('아이디를 입력해주세요.', 1);
        } else if (체크아이디중복 === false) {
            confirmModalOpen('아이디 중복확인을 해주세요.', 1);
        } else if (비밀번호 === '') {
            confirmModalOpen('비밀번호를 입력해주세요.', 1);
        } else if (체크비밀번호 === false) {
            confirmModalOpen('비밀번호 확인을 입력해주세요.', 1);
        } else if (이름 === '') {
            confirmModalOpen('이름을 입력해주세요.', 1);
        } else if (이메일 === '') {
            confirmModalOpen('이메일을 입력해주세요.', 1);
        } else if (체크이메일중복 === false) {
            confirmModalOpen('이메일 중복확인을 해주세요.', 1);
        } else if (휴대폰 === '') {
            confirmModalOpen('휴대폰 번호를 입력해주세요.', 1);
        } else if (체크휴대폰인증 === false) {
            confirmModalOpen('휴대폰 인증번호를 입력해주세요.', 1);
        } else if (post.주소1 === '') {
            confirmModalOpen('주소를 입력해주세요.', 1);
        } else if (post.주소2 === '') {
            confirmModalOpen('상세주소를 입력해주세요.', 1);
        } else if (이용약관동의필수 < 3) {
            confirmModalOpen('이용약관 필수사항에 동의해주세요.', 1);
        } else { //모든 조건 만족 시 전송
            let 이용약관동의텍스트 = JSON.stringify(이용약관동의);
            let newFormData = new FormData(); //폼데이터 생성
            newFormData.append('id', 아이디); //아이디(상태관리에 들어있는 변수)
            newFormData.append('pw', 비밀번호);
            newFormData.append('name', 이름);
            newFormData.append('email', 이메일);
            newFormData.append('hp', 휴대폰);
            newFormData.append('addr', `${post.주소1} ${post.주소2}`);
            newFormData.append('gender', 성별);
            newFormData.append('birth', `${생년}-${생월}-${생일}`);
            newFormData.append('chooga', `${추가입력사항} ${추천인아이디}`);
            newFormData.append('service', 이용약관동의텍스트); //배열은 문자열로 바꿔주기
    
            axios({
                url: 'http://qkrguswls309.dothome.co.kr/week8_kurly/signup.php',
                method: 'POST',
                data: newFormData
            })
            .then((res)=>{
                console.log(res);
    
                if (res.status === 200) {
                    window.location.pathname = '/main'; //메인페이지로 이동하기 위해 메인 라우터주소
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }

    }

    return (
        <main id="mainSub05">
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <h2>회원가입</h2>
                    </div>
                    <form name='signup' id='signup' method='post' onSubmit={onSubmitSignup}>
                    {/* action='http://qkrguswls309.dothome.co.kr/week8_kurly/signup.php' */}
                        <div className="content">
                            <ul>
                                <li className="row1">
                                    <div className='box1'>
                                        <label htmlFor="userId">아이디<i>*</i></label>
                                        <input type="text" name='userId' id='userId' value={아이디} placeholder='아이디를 입력해주세요' onChange={(e)=>onChangeEvent(e, '아이디')} maxLength={16}/>
                                        <button onClick={(e)=>onClickDuplCheck(e, 'ID중복확인')}>중복확인</button>
                                    </div>
                                    <div className='box2'>
                                        {isId && <p>{msgId}</p>}
                                    </div>
                                </li>
                                <li className="row2">
                                    <div className='box1'>
                                        <label htmlFor="userPw1">비밀번호<i>*</i></label>
                                        <input type="password" name='userPw1' id='userPw1' value={비밀번호} placeholder='비밀번호를 입력해주세요' onChange={(e)=>onChangeEvent(e, '비밀번호')} maxLength={16}/>
                                    </div>
                                    <div className='box2'>
                                        {isPw1 && <p>{msgPw1}</p>}
                                    </div>
                                </li>
                                <li className="row3">
                                    <div className='box1'>
                                        <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                        <input type="password" name='userPw2' id='userPw2' value={비밀번호확인} placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>onChangeEvent(e, '비밀번호확인')} maxLength={16}/>
                                    </div>
                                    <div className='box2'>
                                        {isPw2 && <p>{msgPw2}</p>}
                                    </div>
                                </li>
                                <li className="row4">
                                    <div className='box1'>
                                        <label htmlFor="userName">이름<i>*</i></label>
                                        <input type="text" name='userName' id='userName' value={이름} placeholder='이름을 입력해주세요' onChange={(e)=>onChangeEvent(e, '이름')} maxLength={30}/>
                                    </div>
                                    <div className='box2'>
                                        {isName && <p>{msgName}</p>}
                                    </div>
                                </li>
                                <li className="row5">
                                    <div className='box1'>
                                        <label htmlFor="userEmail">이메일<i>*</i></label>
                                        <input type="email" name='userEmail' id='userEmail' value={이메일} placeholder='예: marketkurly@kurly.com' onChange={(e)=>onChangeEvent(e, '이메일')}/>
                                        <button onClick={(e)=>onClickDuplCheck(e, 'EMAIL중복확인')}>중복확인</button>
                                    </div>
                                    <div className='box2'>
                                        {isEmail && <p>{msgEmail}</p>}
                                    </div>
                                </li>
                                <li className="row6">
                                    <div className='box1'>
                                        <label htmlFor="userHp">휴대폰<i>*</i></label>
                                        <input type="text" disabled={isUserHpDis} name='userHp' id='userHp' value={휴대폰} placeholder='숫자만 입력해주세요' onChange={(e)=>onChangeEvent(e, '휴대폰')} maxLength={11}/>
                                        <button disabled={!isHpDis} className={isHp ? '' : 'hp-btn'} onClick={onClickHpBtn}>{isUserHpDis === true ? '다른번호 인증' : '인증번호 받기'}</button>
                                    </div>
                                    <div className='box2'>
                                        {isHp && <p>{msgHp}</p>}
                                    </div>
                                </li>
                                {
                                    휴대폰인증발급번호 !== '' && (
                                        <li className="row7">
                                            <div className='box1'>
                                                <input type="text" name='userHpAu' id='userHpAu' value={휴대폰인증입력번호} placeholder='숫자만 입력해주세요' onChange={(e)=>onChangeEvent(e, '휴대폰인증입력번호')} maxLength={6}/>
                                                {
                                                    timerStart && (
                                                        <span className='count-timer'>
                                                            <em>{timer.분 < 10 ? `0${timer.분}` : timer.분}</em>
                                                            <i>:</i>
                                                            <em>{timer.초 < 10 ? `0${timer.초}` : timer.초}</em>
                                                        </span>
                                                    )
                                                }
                                                <button onClick={onClickAuthenOk}>인증번호 확인</button>
                                            </div>
                                            <div className='box2'>
                                                <p className='black'>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)</p>
                                            </div>
                                        </li>
                                    )
                                }
                                <li className="row8">
                                    <div className='box1'>
                                        <label htmlFor="userAddr1">주소<i>*</i></label>
                                        {
                                            post.주소1 !== '' && (
                                                <input type="text" name='userAddr1' id='userAddr1' value={post.주소1} placeholder='검색주소' onChange={onChangeAddr1Event} maxLength={250}/>
                                            )
                                        }
                                        <button className={post.주소1 === '' ? 'on' : ''} onClick={onClickAddress}>{post.주소1 !== '' ? "재검색" : "주소검색"}</button>
                                    </div>
                                    <div className='box2'>
                                        {isAddr1 && <p>{msgAddr1}</p>}
                                    </div>
                                </li>
                                {
                                    post.주소1 !== '' && (
                                        <li className="row9">
                                            <div className='box1'>
                                                <input type="text" name='userAddr2' id='userAddr2' value={post.주소2} placeholder='나머지 주소를 입력하세요' onChange={onChangeAddr2Event} maxLength={250}/>
                                            </div>
                                        </li>
                                    )
                                }
                                <li className="row10">
                                    <div className='box2'>
                                        <p className='black'>
                                            {post.주소1 !== '' && <strong>샛별배송</strong>}
                                            배송지에 따라 상품 정보가 달라질 수 있습니다.
                                        </p>
                                    </div>
                                </li>
                                <li className="row11">
                                    <div className='box1'>
                                        <label>성별</label>
                                        <div className='gender'>
                                            <label><input type="radio" name='male' id='male' value="남자" onChange={onChangeGender} checked={state.성별.includes('남자')}/><em>남자</em></label>
                                            <label><input type="radio" name='feMale' id='feMale' value="여자" onChange={onChangeGender} checked={state.성별.includes('여자')}/><em>여자</em></label>
                                            <label><input type="radio" name='none' id='none' value="선택안함" onChange={onChangeGender} checked={state.성별.includes('선택안함')}/><em>선택안함</em></label>
                                        </div>
                                    </div>
                                </li>
                                <li className="row12">
                                    <div className='box1'>
                                        <label>생년월일</label>
                                        <div className='birth'>
                                            <label><input type="text" name='year' id='year' value={생년} placeholder='YYYY' onChange={onChangeBirthYear}/></label><i>/</i>
                                            <label><input type="text" name='month' id='month' value={생월} placeholder='MM' onChange={onChangeBirthMonth}/></label><i>/</i>
                                            <label><input type="text" name='date' id='date' value={생일} placeholder='DD' onChange={onChangeBirthDate}/></label>
                                        </div>
                                    </div>
                                    <div className='box2'>
                                        {<p>{msgBirth}</p>}
                                    </div>
                                </li>
                                <li className="row13">
                                    <div className='box1'>
                                        <label>추가입력사항</label>
                                        <div className='gender'>
                                            <label><input type="radio" name='chooChunin' id='chooChunin' value="친구초대 추천인 아이디" onChange={onChangeChooga} checked={추가입력사항.includes("친구초대 추천인 아이디")}/><em>친구초대 추천인 아이디</em></label>
                                            <label><input type="radio" name='event' id='event' value="참여 이벤트명" onChange={onChangeChooga} checked={추가입력사항.includes("참여 이벤트명")}/><em>참여 이벤트명</em></label>
                                        </div>
                                    </div>
                                </li>
                                {
                                    추가입력사항 !== '' && (
                                        <>
                                            <li className="row14">
                                                <div className='box1'>
                                                    <input type="text" name='userChooChun' id='userChooChun' value={추천인아이디} placeholder={chooGaPlaceHolder} onChange={onChangeChooChunEvent} maxLength={16}/>
                                                    <button onClick={onClickChooChunIdOk}>아이디 확인</button>
                                                </div>
                                                <div className='box2'></div>
                                            </li>
                                            <li className="row15">
                                                <div className='box2'>
                                                    <p className='black'>{chooGaGuideText}</p>
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                <li className="row16">
                                    <div className='box1'>
                                        <label>이용약관동의<i>*</i></label>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chkAll' id='chkAll' value="전체 동의합니다." onChange={onChangeAllCheck} checked={이용약관동의.length === 7}/>전체 동의합니다.</label>
                                        </div>
                                    </div>
                                    <div className="box2 service">
                                        <p className='black'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                    </div>
                                </li>
                                <li className="row17">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk1' id='chk1' value="이용약관 동의(필수)" onChange={onChangeCheck} checked={이용약관동의.includes('이용약관 동의(필수)')}/>이용약관 동의</label><span>필수</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="row18">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk2' id='chk2' value="개인정보 수집∙이용 동의(필수)" onChange={onChangeCheck} checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}/>개인정보 수집∙이용 동의</label><span>필수</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="row19">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk3' id='chk3' value="개인정보 수집∙이용 동의(선택)" onChange={onChangeCheck} checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}/>개인정보 수집∙이용 동의</label><span>선택</span>
                                            <a href="!#">약관보기</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="row20">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk4' id='chk4' value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" onChange={onChangeCheck} checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}/>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>선택</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="row21">
                                    <div className='box1'>
                                        <div className='service sms'>
                                            <label><input type="checkbox" name='chk5' id='chk5' value="SMS(선택)" onChange={onChangeCheck} checked={이용약관동의.includes('SMS(선택)')}/>SMS</label>
                                            <label><input type="checkbox" name='chk6' id='chk6' value="이메일(선택)" onChange={onChangeCheck} checked={이용약관동의.includes('이메일(선택)')}/>이메일</label>
                                        </div>
                                    </div>
                                    <div className="box2 service sms">
                                        <p className='black'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                    </div>
                                </li>
                                <li className="row22">
                                    <div className='box1'>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk7' id='chk7' value="본인은 만 14세 이상입니다.(필수)" onChange={onChangeCheck} checked={이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}/>본인은 만 14세 이상입니다.</label><span>필수</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="button-box">
                            <button type='submit'>가입하기</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

Sub05SignUpComponent.defaultProps = {
    회원가입: {
        아이디: '',
        isId: false,
        msgId: '',
        isIdDuplCheck: false,

        비밀번호: '',
        isPw1: false,
        msgPw1: '',

        비밀번호확인: '',
        isPw2: false,
        msgPw2: '',

        이름: '',
        isName: false,
        msgName: '',

        이메일: '',
        isEmail: false,
        msgEmail: '',
        isEmailDuplCheck: false,

        휴대폰: '',
        휴대폰인증발급번호: '',
        휴대폰인증입력번호: '',
        isHp: false,
        msgHp: '',
        isHpDis: false,
        isUserHpDis: false,

        주소1: '',
        isAddr1: false,
        msgAddr1: '',

        주소2: '',
        isAddr2: false,
        msgAddr2: '',

        성별: '선택안함',
        isGender: false,
        msgGender: '',

        생년: '',
        생월: '',
        생일: '',
        msgBirth: '',

        추가입력사항: '',
        추천인아이디: '',
        추천인아이디존재: false,
        isChooga1: false,
        msgChooga1: '',
        chooGaPlaceHolder: '',
        chooGaGuideText: '',
        
        참여이벤트명: '',
        isChooga2: false,
        msgChooga2: '',

        이용약관: [
            "이용약관 동의(필수)",
            "개인정보 수집∙이용 동의(필수)",
            "개인정보 수집∙이용 동의(선택)",
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
            "SMS(선택)",
            "이메일(선택)",
            "본인은 만 14세 이상입니다.(필수)"
        ],
        이용약관동의: [],
        isService: false,
        msgService: '',

        체크아이디중복: false,
        체크비밀번호: false,
        체크이메일중복: false,
        체크휴대폰인증: false
    }
}