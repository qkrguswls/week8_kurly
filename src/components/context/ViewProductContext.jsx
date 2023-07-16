// context란? 전역변수 관리 - 프롭스로 내려받는거를 한번에 뿌려주기
// 1.컨텍스트 선언 2.컨텍스트 초기값 설정(기본 null) 3.내보내기(export) === 여기에서
// 4.최상위 컴포넌트에 임포트해주기 5.가져온 컨텍스트 프로바이더 설정하기(return태그에) === (wrapComponent.jsx에서)
// 6.section2SlideWrapSlide에서 컨텍스트가져오고 사용등록(setViewProductFn가 있는 jsx 수정해주기)
// 7. section2Component.jsx 기존에 적어둔 하위컴포넌트로 넘길 프롭스는 지워주기! - 2개 지우기

import {createContext} from 'react';

export const ViewProductContext = createContext(null);
