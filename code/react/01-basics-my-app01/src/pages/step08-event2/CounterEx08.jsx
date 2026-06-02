import { useState } from "react";

export default function CounterEx08(params) {
    const [form, setForm] = useState({
            firstName : "둘리",
            lastName : "강",
            email : "kang@naver.com"
        });

    const handleChange = (e)=>{
       setForm({...form, [e.target.name]:e.target.value});
    }   
    return(
        <>
          <label>First Name : 
              {/* input type의 이벤트 처리는 보통 onChange  */}
                <input value={form.firstName}  
                       name="firstName"
                       onChange={handleChange}
                /> 
          </label>
          <label>last Name : 
                <input value={form.lastName}
                       name="lastName"
                       onChange={handleChange}
                /> 
          </label>
          <label>email : 
                <input value={form.email}  
                       name="email"
                       onChange={handleChange}
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