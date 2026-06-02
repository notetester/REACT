import { useId } from "react";

export default function UseIdTest02(params) {
    const id = useId();
     return(
        <div>
            <h3>여러개 일때</h3>
             <p>
                <label htmlFor={id+'-first'}>first Name : </label>
                <input id={id+'-first'}  />
            </p>
            <hr />
             <p>
                <label htmlFor={id+'-second'}>second Name : </label>
                <input id={id+'-second'} />
            </p>
        </div>
     );  
} 