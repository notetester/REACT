import { useState } from "react";

export default function Profile2({onChange}) {
    const [status, setStatus] = useState("Away");
    return(
        <div>
            <h2>자식 컴포넌트</h2>
            {/* 콜백 함수를 호출함으로써 부모 상태를 간접적으로 변경할 수 있다. */}
            <button onClick={()=>onChange('자식이 변경한 상태')}>부모 상태 바꾸기</button>
            <hr />
            <p>Status:{status}</p>
            <button onClick={()=>setStatus('Away')}>Set Away</button>
            <button onClick={()=>setStatus('Avaliable')}>Set Avaliable</button>
        </div>
    );
} 
