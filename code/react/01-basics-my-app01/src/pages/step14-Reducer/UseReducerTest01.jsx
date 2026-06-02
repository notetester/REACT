import { useReducer, useState } from "react";

// export default function UserReducerTest01(params) {
//     const [count, setCount] = useState(5);
//     return(
//         <div>
//             <h2>Count : {count}</h2>
//             <button onClick={()=>{setCount(count + 1)}}> + </button>
//             <button onClick={()=>{setCount(count-1)}}> - </button>
//             <button onClick={()=>{setCount(5)}}> reset </button>
//         </div>
//     );
// }


// export default function UserReducerTest01(params) {
//     const [count, setCount] = useState(5);

//     const handleAdd=()=>{
//       setCount(count + 1)
//     }
//      const handleSub=()=>{
//        setCount(count - 1) 
//     }
//      const handleReset=()=>{
//         setCount(5)
//     }
//     return(
//         <div>
//             <h2>Count : {count}</h2>
//             <button onClick={handleAdd}> + </button>
//             <button onClick={handleSub}> - </button>
//             <button onClick={handleReset}> reset </button>
//         </div>
//     );
// }

// useReducer : react에 복잡한 상태관리를 더 체계적으로 예측 가능하게 처리하기 위한 상태관리 Hook
//              useState의 대체제이며, 상태관리 변화의 로직이 복합적일때 사용하면 
//              더 명확하고 깔끕하게 관리 할 수 있다.
// 형식) const [state, dispatch] = useReducer(reducer, initialState);
//      state        : 현재 상태
//      dispatch     : 상태를 변경하는 요청 (함수)
//      reducer      : 상태(state)를 어떻게 변경할지 결정하는 함수
//      initialState : 초기 상태값
//      action       : 상태 변경을 요청하는 객체 ({type, payload})
//                     type    : 무엇을 할지 (동작이름)
//                     payload : 무엇을 가지고 할지(상태를 바꾸기 위한 데이터)

function calc(state, action) {
    switch(action.type){
        case "add" :  
            return {count: state.count + 1}
        case "sub" :  
            return {count: state.count - 1}
        case "reset" :  
            return {count: 0}
    }
}

export default function UseReducerTest01(params) {
    const initialState = {count:0};
    const [state, dispatch] = useReducer(calc, initialState) ;
  
    return(
        <div>
            <h2>Count : {state.count}</h2>
            <button onClick={()=>dispatch({type:'add'})}> + </button>
            <button onClick={()=>dispatch({type:'sub'})}> - </button>
            <button onClick={()=>dispatch({type:'reset'})}> reset </button>
        </div>
    );
}