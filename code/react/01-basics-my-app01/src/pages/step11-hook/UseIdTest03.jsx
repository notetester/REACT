import { useId, useRef } from "react";

export default function UseIdTest03(params) {
    const nameId = useId();
    const ageId = useId();
    const nameRef = useRef();
    const ageRef = useRef();

    const handleClick = ()=>{
        const name = nameRef.current.value.trim();
        const age = ageRef.current.value.trim();

        if(name === ''){
            alert("이름 입력하세요");
            nameRef.current.focus();
            return;
        }
        if(age === ''){
            alert("나이 입력하세요");
            ageRef.current.focus();
            return;
        }
          alert(`이름 : ${name} age : ${age}`)
        //  alert("이름 : "+ name +" ,age :"+ age);
        //  alert("이름 : ", name ," ,age :", age);         안됨
        //  console.log("이름 : ", name ," ,age :", age);   됨
    }
    return(
        <div>
            <p>
                <label htmlFor={nameId}>이름 : </label>
                <input type="text"
                    ref={nameRef}
                    placeholder="이름 입력"

                />
            </p>
            <p>
                <label htmlFor={ageId}>나이 : </label>
                <input type="number"
                    ref={ageRef}
                    placeholder="나이 입력"
                />
            </p>
            <button onClick={handleClick}>확인</button>
        </div>
    );
}