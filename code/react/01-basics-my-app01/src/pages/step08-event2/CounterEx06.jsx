import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";

export default function CounterEx06(params) {
    const [liked, setLiked] = useState(false)

    const handleChange  = (e)=>{
        setLiked(e.target.checked)
    }
    return(
        <>
         {/* 
          1. FormControlLabel : 입력요소 + 텍스트 묶음
            체크박스, 라디오 , 스위치 같은 입력요소 옆에 레이블을 붙여 주는 역할  
              2. control={실제 입력 요소}
              label=옆에 붙을 텍스트
          3. Typography - 텍스트 스타일 컴포넌트    

         */}
            <h2>체크박스 : MUI</h2>
            <FormControlLabel 
            //    label={<Typography variant="h5"  >I liked this</Typography>}
               label={<span style={{fontSize:'30px'}}>I liked this</span>}
               control={<Checkbox 
                 checked={liked}
                 onChange={handleChange}
                 size="large"
               />}
            
            />
            <hr />
            <h2>You {liked ? 'liked' : 'did not like'}</h2>
        </>
    );
}