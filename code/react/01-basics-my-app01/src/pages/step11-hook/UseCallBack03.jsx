import { useCallback, useState } from "react";
import UseCallBackChild from "./UseCallBackChild";

export default function UseCallBack03(params) {
    // 부모가 리 렌더링 되면 자식도 리 렌더링 된다.
    const [cnt, setCnt] = useState(0);
    // const handleClick = ()=>{
    //     console.log("handleClick 클릭");
    //     setCnt(cnt+1);
    // }

    // 부모가 리렌더링 되어도 자식은 리랜더링 되지 않게 하기 위함
    const handleClick = useCallback(()=>{
        console.log("handleClick 클릭");
        setCnt(cnt+1);
    },[])

    return(
        <div>
            <h3>useCallback 사용</h3>
            <p>카운트 : {cnt} </p>
            <button onClick={()=>setCnt(cnt+1)}>부모 카운트</button>
            <UseCallBackChild onClick={handleClick} />
        </div>
    );
}