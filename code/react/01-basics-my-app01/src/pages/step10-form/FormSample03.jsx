import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { useState } from "react";

export default function FormSample03(params) {
    // 밖에서 생성하는 것을 권장 
    // 안에 있으며 랜더링 마다 생성
    const MENU_ITEMS = [
        {name: 'burger', label: '버거'},
        {name: 'pizza', label: '피자'},
        {name: 'chicken', label: '치킨'},
        {name: 'coke', label: '콜라'}
    ]

    // const [checked, setChecked] = useState([false, false, false, false]);
    const [checked, setChecked] = useState(
        // [['burger', false],['pizza', false],['chicken', false],['coke', false]] 
        // => {burger:false, pizza:false,chicken:false, coke:false}
        Object.fromEntries(MENU_ITEMS.map((k)=>[k.name,false]))
    );

    const selectedItems = MENU_ITEMS
        .filter((k)=>checked[k.name])
        .map((k)=>k.label)
        .join(', ')

    const handleChange = (e) =>{
        setChecked({...checked, [e.target.name]: e.target.checked})
    }    
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: 300, p: 2}}>
            <Typography variant="h5">주문내역</Typography>     
            <Typography color={selectedItems ? 'primary' : 'error'} >
                {/* selectedItems 이 false 일때 오른쪽이 나온다. */}
               {selectedItems || '선택된 메뉴가 없습니다.'}
            </Typography>  

            <hr />

              {/* 여러개 체크박스 */}
              <FormControl>
                  <FormLabel>메뉴선택</FormLabel>                
                  {MENU_ITEMS.map((k)=>(
                     <FormControlLabel 
                        key={k.name} 
                        label={k.label}
                        control={
                            <Checkbox 
                               name={k.name}
                               checked={checked[k.name]}
                               onChange={handleChange}
                            />
                        }
                     />      
                  ))}
              </FormControl>
        </Box>
    );
}