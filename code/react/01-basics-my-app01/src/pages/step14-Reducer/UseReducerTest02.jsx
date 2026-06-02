import { useReducer, useState } from "react";

function bank(state,action) {
    switch (action.type) {
        case "depo":
            return state + action.payload ;
    
        case "isdepo":
             return state - action.payload ;
            
        default:
            return state ;
    }
}


export default function UseReducerTest02(params) {
    const [number, setNumber] = useState(0);
    const [money, dispatch] = useReducer(bank, 0);
    return(
        <div>
            <h2>ICT 은행에 오신것을 환영합니다</h2>
            <p> 잔고 : {money}</p>
            <input type="number"
                   value={number}
                   onChange={(e)=>{
                    // 입력한 값 정수로 만들기
                     const value = parseInt(e.target.value);
                     setNumber(value<0 ? 0 : value); // 음수방지
                   }}
                   step="1000" />
            <button onClick={()=>dispatch({type:"depo", payload:number})}>예금</button>
            <button onClick={()=>{
                // 잔고 부족
               if(money < number){
                  alert("잔고부족");
                  return;
               }else{
                  dispatch({type:'isdepo', payload:number});
               }
                        
            }}>출금</button>
        </div>
    );
}