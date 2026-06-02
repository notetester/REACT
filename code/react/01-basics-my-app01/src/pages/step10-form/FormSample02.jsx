import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function FormSample02(params) {
    const [userName, setUserName] = useState('');
    const roles = ['user', 'admin', 'guest'];
    const [role,setRole]=useState(roles[0]);
    const [isSubscribed, setSubscribed]=useState(false);
    const genders = ['male', 'female', 'other'];
    const [gender,setGender] = useState(genders[0]);

    return(
        // Box = MUI의 만능 컨테이너
        // html의 div와 비슷하다.
        // <div style={{display: 'flex'}}> ... </div>
        // <Box sx={{display: 'flex'}}> ... </div>
        // sx = MUI 전용 스타일  props
        // p 는 padding = 16px; , m는 margin: 2 (16px)
        <Box sx={{display: 'flex', flexDirection:'column',
                  gap: 2, width: 300, p: 2}}>
                
             {/* 상태 표시  */}
            <Typography>name2 : {userName} {isSubscribed && '(subscribed)'} </Typography> 
            <Typography>gender2 : {gender} </Typography> 
            <Typography>role2 : {role} </Typography> 
            <hr />

            {/* 텍스트 입력 */}
            <TextField 
               label="User Name"
               placeholder="User Name"
               value={userName}
               onChange={(e)=>setUserName(e.target.value)}
            />

            {/* 체크박스 */}
            <FormControlLabel 
               label="Subscribed"
               control={
                 <Checkbox 
                   value='Subscribed'
                   checked={isSubscribed}  
                   onChange={(e)=>setSubscribed(e.target.checked)}
                   />
               }
            />
         
            {/* 라디오 버튼 */}
            <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup 
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}>
                  {genders.map((k) =>(
                    <FormControlLabel 
                       key={k}
                       value={k}
                       label={k}
                       control={<Radio />}
                    />
                  ))}
                </RadioGroup>
            </FormControl>

            {/* 셀렉트 */}
             <FormControl>
                <FormLabel>Role</FormLabel>
                <Select 
                  value={role}
                  onChange={(e)=> setRole(e.target.value)}>
                  {roles.map((k) =>(
                    <MenuItem 
                    key={k}
                    value={k}
                    >{k}</MenuItem>
                  ))}
                </Select>
            </FormControl>
        </Box>
    );
}
