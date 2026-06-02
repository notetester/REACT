import { useState } from "react";
import Profile2 from "./Profile2";

export default function ProfileSample2(params) {
    const [msg, setMsg] = useState('초기상태');

    // 이 함수를 자식에게 내려 보내는 콜백함수
    function handleChange(newMsg) {
        setMsg(newMsg);
    }
    return(
        <div>
            <h2>부모 컴포넌트</h2>             
            <p>부모의 상태 : {msg}</p>
            <hr />
            <Profile2 onChange={handleChange}/>
        </div>
    );
}