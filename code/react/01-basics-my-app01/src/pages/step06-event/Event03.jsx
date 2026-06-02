// 머티리얼 디자인 : 구글이 모바일, 데스크톱 등 다양안 기기에서 
//                일관적이고 직관적인 사용자 경험을 제고하는 목적으로 
//                시각적인 디자인 언어 및 가이드 제공
// MUI는 주로 React 기반의 UI 컴포넌트 라이브러리인  Material UI
// 설치는  cmd 에서 npm install @mui/material @emotion/react @emotion/styled
// 자습서 : https://mui.com/material-ui/getting-started/

import { Button } from "@mui/material";


export default function Event03(params) {
    function handleClick() {
        console.log("event")
    }
    return(
       <>
         <Button variant="text" onClick={handleClick}>Text Button</Button>
         <Button variant="contained" onClick={()=>{console.log("event2")}}>Contained</Button>
         <Button variant="outlined" disabled>Outlined</Button>

       </>
    );
}