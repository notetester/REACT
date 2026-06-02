import { useRef } from "react";


// useRef - DOM 직접 접근
// inputRef.current 로 input 요소에 직접 접근
export default function UseRefTest02(params) {
    const inputRef = useRef(null); // 초기값 null

    const handleFocus = ()=>{
        if(inputRef.current.value !== ""){
            inputRef.current.focus(); // 포커스 지정
            // console.log("inputRef.current: ",  inputRef.current)
            console.log("value : " + inputRef.current.value)
        }else{
           alert("비었네요")
        }
    }

    return(
        <div>
            {/* ref 속성으로 inputRef에 연결 */}
           <input type="text" placeholder="텍스트입력" ref={inputRef} />
           <button onClick={handleFocus}>값 확인</button>
          
        </div>
    );
}