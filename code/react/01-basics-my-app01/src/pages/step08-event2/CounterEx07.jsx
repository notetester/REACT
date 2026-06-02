import { useState } from "react";

export default function CounterEx07(params) {
    const [form, setForm] = useState({
        firstName : "둘리",
        lastName : "강",
        email : "kang@naver.com"
    });
    return(
        <>
          <label>First Name : 
              {/* input type의 이벤트 처리는 보통 onChange  */}
                <input value={form.firstName}  
                       onChange={(e)=>{
                        // 전개연산자(...) : 배열이나 객체의 내용을 펼쳐서 더 큰 구조 안에 넣을 때 사용
                        //                 객체를 복사하거나 병합할때 사용 
                        // 리엑트에서는 상태를 직접 수정할 수 없으므로 
                        // 기본 객체의 불변성을 지키면서, 필요한 값을 바꾸기 위한 방법으로 사용
                        setForm({...form, firstName:e.target.value})
                       }}
                /> 
          </label>
          <label>last Name : 
                <input value={form.lastName}
                       onChange={(e)=>{
                        setForm({...form, lastName:e.target.value})
                       }}
                /> 
          </label>
          <label>email : 
                <input value={form.email}  
                       onChange={(e)=>{
                        setForm({...form, email:e.target.value})
                       }}
                /> 
          </label>
          <hr />
          <ul>
            <li>{form.firstName}</li>
            <li>{form.lastName}</li>
            <li>{form.email}</li>
          </ul>
        </>
    );
}