import { useMemo, useState } from "react";

// 컴포넌트 밖에서 선언 -> 랜더링 마다 새로 생성되지 않음
const items = ["apple", "banana", "cherry", "grape"];

export default function UseMemo04(params) {
    const [query, setQuery] = useState("");

    // query가 변경될 때만  필터링 재생
    const filterItem = useMemo(()=>{
        console.log("memo 실행")
        
        // toLowerCase() => 다 소문자로 만들어주기
        // includes() => 특정값을 포함하고 있으면 true  반환
        return items.filter((k)=>k.toLowerCase().includes(query.toLowerCase()))
    },[query])
    return(
        <div>
            <input type="text"
                   value={query}
                   onChange={(e)=> setQuery(e.target.value)} />
            <ul>
                {filterItem.map((k,i)=>{
                    return(
                        <li key={i}>{k}</li>
                    )
                })}
            </ul>
        </div>
    );
}