import { useEffect, useState } from "react";

export default function EffectTest02(params) {
   const [count, setCount] = useState(1);
   
       console.log('useEffect 전');
       // 의존성 배열 = 없음
       // => 랜더링 될때 마다 실행
       useEffect(()=>{
           console.log('useEffect 실행 됨');
       });
   
       console.log('useEffect 후');
       return(
           <>
               <p>총 {count}번 출력했습니다.</p>
               <button onClick={()=>setCount(count + 1)}>눌러주세요</button>
           </>
       );
}