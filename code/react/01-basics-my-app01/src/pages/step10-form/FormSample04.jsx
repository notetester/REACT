import { useState } from "react";
import TempInput from "./TempInput";
import TempRadio from "./TempRadio";

export default function FormSample04(params) {
    const [unit, setUnit] = useState('섭씨');
    const [msg, setMsg] = useState('');

    // .toFixed(1) : 소수점 첫째자리 까지 , 숫자가 아니라 문자열 반환
    const convertedTemp = (unit === '섭씨')
    ? (msg * 9 / 5 + 32).toFixed(1) // 섭씨 -> 화씨 변환
    : ((msg-32) * 5 / 9).toFixed(1) // 화씨 -> 섭씨 변환
    return(
        <div>
            <h2>화씨 / 섭씨 변환기</h2>
            <p> Converted : {msg ? convertedTemp : '--' }
                            {unit === '섭씨' ? " F" : "C"}    
            </p>
            <TempInput 
               value={msg}
               unit={unit}
               onChange={setMsg}
            />
            <TempRadio 
               unit={unit}
               onUnitChange={setUnit}            
            />
        </div>
    );
}