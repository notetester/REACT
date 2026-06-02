import { useRef } from "react";


// useRef - DOM 직접 접근
// inputRef.current 로 input 요소에 직접 접근
export default function UseRefTest01(params) {
    const inputRef = useRef(null); // 초기값 null

    const handleFocus = ()=>{
      inputRef.current.focus(); // 포커스 지정
      // console.log("inputRef.current: ",  inputRef.current)
      console.log("value : " + inputRef.current.value)
    }
    const handleClear = ()=>{
      inputRef.current.value=""; // 초기화
      inputRef.current.focus();  // 포커스 지정
    }
    return(
        <div>
            {/* ref 속성으로 inputRef에 연결 */}
           <input type="text" placeholder="텍스트입력" ref={inputRef} />
           <button onClick={handleFocus}>포커스</button>
           <button onClick={handleClear}>초기화</button>
        </div>
    );
}