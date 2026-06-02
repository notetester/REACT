import { useRef, useState } from "react";


// useRef 와 useState 차이점
// useState 값이 바뀌면 리렌더링 한다.
// useRef 값이 바뀌어도 리렌더링 안 함
export default function UseRefTest03(params) {
    const [count, setCount] = useState(0);
    // 렌더링과 상관없이 메모리에 저장
    const countRef = useRef(0);
    
    // 렌더링 될때 마다 초기화 
    let countVar = 10 ;

    const statePlus = ()=>{
       countVar = countVar + 1 ;
       console.log("countVar : " + countVar);
    }

    const refPlus = ()=>{
        countRef.current = countRef.current + 1 ;
        console.log("countRef.current : " + countRef.current);
    }

    const doRander = ()=>{
        setCount(count+1);
    }
    const printResult = ()=>{
        console.log("ref : " + countRef.current ,  ", var : " + countVar);
    }
    return(
        <div>
           <p>Ref : {countRef.current}</p>
           <p>var : {countVar}</p>
           <button onClick={statePlus}>State 올리기</button>
           <button onClick={refPlus}>ref 올리기</button>
           {/* 일반변수는 렌더링 될때 마다 초기화 (  let countVar = 10 )
               ref 값은 기억했다가 결과로 나온다. */}
           <button onClick={doRander}>렌더링</button>
           <button onClick={printResult}>출력결과</button>
        </div>
    );
}