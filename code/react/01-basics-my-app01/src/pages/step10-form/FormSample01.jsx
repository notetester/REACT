import { useState } from "react";

export default function FormSample01(params) {
    const [userName, setUserName] = useState('');
    const roles = ['user', 'admin', 'guest'];
    const [role, setRole] = useState(roles[0]);
    const [isSubscribed, setSubscribed]=useState(false);

    const genders = ['male', 'female', 'other'];
    const [gender,setGender] = useState(genders[0]);
    return(
        <>
           <form>
              <p>name : {userName} {isSubscribed && '(subScribed)'}</p>
              <p>gender : {gender} </p>
              <p>role : {role}</p>
              <hr />

              <p><input 
                  type="text" 
                  placeholder="User Name"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)} />
              </p>
              <p><label>
                    <input 
                     type="checkbox"
                     checked={isSubscribed}
                     onChange={(e)=>setSubscribed(e.target.checked)} />
                  
                   Subscribed</label>
             </p>
             <p>
                 {genders.map((k) =>(
                    <label key={k} style={{marginRight: '10px'}}>
                        <input
                         type="radio"  
                         name="gender"
                         value={k}
                         checked={gender === k}
                         onChange={(e)=>setGender(e.target.value)}
                        />
                        {k}
                    </label>
                 ))}    
             </p>
              <p><select value={role} onChange={(e)=>setRole(e.target.value)}>
                  {roles.map((k)=>{return <option>{k}</option>})}
                </select>
              </p>
           </form>
        </>
    );    
}