import { useId, useRef } from "react";

export default function UseIdTest01(params) {
    const id = useId();
    const inputRef = useRef(null);
    return(
        <div>
            <h3>연결하지 않았을 때</h3>
            <p>
                <label>이름 : </label>
                <input ref={inputRef} />
            </p>
            <h3>연결했을 때</h3>
            {/* html 일때
                <label for="username">사용자 이름:</label>
                <input type="text" id="username" name="user_name"> */}
            <p>
                <label htmlFor={id}>이름 : </label>
                <input id={id} ref={inputRef} />
            </p>
             <p>
                {/* html 일때
                    <label>비밀번호:
                        <input type="password" name="password">
                    </label> */}
                <label>이름 : 
                    <input id={id} ref={inputRef} />
                </label>
                
            </p>
        </div>
    );
}