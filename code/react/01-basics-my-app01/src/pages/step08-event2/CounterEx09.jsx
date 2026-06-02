import { useRef, useState } from "react";

function createTodos(params) {
    const initTodos = [];
    for (let i = 0; i < 5; i++) {
        initTodos.push({id: i, text: 'Item ' + (i+1)});
        
    }
    return initTodos ;
}

export default function CounterEx09(params) {
    const [todos, setTodos] = useState(createTodos);
    const [msg, setMsg] = useState('');
    const nextId = useRef(5); // 항상 증가하는 고유 ID 

    function handleAdd(params) {
        if(!msg.trim()) return ; // 빈값이면 그냥 리턴 => 빈 값 방지
        setTodos([...todos, {id: nextId.current++, text: msg}])
        setMsg('');
    }
    function handleDelete(id) {
        // 파라미터로 넘어온 id 가 아닌 것들을 모으자 
        setTodos(todos.filter(k=>k.id !== id));
    }
    return(
        <>
          <input  
             value={msg}
             onChange={(e)=>{setMsg(e.target.value)}}
             onKeyDown={(e)=>e.key === 'Enter' && handleAdd()} // 엔터 추가 // 함수를 즉시 실행(handleAdd())
          />
          {/* 함수 자체를 전달 (참조) */}
          <button onClick={handleAdd}>추가</button>
          <ul>
            {/* 화살표 함수에서  () 와 {} 의 차이점
                (표현식),({객체}), return 자동, 
                {return 값},  {이벤트 핸들러 등 반환값 불 필요할때}
            */}

                {/* 
                {todos.map((k)=>{
                    return( 
                        <li key={k.id}>{k.text}
                        <button onClick={()=>{handleDelete(k.id)}}>삭제</button>
                    </li>)
                })} 
                */}
                
                {todos.map((k)=>(
                    <li key={k.id}>{k.text}
                        <button onClick={()=>{handleDelete(k.id)}}>삭제</button>
                    </li>
                ))} 
                
          </ul>
        </>
    );
}