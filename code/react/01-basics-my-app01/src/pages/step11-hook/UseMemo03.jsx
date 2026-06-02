import { useMemo, useState } from "react";

export default function UseMemo03 (params) {
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
    // useMemo + 의존성 배열 = [count]
    // text가 바뀌어도 재계산을 안함 ->  버튼을 누르면 재계산을 실행함
    const result = useMemo(()=>heavyWork(), [count])
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