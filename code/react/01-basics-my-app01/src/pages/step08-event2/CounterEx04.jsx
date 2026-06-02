import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function CounterEx04(params) {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [result, setResult] = useState('');

    function handleLogin(params) {
        setResult(`ID : ${userId} / PW : ${userPw}`);
    }

    function handleReset(params) {
        setUserId('');
        setUserPw('');
        setResult('');
    }
    return(
        <div style={{margin:"50px 200px"}}>
          <h2>Login Form</h2>
          {/* 스타일을 속성으로 사용하려면 {{}} */}
          <TextField 
            style={{margin:"10px 0px"}}
            variant="outlined" 
            label="User ID" 
            onChange={(e)=>{setUserId(e.target.value)}}
            value={userId} />
           <br />
           <TextField 
            style={{margin:"10px 0px"}}
            variant="outlined" 
            type="password"
            label="PassWord" 
            onChange={(e)=>{setUserPw(e.target.value)}}
            value={userPw}
             />
            <br />
            <Button variant="outlined" color="primary" onClick={handleLogin} >Login</Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
            <hr />
            <h3>결과 : {result}</h3>
        </div>
    );
}