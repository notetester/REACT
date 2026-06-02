import { useReducer, useState } from "react";

function bank(state, action) {
    switch (action.type) {
        case "depo":
            return {money: state.money + action.payload };
    
        case "isdepo":
            // 잔고 처리
            if(action.payload > state.money){
                 alert("잔고부족");
                return state;
            }
             return{money: state.money - action.payload };
            
        default:
            return state ;
    }
}

export default function UseReducerTest03(params) {
    const [number, setNumber] = useState(0);
    // 잔고 부족 처리까지 reducer에서 할려면 
    // state를 숫자 대신 객체로 변경
    const [state, dispatch] = useReducer(bank, {money:0});
    return(
        <div>
            <h2>ICT 은행에 오신것을 환영합니다</h2>
            <p> 잔고 : {state.money}</p>
            <input type="number"
                   value={number}
                   onChange={(e)=>{
                    // 입력한 값 정수로 만들기
                     const value = parseInt(e.target.value);
                     setNumber(value<0 ? 0 : value); // 음수방지
                   }}
                   step="1000" />
            <button onClick={()=>dispatch({type:"depo", payload:number})}>예금</button>
            <button onClick={()=>dispatch({type:"isdepo", payload:number})}>출금</button>
        </div>
    );
}