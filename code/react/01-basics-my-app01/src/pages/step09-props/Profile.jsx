import { useState } from "react";

// 자식
// export default function Profile({name}) {
//     const [status, setStatus] = useState('Away');
//     return(
//         <div>
//             <h3>Name : {name}</h3>
//             <p>Status : {status}</p>
//             <button onClick={()=>setStatus('Away')}>Set Away</button>
//             <button onClick={()=>setStatus('Avaliable')}>Set Avaliable</button>
//         </div>
//     );
// }


// 자식 
export default function Profile({name, isStatus}) {
    return(
        <div>
            <h3>Name : {name}</h3>
            <p>Status : {isStatus ? 'Active' : 'Deactive'}</p>
        </div>
    );
}