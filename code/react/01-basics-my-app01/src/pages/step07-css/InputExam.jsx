import { TextField } from '@mui/material';
import './inputExam.css'

export default function InputExam(params) {
    return(
        <div>
            <input className='bgColor' 
                   placeholder='입력하세요'
                   onFocus={()=>{console.log("onFocus")}} 
                   onBlur={()=>{console.log("onBlur")}} /><br /><br />


                {/* TextField 이벤트 처리는 onChange 를 사용하자 
                   (e) => e는 이벤트
                   e.target.value => 입력된 글자를 의미
                */}
            <TextField variant='outlined' label="입력하세요" 
               onChange={(e)=>{console.log(e.target.value)}}
            />
        </div>
    );
}
