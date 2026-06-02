import { useState } from "react";

export default function UseMemo01 (params) {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    function heavyWork(){
        console.log("무거운 계산 실행 중...")
        let sum = 0 ;
        for (let i = 0; i < 1000000000; i++) {
            sum += i ;
            
        }
        return sum ;
    }
    // useMemo 없음
    // 렌더링 될때 마다 heavyWork() 실행 된다.
    const result = heavyWork();
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