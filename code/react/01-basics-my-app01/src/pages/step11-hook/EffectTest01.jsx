import { useEffect, useState } from "react";

export default function EffectTest01(params) {
    const [count, setCount] = useState(1);

    console.log('useEffect 전');
    // 의존성 배열 = [] 
    // => 마운트 시 딱 1번 실행
    // => count가 아무리 바뀌어도 useEffect는 다시 실행되지 않는다.
    useEffect(()=>{
        console.log('useEffect 실행 됨');
    },[]);

    console.log('useEffect 후');
    return(
        <>
            <p>총 {count}번 출력했습니다.</p>
            <button onClick={()=>setCount(count + 1)}>눌러주세요</button>
        </>
    );
}