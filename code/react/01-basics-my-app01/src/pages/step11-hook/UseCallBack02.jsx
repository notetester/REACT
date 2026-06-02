import { useCallback, useState } from "react";

// useCallback 
// const cachedFn = useCallback(fn, dependencies)
// useCallback + 의존성배열 = [] 
// 최초 1회만 함수 생성 후 재 사용
// count, text가 바뀌어도 함수 새로 생성 안 함
// 랜더링 횟수와는 상관없음
export default function UseCallBack02(params) {
    const [count,setCount] = useState(0);
    const [text, setText] = useState('');

    const handleClick = useCallback(()=>{
       console.log("handleClick 실행 ")
       setCount((prev)=>prev + 1); // prev란 현재 state의 최신값을 안전하게 가져오는 방법
    },[]);  // 최초 1회만 생성 되고 다음부터는 재사용된다.
    
    console.log("렌더링 발생");
    return(
        <div>
            <p>count: {count}</p>
            <p>text: {text}</p>
            <button onClick={handleClick}>눌러주세요</button>
            <input type="text"
                   value={text}
                   onChange={(e)=>setText(e.target.value)}
            />
        </div>
    );
}