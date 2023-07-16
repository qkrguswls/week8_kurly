import React from 'react';
import './scss/confirm.scss';
// 컨텍스트 가져오기
import {ViewProductContext} from '../context/ViewProductContext';

export default function ConfirmComponent() {

    const {confirmModalClose, msg, type} = React.useContext(ViewProductContext);

    // 모달 닫기 - 모달을 닫고 삭제
    const onClickOkEvent=()=>{
        confirmModalClose();
    }

    // 모달 닫기 취소 - 모달을 닫고 삭제안함
    const onClickCancleEvent=()=>{

    }

    return (
        <div id="confirmModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="message-box">
                            <div className="msg">{msg}</div>
                        </div>
                        <div className="button-box">
                            {type === 2 ? <button onClick={onClickCancleEvent}>취소</button> : null}
                            <button onClick={onClickOkEvent}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};