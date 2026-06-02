import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function CounterEx03(params) {
    const [msg, setMsg] = useState('');
    // e => 이벤트 객체
    function handleChang(e) {
        // e.target = 이벤트가 발생한 요소
        // e.target.value = 이벤트가 발생한 요소의 
        setMsg(e.target.value);
    }
    function handleClick(params) {
        setMsg('')
    }
    return(
        <>
          <TextField variant="outlined" onChange={handleChang} label="입력하세요" value={msg} />
          <p>당신의 입력값 : {msg}</p>
          <Button variant="outlined" onClick={handleClick}>Reset</Button>
        </>
    );
}