import { ToggleButton } from "@mui/material";
import { useState } from "react";

// export default function CounterEx10(params) {
//     const [isPinned, setPinned] = useState(false);
//     const togglePinned = (e)=>{
//         // 토글 : 이벤트가 일어날때 마다 반대
//         setPinned(!isPinned);
//     }
//     return(
//         <>
//            <Button variant="outlined" onClick={togglePinned}>체크유무 {isPinned && 'v'}</Button> 
//         </>
//     );
// }


export default function CounterEx10(params) {
    const [isPinned, setPinned] = useState(false);
    return(
        <>
           <h3>토글버튼</h3>
           <ToggleButton
              selected={isPinned}
              onChange={(e)=>{setPinned(!isPinned)}}
              >
              체크유무 {isPinned && 'v'}
            </ToggleButton> 
        </>
    );
}
