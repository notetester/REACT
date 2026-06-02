import { useMemo, useState } from "react";

export default function UseMemo02 (params) {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    function heavyWork(){
        console.log("무거운 계산 실행 중...");
        let sum = 0 ;
        for (let i = 0; i < 1000000000; i++) {
            sum += i ;
            
        }
        return sum ;
    }
    // useMemo + 의존성 배열 = [] 빈 배열
    // 최초 1회만 heavyWork()실행 후 결과 값 저장(메모이제이션)
    // 즉 버튼, input 을 해도 재 계산을 안함
    const result = useMemo(()=>heavyWork(), [])
   return(
    <div>
        <p>결과1 : {result}</p>
        <p>결과2 : {count}</p>
        <p>결과3 : {text}</p>
        <button onClick={()=>setCount(count+1)}>+</button>
        <input onChange={(e)=>setText(e.target.value)} />
    </div>
   );   
}