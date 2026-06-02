import { useState } from "react";
import Profile3 from "./Profile3";

export default function ProfileSample3(params) {
    const users = ["임꺽정", "장길산", "홍길동"];
    const [user, setUser] = useState(users[0]);
    const [status, setStatus] = useState("Away");

    const handleClick = ()=>{
        setUser(users[(users.indexOf(user)+1) % users.length]);
    }
    return(
        <div>
            <h2>부모 컴포넌트</h2>
            <button onClick={handleClick}>Switch User</button>
            <p>전체 상태 : {status}</p>
            <Profile3 
               name={user} 
               status = {status}
               onChangeStatus = {setStatus}
            
            />
        </div>
    );
}