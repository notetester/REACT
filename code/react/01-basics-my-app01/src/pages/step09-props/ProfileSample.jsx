import { useState } from "react";
import Profile from "./Profile";

// 부모
// ** props는 부모 -> 자식 단방향 전달이다.
//    React에서 props는 부모 컴포넌트에서 
//    자식 컴포넌트로만 전달되는 단방향 데이터 흐름을 가집니다.
//    이 원칙에 대한 핵심 내용은 다음과 같습니다.
//    1) 단방향 데이터 흐름 (Parent → Child)부모에서 자식으로 
//       : 부모 컴포넌트는 자식 컴포넌트에게 데이터를 props를 통해 전달합니다.
//    2) 자식에서 부모로는 불가
//       : 하위 컴포넌트가 직접 상위 컴포넌트의 props를 수정하거나 데이터를 전달할 수 없습니다.
//    3) 읽기 전용 (Read-Only) 
//       : 자식 컴포넌트에서 전달받은 props는 수정할 수 없는 불변(Immutable)의 데이터입니다.

// 1. 부모의 변수 값을 자식에게 전달 가능
// 2. 부모 상태가 바뀌면 그 상태를 props로 전달 받은 
//    자식 컴포넌트도 자동으로 업데이트(리 랜더링) 된다.   
export default function ProfileSample(params) {
    const users = ["고길동", "둘리", "마이콜"];
    const [user, setUser] = useState(users[0]);
    const [isStatus, setStatus] = useState(true);
    return(
        <div>
            <h2>User Profile</h2>
            {/* 자식 컴포넌트가 변경되지 않는다. */}
            <button onClick={()=>{
                setStatus(!isStatus)
            }}>Toggle Status</button>

            {/* 자식 컴포넌트가 변경된다. */}
            <button onClick={()=>{
                setUser(users[(users.indexOf(user)+1) % users.length])
            }}>Switch User</button>
            <p>상태 : {isStatus ? 'Active' : 'Deactive'}</p>
            <hr />
            <Profile name={user}  />
            <hr />
            <Profile name={user}  isStatus={isStatus}/>
           
        </div>
    );
}