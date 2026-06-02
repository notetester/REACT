import { useEffect, useRef, useState } from "react";

export default function UseRefTest04(params) {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(0);

    // 화면에 표시할 이전 값(렌더링 중에 읽음)
    const prevCount = prevCountRef.current;
     
    // 랜더링 될때 마다 실행
    useEffect(()=>{
       // 렌더링 후 현재값을  이전값으로 저장 
       prevCountRef.current = count ;
    });


    return(
        <div>
           <p>현재값 : {count}</p>
           <p>이전값 : {prevCount}</p>
           <button onClick={()=>{setCount(count+1)}}>+</button>
           <button onClick={()=>{setCount(count-1)}}>-</button>
        </div>
    );
}