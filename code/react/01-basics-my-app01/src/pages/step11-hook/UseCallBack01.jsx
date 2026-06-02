import { useState } from "react";

// useCallback 없음
// -> 렌더링 될 때마다 handleClick 함수가 새로 생성됨

// -> input 입력 시에도 불필요하게 함수가 새로 생성됨
export default function UseCallBack01(params) {
    const [count,setCount] = useState(0);
    const [text, setText] = useState('');

    const handleClick = ()=>{
        console.log("handleClick 실행");
        setCount(count + 1);
    }
    console.log("렌더링 발생-handleClick 함수 새로 생성됨");
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