import { useEffect, useState } from "react";

export default function EffectTest04(params) {
   const [count, setCount] = useState(1);
   const [count2, setCount2] = useState(1);
   
       console.log('useEffect 전');
       // 의존성 배열 = 여러개 일때
       // => 특정값이 랜더링 될때 마다 실행
       // 의존성 배열에 count와 count2가 있으므로
       //  count 또는 count2 가 변경되면 실행됨
       useEffect(()=>{
           console.log('useEffect 실행 됨');
       },[count, count2]);
   
       console.log('useEffect 후');
       return(
           <>
               <p>총 {count}번 출력했습니다.</p>
               <p>총 {count2}번 출력했습니다.</p>
               <button onClick={()=>setCount(count + 1)}>눌러주세요</button>
               <button onClick={()=>setCount2(count2 + 1)}>눌러주세요</button>
           </>
       );
}